'use client'

/* eslint-disable react/prop-types */
import { useState, useMemo, useRef, useCallback, useEffect, useLayoutEffect, Children, createRef } from 'react'
import type {TouchEvent, MouseEvent, WheelEvent, FocusEvent, KeyboardEvent, MutableRefObject, RefObject} from 'react'
import styles from './Carousel.module.css'
import { CarouselProps, SlideAnchor } from './CarouselTypes'

const getClientXOffset = (e : TouchEvent | MouseEvent) => {
  if ("touches" in e) {
    return e.touches[0].clientX
  }

  return e.clientX;
}

const calculateAnchors = (slideRefs : RefObject<HTMLElement>[] = [], gridGap : number, isInfinite : boolean) =>
  slideRefs.reduce((acc : Array<SlideAnchor>, ref : RefObject<HTMLElement>, i) => {
    if (ref?.current) {
      const width = ref.current.clientWidth - (!isInfinite && i === slideRefs.length - 1 ? 0 : gridGap)
      const start = i === 0 ? 0 : acc[i - 1].end + gridGap
      const end = start + width
      acc.push({ start, end, width, index: i })
    }
    return acc
  }, [])

const calcMinWidth = (slideAnchors : Array<SlideAnchor>, count : number) =>
  slideAnchors?.length && count && count > 0
    ? slideAnchors.reduce((acc, { start }, i) => {
        const groupWidth = slideAnchors[Math.min(i + count - 1, slideAnchors.length - 1)].end - start

        return groupWidth > acc ? groupWidth : acc
      }, 0)
    : 0

const ContainerCss = ({ displayCount, minDisplayCount, slideAnchors } : {
  displayCount: number,
  minDisplayCount: number,
  slideAnchors: Array<SlideAnchor>
}) => {
  const minWidth = calcMinWidth(slideAnchors, minDisplayCount)
  const width = calcMinWidth(slideAnchors, displayCount)

  return {
    minWidth: minWidth > 0 ? `${minWidth}px` : 'auto',
    width: width > 0 ? `${width}px` : '100%',
  }
}

