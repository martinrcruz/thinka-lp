<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Float, ContactShadows } from '@threlte/extras'
  import * as THREE from 'three'
  import { employeeCount } from '../../stores/roiStore'

  let groupRef: THREE.Group;
  let time = 0;
  
  // Create a grid of points for a neural network / processor core visualization
  const gridSize = 5;
  const spacing = 0.8;
  const nodes: { position: [number, number, number], scale: number, type: 'core' | 'node', id: number }[] = [];
  
  let idCounter = 0;
  for (let x = -gridSize; x <= gridSize; x++) {
    for (let y = -gridSize; y <= gridSize; y++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        // Create a spherical cluster
        const distance = Math.sqrt(x*x + y*y + z*z);
        if (distance <= gridSize && Math.random() > 0.6) {
          const isCore = distance < 2;
          nodes.push({
            position: [x * spacing, y * spacing, z * spacing],
            scale: isCore ? 0.15 : 0.05 + Math.random() * 0.05,
            type: isCore ? 'core' : 'node',
            id: idCounter++
          });
        }
      }
    }
  }

  // Animation loop
  useTask((delta) => {
    time += delta;
    if (groupRef) {
      groupRef.rotation.y = time * 0.1;
      groupRef.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  // Calculate dynamic threshold based on slider value (5 to 100)
  // We'll normalize it to a 0-1 range to determine how many nodes turn blue/active
  $: activeRatio = ($employeeCount - 5) / 95;
  
  // We'll determine the color of a node based on its ID and the activeRatio
  function getNodeColor(node: typeof nodes[0], ratio: number) {
    if (node.type === 'core') return '#00ff94';
    
    // Sort of deterministic "random" distribution of active nodes
    const nodeThreshold = (node.id * 137 % 100) / 100;
    
    if (nodeThreshold < ratio) {
      // Active (blue) state
      return '#3b82f6';
    }
    
    // Inactive (indigo) state
    return '#4f46e5';
  }

  function getNodeEmissiveIntensity(node: typeof nodes[0], ratio: number) {
    if (node.type === 'core') return 1.5 + Math.sin(time * 3 + node.position[0]) * 0.5;
    
    const nodeThreshold = (node.id * 137 % 100) / 100;
    if (nodeThreshold < ratio) {
      // Pulse actively
      return 1.2 + Math.sin(time * 5 + node.id) * 0.8;
    }
    
    return 0.3; // Dimmer inactive state
  }

  // Connecting lines
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: '#ffffff', 
    transparent: true, 
    opacity: 0.1 
  });
  
  const points = [];
  for (let i = 0; i < nodes.length; i++) {
    if (Math.random() > 0.8) {
      const target = nodes[Math.floor(Math.random() * nodes.length)];
      points.push(new THREE.Vector3(...nodes[i].position));
      points.push(new THREE.Vector3(...target.position));
    }
  }
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 12]}
  fov={45}
/>

<T.AmbientLight intensity={0.2} color="#ffffff" />
<T.DirectionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
<T.PointLight position={[0, 0, 0]} intensity={2} color="#00ff94" distance={10} />

<Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
  <T.Group bind:ref={groupRef}>
    
    <!-- Nodes -->
    {#each nodes as node}
      <T.Mesh position={node.position} scale={[node.scale, node.scale, node.scale]}>
        <T.IcosahedronGeometry args={[1, 1]} />
        <T.MeshStandardMaterial 
          color={getNodeColor(node, activeRatio)} 
          emissive={getNodeColor(node, activeRatio)}
          emissiveIntensity={getNodeEmissiveIntensity(node, activeRatio)}
          metalness={0.8}
          roughness={0.2}
        />
      </T.Mesh>
    {/each}

    <!-- Connections -->
    <T.LineSegments geometry={lineGeometry} material={lineMaterial} />

    <!-- Center Data Ring -->
    <T.Mesh rotation={[Math.PI / 2, 0, 0]}>
      <T.TorusGeometry args={[4, 0.02, 16, 100]} />
      <T.MeshBasicMaterial color="#ffffff" transparent={true} opacity={0.2} />
    </T.Mesh>
    
    <T.Mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      <T.TorusGeometry args={[4, 0.01, 16, 100]} />
      <T.MeshBasicMaterial color="#00ff94" transparent={true} opacity={0.3} />
    </T.Mesh>

  </T.Group>
</Float>

<ContactShadows
  scale={15}
  blur={2}
  far={10}
  opacity={0.4}
  color="#0f172a"
  position={[0, -5, 0]}
/>