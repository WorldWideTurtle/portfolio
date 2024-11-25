import Image from "next/image"


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
            <div>Test</div>
        </div>
    )
}