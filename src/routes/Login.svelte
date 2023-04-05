<script lang="ts">
  import {fly} from "svelte/transition"
  import {navigate} from "svelte-routing"
  import Anchor from "src/partials/Anchor.svelte"
  import Content from "src/partials/Content.svelte"
  import Heading from "src/partials/Heading.svelte"
  import user from "src/agent/user"
  import {modal} from "src/app/ui"
  import {login} from "src/app"

  const nip07 = "https://github.com/nostr-protocol/nips/blob/master/07.md"

  const autoLogIn = async () => {
    const {nostr} = window as any

    if (nostr) {
      login("extension", await nostr.getPublicKey())
    } else {
      modal.set({type: "login/privkey"})
    }
  }

  const signUp = () => {
    modal.set({type: "onboarding", stage: "intro"})
  }

  const pubkeyLogIn = () => {
    modal.set({type: "login/pubkey"})
  }

  if (user.getPubkey()) {
    navigate("/")
  }

  document.title = "Log In"
</script>

<div in:fly={{y: 20}}>
  <Content size="lg" class="text-center">
    <div class="flex max-w-2xl flex-col gap-8">
      <div class="mb-4 flex flex-col items-center justify-center">
        <Heading>nostrkid BETA</Heading>
        <i>   make friends   .   learn a ton   .   earn bitcoin   </i>
      </div>
      <section>
      <p class="text-center">
        Click below to log in. If you have a <Anchor href={nip07} external
          >compatible browser extension</Anchor> installed, we will use that.
          </p>
      </section>
      <section>
      <p class="text-center">
          If youre not signed up, you can still explore by entering the npub 
          of a nostrkid to view their profile and activity <i>see npub login below</i>
          </p>
      </section>
      <section>
      <p class="text-center">
          If you would like to learn more about nostrkid BETA testing email oobiyou@soultiller.com
      </p>
      </section>
      <div class="flex flex-col items-center gap-4">
        <div class="flex gap-4">
          <Anchor class="w-32 text-center" type="button-accent" on:click={autoLogIn}>Log In</Anchor>
        </div>
        <Anchor type="unstyled" on:click={pubkeyLogIn}>
          <i class="fa fa-cogs" /> npub Login
        </Anchor>
        
      </div>
    </div>
  </Content>
</div>