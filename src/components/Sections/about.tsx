'use client'

import { MutableRefObject, useEffect, useRef, useState } from "react"
import Taurus from "../taurus"

export default function About() {
    const [isVisible, setVisible] = useState(false)
    const boundsRef : MutableRefObject<HTMLDivElement | null> = useRef(null)
    const textRef : MutableRefObject<HTMLDivElement | null> = useRef(null)
    const zodiacRef : MutableRefObject<SVGSVGElement | null> = useRef(null)

    useEffect(()=>{
        const styteStyles = {
            opacity: [0.3, 1],
            strokeDashoffset: [80, 0],
            scale: [1, 1.05]
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                let isIntersecting = (entry.intersectionRatio > 0.7) ? 1 : 0;
                Object.entries(styteStyles).forEach(([property,values])=>{
                    if (zodiacRef.current === null) return;
                    //@ts-ignore
                    zodiacRef.current.style[property] = values[isIntersecting]
                })
                if (entry.intersectionRatio < 0.7) {
                    setVisible(false)
                } else {
                    setVisible(true)
                }
              },
            {
                root: null,
                threshold: [0,.7],
            }
        );
        
        if (boundsRef.current) {
            observer.observe(boundsRef.current);
        }

        

        return () => {
            if (boundsRef.current) {
                observer.unobserve(boundsRef.current);
            }
        }
    }, [])

    return (
        <div ref={boundsRef} className="relative h-fit isolate grid place-items-center px-4">
            <h1 id="about" className="sr-only translate-y-[-2rem] absolute top-0">About</h1>
            <Taurus ref={zodiacRef} shouldAnimate={isVisible} className="brightness-150 aspect-square transition-all duration-1000 row-start-1 col-start-1 w-full max-w-[600px] opacity-30" style={{
                strokeDasharray: "80 80",
                strokeDashoffset: "80"
            }}/>
            <div ref={textRef} className="max-w-text tracking-[0.075em] md:text-xl text-justify m-auto px-4 pb-4 -mt-8">
                <span>Sebastian Eckhard (HE/HIM) - </span>
                <span className="text-white-600 font-math">I love building experiences that impress, not only visually, but also on a technical level. When I'm not working on my own projects, I like to take pictures, read or play games.</span>
            </div>
        </div>
    )
}