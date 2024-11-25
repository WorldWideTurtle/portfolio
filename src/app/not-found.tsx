import RoundIcon from "@/icons/Avatar.svg"

export default function NotFound() {
    return (
        <div className="h-[100dvh] grid place-items-center">
            <div className="flex items-center gap-2 md:gap-6">
                <RoundIcon className="w-[10vw] max-w-[150px]" />
                <h2 className="w-fit lg:text-5xl md:text-3xl text-xl">This page does not exist</h2>
            </div>         
        </div> 
    )
}