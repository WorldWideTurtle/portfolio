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
                    if (textRef.current === null) return;
                    textRef.current.style.opacity = "1";
                    textRef.current.style.transform = `translateY(0)`;
                    textRef.current.style.scale = "1";

                    if (zodiacRef.current === null) return;
                    zodiacRef.current.style.opacity = ".7"

                    setTimeout(()=>{
                        if (zodiacRef.current === null) return;
                        zodiacRef.current.style.transitionDuration = "4s"
                        zodiacRef.current.style.strokeDashoffset = "0"
                    }, 700)
                }
              },
            {
                root: null, // Observe relative to the viewport
                threshold: 1, // Trigger when 10% of the element is visible
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
        <div ref={boundsRef} className="relative h-fit isolate flex flex-row items-center">
            <h1 id="about" className="sr-only translate-y-[-8rem]">About</h1>
            <Taurus ref={zodiacRef} className="brightness-150 transition-all ease-in duration-1000 blur-sm absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[800px] opacity-30" style={{
                strokeDasharray: "200 200",
                strokeDashoffset: "200"
            }}/>
            <div ref={textRef} className="max-w-text tracking-[0.075em] md:text-xl text-justify m-auto px-8 pb-4 z-10 scale-90 translate-y-10 opacity-0 ease-in transition-all duration-1000">
                <span>Sebastian Eckhard (HE/HIM) - </span>
                <span className="text-white-600 font-math">I love building experiences that impress, not only visually, but also on a technical level. When I'm not working on my own projects, I like to take pictures, read or play games.</span>
            </div>
        </div>
    )
}