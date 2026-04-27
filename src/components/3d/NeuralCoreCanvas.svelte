<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import NeuralCore from './NeuralCore.svelte'
</script>

<div class="w-full h-full absolute inset-0 pointer-events-auto" style="min-height: 500px;">
  <!-- Fallback CSS Gradient (Glassmorphism) -->
  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-3xl rounded-[3rem] -z-10 flex items-center justify-center">
    <div class="w-64 h-64 bg-[#00FF94]/20 rounded-full blur-3xl animate-pulse"></div>
  </div>
  
  <Canvas>
    <Suspense>
      <svelte:fragment slot="fallback"></svelte:fragment>
      <NeuralCore />
    </Suspense>
  </Canvas>
</div>

