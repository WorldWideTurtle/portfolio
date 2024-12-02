'use client'

import { Carousel } from "./Carousel/Carousel"

export default function ProjectCarousel() {
    let focal = (i : number) => {
        console.log(i);
    }
    return (
        <Carousel
                isInfinite={true}
                displayCount={3}
                slideStyle={{height: "5rem"}}
                startIndex={1}
                focusCallback={focal}
            >
                {(new Array(5)).fill(0).map((e,i)=>(
                    <div 
                        key={i}
                        className={`rounded-xl aspect-video h-full bg-cover bg-[url('/solver-small.webp')] ${i === 0 ? "outline outline-1 outline-accent-red" : ""}`}
                        draggable={false}
                    />
                ))}
        </Carousel>
    )
}