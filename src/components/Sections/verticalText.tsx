'use client'

import { MutableRefObject, useEffect, useRef } from "react"

const accentText = ["Full", "Stack"]

export default function VerticalText() {
    let top : MutableRefObject<HTMLDivElement | null> = useRef(null)
    let bottom : MutableRefObject<HTMLDivElement | null> = useRef(null)

    useEffect(()=>{
        if (top.current === null || bottom.current === null) return;

        let topCharacter = top.current.querySelectorAll(".child");
        let bottomCharacter = bottom.current.querySelectorAll(".child");

        let lambda = (e : Element,i : number) => {
            let div = e as HTMLDivElement;
            setTimeout(()=>{
                div.style.transition = "margin-top 1s ease";
                div.style.marginTop = "0"
            },i*40)
        }
        topCharacter.forEach(lambda)
        bottomCharacter.forEach(lambda)

        let buffer = 100;

        let hoverHandler = (e : globalThis.MouseEvent) => {
            if (bottom.current === null) return;

            let current = bottom.current;

            let x = e.clientX - current.offsetLeft;
            let y = e.clientY - current.offsetTop + window.scrollY;

            if (x > current.clientWidth + buffer || x < -buffer) return;
            if ( y > current.clientHeight + buffer || y < -buffer) return;

            current.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgb(255, 144, 1), rgba(255, 179, 0, 0) 20%)`
        }
       
        document.addEventListener("mousemove",hoverHandler)

        return () => document.removeEventListener("mousemove",hoverHandler)
    }, [])

    function generateTextElements(classes : string = "") {
        return accentText.map((text,textIndex)=>{
            return (
                <div key={"text" + textIndex} aria-hidden className={textIndex > 0 ? " mt-32" : ""}>
                    {
                        Array.from(text).map((char,charIndex)=>(
                            <div key={text + "_" + charIndex} className={"child mt-4 " + classes}>{char}</div>
                        ))
                    }
                </div>
            )
        })
    }

    return (
    <div className="hidden md:grid">
        <div ref={top} className="flex text-8xl leading-[80%] gap-4 col-start-1 row-start-1 z-[1]">
            {generateTextElements("text-accent-red")}
        </div>
        <div ref={bottom} className="flex text-[104px] leading-[74%] gap-3 brightness-75 bg-clip-text col-start-1 row-start-1 translate-x-[-2px]">
            {generateTextElements("text-transparent")}
        </div>
    </div>
    )
}