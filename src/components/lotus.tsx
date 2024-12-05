export default function Lotus() {
    const leafPath = "M3.8 8c2.8-2 .8-6-1.2-8-2 2-4 6-1.2 8-2.4-3.2.8-6.8 1.2-7 .4.2 3.6 3.8 1.2 7Z";

    return (
        <svg width="50" viewBox="-15 -6 35 24" xmlns="http://www.w3.org/2000/svg" fill="pink">
            {new Array(6).fill(0).map((_,i)=>
                <path key={i} d={leafPath} transform={`translate(2.5 -4) rotate(${i*60})`} transform-origin="0 10"/>
            )}
            <circle cx="2.5" cy="6" r="1.5"></circle>
        </svg>
    )
}