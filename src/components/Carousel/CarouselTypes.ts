import type {FunctionComponent, CSSProperties, ReactNode} from 'react'
export interface CarouselProps {
  isInfinite?: boolean
  startIndex?: number
  isScrollable?: boolean
  isDraggable?: boolean
  hasDragMomentum?: boolean
  dragMomentumSpeed?: number
  dragMomentumDecay?: number
  minDisplayCount?: number
  displayCount?: number
  gridGap?: number
  scrollSpeed?: number
  indexesPerRow?: number
  indexes?: FunctionComponent<any>
  indexContainerProps?: Record<string, unknown>
  indexProps?: Record<string, unknown>
  shouldScrollByDisplayCount?: boolean
  scrollCount?: number
  style?: CSSProperties
  focusCallback?: Function
  slideContainerStyle?: CSSProperties
  slideStyle?: CSSProperties
  children?: ReactNode
}

export interface RenderArrowsProps {
  startIndex: number
  endIndex: number
  activeIndexes: Array<number>
  isLeft: boolean
  isRight: boolean
  isHidden: boolean
  scrollBy: (scrollBy: number) => void
  arrowProps: Record<string, unknown>
  scrollCount: number
}
export interface RenderIndexesProps {
  activeIndexes: Array<number>
  startIndex: number
  endIndex: number
  indexesPerRow: number
  slideAnchors: Array<SlideAnchor>
  scrollBy: (scrollCount: number) => void,
  indexContainerProps: any,
  indexProps: any
}

export interface SlideAnchor {
  start:number,
  end:number,
  width:number,
  index:number
}

export declare const Carousel: FunctionComponent<CarouselProps>
