<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Float, ContactShadows } from '@threlte/extras'
  import * as THREE from 'three'

  export let scrollProgress = 0; // 0 to 1, passed from parent to slow down the chaos

  // Generate random positions and rotations for the nodes
  const count = 40;
  const nodes = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ] as [number, number, number],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ] as [number, number, number],
    speed: (Math.random() + 0.5) * 2,
    axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize()
  }));

  let groupRef: THREE.Group;
  let time = 0;

  useTask((delta) => {
    // Slow down based on scrollProgress (1 = stopped, 0 = full speed)
    const speedMultiplier = Math.max(0.1, 1 - scrollProgress);
    time += delta * speedMultiplier;
    
    if (groupRef) {
      groupRef.rotation.y = time * 0.1;
      groupRef.rotation.x = time * 0.05;
      
      // We could animate children here if needed, but the Float component handles the erratic movement somewhat.
    }
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 15]}
  fov={45}
/>

<T.AmbientLight intensity={0.2} color="#6366F1" />
<T.DirectionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
<T.PointLight position={[-5, -5, -5]} intensity={2} color="#ef4444" distance={20} />

<T.Group bind:ref={groupRef}>
  {#each nodes as node, i}
    <!-- Erratic Float -->
    <Float 
      speed={node.speed * (1 - scrollProgress * 0.8)} 
      rotationIntensity={2 * (1 - scrollProgress * 0.8)} 
      floatIntensity={3 * (1 - scrollProgress * 0.8)}
    >
      <T.Mesh position={node.position} rotation={node.rotation}>
        {#if i % 3 === 0}
          <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
        {:else if i % 3 === 1}
          <T.TetrahedronGeometry args={[0.6]} />
        {:else}
          <T.OctahedronGeometry args={[0.5]} />
        {/if}
        <T.MeshStandardMaterial 
          color="#334155" 
          metalness={0.8}
          roughness={0.4}
          envMapIntensity={0.5}
        />
      </T.Mesh>
      
      <!-- Connective lines representation (small cylinders) -->
      {#if i % 4 === 0}
        <T.Mesh position={[0, 0, 0]}>
          <T.CylinderGeometry args={[0.02, 0.02, 2]} />
          <T.MeshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
        </T.Mesh>
      {/if}
    </Float>
  {/each}
</T.Group>

<ContactShadows
  scale={20}
  blur={3}
  far={15}
  opacity={0.4}
  color="#000000"
  position={[0, -6, 0]}
/>