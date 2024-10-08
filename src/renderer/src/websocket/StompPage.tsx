import React, { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'

const StompPage: React.FC = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null)
  const [cellStatus, setCellStatus] = useState<string>('')

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://192.168.88.168:8900/ws',
      debug(str) {
        console.log(`STOMP: ${str}`)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected')
        client.subscribe('/device/cell/open', (message) => {
          setCellStatus(message.body)
        })
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`)
        console.error(`Additional details: ${frame.body}`)
      },
    })

    client.activate()
    setStompClient(client)

    return () => {
      client.deactivate()
    }
  }, [])

  const handleOpenDoor = () => {
    if (stompClient) {
      stompClient.publish({
        destination: '/app/cell/open',
        body: JSON.stringify({
          cabinets: [
            {
              cabinetNum: '00',
              cells: [1, 2], // 格子号，序号从1开始
            },
            {
              cabinetNum: '01',
              cells: [3, 4],
            },
          ],
        }),
      })
      console.log('Open door command sent')
    }
  }

  return (
    <div>
      <h1>STOMP WebSocket Example</h1>
      <button onClick={handleOpenDoor}>Open Door</button>
      <div>
        <h2>Last Cell Status:</h2>
        <p>{cellStatus}</p>
      </div>
    </div>
  )
}

export default StompPage
