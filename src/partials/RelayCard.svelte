<script lang="ts">
  import cx from "classnames"
  import {last} from "ramda"
  import {onMount} from "svelte"
  import {poll, stringToHue, hsl} from "src/util/misc"
  import {between} from "hurdak/lib/hurdak"
  import {fly} from "svelte/transition"
  import Anchor from "src/partials/Anchor.svelte"
  import pool from "src/agent/pool"

  export let relay
  export let theme = "gray-8"
  export let removeRelay = null
  export let addRelay = null

  let quality = null
  let message = null
  let showStatus = false

  onMount(() => {
    return poll(10_000, async () => {
      ;[quality, message] = pool.getQuality(relay.url)
    })
  })
</script>

<div
  class={cx(
    `bg-${theme}`,
    "flex flex-col justify-between gap-3 rounded border border-l-2 border-solid border-gray-6 py-3 px-6 shadow"
  )}
  style={`border-left-color: ${hsl(stringToHue(relay.url))}`}
  in:fly={{y: 20}}>
  <div class="flex items-center justify-between gap-2">
    <div class="flex items-center gap-2 text-xl">
      <i class={relay.url.startsWith("wss") ? "fa fa-lock" : "fa fa-unlock"} />
      <Anchor type="unstyled" href={`/relays/${btoa(relay.url)}`}>
        {last(relay.url.split("://"))}
      </Anchor>
      <span
        on:mouseout={() => {
          showStatus = false
        }}
        on:mouseover={() => {
          showStatus = true
        }}
        class="h-2 w-2 cursor-pointer rounded-full bg-gray-6"
        class:bg-gray-6={message === "Not connected"}
        class:bg-danger={quality <= 0.3 && message !== "Not connected"}
        class:bg-warning={between(0.3, 0.7, quality)}
        class:bg-success={quality > 0.7} />
      <p
        class="hidden text-sm text-gray-1 transition-all sm:block"
        class:opacity-0={!showStatus}
        class:opacity-1={showStatus}>
        {message}
      </p>
    </div>
    {#if removeRelay}
      <button class="flex items-center gap-3 text-gray-1" on:click={() => removeRelay(relay)}>
        <i class="fa fa-right-from-bracket" /> Leave
      </button>
    {/if}
    {#if addRelay}
      <button class="flex items-center gap-3 text-gray-1" on:click={() => addRelay(relay)}>
        <i class="fa fa-right-to-bracket" /> Join
      </button>
    {/if}
  </div>
  {#if relay.description}
    <p>{relay.description}</p>
  {/if}
  <slot name="controls" />
</div>
