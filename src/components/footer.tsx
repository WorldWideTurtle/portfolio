import headerConfig from "@/config/header.config"
import Link from "next/link"
import StrokeIcon from "@/icons/Footer-stroke.svg"

export default function Footer() {
    return (
        <footer className="overflow-x-clip">
            <StrokeIcon className="w-full min-w-[1200px] h-auto fill-primary-200"/>
            <div className="bg-gradient-to-b from-primary-200 to-primary-200 via-primary-300 pb-2">
                <div className="w-fit m-auto">
                    <h3 className="text-3xl md:text-6xl ">Continue exploring</h3>
                    <hr className="m-3"/>
                    <nav>
                        <ul className="flex justify-center gap-6">
                            {headerConfig.links.map(e=>(
                                <Link className="text-xl md:text-3xl " href={e.href}>{e.name}</Link>
                            ))}
                        </ul>
                    </nav>
                    <h4 className="mt-4 text-sm font-math text-center opacity-70">&copy; {(new Date()).getFullYear()} WorldWideTurtle. All Rights Reserved</h4>
                </div>
            </div>
        </footer>
    )
}