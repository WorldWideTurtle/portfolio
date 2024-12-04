'use client'

import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import styles from "./header.module.css"
import Link from "next/link"
import headerConfig from "@/config/header.config"
import BambooIcon from "@/icons/bamboo.svg"

export default function Header() {
    const [isNavOpen,setNavOpen] = useState(false)
    const navbar : MutableRefObject<HTMLHeadingElement | null> = useRef(null)
    const navButton : MutableRefObject<HTMLButtonElement | null> = useRef(null)

    useEffect(()=>{
        if (navButton.current === null) return;
        
        navButton.current.classList.remove.apply(navButton.current.classList,["open","closed"])
        navButton.current.classList.add(isNavOpen ? "open" : "closed")
    }, [isNavOpen])

    useEffect(()=>{
        if (navbar.current === null) return;

        let buffer = headerConfig.clearance;
        let maxOffset = headerConfig.pixelsToMax;

        let getCurrentRatio = () => {
            let scrollOffset = Math.max(0, window.scrollY - buffer);
            return Math.min(1, scrollOffset / maxOffset);
        }

        let startValue = getCurrentRatio();
        let targetValue = startValue;

        let currentValue = startValue;
        let timeOfAnimation = 0;
        let duration = headerConfig.transitionDuration;

        let updateScrollRatio = () => {
            let ratio = getCurrentRatio()
            if (ratio !== targetValue) {
                startValue = currentValue;
                targetValue = ratio;
                timeOfAnimation = 0;
            };
        }

        let timingFunction = headerConfig.timingFunction;

        let updateNavVisual = () => {
            if (navbar.current === null) return;

            let final = isNavOpen ? 1 : currentValue;
            navbar.current.style.setProperty("--stop",(final * 90).toString() + "%")
            navbar.current.style.setProperty("--tw-bg-opacity",(final * (isNavOpen ? .9 : .7)).toString());
        }

        let canceled = false;
        let timeOfLastTween = performance.now();
        let tween = () => {
            if (canceled) return;

            let deltaTime = performance.now() - timeOfLastTween;
            timeOfLastTween = performance.now();
            timeOfAnimation = Math.min(timeOfAnimation + deltaTime, duration);
            currentValue = startValue + (targetValue - startValue) * timingFunction(timeOfAnimation / duration);
            let isDirty = currentValue !== targetValue;
            if (isDirty && Math.abs(currentValue - targetValue) < 0.01) {
                currentValue = targetValue;
                isDirty = true;
            }

            isDirty && updateNavVisual();

            requestAnimationFrame(tween)
        }

        updateScrollRatio();
        updateNavVisual()
        tween();

        document.addEventListener("scroll",updateScrollRatio)

        return () => {
            document.removeEventListener("scroll",updateScrollRatio);
            canceled = true;
        }
    }, [isNavOpen])


    return (
        <header role="banner" ref={navbar} className={"w-full bg-primary-100 bg-opacity-0 py-2 text-xl lg:text-2xl fixed z-[9999] after:w-full after:h-px after:absolute after:bottom-0 backdrop-blur-sm " + styles.base}>
            <div className="md:flex md:justify-between md:items-center relative mx-3 md:mx-6">
                <h1><a href="/">{headerConfig.title}</a></h1>
                <nav role="navigation">
                    <ul aria-label="Page navigation" className={"h-auto flex max-md:flex-col md:gap-6 gap-1 max-md:pl-2 transition-all overflow-hidden " + (isNavOpen ? "max-h-[99rem] max-md:pt-4" : "max-md:max-h-0 pt-0")}>
                        {headerConfig.links.map(e=>(
                            <li onClick={()=>setNavOpen(false)} className="max-md:text-lg" key={e.name}><Link href={e.href}>{e.name}</Link></li>
                        ))}
                    </ul>
                </nav>
                <button onClick={()=>setNavOpen(!isNavOpen)} ref={navButton} className="md:hidden absolute right-0 top-0 size-6 flex flex-col justify-items-center justify-between aspect-square py-1" aria-label="Reveal navigation menu">
                    <BambooIcon className={"transition-all ease-out " + (isNavOpen ? "fill-accent-jade rotate-45 translate-y-[180%]" : "fill-white-900")}/>
                    <BambooIcon className={"transition-all ease-out " + (isNavOpen ? "hidden" : "fill-white-900")}/>
                    <BambooIcon className={"transition-all ease-out " + (isNavOpen ? "fill-accent-jade -rotate-45 -translate-y-[180%]" : "fill-white-900")}/>
                </button>
            </div>
        </header>
    )
}