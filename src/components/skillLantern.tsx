'use client'

import LanternIcon from "@/icons/Lantern.svg"
//import ChainIcon from "@/icons/Chain.svg"
import skillsConfig, { Skill } from "@/config/skills.config"
import { MutableRefObject, useEffect, useRef } from "react"

interface SkillLanternProps {
    icon: string,
    skill: Skill
}

export default function SkillLantern(props : SkillLanternProps) {
    let baseIconSize = skillsConfig.baseIconSize;
    let baseBackgroundSize = skillsConfig.baseBackgroundSize;
    let backgroundSizeOffset = skillsConfig.backgroundSizeOffset;

    let skill = props.skill;
    let skillElement : MutableRefObject<HTMLDivElement | null> = useRef(null)

    useEffect(()=>{
        if (skillElement.current === null) return;

        let hoverTimeOut : NodeJS.Timeout | null = null;

        let tiltLantern = () => {
            if (skillElement.current === null) return;
            let side = Math.random() > 0.5 ? 1 : -1
            let num = Math.random() * skillsConfig.maxTilt;
            skillElement.current.style.rotate = (num * side).toString() + "deg"
            invokeReset()
        }

        let invokeReset = () => {
            if (hoverTimeOut) clearTimeout(hoverTimeOut);
            hoverTimeOut = setTimeout(()=>{
                if (skillElement.current === null) return;

                skillElement.current.style.rotate = "0deg";
            }, skillsConfig.tiltDuration + 50)
        }

        skillElement.current.addEventListener("mouseenter",tiltLantern)
        skillElement.current.addEventListener("click",tiltLantern)

        return () => {
            if (skillElement.current === null) return;

            skillElement.current.removeEventListener("mouseleave",tiltLantern)
            skillElement.current.removeEventListener("click",tiltLantern)
            if (hoverTimeOut !== null) clearTimeout(hoverTimeOut)
        }
    })

    return (
        <>
            <div ref={skillElement} className="origin-top grid relative transition-[rotate]" style={{
                width: (baseIconSize + skill.knowledge / 2).toString() + "vmax",
                transitionDuration: skillsConfig.tiltDuration.toString() + "ms",
                transitionTimingFunction: skillsConfig.tiltEasing
            }}>
                <LanternIcon className="fill-primary-light w-full col-start-1 row-start-1"/>
                <div className="col-start-1 row-start-1 w-[85%] place-self-center z-10 translate-y-[5%]" dangerouslySetInnerHTML={{ __html: props.icon}}/>
                <div className="absolute place-self-center z-[5]" style={{
                    background: `radial-gradient(circle at center, ${skill.iconColor + "30"}, ${skill.iconColor + "00"} 70%)`,
                    width: (baseBackgroundSize + skill.knowledge / 2).toString() + "vmax",
                    height: (baseBackgroundSize + skill.knowledge / 2).toString() + "vmax"
                }}/>
                <div className="absolute place-self-center -z-10" style={{
                    background: `radial-gradient(circle at center, ${skill.iconColor + "a0"}, ${skill.iconColor + "00"} 70%)`,
                    width: (baseBackgroundSize + backgroundSizeOffset + skill.knowledge / 2).toString() + "vmax",
                    height: (baseBackgroundSize + backgroundSizeOffset + skill.knowledge / 2).toString() + "vmax"
                }}/>
            </div>
            <div className="absolute top-0 w-[20%] h-20 translate-y-[-100%] left-[50%] z-[4] translate-x-[-50%] bg-bottom bg-contain" style={{
                backgroundImage: "url('ChainSingle.svg')"
            }} />
        </>
    )
}