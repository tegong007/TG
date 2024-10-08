import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

interface TimeoutDialogProps {
  isOpen: boolean
  onClose: () => void
}

const TimeoutDialog: React.FC<TimeoutDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen)
    return null
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex items-center justify-center m-6 text-blue-500 text-2xl font-bold">
          操作超时，即将返回首页
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TimeoutDialog
