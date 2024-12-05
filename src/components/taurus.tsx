'use client'

import { CSSProperties, ForwardedRef, forwardRef, useEffect, useState } from "react"

import tailwindConfig from "../../tailwind.config"

let themeRed = tailwindConfig.theme.colors["accent-red"]

type Props = {
    className : string
    style : CSSProperties
}

const basePoints : [number,number][][] = [
    [
        [7.5,0],
        [25.3,11.4],
        [33.3,22.1],
        [33.9,25.2],
        [43,30.6],
        [56.9,29.3],
        [58,35.7],
        [61.2,39.6],
    ],
    [
        [0,13.7],
        [31.4,25.6],
        [0,3]
    ],
    [
        [41,42.3],
        [36.3,37.2],
        [0,4]
    ]
]

let component = (props : Props,ref : ForwardedRef<any>) => {
    //M7.5 0 25.3 11.4l8 10.7.6 3.1L43 30.6l13.9-1.3L58 35.7l3.2 3.9M0 13.7 31.4 25.6l2.5-.4M41 42.3l-4.7-5.1L43 30.6
    const [points, setPoints] : [[number,number][][], Function] = useState(JSON.parse(JSON.stringify(basePoints)))
    const [targets, settargets] : [[number,number][][], Function] = useState(JSON.parse(JSON.stringify(basePoints)))


    let generatePath = () => {
        return points.map((group,groupIndex)=>{
            let start = `M${group[0][0].toFixed(2)} ${group[0][1].toFixed(2)} l`
            let lines = ""
            let prevPoint = group[0]
            for (let i = 1; i < group.length; i++) {
                let point = group[i];
                if (groupIndex > 0 && i === group.length - 1) {
                    point = points[point[0]][point[1]]
                }
                let relX = point[0] - prevPoint[0];
                let relY = point[1] - prevPoint[1];
                lines += ` ${relX.toFixed(2)} ${relY.toFixed(2)}`
                prevPoint = group[i]
            }
            return start + lines
        }).join("")
    }

    let generateCircles = () => {
        let circles = [];

        let itter = 0;
        let total = 0;
        for (const group of points) {
            for (let i = group.length - 1 - (itter > 0 ? 1 : 0); i >= 0; i--) {
                total++;
                let point = group[i]
                if (itter > 0 && i === group.length - 1) {
                    point = points[point[0]][point[1]]
                }
                circles.push((
                    <circle key={total} cx={point[0].toFixed(2)} cy={point[1].toFixed(2)} r="2"/>
                ))
            }
            itter++;
        }

        return circles;
    }

    useEffect(()=>{
        let interval = setInterval(()=>{
            let newTargets = [...targets]
            let itter = 0;
            let randomSize = 2;
            for (let groupIndex = 0; groupIndex < newTargets.length; groupIndex++) {
                let baseGroup = basePoints[groupIndex];
                let activeGroup = targets[groupIndex];
                for (let i = 0; i < baseGroup.length; i++) {
                    if (itter > 0 && i === baseGroup.length - 1) continue;
                    activeGroup[i][0] = baseGroup[i][0] + Math.random() * randomSize - randomSize / 2
                    activeGroup[i][1] = baseGroup[i][1] + Math.random() * randomSize - randomSize / 2
                }
                itter ++;
            }
            settargets(newTargets)
        }, 1200)


        let frame : number | null = null;
        let tween = () => {
            frame = requestAnimationFrame(tween);
            let newPoints = [...points];
            let itter = 0;
            for (let groupIndex = 0; groupIndex < newPoints.length; groupIndex++) {
                let currentGroup = newPoints[groupIndex];
                let targetGroup = targets[groupIndex];
                for (let i = 0; i < currentGroup.length; i++) {
                    if (itter > 0 && i === currentGroup.length - 1) continue;
                    let [targetX,targetY] = targetGroup[i];
                    let [currentX,currentY] = currentGroup[i];
                    if (Math.abs(targetX - currentX) > 0.05) {
                        currentGroup[i][0] += (targetX - currentX) * .02
                    }
                    if (Math.abs(targetY - currentY) > 0.05) {
                        currentGroup[i][1] += (targetY - currentY) * .02
                    }
                }
                itter ++;
            }
            setPoints(newPoints)
        }

        tween()

        return () => {
            clearInterval(interval)
            if (frame !== null)
            cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 70 52" fill="url(#Gradient1)" className={props.className} style={props.style}>
            <path d={generatePath()} stroke={themeRed} fill="none" strokeWidth=".3"/>
            {generateCircles()}
            <defs>
                <radialGradient id="Gradient1">
                    <stop stopColor={`rgba(255,255,255,1)`} offset="0%" />
                    <stop stopColor={`${themeRed}c0`} offset="20%" />
                    <stop stopColor={`${themeRed}00`} offset="100%" />
                </radialGradient>
            </defs>
        </svg>
    )
}

const Taurus = forwardRef(component)
export default Taurus
