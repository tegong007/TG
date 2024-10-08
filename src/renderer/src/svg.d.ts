// src/svg.d.ts
declare module '*.svg?react' {
  import type * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
