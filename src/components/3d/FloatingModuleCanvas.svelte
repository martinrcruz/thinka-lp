<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import FloatingModule from './FloatingModule.svelte'
  import { onMount } from 'svelte'

  export let type: 'knowledge' | 'support' | 'automation' | 'analytics' | 'onboarding' | 'documents' = 'knowledge';

  let container: HTMLDivElement;
  let inView = false;

  onMount(() => {
    // Only render canvas when in view to save resources
    const observer = new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
    }, {
      rootMargin: "100px" // Pre-load slightly before it comes into view
    });

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) observer.unobserve(container);
    };
  });
</script>

<div bind:this={container} class="w-full h-full relative pointer-events-none">
  <!-- Fallback/Loading background shape -->
  <div class="absolute inset-0 flex items-center justify-center -z-10 opacity-30">
    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-indigo blur-xl animate-pulse-slow"></div>
  </div>

  {#if inView}
    <Canvas>
      <Suspense>
        <FloatingModule {type} />
      </Suspense>
    </Canvas>
  {/if}
</div>