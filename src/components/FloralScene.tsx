import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Petal({ position, color, speed, scale }: { position: [number, number, number], color: string, speed: number, scale: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const start = position[1]
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    ref.current.position.y = start + Math.sin(t + position[0]) * .32
    ref.current.rotation.z = t * .22
    ref.current.rotation.x = Math.sin(t * .7) * .38
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[.16, 18, 12]} />
      <meshStandardMaterial color={color} transparent opacity={.34} roughness={.8} />
    </mesh>
  )
}

function Petals() {
  const petals = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    position: [((i * 37) % 100) / 14 - 3.6, ((i * 61) % 100) / 15 - 3.2, -1 - (i % 4) * .3] as [number, number, number],
    color: ['#c8c9ef', '#e8d8c5', '#a99dce'][i % 3],
    speed: .35 + (i % 5) * .07,
    scale: .45 + (i % 4) * .14,
  })), [])
  return <>{petals.map((p, i) => <Petal key={i} {...p} />)}</>
}

export default function FloralScene() {
  return (
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 6], fov: 48 }} gl={{ alpha: true, antialias: false }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#fff4dd" />
      <Petals />
    </Canvas>
  )
}
