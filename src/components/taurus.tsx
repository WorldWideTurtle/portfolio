'use client'

import { CSSProperties, Dispatch, ForwardedRef, forwardRef, useEffect, useState } from "react"

import tailwindConfig from "../../tailwind.config"

let themeRed = tailwindConfig.theme.colors["accent-red"]
let themeBG = tailwindConfig.theme.colors.primary[100]

type Props = {
    className : string
    style : CSSProperties
}

type PathNode = [number,number]
type PathGroup = PathNode[]


const basePoints : PathGroup[] = [
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
    const [points, setPoints] : [PathGroup[], Dispatch<any>] = useState(JSON.parse(JSON.stringify(basePoints)))
    const targets : PathGroup[]= JSON.parse(JSON.stringify(basePoints))
    const cirleRadius : number = 1.5;

    let generatePath = () => {
        return points.map((group,groupIndex)=>{
            let start = `M${group[0][0].toFixed(2)} ${group[0][1].toFixed(2)} l`
            let lines = ""
            let [prevX,prevY] = group[0]
            for (let i = 1; i < group.length; i++) {
                let [x,y] = group[i];

                // The last points in each group past the first
                // Refer to a previous group (x) and point index (y)
                if (groupIndex > 0 && i === group.length - 1) {
                    [x,y] = points[x][y]
                }
                let relX = x - prevX;
                let relY = y - prevY;
                lines += ` ${relX.toFixed(2)} ${relY.toFixed(2)}`;
                [prevX,prevY] = group[i]
            }
            return start + lines
        }).join("")
    }

    

    let generateCircles = () => {
        let circles = [];

        let total = 0;
        for (let groupIndex = 0; groupIndex < points.length; groupIndex++) {
            const group = points[groupIndex];
            let groupLength = group.length - 1

            // Since the last point of groups past the first refers to another 
            // groups point, there is no cirlce needed.
            // So the list is traversed in reverse
            // and starts with the second to last for groups past the first
            let skip = (groupIndex > 0 ? 1 : 0)
            for (let i = groupLength - skip; i >= 0; i--) {
                total++;
                let point = group[i]

                circles.push(
                    <circle key={total} cx={point[0].toFixed(2)} cy={point[1].toFixed(2)} r={cirleRadius}/>
                )
            }
        }

        return circles;
    }

    useEffect(()=>{
        let interval = setInterval(()=>{
            let groupItterator = 0;
            let randomSize = 2;
            for (let groupIndex = 0; groupIndex < targets.length; groupIndex++) {
                let baseGroup = basePoints[groupIndex];
                let activeGroup = targets[groupIndex];
                let groupLength = baseGroup.length - 1;
                for (let i = 0; i <= groupLength; i++) {
                    if (groupItterator > 0 && i === groupLength) continue;
                    let [baseX, baseY] = baseGroup[i];
                    if (Math.random() > 0.7) {
                        activeGroup[i][0] = baseX + Math.random() * randomSize - randomSize / 2
                        activeGroup[i][1] = baseY + Math.random() * randomSize - randomSize / 2
                    }
                }
                groupItterator++;
            }
        }, 1000)


        let requestedAnimationFrame : number | null = null;
        let tween = () => {
            requestedAnimationFrame = requestAnimationFrame(tween);
            let newPoints = [...points];
            let groupItterator = 0;
            for (let groupIndex = 0; groupIndex < newPoints.length; groupIndex++) {
                let currentGroup = newPoints[groupIndex];
                let targetGroup = targets[groupIndex];
                let groupLength = currentGroup.length - 1;
                for (let i = 0; i <= groupLength; i++) {
                    if (i === groupLength && groupItterator > 0) continue;
                    let [targetX,targetY] = targetGroup[i];
                    let [currentX,currentY] = currentGroup[i];
                    if (Math.abs(targetX - currentX) > 0.05) {
                        currentGroup[i][0] += (targetX - currentX) * .02
                    }
                    if (Math.abs(targetY - currentY) > 0.05) {
                        currentGroup[i][1] += (targetY - currentY) * .02
                    }
                }
                groupItterator ++;
            }
            setPoints(newPoints)
        }

        tween()

        return () => {
            clearInterval(interval)
            if (requestedAnimationFrame !== null)
            cancelAnimationFrame(requestedAnimationFrame)
        }
    }, [])

    return (
        <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 70 52" fill="url(#Gradient1)" className={props.className} style={props.style}>
            <path d={generatePath()} stroke={`${themeRed}80`} fill="none" strokeWidth=".2"/>
            {generateCircles()}
            <defs>
                <radialGradient id="Gradient1">
                    <stop stopColor={`rgba(255,255,255,1)`} />
                    <stop stopColor={`${themeRed}c0`} offset="10%" />
                    <stop stopColor={`${themeRed}10`} offset="70%" />
                </radialGradient>
            </defs>
        </svg>
    )
}

const Taurus = forwardRef(component)
export default Taurus
