import RoundIcon from "@/icons/Avatar.svg"

export default function NotFound() {
    return (
        <div className="h-[100dvh] grid place-items-center">
            <div className="flex items-center gap-2 md:gap-6">
                <div className="grid place-items-center">
                    <RoundIcon className="w-[10vw] max-w-[150px] col-start-1 row-start-1" />
                    <span className="text-shadow-red text-accent-red col-start-1 row-start-1" style={{
                        fontSize: "min(4vw,60px)"
                    }}>404</span> 
                </div>
                <h2 className="w-fit lg:text-5xl md:text-3xl text-xl">This page does not exist</h2>
            </div>         
        </div> 
    )
}