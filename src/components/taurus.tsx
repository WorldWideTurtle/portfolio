import { CSSProperties, ForwardedRef, forwardRef } from "react"

type Props = {
    className : string
    style : CSSProperties
}

let component = (props : Props,ref : ForwardedRef<any>) => {
    return (
        <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 70 52" fill="url(#Gradient1)" className={props.className} style={props.style}>
            <path d="M7.5 0 25.3 11.4l8 10.7.6 3.1L43 30.6l13.9-1.3L58 35.7l3.2 3.9M0 13.7 31.4 25.6l2.5-.4M41 42.3l-4.7-5.1L43 30.6" stroke="rgb(255,0,0)" fill="none" stroke-width=".3"/>
            <circle cx="7.5" cy="0" r="2"/>
            <circle cx="25.3" cy="11.4" r="2"/>
            <circle cx="33.3" cy="22.1" r="2"/>
            <circle cx="33.9" cy="25.2" r="2"/>
            <circle cx="43" cy="30.6" r="2"/>
            <circle cx="56.9" cy="29.3" r="2"/>
            <circle cx="58" cy="35.7" r="2"/>
            <circle cx="61.2" cy="39.6" r="2"/>
            <circle cx="0" cy="13.7" r="2"/>
            <circle cx="31.4" cy="25.6" r="2"/>
            <circle cx="41" cy="42.3" r="2"/>
            <circle cx="36.3" cy="37.2" r="2"/>
            <defs>
                <radialGradient id="Gradient1">
                    <stop stopColor="rgba(255,255,255,1)" offset="0%" />
                    <stop stopColor="rgba(255,0,0,.7)" offset="20%" />
                    <stop stopColor="rgba(255,0,0,0)" offset="100%" />
                </radialGradient>
            </defs>
        </svg>
    )
}

const Taurus = forwardRef(component)
export default Taurus
