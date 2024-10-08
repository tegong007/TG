import React from 'react'
import { Dialog, DialogContent } from '../../../components/ui/dialog'
import DataLoading from '../../../components/DataLoading'

interface FingerprintModalProps {
  isOpen: boolean
  onClose: () => void
}

const FingerprintModal: React.FC<FingerprintModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DataLoading msg="正在识别指纹..." showCountdown={false} />
      </DialogContent>
    </Dialog>
  )
}

export default FingerprintModal
