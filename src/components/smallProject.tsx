import Link from "next/link"
import GitHubIcon from "@/icons/github.svg"
import PlayIcon from "@/icons/play.svg"
import { images } from "@/config/image.config"
import classNames from "classnames"
import { forwardRef } from "react"
import { Project } from "@/config/projects.config"

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.ts';

const fullConfig = resolveConfig(tailwindConfig)


interface SmallProjectProps {
    project: Project
    className?: string
}

let cardBG = fullConfig.theme.colors.primary[200]
let accentRed = fullConfig.theme.colors["accent-red"] + "70"

const SmallProject = forwardRef<HTMLDivElement, SmallProjectProps>((props, ref) => {
    const project = props.project;
    return (
        // Background based on https://gist.github.com/stereokai/36dc0095b9d24ce93b045e2ddc60d7a0
        <div ref={ref} className={classNames("grid relative border-solid border-2 border-transparent h-full grid-rows-[auto_1fr_auto] rounded-2xl isolate overflow-hidden",props.className)} style={{
            background: `linear-gradient(${cardBG}, ${cardBG}) 0% 0% / auto content-box content-box, conic-gradient(from .375turn, transparent, ${accentRed},transparent, ${accentRed}, transparent) 0% 0% / auto border-box border-box`
        }}>
            <img 
                src={project.image.src}
                alt={project.image.alt}
                className="aspect-video p-2 pb-0"
                loading="lazy"
            />
            <div className="font-math px-4 md:text-lg">
                <h3 className="text-center text-3xl sm:text-4xl lg:text-5xl font-edo [--offset:1px] md:[--offset:2px] translate-y-[-50%]" style={{
                    textShadow: "0px var(--offset) 0px " + fullConfig.theme.colors["accent-red"]
                }}>{project.name}</h3>
                <p className="text-justify text-white-700 mt-4" dangerouslySetInnerHTML={{__html:project.text.short}}></p>
                <ul aria-label={`Key points about ${project.name}`} className="mt-2 flex flex-col gap-1 list-disc">
                    {project.text.keyPoints.map((e,i)=>(
                        <li key={i} className="ml-4 pl-2 text-white-700">{e}</li>
                    ))}
                </ul>
                <div className="mt-4"></div>
                <Link href={"/projects/" + project.links.project} aria-label={`Learn more about ${project.name}`} className="text-accent-jade underline">Learn more</Link>
            </div>
            <nav className="flex h-10 flex-row-reverse mb-4 mr-2">
                {project.links.demo ? <Link role='button' aria-label='Live preview' href={project.links.demo}><PlayIcon className="stroke-accent-jade h-full"/></Link> : ""}
                <Link role='button' aria-label='Github repository' href={project.links.github}><GitHubIcon className="stroke-accent-jade h-full"/></Link>
            </nav>
            <img 
                src={images.GradientBG}
                alt=""
                className="absolute left-0 bottom-0 w-full -scale-100 -z-10 opacity-30 max-w-[40vmax]"
                aria-hidden
                draggable={false}
            />
            <img 
                src={images.GradientBG}
                alt=""
                className="absolute top-0 right-0 w-full -z-10 opacity-25 max-w-[30vmax]"
                aria-hidden
                draggable={false}
                
            />
        </div>
    )
})

export default SmallProject