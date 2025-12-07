import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { getTheme } from '../utils/theme'
import './Background3D.css'

function Particles({ mousePosition, color }) {
  const ref = useRef()
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
      ref.current.position.x = mousePosition.x * 0.1
      ref.current.position.y = mousePosition.y * 0.1
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={color} size={0.005} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}

export default function Background3D({ mousePosition }) {
  const [color, setColor] = useState('#FF6B35')

  useEffect(() => {
    const updateColor = () => {
      const theme = getTheme()
      setColor(theme === 'dark' ? '#1B4332' : '#FF6B35')
    }
    updateColor()
    const interval = setInterval(updateColor, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="background-3d">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles mousePosition={mousePosition} color={color} />
      </Canvas>
    </div>
  )
}
