import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Opaque inner core to block the background grid from showing through */}
      <Icosahedron args={[1.98, 5]}>
        <meshBasicMaterial color="#f8fafc" />
      </Icosahedron>

      {/* Inner holographic glass core */}
      <Icosahedron args={[2, 5]}>
        <meshPhysicalMaterial
          color="#e0f2fe"
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.2}
          transmission={0.9}
          thickness={0.5}
          flatShading={true}
        />
      </Icosahedron>

      {/* Outer wireframe - matching the low poly geometry */}
      <Icosahedron args={[2.01, 5]}>
        <meshBasicMaterial 
          color="#0ea5e9" 
          wireframe 
          transparent 
          opacity={0.5} 
        />
      </Icosahedron>

      {/* Another wireframe layer for depth */}
      <Icosahedron args={[2.015, 4]}>
        <meshBasicMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </Icosahedron>

      {/* Add some dots/nodes at vertices to make it look like a premium placeholder */}
      <points>
        <icosahedronGeometry args={[2.02, 5]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={useMemo(() => ({
            colorCenter: { value: new THREE.Color("#d946ef") }, // Vibrant fuchsia
            colorEdge: { value: new THREE.Color("#a855f7") },   // Softer purple for edges to reduce noise
            pointSize: { value: 1.5 } // Increased slightly for the lower poly count
          }), [])}
          vertexShader={`
            varying float vIntensity;
            uniform float pointSize;
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              
              // Calculate facing ratio
              vec3 vNormal = normalize(position);
              vec3 viewDir = normalize(-mvPosition.xyz);
              vec3 normalView = normalize(normalMatrix * vNormal);
              vIntensity = max(0.0, dot(normalView, viewDir));
              
              // Sharpen the falloff so the edge fades faster
              vIntensity = pow(vIntensity, 1.5); 
              
              gl_Position = projectionMatrix * mvPosition;
              
              // Size attenuation based on depth
              gl_PointSize = pointSize * (15.0 / -mvPosition.z);
            }
          `}
          fragmentShader={`
            uniform vec3 colorCenter;
            uniform vec3 colorEdge;
            varying float vIntensity;
            void main() {
              // Reverted to default square points (removed circular discard)
              
              // Mix colors based on facing ratio
              vec3 finalColor = mix(colorEdge, colorCenter, vIntensity);
              
              // Fade out opacity towards the edges, lowered max alpha to reduce visual noise
              float alpha = smoothstep(0.05, 0.5, vIntensity) * 0.5;
              
              gl_FragColor = vec4(finalColor, alpha);
            }
          `}
        />
      </points>
    </group>
  );
}

export function Globe() {
  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center">
      {/* CSS Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Base Glow */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(255, 60, 100, 0.8) 0%, rgba(220, 40, 90, 0.5) 40%, rgba(180, 20, 70, 0.15) 60%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Sonar Pulse 1 */}
        <div 
          className="absolute rounded-full animate-sonar-pulse"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, transparent 0%, rgba(255,140,105,0.02) 20%, rgba(255,140,105,0.08) 60%, rgba(255,79,129,0.2) 100%)',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 79, 129, 0.95)',
            '--start-border': '1.5px',
            '--end-border': '0.3px',
            animationDelay: '0s',
          } as React.CSSProperties}
        />
        {/* Sonar Pulse 2 */}
        <div 
          className="absolute rounded-full animate-sonar-pulse"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, transparent 0%, rgba(255,140,105,0.02) 20%, rgba(255,140,105,0.08) 60%, rgba(255,79,129,0.2) 100%)',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 79, 129, 0.95)',
            '--start-border': '1.5px',
            '--end-border': '0.3px',
            animationDelay: '2.5s',
          } as React.CSSProperties}
        />

        {/* Grid Highlight Layer */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
          style={{
            width: '2000px',
            height: '2000px',
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 9V15M9 12H15' stroke='black' stroke-width='0.75' /%3E%3C/svg%3E")`,
            maskImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 9V15M9 12H15' stroke='black' stroke-width='0.75' /%3E%3C/svg%3E")`,
            WebkitMaskSize: '56px 56px',
            maskSize: '56px 56px',
            WebkitMaskPosition: 'center center',
            maskPosition: 'center center'
          }}
        >
          {/* Pulse 1 Highlight */}
          <div 
            className="absolute rounded-full animate-sonar-pulse"
            style={{
              width: '600px',
              height: '600px',
              borderStyle: 'solid',
              borderColor: 'rgba(79, 70, 229, 1)', // Richer, deeper Indigo
              '--start-border': '3px',
              '--end-border': '1px',
              background: 'radial-gradient(circle, transparent 0%, rgba(219,39,119,0.05) 30%, rgba(219,39,119,0.3) 65%, rgba(192,38,211,0.85) 88%, rgba(79,70,229,1) 100%)',
              animationDelay: '0s',
            } as React.CSSProperties}
          />
          {/* Pulse 2 Highlight */}
          <div 
            className="absolute rounded-full animate-sonar-pulse"
            style={{
              width: '600px',
              height: '600px',
              borderStyle: 'solid',
              borderColor: 'rgba(79, 70, 229, 1)', // Richer, deeper Indigo
              '--start-border': '3px',
              '--end-border': '1px',
              background: 'radial-gradient(circle, transparent 0%, rgba(219,39,119,0.05) 30%, rgba(219,39,119,0.3) 65%, rgba(192,38,211,0.85) 88%, rgba(79,70,229,1) 100%)',
              animationDelay: '2.5s',
            } as React.CSSProperties}
          />
        </div>
      </div>

      <Canvas className="relative z-10" camera={{ position: [0, 0, 3.5], fov: 85 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#38bdf8" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#c084fc" />
        <GlobeMesh />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.2}
          maxDistance={8}
          enableDamping={true}
          dampingFactor={0.04} // Snappier than before, but still retains momentum
          rotateSpeed={1.2} // Increased for a more immediate, 1:1 feel with the mouse
          zoomSpeed={0.8}
          autoRotate={true}
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 3} // Restrict vertical rotation to prevent disorientation
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
