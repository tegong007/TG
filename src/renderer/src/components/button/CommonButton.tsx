import React from 'react'
import './CommonButton.css'

interface CommonButtonProps {
  type: 'solid' | 'outline'
  onClick?: () => void
  children: React.ReactNode
  icon?: string // icon 属性是一个可选的字符串，表示 SVG 的路径
}

const CommonButton: React.FC<CommonButtonProps> = ({ type, onClick, children, icon }) => {
  const baseStyle
    = 'flex items-center justify-center py-4 px-10 rounded font-bold text-2xl box-border min-w-60'

  const outlineStyle = 'text-blue-500 text active:bg-blue-300 button-outline'
  const solidStyle = 'py-5 text-white hover:bg-gray-500 active:text-white button-solid'

  const buttonStyle = type === 'solid' ? solidStyle : outlineStyle

  return (
    <button onClick={onClick} className={`${baseStyle} ${buttonStyle}`}>
      {icon && (
        <div className="w-8 h-8 mr-2">
          <img src={icon} alt="icon" />
        </div>
      )}
      {children}
    </button>
  )
}

export default CommonButton
