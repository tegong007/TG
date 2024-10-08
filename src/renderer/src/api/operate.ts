import axios from 'axios'
import type { OperatePost } from '../types/operate/OperatePost'
import type { OperateGetResult } from '../types/operate/OperateGetResult'

interface OperatePostParams {
  operateType: '1' | '2'
  recordId: string
  deviceId: string
  latticeId: string | null
}

async function operatePost(operatePostParams: OperatePostParams): Promise<OperatePost> {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/operate/request',
      data: {
        ...operatePostParams,
      },
    })
    return response.data
  }
  catch (error: any) {
    console.error(error)
    throw error
  }
}

async function operateGetResult(logId: string): Promise<OperateGetResult> {
  try {
    const response = await axios({
      method: 'get',
      url: `/api/operate/request/${logId}`,
    })
    return response.data
  }
  catch (error: any) {
    console.error(error)
    throw error
  }
}

export type {
  OperatePostParams,
}

export {
  operatePost,
  operateGetResult,
}
