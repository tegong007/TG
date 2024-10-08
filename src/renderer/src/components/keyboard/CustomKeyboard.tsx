// CustomKeyboard.tsx
import React, { useEffect, useState } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface CustomKeyboardProps {
  input: string
  setInput: (input: string) => void
  onClose: () => void
  layout?: any
}

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ input, setInput, onClose, layout }) => {
  const [currentInput, setCurrentInput] = useState(input)
  const [layoutName, setLayoutName] = useState('default')
  useEffect(() => {
    setCurrentInput(input)
  }, [input])

  const handleKeyPress = (button: string) => {
    if (button === '{enter}') {
      onClose()
      return
    }

    const handleShift = () => {
      setLayoutName(layoutName === 'default' ? 'shift' : 'default')
    }

    // Handle other special keys or conditions if necessary
    let newInput = currentInput
    if (button === '{bksp}') {
      newInput = currentInput.slice(0, -1) // Remove the last character
    }
    else if (button === '{shift}' || button === '{lock}') {
      handleShift()
    }
    else if (button.length === 1) {
      newInput = currentInput + button // Append the character pressed
    }

    setCurrentInput(newInput)
    setInput(newInput) // Update external state
  }

  return (
    <Keyboard
      layoutName={layoutName}
      layout={layout}
      initialInput={currentInput}
      onKeyPress={handleKeyPress}
    />
  )
}

export default CustomKeyboard
