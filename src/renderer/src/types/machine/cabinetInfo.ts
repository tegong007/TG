interface cabinetGrid {
  cellIndex: number
  isOpened: boolean
}

export interface cabinetInfoVo {
  cabinetNum: string
  cabinetType: string
  cabinetName: string
  ip: string
  mac: string
  cellCount: number
  cabinetGrids: cabinetGrid[]
}
