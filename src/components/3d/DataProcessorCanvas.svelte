<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import DataProcessor from './DataProcessor.svelte'
  import { onMount } from 'svelte'

  let container: HTMLDivElement;
  let inView = false;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
    }, { rootMargin: '100px' });

    if (container) observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  });
</script>

<div bind:this={container} class="w-full h-full relative pointer-events-none min-h-[400px]">
  {#if inView}
    <Canvas>
      <Suspense>
        <DataProcessor />
      </Suspense>
    </Canvas>
  {/if}
</div>