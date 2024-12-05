'use client'

import { MutableRefObject, useEffect, useRef } from "react"
import TaurusIcon from "@/icons/Taurus.svg"
import Taurus from "../taurus"

export default function About() {
    const boundsRef : MutableRefObject<HTMLDivElement | null> = useRef(null)
    const textRef : MutableRefObject<HTMLDivElement | null> = useRef(null)
    const zodiacRef : MutableRefObject<SVGSVGElement | null> = useRef(null)

    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (zodiacRef.current === null) return;
                    zodiacRef.current.style.opacity = ".8"

                    setTimeout(()=>{
                        if (zodiacRef.current === null) return;
                        zodiacRef.current.style.transitionDuration = "4s"
                        zodiacRef.current.style.strokeDashoffset = "0"
                    }, 300)

                    setTimeout(()=>{
                        if (textRef.current === null) return;
                        textRef.current.style.opacity = "1";
                        textRef.current.style.transform = `translateY(0)`;
                        textRef.current.style.scale = "1";
                    }, 1400)
                }
              },
            {
                root: null,
                threshold: 1,
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
        <div ref={boundsRef} className="relative h-fit isolate grid place-items-center">
            <h1 id="about" className="sr-only translate-y-[-2rem] absolute top-0">About</h1>
            <div className="h-[75%] aspect-square rounded-full row-start-1 col-start-1" style={{
                background: "radial-gradient(rgba(221, 0, 0, 0) 60%, rgb(255, 12, 12)), radial-gradient(rgba(26, 41, 121, 0.23), rgba(117, 21, 75, 0.67)), radial-gradient(black, rgb(0, 207, 255))"
            }}></div>
            <Taurus ref={zodiacRef} className="brightness-150 aspect-square transition-all duration-1000 row-start-1 col-start-1 w-full max-w-[600px] opacity-30" style={{
                strokeDasharray: "80 80",
                strokeDashoffset: "80"
            }}/>
            <div ref={textRef} className="max-w-text tracking-[0.075em] md:text-xl text-justify m-auto px-8 pb-4 scale-90 translate-y-10 opacity-0 ease-in transition-[opacity_transform_scale] duration-1000">
                <span>Sebastian Eckhard (HE/HIM) - </span>
                <span className="text-white-600 font-math">I love building experiences that impress, not only visually, but also on a technical level. When I'm not working on my own projects, I like to take pictures, read or play games.</span>
            </div>
        </div>
    )
}