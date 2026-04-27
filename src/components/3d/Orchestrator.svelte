<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Float, ContactShadows } from '@threlte/extras'
  import * as THREE from 'three'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  type Part = {
    id: string;
    geo: THREE.BoxGeometry;
    color: string;
    targetPos: [number, number, number];
    currentPos: [number, number, number];
    scale: number;
  };

  const parts: Part[] = [
    // Base platform
    { id: 'base', geo: new THREE.BoxGeometry(4, 0.2, 4), color: '#1e293b', targetPos: [0, -1, 0], currentPos: [0, -5, 0], scale: 0 },
    // Core server
    { id: 'core', geo: new THREE.BoxGeometry(1.5, 2, 1.5), color: '#6366f1', targetPos: [0, 0.1, 0], currentPos: [0, 5, 0], scale: 0 },
    // Side module 1
    { id: 'mod1', geo: new THREE.BoxGeometry(1, 1, 1), color: '#00ff94', targetPos: [-1, -0.4, 1], currentPos: [-5, 0, 5], scale: 0 },
    // Side module 2
    { id: 'mod2', geo: new THREE.BoxGeometry(1, 1.5, 1), color: '#3b82f6', targetPos: [1, -0.15, -1], currentPos: [5, 0, -5], scale: 0 },
    // Floating data blocks
    { id: 'data1', geo: new THREE.BoxGeometry(0.4, 0.4, 0.4), color: '#ffffff', targetPos: [-1.2, 1.5, -1.2], currentPos: [-2, 4, -2], scale: 0 },
    { id: 'data2', geo: new THREE.BoxGeometry(0.4, 0.4, 0.4), color: '#ffffff', targetPos: [1.2, 1.2, 1.2], currentPos: [2, 4, 2], scale: 0 }
  ];

  let meshes: Record<string, THREE.Mesh> = {};
  export let assembleTrigger = false;

  $: if (assembleTrigger) {
    // GSAP animation to assemble the pieces
    parts.forEach((part, i) => {
      const mesh = meshes[part.id];
      if (mesh) {
        gsap.to(mesh.position, {
          x: part.targetPos[0],
          y: part.targetPos[1],
          z: part.targetPos[2],
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
          delay: i * 0.15
        });
        gsap.to(mesh.scale, {
          x: 1, y: 1, z: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: i * 0.15
        });
      }
    });
  }

  // Very slow idle rotation
  let groupRef: THREE.Group;
  useTask((delta) => {
    if (groupRef) {
      groupRef.rotation.y += delta * 0.1;
    }
  });
</script>

<!-- Isometric-like perspective -->
<T.OrthographicCamera
  makeDefault
  position={[10, 10, 10]}
  zoom={80}
  near={0.1}
  far={1000}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
  }}
/>

<T.AmbientLight intensity={0.5} color="#ffffff" />
<T.DirectionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
<T.DirectionalLight position={[-5, 5, -5]} intensity={1} color="#6366F1" />

<T.Group bind:ref={groupRef}>
  <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
    {#each parts as part}
      <T.Mesh 
        bind:ref={meshes[part.id]}
        position={part.currentPos}
        scale={[part.scale, part.scale, part.scale]}
        castShadow
        receiveShadow
      >
        <T.BoxGeometry args={[part.geo.parameters.width, part.geo.parameters.height, part.geo.parameters.depth]} />
        <T.MeshStandardMaterial 
          color={part.color} 
          metalness={0.4}
          roughness={0.2}
          transparent={part.id.startsWith('data')}
          opacity={part.id.startsWith('data') ? 0.9 : 1}
          emissive={part.id.startsWith('data') || part.color === '#00ff94' ? part.color : '#000000'}
          emissiveIntensity={part.id.startsWith('data') || part.color === '#00ff94' ? 0.8 : 0}
        />
        
        <!-- Wireframe overlay for structural look -->
        <T.LineSegments>
          <T.EdgesGeometry args={[part.geo]} />
          <T.LineBasicMaterial color="#ffffff" opacity={0.2} transparent={true} />
        </T.LineSegments>
      </T.Mesh>
    {/each}
  </Float>
</T.Group>

<ContactShadows
  scale={15}
  blur={2}
  far={10}
  opacity={0.6}
  color="#0f172a"
  position={[0, -2, 0]}
/>