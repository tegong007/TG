import React, { useEffect, useState } from 'react'
import CountdownTimer from '../../components/CountdownTimer'
import CommonButton from '../../components/button/CommonButton'
import useWarehouseStore from '../../store/WarehouseStore'
import DataLoading from '../../components/DataLoading'
import { ScrollArea } from '../../components/ui/scroll-area'

const Verify: React.FC<{ onReload: () => void, items: ItemData[] }> = ({ onReload, items }) => {
  const { prevStep, nextStep } = useWarehouseStore()
  return (
    <div className="h-full relative">
      <CountdownTimer />
      <div className="h-4/5 flex flex-col items-center">
        <div className="m-5 text-blue-500 text-3xl font-bold">请核对物品是否一致</div>
        <div className="flex flex-col h-4/5 w-4/5 border-4 border-blue-500 bg-white">
          <div className="flex h-16 w-full border-b-4 border-blue-500 bg-gray-200 box-border text-blue-500 text-2xl font-bold">
            <div className="flex w-1/12 h-full border-r-4 border-blue-500 items-center justify-center ">
              序号
            </div>
            <div className="flex w-5/12 h-full border-r-4 border-blue-500 items-center justify-center ">
              文件名称
            </div>
            <div className="flex w-1/12 h-full border-r-4 border-blue-500 items-center justify-center ">
              数量
            </div>
            <div className="flex w-5/12 h-full items-center justify-center ">代保管品编号</div>
          </div>
          <ScrollArea className="flex-1 w-full ">
            <div>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex h-16 w-full border-blue-500 border-b-4 text-blue-500 text-2xl font-bold"
                >
                  <div className="flex w-1/12 h-full border-r-4 border-blue-500 items-center justify-center ">
                    {index}
                  </div>
                  <div className="flex w-5/12 h-full border-r-4 border-blue-500 items-center justify-center ">
                    {item.name}
                  </div>
                  <div className="flex w-1/12 h-full border-r-4 border-blue-500 items-center justify-center ">
                    {item.count}
                  </div>
                  <div className="flex w-5/12 h-full items-center justify-center text-wrap ">
                    {item.number}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex p-3 w-full items-center justify-center text-2xl text-gray-500 font-bold">
              已加载全部数据
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex h-1/5 items-center justify-center gap-12">
        <CommonButton type="outline" onClick={onReload}>
          重新盘点
        </CommonButton>
        <CommonButton type="outline" onClick={prevStep}>
          不一致
        </CommonButton>
        <CommonButton type="solid" onClick={nextStep}>
          一致
        </CommonButton>
      </div>
    </div>
  )
}

interface ItemData {
  id: string
  name: string
  count: number
  number: string
}

const ConfirmPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<ItemData[]>([])
  const fetchData = () => {
    setLoading(true)
    setTimeout(() => {
      // 模拟从接口获取数据
      const fetchedItems: ItemData[] = [
        { id: '05926352', name: '鞋子', count: 1, number: '123132223321321321231231' },
        { id: '05926353', name: '帽子', count: 2, number: '123132223321321321231232' },
        { id: '05926354', name: '衣服', count: 3, number: '123132223321321321231233' },
        { id: '05926355', name: '衣服', count: 3, number: '123132223321321321231233' },
        { id: '05926356', name: '衣服', count: 3, number: '123132223321321321231233' },
        { id: '05926357', name: '衣服', count: 3, number: '123132223321321321231233' },
        // 其他数据项
      ]
      setItems(fetchedItems)
      setLoading(false)
    }, 1000)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {loading ? <DataLoading msg="正在二次核验数据，请稍后..." /> : <Verify onReload={fetchData} items={items} />}
    </>
  )
}
export default ConfirmPage
