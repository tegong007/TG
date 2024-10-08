import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent } from '../../../components/ui/dialog'
import './video-container.css'

interface FaceCompareModalProps {
  isOpen: boolean
  onClose: () => void
}

const FaceCompareModal: React.FC<FaceCompareModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)

  useEffect(() => {
    // 获取所有媒体设备
    navigator.mediaDevices.enumerateDevices().then((deviceInfos: MediaDeviceInfo[]) => {
      const videoDevices: MediaDeviceInfo[] = deviceInfos.filter(
        (device: MediaDeviceInfo): boolean => device.kind === 'videoinput',
      )
      setDevices(videoDevices)
      // 默认选择第一个摄像头
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId)
      }
    })
  }, [])

  useEffect(() => {
    let activeStream: MediaStream | null = null
    // 只有在摄像头ID选定且模态窗口开启时尝试加载摄像头
    const setupCamera = async () => {
      if (selectedDeviceId && isOpen) {
        try {
          const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedDeviceId } })
          activeStream = stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        }
        catch (error) {
          console.error('Error accessing camera:', error)
        }
      }
    }

    setupCamera()

    // 清理函数
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop())
        activeStream = null
      }
    }
  }, [selectedDeviceId, isOpen])

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedDeviceId(event.target.value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-3/5">
        <div className="flex flex-col items-center">
          {/* <h1>Camera in DS_IC_APP</h1> */}
          <div className="text-red-500 font-bold text-lg">暂未接入人脸识别数据库</div>
          <select onChange={handleDeviceChange} value={selectedDeviceId || ''}>
            {devices.map((device: MediaDeviceInfo) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
          <div className="items-center h-full justify-center">
            <div
              className="flex items-center justify-center bg-gray-300 h-full w-full video-container border-4 border-blue-500"
            >
              <video className="h-full w-full" ref={videoRef} autoPlay />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FaceCompareModal
