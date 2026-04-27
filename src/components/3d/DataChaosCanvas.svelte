<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import DataChaos from './DataChaos.svelte'
  import { onMount } from 'svelte'

  let scrollProgress = 0;
  let container: HTMLDivElement;

  onMount(() => {
    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress from 0 (just entered viewport) to 1 (center/past center)
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Element is in viewport
        let progress = 1 - (rect.top / windowHeight);
        // Normalize between 0 and 1
        progress = Math.max(0, Math.min(1, progress * 1.5)); // speed up the slowing effect
        scrollProgress = progress;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div bind:this={container} class="w-full h-[500px] relative pointer-events-none">
  <!-- Fallback CSS Gradient -->
  <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-indigo-500/10 backdrop-blur-3xl rounded-[3rem] -z-10 flex items-center justify-center">
    <div class="w-64 h-64 bg-slate-800/30 rounded-full blur-3xl animate-pulse"></div>
  </div>
  
  <Canvas>
    <Suspense>
      <DataChaos {scrollProgress} />
    </Suspense>
  </Canvas>
</div>