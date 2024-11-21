'use client'

import { MutableRefObject, useEffect, useRef } from "react"

const accentText = ["Full", "Stack"]

export default function VerticalText() {
    let top : MutableRefObject<HTMLDivElement | null> = useRef(null)
    let bottom : MutableRefObject<HTMLDivElement | null> = useRef(null)

    useEffect(()=>{
        if (top.current && bottom.current) {
            let topCharacter = top.current.querySelectorAll(".child");
            let bottomCharacter = bottom.current.querySelectorAll(".child");
            topCharacter.forEach((e,i)=>{
                let div = e as HTMLDivElement;
                setTimeout(()=>{
                    div.style.transition = "margin-top 1s ease";
                    div.style.marginTop = "0"
                },i*40)
            })
            bottomCharacter.forEach((e,i)=>{
                let div = e as HTMLDivElement;
                setTimeout(()=>{
                    div.style.transition = "margin-top 1s ease";
                    div.style.marginTop = "0"
                },i*40)
            })
        }
    }, [])

    function generateTextElements() {
        return accentText.map((e,i)=>{
            return (
                <div className={i > 0 ? " mt-40" : ""}>
                    {
                        Array.from(e).map(char=>(
                            <div className="child mt-4 text-transparent">{char}</div>
                        ))
                    }
                </div>
            )
        })
    }

    return (
    <div className="grid">
        <div ref={top} className="md:flex text-8xl leading-[80%] gap-4 hidden bg-accent-red bg-clip-text col-start-1 row-start-1 z-[1]">
            {generateTextElements()}
        </div>
        <div ref={bottom} className="md:flex text-[104px] leading-[74%] gap-3 hidden brightness-75 bg-accent-red bg-clip-text col-start-1 row-start-1 translate-x-[-2px]">
            {generateTextElements()}
        </div>
    </div>
    )
}