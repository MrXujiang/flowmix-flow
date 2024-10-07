import type { FC, ReactNode } from 'react'
import { memo } from 'react'

export interface CanvasBoxProps {
  accept: string[]
  width: number | string
  height: number | string
  children?: ReactNode
}
// 画布容器
const CanvasBox: FC<CanvasBoxProps> = memo(function CanvasBox({
  accept,
  width,
  height,
  children
}) {
  // 画布内的自定义业务逻辑
  return (
    <div data-testid="canvasBox" style={{width, height}}>
      { children }
    </div>
  )
})

export default CanvasBox
