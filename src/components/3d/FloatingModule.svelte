<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Float, ContactShadows } from '@threlte/extras'
  import * as THREE from 'three'

  export let type: 'knowledge' | 'support' | 'automation' | 'analytics' | 'onboarding' | 'documents' = 'knowledge';

  let time = 0;
  useTask((delta) => {
    time += delta;
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transmission: 1,
    opacity: 1,
    metalness: 0.1,
    roughness: 0.2,
    ior: 1.5,
    thickness: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transparent: true,
  });

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: '#6366f1',
    metalness: 0.9,
    roughness: 0.2,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: '#00ff94',
    emissive: '#00ff94',
    emissiveIntensity: 0.5,
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 5]}
  fov={40}
/>

<T.AmbientLight intensity={0.8} color="#ffffff" />
<T.DirectionalLight position={[5, 5, 2]} intensity={2} color="#ffffff" />
<T.DirectionalLight position={[-5, -5, -2]} intensity={1} color="#6366f1" />

<Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
  {#if type === 'knowledge'}
    <!-- Book representation -->
    <T.Group rotation={[0.2, 0.5, 0]}>
      <T.Mesh material={glassMaterial} position={[0, 0, 0]}>
        <T.BoxGeometry args={[1.5, 0.2, 2]} />
      </T.Mesh>
      <T.Mesh material={metalMaterial} position={[0, 0.15, 0]}>
        <T.BoxGeometry args={[1.3, 0.05, 1.8]} />
      </T.Mesh>
      <T.Mesh material={accentMaterial} position={[0, 0.25, 0]}>
        <T.SphereGeometry args={[0.1]} />
      </T.Mesh>
    </T.Group>
  {:else if type === 'support'}
    <!-- Connected spheres -->
    <T.Group rotation={[0, time * 0.5, 0]}>
      <T.Mesh material={glassMaterial} position={[0, 0, 0]}>
        <T.SphereGeometry args={[0.7]} />
      </T.Mesh>
      <T.Mesh material={accentMaterial} position={[0.9, 0.5, 0]}>
        <T.SphereGeometry args={[0.2]} />
      </T.Mesh>
      <T.Mesh material={metalMaterial} position={[-0.8, -0.4, 0.5]}>
        <T.SphereGeometry args={[0.3]} />
      </T.Mesh>
    </T.Group>
  {:else if type === 'automation'}
    <!-- Floating planes (Mail/Automation) -->
    <T.Group rotation={[0.3, 0.4, 0.1]}>
      <T.Mesh material={glassMaterial} position={[0, 0.3, 0]}>
        <T.BoxGeometry args={[1.6, 0.1, 1]} />
      </T.Mesh>
      <T.Mesh material={metalMaterial} position={[0, 0, 0]} rotation={[0, 0.2, 0]}>
        <T.BoxGeometry args={[1.6, 0.1, 1]} />
      </T.Mesh>
      <T.Mesh material={accentMaterial} position={[0, -0.3, 0]} rotation={[0, -0.1, 0]}>
        <T.BoxGeometry args={[1.6, 0.1, 1]} />
      </T.Mesh>
    </T.Group>
  {:else if type === 'analytics'}
    <!-- Data bars -->
    <T.Group rotation={[0.2, 0.5, 0]} position={[0, -0.5, 0]}>
      <T.Mesh material={glassMaterial} position={[-0.6, 0.5, 0]}>
        <T.BoxGeometry args={[0.4, 1, 0.4]} />
      </T.Mesh>
      <T.Mesh material={metalMaterial} position={[0, 0.8, 0]}>
        <T.BoxGeometry args={[0.4, 1.6, 0.4]} />
      </T.Mesh>
      <T.Mesh material={accentMaterial} position={[0.6, 1.1, 0]}>
        <T.BoxGeometry args={[0.4, 2.2, 0.4]} />
      </T.Mesh>
    </T.Group>
  {:else if type === 'onboarding'}
    <!-- Guide/Path -->
    <T.Group rotation={[0.5, Math.PI / 4, 0]}>
      <T.Mesh material={glassMaterial} position={[0, 0, 0]}>
        <T.TorusGeometry args={[0.8, 0.15, 16, 100]} />
      </T.Mesh>
      <T.Mesh material={accentMaterial} position={[0, 0, 0]}>
        <T.OctahedronGeometry args={[0.4]} />
      </T.Mesh>
    </T.Group>
  {:else if type === 'documents'}
    <!-- Layered crystals -->
    <T.Group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <T.Mesh material={glassMaterial} position={[0, 0, 0]}>
        <T.OctahedronGeometry args={[0.8]} />
      </T.Mesh>
      <T.Mesh material={metalMaterial} position={[0, 0, 0]} scale={[1.2, 0.1, 1.2]}>
        <T.BoxGeometry args={[1, 1, 1]} />
      </T.Mesh>
    </T.Group>
  {/if}
</Float>
