'use client'

import { MutableRefObject, useEffect, useRef } from "react"
import styles from "./header.module.css"
import Link from "next/link"

const links = [
    ["about"],
    ["projects"],
    ["skills"],
    ["contacts"]
]

export default function Header() {
    let navbar : MutableRefObject<HTMLHeadingElement | null> = useRef(null)

    useEffect(()=>{
        if (navbar.current === null) return;

        let buffer = 10;
        let maxOffset = 100;

        let getCurrentRatio = () => {
            let scrollOffset = Math.max(0,window.scrollY - buffer);
            return Math.min(1,scrollOffset / maxOffset);
        }

        let current = getCurrentRatio();
        let target = current;

        let updateScrollRatio = () => {
            let ratio = getCurrentRatio()
            if (ratio !== target) target = ratio;
        }

        let updateNavVisual = () => {
            if (navbar.current === null) return;

            navbar.current.style.setProperty("--stop",(current * 90).toString() + "%")
            navbar.current.style.setProperty("--tw-bg-opacity",(current * .7).toString());
        }

        let canceled = false;
        let tween = () => {
            if (canceled) return;

            current += (target - current) * 0.15;
            let isDirty = current !== target;
            if (isDirty && Math.abs(current - target) < 0.01) {
                current = target;
                isDirty = true;
            }

            isDirty && updateNavVisual();

            requestAnimationFrame(tween)
        }

        updateScrollRatio();
        tween();

        document.addEventListener("scroll",updateScrollRatio)

        return () => {
            document.removeEventListener("scroll",updateScrollRatio);
            canceled = true;
        }
    }, [])

    return (
        <header ref={navbar} className={"w-full bg-primary bg-opacity-0 flex justify-between py-1 md:py-2 text-xl md:text-2xl lg:text-3xl fixed z-[9999] after:w-full after:h-px after:absolute after:bottom-0 backdrop-blur-sm " + styles.base}>
            <h1 className="pl-6">WorldWideTurtle</h1>
            <nav className="hidden md:inline pr-6">
                <ul className="flex gap-6">
                    {links.map(e=>(
                        <li key={e[0]}><Link href={`#${e[0]}`}>{e[0]}</Link></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}