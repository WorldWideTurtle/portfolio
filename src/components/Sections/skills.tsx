import Image from "next/image"
import LanternIcon from "@/icons/Lantern.svg"
import ChainIcon from "@/icons/Chain.svg"

export default function Skills() {
    return (
        <div className="relative overflow-x-clip">
            <Image 
                src={"/clouds.webp"}
                alt="Misty fog image"
                width={1080}
                height={400}
                className="absolute w-[200vw] md:h-[100vw] md:max-h-[100vw] h-[200dvh] max-h-[200dvh] max-w-[200vw] mt-[-10rem] translate-x-[-25%] translate-y-[-25%] z-0 pointer-events-none"
                style={{
                    maskImage: "linear-gradient(to bottom, rgba(1,1,1,0) 25%, rgba(1,1,1,0.1) 50%, rgba(1,1,1,0.3))"
                }}
            /> 
            <Image 
                src={"/clouds.webp"}
                alt="Misty fog image"
                width={1080}
                height={400}
                className=" absolute w-[200vw] md:h-[100vw] md:max-h-[100vw] h-[200dvh] max-h-[200dvh] max-w-[200vw] translate-x-[-25%] translate-y-[-25%] scale-x-[-1] z-10 pointer-events-none"
                style={{
                    maskImage: "linear-gradient(to bottom, rgba(1,1,1,0) 25%, rgba(1,1,1,0.1) 50%, rgba(1,1,1,0.15))"
                }}
            /> 
            <div className="relative w-fit">
                <LanternIcon className="fill-primary w-[15vw] max-w-[100px]"/>
                <ChainIcon className="absolute top-0 translate-y-[-100%] left-[50%] translate-x-[-50%]" style={{
                    fill: "linear-gradient(to top,red,blue)"
                }}/>
            </div>
        </div>
    )
}