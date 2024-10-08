import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

interface NoLoginDialogProps {
  isOpen: boolean
  onClose: () => void
}

const NoLoginDialog: React.FC<NoLoginDialogProps> = ({ isOpen, onClose }) => {
  // 包装 onOpenChange 事件处理器
  const handleOpenChange = (open: boolean) => {
    // if (!open) {
    //   onClose()
    // }
    console.log('handleOpenChange', open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure logging?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div onClick={onClose}>close</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NoLoginDialog
