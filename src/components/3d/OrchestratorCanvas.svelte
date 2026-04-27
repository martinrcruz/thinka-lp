<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import Orchestrator from './Orchestrator.svelte'
  import { onMount } from 'svelte'

  let container: HTMLDivElement;
  let assembleTrigger = false;

  onMount(() => {
    // Create an intersection observer to trigger the assembly animation
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !assembleTrigger) {
        assembleTrigger = true;
      }
    }, {
      threshold: 0.3 // Trigger when 30% of the canvas is visible
    });

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) observer.unobserve(container);
    };
  });
</script>

<div bind:this={container} class="w-full h-[400px] md:h-[500px] relative pointer-events-none">
  <!-- Fallback Background -->
  <div class="absolute inset-0 bg-brand-navy/30 rounded-3xl border border-white/5 backdrop-blur-sm -z-10 flex items-center justify-center overflow-hidden">
    <!-- Abstract tech lines -->
    <div class="absolute w-full h-px bg-gradient-to-r from-transparent via-brand-indigo/30 to-transparent top-1/2"></div>
    <div class="absolute h-full w-px bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent left-1/2"></div>
  </div>
  
  <Canvas>
    <Suspense>
      <Orchestrator {assembleTrigger} />
    </Suspense>
  </Canvas>
</div>