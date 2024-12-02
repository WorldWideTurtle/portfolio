'use client'

import { MutableRefObject, useEffect, useRef } from "react"
import styles from "./header.module.css"
import Link from "next/link"
import headerConfig from "@/config/header.config"

export default function Header() {
    let navbar : MutableRefObject<HTMLHeadingElement | null> = useRef(null)

    useEffect(()=>{
        if (navbar.current === null) return;

        let buffer = headerConfig.clearance;
        let maxOffset = headerConfig.pixelsToMax;

        let getCurrentRatio = () => {
            let scrollOffset = Math.max(0, window.scrollY - buffer);
            return Math.min(1, scrollOffset / maxOffset);
        }

        let current = getCurrentRatio();
        let start = getCurrentRatio();
        let target = start;
        let time = 0;
        let duration = headerConfig.transitionDuration;

        let updateScrollRatio = () => {
            let ratio = getCurrentRatio()
            if (ratio !== target) {
                start = current;
                target = ratio;
                time = 0;
            };
        }

        let timingFunction = headerConfig.timingFunction;

        let updateNavVisual = () => {
            if (navbar.current === null) return;

            navbar.current.style.setProperty("--stop",(current * 90).toString() + "%")
            navbar.current.style.setProperty("--tw-bg-opacity",(current * .7).toString());
        }

        let canceled = false;
        let startTime = performance.now();
        let tween = () => {
            if (canceled) return;

            let dt = performance.now() - startTime;
            startTime = performance.now();
            time = Math.min(time + dt, duration);
            current = start + (target - start) * timingFunction(time / duration);
            let isDirty = current !== target;
            if (isDirty && Math.abs(current - target) < 0.01) {
                current = target;
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
    }, [])

    return (
        <header ref={navbar} className={"w-full bg-primary-100 bg-opacity-0 flex justify-between py-1 md:py-2 text-lg md:text-xl lg:text-2xl fixed z-[9999] after:w-full after:h-px after:absolute after:bottom-0 backdrop-blur-sm " + styles.base}>
            <h1 className="pl-3 md:pl-6"><a href="/">{headerConfig.title}</a></h1>
            <nav className="hidden md:inline md:pr-6 pr-3">
                <ul className="flex gap-6 group">
                    {headerConfig.links.map(e=>(
                        <li className="hover:!text-white-900 group-hover:text-white-300 transition-[color]" key={e.name}><Link href={e.href}>{e.name}</Link></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}