export const Carousel = ({
  isInfinite = false,
  startIndex = 0,
  isScrollable = true,
  isDraggable = true,
  hasDragMomentum = true,
  dragMomentumSpeed = 25,
  dragMomentumDecay = 0.98,
  minDisplayCount = 0,
  displayCount = 0,
  gridGap = 10,
  scrollSpeed = 75,
  scrollCount = 1,
  shouldScrollByDisplayCount = true,
  indexesPerRow = 0,
  indexes: RenderIndexes,
  indexContainerProps = {},
  indexProps = {},
  style = {},
  slideContainerStyle = {},
  slideStyle = {},
  focusCallback = () => {},
  children,
} : CarouselProps) => {
  const [isHovering, setIsHovering] = useState(false)

  const momentumDebounceId : MutableRefObject<undefined | number> = useRef()

  const transitionDebounceId : MutableRefObject<undefined | number> = useRef()

  const currentDragSpeed = useRef(0)

  const resizeObserverRef : MutableRefObject<undefined | ResizeObserver> = useRef()

  const rawSlides = Children.toArray(children) || []

  const [clonesLength, setClonesLength] = useState(isInfinite ? rawSlides.length : 0)

  const slides = useMemo(
    () =>
      isInfinite && clonesLength
        ? [
            ...rawSlides.slice(rawSlides.length - clonesLength, rawSlides.length),
            ...rawSlides,
            ...rawSlides.slice(0, clonesLength),
          ]
        : rawSlides,
    [children, rawSlides.length, isInfinite, clonesLength],
  )

  const slideCount = slides.length

  const slidesRefs : RefObject<HTMLLIElement>[] = useMemo(
    () =>
      Array(slideCount)
        .fill(null)
        .map((_, i) => {
          return createRef()
          }),
    [slideCount],
  )

  const [slideAnchors, setSlideAnchors] : [Array<SlideAnchor> | null, Function] = useState([])

  const coreSlideAnchors = useMemo(
    () => (isInfinite ? slideAnchors.slice(clonesLength, slideAnchors.length - clonesLength) : slideAnchors),
    [slideAnchors, slideAnchors.length, isInfinite],
  )

  const minTabIndex = useMemo(
    () => coreSlideAnchors[0]?.index || clonesLength,
    [coreSlideAnchors, coreSlideAnchors.length],
  )
  const maxTabIndex = useMemo(
    () => coreSlideAnchors[coreSlideAnchors.length - 1]?.index || clonesLength + rawSlides.length - 1,
    [coreSlideAnchors, coreSlideAnchors.length],
  )

  const containerRef : MutableRefObject<null | HTMLDivElement> = useRef(null)

  const slideContainerRef : MutableRefObject<null | HTMLUListElement> = useRef(null)

  const slidesOuterContainerRef : MutableRefObject<null | HTMLDivElement> = useRef(null)
  
  const debug : MutableRefObject<null | HTMLDivElement> = useRef(null)

  const getTranslateOffset = useCallback(
    (newIndex : number, newSlideAnchors = slideAnchors) => {
      const start = newSlideAnchors?.[newIndex]?.start
      return start != null ? -1 * start : 0
    },

    [slideAnchors],
  )

  const [index, setIndexState] : [{left:number,right:number}, Function] = useState({ left: startIndex + clonesLength, right: startIndex + clonesLength })

  const activeIndexes = useMemo(() => {
    if (index?.left != null && index?.right != null) {
      return Array(index.right - index.left + 1)
        .fill(index.left)
        .map((_, i) => (index.left + i - clonesLength) % rawSlides.length)
    } else {
      return []
    }
  }, [index?.left, index?.right, clonesLength])

  const [maxIndex, setMaxIndex] = useState(slideCount - 1)

  const [isDragging, setIsDragging] = useState(false)

  const [isScrolling, setIsScrolling] = useState(true)

  const isMomentum = useRef(false)

  const translateOffset : MutableRefObject<number> = useRef(getTranslateOffset(index.left))

  const touchStartRef = useRef(0)

  const touchEndRef = useRef(0)

  const scrollDebounceId : MutableRefObject<undefined | NodeJS.Timeout> = useRef()

  const maxScrollX = 0

  const minScrollX = useMemo(() => {
    const start = slideAnchors?.[maxIndex]?.start

    return start != null ? -1 * start : 0
  }, [slideAnchors, slideCount, maxIndex])

  const getSelectedIndex = useCallback(
    (activeIndex : number) => ((activeIndex - clonesLength) % rawSlides.length),
    [rawSlides.length,clonesLength]
  )

  const getBoundIndex = useCallback(
    (newIndex : number, newMaxIndex = maxIndex) => Math.max(0, Math.min(newMaxIndex, newIndex)),
    [maxIndex]
  )

  const getScrollIndex = useCallback(
    (newTranslateOffset : number, newSlideAnchors = slideAnchors) => {
      const currentOffset = -1 * newTranslateOffset

      const newIndex = newSlideAnchors.reduce(
        (acc, { start, end, width }, i) => {
          acc.left = currentOffset >= start ? (currentOffset >= start + width / 2 ? i + 1 : i) : acc.left
          acc.right =
            containerRef.current != null
              ? currentOffset + containerRef.current.clientWidth >= end
                ? i
                : acc.right
              : slideCount - 1

          return acc
        },
        {
          left: 0,
          right: 0,
        },
      )

      return {
        left: getBoundIndex(newIndex.left),
        right: Math.max(Math.min(slideCount - 1, newIndex.right), newIndex.left),
      }
    },
    [slideCount, slideAnchors, getBoundIndex],
  )

  const setTranslateOffset = useCallback(
    ({ offset, index, newSlideAnchors = slideAnchors, newClonesLength = clonesLength } : {offset: number, index?: {left:number,right:number}, newSlideAnchors? : Array<SlideAnchor>, newClonesLength?: number}) => {
      requestAnimationFrame(() => {
        if (!slideContainerRef.current) {
          return
        }

        let boundOffset = offset
        let reflow = false;

        if (isInfinite && newClonesLength && newSlideAnchors.length) {
          const rightAnchor = newSlideAnchors[newSlideAnchors.length - newClonesLength - 1].end + gridGap
          const leftAnchor = newSlideAnchors[newClonesLength].start

          if (offset + rightAnchor < 0) {
            boundOffset = offset + rightAnchor - leftAnchor
            reflow = true;
          } else if (offset + leftAnchor > 0) {
            boundOffset = offset + leftAnchor - rightAnchor
            reflow = true;
          }
        }

        const newIndex = index == null ? getScrollIndex(boundOffset) : index

        if (transitionDebounceId.current) {
          cancelAnimationFrame(transitionDebounceId.current)
        }

        if (isScrolling || isDragging || reflow) {
          slideContainerRef.current.style.transitionDuration = '0ms'
        }

        slideContainerRef.current.style.transform = `translate(${boundOffset}px)`

        transitionDebounceId.current = requestAnimationFrame(() => {
          if (slideContainerRef.current === null) return;
          slideContainerRef.current.style.transitionDuration = '500ms'
        })

        translateOffset.current = boundOffset
        setIndexState(newIndex)
      })
    },
    [
      gridGap,
      isScrolling,
      isDragging,
      slideAnchors,
      slideAnchors?.length,
      clonesLength,
      getScrollIndex,
      setIndexState,
      getScrollIndex,
    ],
  )

  const calcClonesLength = (newSlideAnchors : Array<SlideAnchor>) => {
    if (!isInfinite) {
      return 0
    }

    const containerWidth = slideContainerRef.current?.clientWidth ?? 100

    const coreSlideAnchors = isInfinite
      ? newSlideAnchors.slice(clonesLength, newSlideAnchors.length - clonesLength)
      : newSlideAnchors

    const leftCount = coreSlideAnchors.reduce(
      (acc : {width: number, index: null | number}, { width }, i) => {
        acc.width = acc.width + width

        if (acc.index == null && acc.width > containerWidth) {
          acc.index = i + 1
        }

        return acc
      },
      {
        width: 0,
        index: null,
      },
    ).index

    const rightCount = coreSlideAnchors.reduceRight(
      (acc : {width: number, index: null | number}, { width }, i) => {
        acc.width = acc.width + width

        if (acc.index == null && acc.width > containerWidth) {
          acc.index = coreSlideAnchors.length - i
        }

        return acc
      },
      {
        width: 0,
        index: null,
      },
    ).index


    return Math.max(leftCount ?? 0, rightCount ?? 0, 1)
  }

  const onResize = () => {
    if (slideContainerRef.current === null) return;
    const newSlideAnchors = calculateAnchors(slidesRefs, gridGap, isInfinite)
    if (newSlideAnchors?.length) {
      const containerWidth = slideContainerRef.current.clientWidth

      const newClonesLength = calcClonesLength(newSlideAnchors)

      const lastEnd = newSlideAnchors[newSlideAnchors.length - 1].end

      const newMaxIndex = getBoundIndex(
        newSlideAnchors.findIndex(({ start }) => start + containerWidth >= lastEnd),
        newSlideAnchors.length - 1,
      )

      const newLeftIndex = getBoundIndex(index.left - clonesLength + newClonesLength, newMaxIndex)
      const newTranslateOffset = getTranslateOffset(newLeftIndex, newSlideAnchors)
      const newScrollIndex = getScrollIndex(newTranslateOffset, newSlideAnchors)

      setClonesLength(newClonesLength)
      setIndexState(newScrollIndex)
      setSlideAnchors(newSlideAnchors)
      setMaxIndex(newMaxIndex)
      setTranslateOffset({ offset: newTranslateOffset, index: newScrollIndex })
    }
  }

  useLayoutEffect(() => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect()
    }

    if (containerRef.current === null) return;

    resizeObserverRef.current = new ResizeObserver(() => onResize())
    resizeObserverRef.current.observe(containerRef.current)
    slidesRefs.forEach(({ current }) => (resizeObserverRef.current && current) && resizeObserverRef.current.observe(current))

    onResize()
  }, [slideCount, clonesLength, minDisplayCount, displayCount, gridGap, isInfinite])

  useEffect(() => {
    setIsScrolling(false)

    if (isInfinite) {
      onResize()
    }
  }, [])

  const onTouchStart = useCallback(
    (e : TouchEvent | MouseEvent) => {
      if (momentumDebounceId.current) {
        cancelAnimationFrame(momentumDebounceId.current)
      }

      if ("touches" in e && e.touches?.length > 1) {
        return
      } 

      if (!isDraggable || isScrolling) {
        return
      }


      isMomentum.current = false
      setIsDragging(true)

      const xOffset = getClientXOffset(e)
      touchStartRef.current = xOffset
      touchEndRef.current = xOffset
    },
    [isDraggable, isScrolling, setIsDragging],
  )

  const onTouchMove = useCallback(
    (e : TouchEvent | MouseEvent) => {
      e.stopPropagation()

      if (isMomentum.current || !isDraggable || !isDragging || isScrolling) {
        return
      }
      
      touchEndRef.current = getClientXOffset(e)
      const delta = touchStartRef.current - touchEndRef.current
      touchStartRef.current = touchEndRef.current

      currentDragSpeed.current = delta

      if (delta !== 0) {
          setTranslateOffset({ offset: translateOffset.current - delta })
      }
    },
    [isDraggable, isScrolling, isDragging, setTranslateOffset],
  )

  const onTouchEnd = useCallback(
    (e : TouchEvent | MouseEvent) => {

      if (momentumDebounceId.current) {
        cancelAnimationFrame(momentumDebounceId.current)
      }

      if ("touches" in e && e.touches.length > 1) {
        return
      } 

      if (!isDraggable || isScrolling) {
        return
      }

      if (hasDragMomentum) {
        isMomentum.current = true

        const momentumFunc = (speed : number) => {
          currentDragSpeed.current = speed
          momentumDebounceId.current = requestAnimationFrame(() => {
            const newTranslateOffset = translateOffset.current - speed

            if (Math.abs(speed) <= 1 || newTranslateOffset >= maxScrollX || newTranslateOffset <= minScrollX) {
              isMomentum.current = false
              setIsDragging(false)
              currentDragSpeed.current = 0
            } else {
              setTranslateOffset({ offset: newTranslateOffset })
              momentumFunc(speed * dragMomentumDecay)
            }
          })
        }

        momentumFunc(
          currentDragSpeed.current < 0
            ? Math.max(currentDragSpeed.current, -dragMomentumSpeed)
            : Math.min(currentDragSpeed.current, dragMomentumSpeed),
        )
      } else {
        setIsDragging(false)
      }
    },
    [
      hasDragMomentum,
      dragMomentumSpeed,
      dragMomentumDecay,
      minScrollX,
      maxScrollX,
      isDraggable,
      isScrolling,
      setIsDragging,
      setTranslateOffset,
    ],
  )

  const onScroll = useCallback(
    (e : WheelEvent) => {
      if (!isScrollable || isDragging) {
        return
      }

      //TODO handle mouse wheel scrolling correctly
      // const isWheel = e.deltaX === 0 && Math.abs(e.deltaY) > 0
      const scrollDelta = e.deltaX
      const scrollDirection = Math.sign(scrollDelta)

      if (
        (translateOffset.current >= maxScrollX && scrollDirection === -1) ||
        (translateOffset.current <= minScrollX && scrollDirection === 1)
      ) {
        setIsScrolling(false)
        return
      }

      if (!isScrolling) {
        setIsScrolling(true)
      }

      const newTranslateOffset =
        translateOffset.current - scrollDirection * Math.min(scrollSpeed, Math.abs(scrollDelta))

      const debounceFunc = () => {
        setIsScrolling(false)
      }

      if (scrollDebounceId.current) {
        clearTimeout(scrollDebounceId.current)
      }

      if (!isInfinite && newTranslateOffset >= maxScrollX) {
        setTranslateOffset({ offset: maxScrollX })
      } else if (!isInfinite && newTranslateOffset <= minScrollX) {
        setTranslateOffset({ offset: minScrollX })
      } else {
        setTranslateOffset({ offset: newTranslateOffset })

        scrollDebounceId.current = setTimeout(debounceFunc, 100)
      }
    },
    [
      isInfinite,
      isScrollable,
      scrollSpeed,
      isScrolling,
      minScrollX,
      translateOffset,
      isDragging,
      setIsScrolling,
      setTranslateOffset,
    ],
  )

  useEffect(() => {
    //remove clones from tab index
    if (slideContainerRef.current === null) return;

    Array.from(slideContainerRef.current.children).forEach((child, index) => {
      if (index < minTabIndex || index > maxTabIndex) {
        child.querySelectorAll('*').forEach((node) => {
          let n = node as HTMLElement;
          n.tabIndex = -1
        })
      }
    })
  }, [minTabIndex, maxTabIndex, slideContainerRef.current])

  const onSlideKeyDown = useCallback(
    (e : KeyboardEvent) => {
      if ((isDraggable && isDragging) || (isScrollable && isScrolling)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [isDraggable, isDragging, isScrollable, isScrolling],
  )

  const onMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [setIsHovering])

  const onMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [setIsHovering])

  useEffect(() => {
    if (!(isDraggable && isDragging) && !(isScrollable && isScrolling)) {
      if (momentumDebounceId.current) {
        cancelAnimationFrame(momentumDebounceId.current)
      }

      if (scrollDebounceId.current) {
        clearTimeout(scrollDebounceId.current)
      }

      const newTranslateOffset = getTranslateOffset(index.left)
      setTranslateOffset({ offset: newTranslateOffset })

      //focus correct child after scrolling
      if (translateOffset.current !== newTranslateOffset) {
        let child = slidesRefs[index.left]?.current?.firstChild;
            if (child) {
              let el = child as HTMLElement;
              focusCallback ? focusCallback(getSelectedIndex(index.left)) : el.focus();
            }
      }

      touchStartRef.current = 0
      touchEndRef.current = 0
    }
  }, [isDragging, isDraggable, isScrolling, isScrollable])

  const containerCss = useMemo(
    () =>
      ContainerCss({
        minDisplayCount,
        displayCount,
        slideAnchors,
      }),
    [slideAnchors, slideAnchors?.length, minDisplayCount, displayCount],
  )

  return (
    <div
      className={styles.container}
      style={{
        ...containerCss,
        ...style,
      }}
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.slidesAndArrowsContainer} onMouseLeave={onTouchEnd}>
        <div ref={slidesOuterContainerRef} className={styles.slidesOuterContainer}>
          <ul
            ref={slideContainerRef}
            className={styles.slidesContainer}
            style={{
              display: 'flex',
              flexDirection: 'row',
              listStyleType: 'none',
              margin: '0px',
              padding: '0px',
              ...slideContainerStyle,
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            onMouseDown={onTouchStart}
            onMouseMove={onTouchMove}
            onMouseUp={onTouchEnd}
            onWheel={onScroll}
          >
            {slides.map((slide, i) => (
              <li
                style={{
                  paddingRight: `${!isInfinite && i === slides.length - 1 ? 0 : gridGap}px`,
                  ...slideStyle,
                }}
                ref={slidesRefs[i]}
                key={i}
                onKeyDown={onSlideKeyDown}
              >
                {slide}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
