'use client'

import ChevronIcon from "@/icons/chevron-Right.svg"
import SmallProject from "../smallProject"
import { useRef, useState, MutableRefObject, useEffect, MouseEvent } from "react"
import Link from "next/link"
import projectsConfig from "@/config/projects.config"

export default function Projects() {
    let [state,setState] = useState({
        index:0,
        action:0
    })

    let allClasses = [
        "-translate-x-[100vw]",
        "translate-x-0",
        "translate-x-[100vw]"
    ]

    let projects : MutableRefObject<HTMLDivElement | null>[] = projectsConfig.projects.map(e=>useRef(null));

    function slideBy(x : number) {
        setState({
            index:getWrappedIndex(state.index + x),
            action:x
        })
    }

    function getWrappedIndex(x : number) {
        return (x + projects.length) % projects.length;
    }

    useEffect(()=>{
        for (let i = state.index - 1; i <= state.index + 1; i++) {
            const project = projects[getWrappedIndex(i)].current;
            if (project) {
                project.classList.remove.apply(project.classList,allClasses)
                project.classList.add(allClasses[1 + (i - state.index)])
                if (state.action === 0 || (i !== state.index && state.action !== state.index - i)) {
                    project.style.transitionDuration = "0ms"
                } else {
                    project.style.transitionDuration = "300ms"
                } 
            }
        }
    }, [state.index])

    return (
        <>
            <h1 id="projects" className="sr-only translate-y-[-8rem]">Projects</h1>
            <div className="h-full relative overflow-x-hidden max-w-[1400px] m-auto">
                <ChevronIcon role="button" onClick={() => slideBy(-1)} className="md:hidden absolute top-[50%] translate-y-[-50%] size-10 left-2 rotate-180 bg-primary-600 cursor-pointer rounded-full z-50 pl-0.5" />
                <ChevronIcon role="button" onClick={() => slideBy(1)} className="md:hidden absolute top-[50%] translate-y-[-50%] size-10 right-2 bg-primary-600 hover:bg-primary-400 cursor-pointer rounded-full z-50 pl-0.5" />
                <div className="h-full md:px-4 px-8 grid md:grid-cols-2 md:grid-rows-1 gap-4 relative group">
                    {projectsConfig.projects.map((e,i)=>(
                        <SmallProject
                            ref={projects[i]}
                            className={`transition-[transform_opacity] max-md:col-start-1 max-md:row-start-1 ${i > 0 ? "translate-x-[100vw]" : ""} md:!translate-x-0 group-hover:opacity-70 hover:!opacity-100`}
                            project={e}
                            key={i}
                        /> 
                    ))}
                </div>
            </div>
            <Link href={"/projects"} className="m-auto block w-fit mt-4 underline text-xl">View other projects</Link>
        </>
    )
}