import Image from "next/image"
import Link from "next/link"

interface SmallProjectProps {
    name: string
}

export default function SmallProject(props : SmallProjectProps) {
    return (
        <>
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
        </>
    )
}