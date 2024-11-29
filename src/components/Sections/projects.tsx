import Image from "next/image"
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config.ts'
import Link from "next/link"

import PlayIcon from "@/icons/play.svg"
import GitHubIcon from "@/icons/github.svg"
import { images } from "@/config/image.config"

const fullConfig = resolveConfig(tailwindConfig)

export default function Projects() {
    return (
        <div className="h-[92dvh] flex flex-col gap-6 bg-primary-200 py-2 rounded-2xl relative overflow-hidden isolate">
            <div className="flex flex-col gap-2 items-center relative py-2">
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
                    <div className="flex gap-2 h-24 w-full overflow-x-auto px-2 py-2">
                        <Image 
                            src={"/solver-small.webp"}
                            alt="Small preview of my sudoku solver within the image carusel to select a project"
                            width={400}
                            height={300}
                            className="w-auto rounded-xl outline-1 outline-accent-jade outline scale-105"
                        />
                        <Image 
                            src={"/solver-small.webp"}
                            alt="Small preview of my sudoku solver within the image carusel to select a project"
                            width={400}
                            height={300}
                            className="w-auto rounded-xl"
                        />
                        <Image 
                            src={"/solver-small.webp"}
                            alt="Small preview of my sudoku solver within the image carusel to select a project"
                            width={400}
                            height={300}
                            className="w-auto rounded-xl"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 px-4 flex flex-col">
                <div className="flex flex-col items-center">
                    <Image 
                        src={"/solver-large.webp"}
                        alt="Image of my sudoku solver showing both a dark and light mode view"
                        width={1600}
                        height={900}
                        className="w-[90%] md:w-auto max-h-[50dhv]"
                    />
                    <h3 className="-mt-5 text-center text-3xl">Sudoku-Solver</h3>
                </div>
                <div className="font-math mt-3">
                    <p className="text-justify text-white-700">A high-performance sudoku solver written using JS, CSS and HTML.</p>
                    <ul className="mt-2 flex flex-col gap-1 list-disc">
                        <li className="ml-4 pl-2 text-white-700">Incredibly fast due to bitwise operations and typed arrays</li>
                        <li className="ml-4 pl-2 text-white-700">Multithreaded solving of lists</li>
                        <li className="ml-4 pl-2 text-white-700">SPA with routing</li>
                    </ul>
                    <div className="mt-4"></div>
                    <Link href={"/"} className="text-accent-jade underline">Learn more</Link>
                </div>
                <div className="flex h-10 flex-row-reverse absolute right-2 bottom-4">
                    <PlayIcon className="stroke-accent-jade h-full"/>
                    <GitHubIcon className="stroke-accent-jade h-full"/>
                </div>
                <Image 
					src={images.GradientBG}
					alt="Radial gradient from the top right corner towards the center of the page, fading from red to transparent."
					width={400}
					height={400}
					className="absolute left-0 bottom-0 w-full -scale-100 -z-10 opacity-50 max-w-[50vmax]"
				/>
                <Image 
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