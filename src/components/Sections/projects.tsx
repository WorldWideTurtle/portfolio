import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config.ts'

import PlayIcon from "@/icons/play.svg"
import GitHubIcon from "@/icons/github.svg"
import { images } from "@/config/image.config"
import SmallProject from "../smallProject"
import ProjectCarousel from "../projectCarousel"
import Link from "next/link"

const fullConfig = resolveConfig(tailwindConfig)

export default function Projects() {
    return (
        <div className="h-[92dvh] flex flex-col gap-6 bg-primary-200 py-4 rounded-2xl relative overflow-hidden isolate">
            <div className="md:flex flex-col gap-2 items-center relative py-2 hidden">
                <div className="h-2 flex gap-2 justify-between w-fit">
                    <div className="h-full aspect-square rounded-full bg-accent-jade"></div>
                    <div className="h-full aspect-square rounded-full bg-primary-600"></div>
                    <div className="h-full aspect-square rounded-full bg-primary-600"></div>
                    <div className="h-full aspect-square rounded-full bg-primary-600"></div>
                    <div className="h-full aspect-square rounded-full bg-primary-600"></div>
                    <div className="h-full aspect-square rounded-full bg-primary-600"></div>
                </div>
                <div className="relative">
                    <div className="absolute w-full h-full top-0 pointer-events-none z-10" style={{
                        background: `linear-gradient(to left, ${fullConfig.theme.colors.primary[200]}c0,${fullConfig.theme.colors.primary[200]}00 10%, ${fullConfig.theme.colors.primary[200]}00 90%,${fullConfig.theme.colors.primary[200]}c0)`
                    }}></div>
                    <ProjectCarousel />
                </div>
            </div>
            <div className="flex-1 px-4 flex flex-col">
                <SmallProject />
                <div className="flex h-10 flex-row-reverse absolute right-2 bottom-4">
                    <Link href={"https://www.f0und.de"}><PlayIcon className="stroke-accent-jade h-full"/></Link>
                    <Link href={"/"}><GitHubIcon className="stroke-accent-jade h-full"/></Link>
                </div>
                <img 
					src={images.GradientBG}
					alt="Radial gradient from the top right corner towards the center of the page, fading from red to transparent."
					width={400}
					height={400}
					className="absolute left-0 bottom-0 w-full -scale-100 -z-10 opacity-50 max-w-[50vmax]"
				/>
                <img 
					src={images.GradientBG}
					alt="Radial gradient from the top right corner towards the center of the page, fading from red to transparent."
					width={400}
					height={400}
					className="absolute top-0 right-0 w-full -z-10 opacity-25 max-w-[50vmax]"
				/>
            </div>
        </div>
    )
}