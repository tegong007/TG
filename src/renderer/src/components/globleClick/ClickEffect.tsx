import { useEffect, useState } from 'react'
import './ClickEffect.css'
import { useMouseClickEffect } from '../../store/MouseClickEffectState' // 假设样式文件定义了动画和基本样式

function ClickEffect(): JSX.Element | null {
  const [effects, setEffects] = useState<Array<{ id: number, x: number, y: number }>>([])
  let nextId = 0 // 这个 ID 用于跟踪每个特效，以便能够独立地移除它们
  const enableEffect = useMouseClickEffect(state => state.enableEffect) // 获取 enableEffect 状态

  useEffect(() => {
    if (!enableEffect) {
      return
    }
    const showEffect = (e): void => {
      const newEffect = { id: nextId++, x: e.pageX, y: e.pageY }
      setEffects(prevEffects => [...prevEffects, newEffect])
      setTimeout(() => {
        setEffects(prevEffects => prevEffects.filter(effect => effect.id !== newEffect.id))
      }, 500) // 效果持续时间，例如500毫秒后消失
    }

    window.addEventListener('click', showEffect)
    return () => {
      window.removeEventListener('click', showEffect)
    }
  }, [enableEffect, nextId])

  return (
    <>
      {effects.map(effect => (
        <div
          key={effect.id}
          className="click-effect"
          style={{
            left: `${effect.x}px`,
            top: `${effect.y}px`,
          }}
        />
      ))}
    </>
  )
}

export default ClickEffect
