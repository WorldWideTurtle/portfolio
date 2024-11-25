'use client'

import { MutableRefObject, useEffect, useRef } from "react"
import styles from "./header.module.css"

const links = [
    ["about"],
    ["projects"],
    ["skills"],
    ["contacts"]
]

export default function Header() {
    let navbar : MutableRefObject<HTMLHeadingElement | null> = useRef(null)
    
    useEffect(()=>{
        let scrollHandler = () => {
            if (navbar.current === null) return;

            let buffer = 10;
            let scrollOffset = Math.max(0,window.scrollY - buffer);
            let maxOffset = 75;
            let ratio = Math.min(1,scrollOffset / maxOffset)

            navbar.current.style.setProperty("--stop",(ratio * 95).toString() + "%")
            navbar.current.style.setProperty("--tw-bg-opacity",(ratio * .8).toString());
        }

        document.addEventListener("scroll",scrollHandler)

        return () => document.removeEventListener("scroll",scrollHandler)
    }, [])

    return (
        <header ref={navbar} className={"w-full bg-primary bg-opacity-0 flex justify-between py-1 md:py-2 text-xl md:text-2xl lg:text-3xl fixed z-[9999] after:w-full after:h-[2px] after:absolute after:bottom-[-1px] " + styles.base}>
            <h1 className="pl-6">WorldWideTurtle</h1>
            <nav className="hidden md:inline pr-6">
                <ul className="flex gap-6">
                    {links.map(e=>(
                        <li key={e[0]}><a href={`#${e[0]}`}>{e[0]}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}