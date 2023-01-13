import Dexie from 'dexie'
import {writable} from 'svelte/store'
import {ensurePlural, createMap, switcherFn} from 'hurdak/lib/hurdak'
import {now} from 'src/util/misc'
import {personKinds} from 'src/util/nostr'

export const db = new Dexie('agent/data/db')

db.version(9).stores({
  relays: '++url, name',
  alerts: '++id, created_at',
  people: '++pubkey, updated_at',
})

// Some things work better as observables than database tables
export const people = writable([])

// Bootstrap our people observable
db.people.toArray().then($p => people.set(createMap('pubkey', $p)))

// Sync to a regular object so we have a synchronous interface
let $people = {}
people.subscribe($p => {
  $people = $p
})

// Our synchronous interface
export const getPerson = (pubkey, fallback = false) =>
  $people[pubkey] || (fallback ? {pubkey} : null)

// Hooks

export const processEvents = async events => {
  const profileEvents = ensurePlural(events)
    .filter(e => personKinds.includes(e.kind))

  const profileUpdates = {}
  for (const e of profileEvents) {
    profileUpdates[e.pubkey] = {
      ...getPerson(e.pubkey, true),
      ...profileUpdates[e.pubkey],
      ...switcherFn(e.kind, {
        0: () => JSON.parse(e.content),
        2: () => ({relays: ($people[e.pubkey]?.relays || []).concat(e.content)}),
        3: () => ({petnames: e.tags}),
        12165: () => ({muffle: e.tags}),
        10001: () => ({relays: e.tags.map(t => t[0])}),
        default: () => {
          console.log(`Received unsupported event type ${event.kind}`)
        },
      }),
      updated_at: now(),
    }
  }

  // Sync to our in memory copy
  people.update($people => ({...$people, ...profileUpdates}))

  // Sync to our database
  await db.people.bulkPut(Object.values(profileUpdates))
}
