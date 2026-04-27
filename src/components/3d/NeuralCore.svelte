<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Float, ContactShadows, Environment } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import * as THREE from 'three'
  import { onMount } from 'svelte'

  // Colors
  const ACTION_COLOR = '#00FF94'
  const SHADOW_COLOR = '#6366F1'

  // Parallax state
  const mouse = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.25 })

  let innerCore: THREE.Mesh
  let ringsGroup: THREE.Group

  let time = 0

  useTask((delta) => {
    time += delta
    if (innerCore) {
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.05
      innerCore.scale.set(scale, scale, scale)
    }
    
    if (ringsGroup) {
      ringsGroup.rotation.y = time * 0.2
      ringsGroup.rotation.z = Math.sin(time * 0.1) * 0.2
    }
  })

  // Handle mouse move for parallax
  function handleMouseMove(event: MouseEvent) {
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = -(event.clientY / window.innerHeight) * 2 + 1
    mouse.set({ x: x * 0.5, y: y * 0.5 })
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })
</script>

<!-- We use a perspective camera here -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 8]}
  fov={45}
/>

<!-- Environment Lights -->
<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
<T.DirectionalLight position={[-5, -5, -5]} intensity={1} color={SHADOW_COLOR} />
<Environment url="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr" />

<T.Group position={[$mouse.x, $mouse.y, 0]}>
  <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
    
    <!-- Outer Frosted Glass Sphere -->
    <T.Mesh>
      <T.SphereGeometry args={[2, 64, 64]} />
      <T.MeshPhysicalMaterial
        color="#ffffff"
        transmission={1}
        opacity={1}
        metalness={0.1}
        roughness={0.2}
        ior={1.5}
        thickness={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent={true}
      />
    </T.Mesh>

    <!-- Inner Pulsing Core -->
    <T.Mesh bind:ref={innerCore}>
      <T.IcosahedronGeometry args={[1.2, 2]} />
      <T.MeshStandardMaterial
        color={ACTION_COLOR}
        emissive={ACTION_COLOR}
        emissiveIntensity={2}
        wireframe={true}
      />
      <!-- Core Light -->
      <T.PointLight color={ACTION_COLOR} intensity={5} distance={10} />
    </T.Mesh>

    <!-- Orbiting Data Rings -->
    <T.Group bind:ref={ringsGroup}>
      {#each Array(3) as _, i}
        <T.Group rotation={[Math.PI / 2 + (i * 0.5), i * 0.5, 0]}>
          <T.Mesh>
            <T.TorusGeometry args={[2.5 + i * 0.3, 0.02, 32, 100]} />
            <T.MeshStandardMaterial 
              color={ACTION_COLOR} 
              emissive={ACTION_COLOR}
              emissiveIntensity={0.5 + Math.random()} 
              transparent={true}
              opacity={0.6}
            />
          </T.Mesh>
          
          <!-- Small data nodes on rings -->
          <T.Mesh position={[(2.5 + i * 0.3), 0, 0]}>
            <T.SphereGeometry args={[0.08, 16, 16]} />
            <T.MeshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={2}
            />
          </T.Mesh>
        </T.Group>
      {/each}
    </T.Group>

  </Float>
</T.Group>

<ContactShadows
  scale={10}
  blur={2}
  far={10}
  opacity={0.5}
  color={SHADOW_COLOR}
  position={[0, -3, 0]}
/>
