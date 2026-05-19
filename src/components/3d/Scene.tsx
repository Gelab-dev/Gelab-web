'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Partículas generadas fuera del componente — solo una vez
const PARTICLE_COUNT = 120
const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particlePositions[i * 3]     = (Math.random() - 0.5) * 12
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#B8FF47"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.1}
          transparent
          opacity={0.12}
        />
      </Sphere>
      <Sphere args={[1.38, 64, 64]}>
        <meshBasicMaterial
          color="#B8FF47"
          transparent
          opacity={0.04}
          wireframe
        />
      </Sphere>
    </Float>
  )
}

function FloatingRing({ position, rotation, scale }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.005
  })

  return (
    <mesh position={position} rotation={rotation} scale={scale} ref={meshRef}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshBasicMaterial color="#B8FF47" transparent opacity={0.15} />
    </mesh>
  )
}

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null)
  
    useFrame((state) => {
      if (!pointsRef.current) return
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    })
  
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
  
    return (
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          color="#B8FF47"
          size={0.025}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    )
  }

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      style={{ position: 'absolute', inset: 0, background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} intensity={1} color="#B8FF47" />
      <pointLight position={[-4, -2, -2]} intensity={0.3} color="#4488FF" />

      <Stars
        radius={30}
        depth={40}
        count={800}
        factor={1.5}
        saturation={0}
        fade
        speed={0.3}
      />

      <FloatingOrb />

      <FloatingRing position={[2.5, 0.5, -1]} rotation={[0.5, 0.3, 0]} scale={1.2} />
      <FloatingRing position={[-2.2, -0.8, -2]} rotation={[1.2, 0.8, 0.3]} scale={0.8} />
      <FloatingRing position={[0.5, 2, -1.5]} rotation={[0.2, 1.5, 0.5]} scale={0.6} />

      <ParticleField />
    </Canvas>
  )
}