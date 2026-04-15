'use client'

import { useEffect, useState } from 'react'

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute rounded-full blur-3xl animate-pulse"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            backgroundColor: 'var(--color-accent)',
            opacity: el.opacity,
            animation: `float ${10 + el.id}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 10px) scale(1.05); }
        }
      `}</style>
    </div>
  )
}
