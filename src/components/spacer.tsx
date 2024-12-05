import Lotus from "./lotus"

type Props = {
    id: string
}

export default function Spacer(props : Props) {
    return (
        <div className="w-full h-32 grid place-items-center relative">
            <h3 id={props.id} className="sr-only -translate-y-24">{props.id.toLocaleUpperCase()}</h3>
            <div className="bg-primary-300 w-20 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] h-px -z-10"></div>
            <div className="bg-primary-100 absolute top-[50%] translate-y-[-50%] size-12 left-[50%] translate-x-[-50%] -z-10"></div>
            <div style={{
                filter: "drop-shadow(0px 0px 1px pink) drop-shadow(0px 0px 5px pink)"
            }}>
                <Lotus />
            </div>
        </div>
    )
}

