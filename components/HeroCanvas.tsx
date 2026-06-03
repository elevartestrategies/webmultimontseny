'use client'

import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let animationId: number
    let renderer: any, scene: any, camera: any
    let particleMesh: any, phases: Float32Array
    let mouseX = 0, mouseY = 0

    const init = async () => {
      const THREE = await import('three')

      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < 768

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mountRef.current!.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 5

      // Particles (120)
      const count = isMobile ? 60 : 120
      const pos = new Float32Array(count * 3)
      phases = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 14
        pos[i * 3 + 1] = (Math.random() - 0.5) * 9
        pos[i * 3 + 2] = (Math.random() - 0.5) * 7
        phases[i] = Math.random() * Math.PI * 2
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      particleMesh = new THREE.Points(geo, new THREE.PointsMaterial({
        color: 0xe8a020,
        size: 0.025,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      }))
      scene.add(particleMesh)

      // Static wireframe boxes — architectural sketches
      const boxConfigs = [
        { size: [2.4, 2.4, 2.4] as [number,number,number], pos: [-5, 1.5, -5] as [number,number,number] },
        { size: [1.2, 3.5, 1.2] as [number,number,number], pos: [5,  -1,  -6] as [number,number,number] },
        { size: [3, 0.8, 3]     as [number,number,number], pos: [1,  3.5, -7] as [number,number,number] },
        { size: [1, 1, 1]       as [number,number,number], pos: [-2.5, -2.5, -2] as [number,number,number] },
      ]
      const wireMat = new THREE.LineBasicMaterial({ color: 0xe8a020, transparent: true, opacity: 0.12 })
      boxConfigs.forEach(({ size, pos: p }) => {
        const mesh = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(...size)), wireMat)
        mesh.position.set(...p)
        scene.add(mesh)
      })

      // Subtle horizontal grid plane
      const gridHelper = new THREE.GridHelper(30, 20, 0xe8a020, 0xe8a020)
      ;(gridHelper.material as any).opacity = 0.04
      ;(gridHelper.material as any).transparent = true
      gridHelper.position.y = -3
      scene.add(gridHelper)

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouseMove)

      const onResize = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      let t = 0
      const animate = () => {
        animationId = requestAnimationFrame(animate)
        t += 0.007

        const positions = particleMesh.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < count; i++) {
          positions[i * 3 + 1] += Math.sin(t + phases[i]) * 0.0015
        }
        particleMesh.geometry.attributes.position.needsUpdate = true

        camera.position.x += (mouseX * 0.25 - camera.position.x) * 0.025
        camera.position.y += (-mouseY * 0.18 - camera.position.y) * 0.025
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
      }
      animate()
      ;(mountRef.current as any)._cleanup = () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
      }
    }

    init()

    return () => {
      cancelAnimationFrame(animationId)
      ;(mountRef.current as any)?._cleanup?.()
      if (renderer) {
        renderer.dispose()
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
