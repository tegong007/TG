import React from 'react'
import { Steps } from 'antd'

const OperationProgress: React.FC = () => {
  return (
    <div className="flex pt-5 px-8 items-center w-full ">
      <div className="flex w-24 font-bold text-blue-600 items-center">取出归还 </div>
      <Steps
        size="default"
        current={1}
        items={[
          {
            title: 'Step 1',
          },
          {
            title: 'Step 2',
          },
          {
            title: 'Finish',
          },
        ]}
      />
    </div>
  )
}

export default OperationProgress
