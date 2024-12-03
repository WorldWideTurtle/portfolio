'use client'

import LanternIcon from "@/icons/Lantern.svg"
import skillsConfig, { Skill } from "@/config/skills.config"
import { CSSProperties, MutableRefObject, useEffect, useRef } from "react"
import classes from "./skillLantern.module.css"

interface SkillLanternProps {
    icon: string,
    skill: Skill,
    zIndex: number,
    style?: CSSProperties
}

export default function SkillLantern(props : SkillLanternProps) {
    let baseIconSize = skillsConfig.baseIconSize;
    let baseBackgroundSize = skillsConfig.baseBackgroundSize;
    let backgroundSizeOffset = skillsConfig.backgroundSizeOffset;

    let skill = props.skill;
    let skillElement : MutableRefObject<HTMLDivElement | null> = useRef(null)
    let lanternAndChain : MutableRefObject<HTMLDivElement | null> = useRef(null)
    let observerBox : MutableRefObject<HTMLDivElement | null> = useRef(null)

    useEffect(()=>{
        if (skillElement.current === null) return;

        let timeout : NodeJS.Timeout | null = null;

        let tiltLantern = () => {
            if (skillElement.current === null) return;
            let side = Math.random() > 0.5 ? 1 : -1
            let num = Math.random() * skillsConfig.maxTilt;
            skillElement.current.style.rotate = (num * side).toString() + "deg"
            invokeReset()
        }

        let invokeReset = () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(()=>{
                if (skillElement.current === null) return;

                skillElement.current.style.rotate = "0deg";
            }, skillsConfig.tiltDuration + 50)
        }

        skillElement.current.addEventListener("mouseenter",tiltLantern)
        skillElement.current.addEventListener("click",tiltLantern)

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (lanternAndChain.current === null || observerBox.current === null) return;
                    lanternAndChain.current.classList.add(classes.animate)
                    observer.unobserve(observerBox.current);
                }
              },
            {
                root: null, // Observe relative to the viewport
                threshold: 0.8, // Trigger when 10% of the element is visible
            }
        );
        
        if (observerBox.current) {
            observer.observe(observerBox.current);
        }

        if (lanternAndChain.current) {
            lanternAndChain.current.style.animationDelay = (Math.random() * 200).toString() + "ms";
        }

        return () => {
            if (skillElement.current) {
                skillElement.current.removeEventListener("mouseleave",tiltLantern)
                skillElement.current.removeEventListener("click",tiltLantern)
                if (timeout !== null) clearTimeout(timeout)
            }

            if (observerBox.current) {
                observer.unobserve(observerBox.current);
            }

        }
    })

    return (
        <div ref={observerBox} className="relative w-fit isolate" style={{
                    zIndex: props.zIndex,
                    ...props.style
        }}>
            <div ref={lanternAndChain} className="relative translate-y-[-100dvh]" style={{
                width: (baseIconSize + skill.knowledge / 4).toString() + "vmax"
            }}>
                <div ref={skillElement} className="origin-top transition-[rotate] grid" style={{
                transitionDuration: skillsConfig.tiltDuration.toString() + "ms",
                transitionTimingFunction: skillsConfig.tiltEasing
                }}>
                    <LanternIcon className="w-full col-start-1 row-start-1 opacity-70"/>
                    <div className="col-start-1 row-start-1 w-[85%] place-self-center z-10 translate-y-[5%]" dangerouslySetInnerHTML={{ __html: props.icon}} role="img" aria-label={skill.skillName}/>
                    <div className="absolute place-self-center z-[5]" style={{
                        background: `radial-gradient(circle at center, ${skill.iconColor}30, ${skill.iconColor}00 70%)`,
                        width: (baseBackgroundSize + skill.knowledge / 4).toString() + "vmax",
                        height: (baseBackgroundSize + skill.knowledge / 4).toString() + "vmax"
                    }}/>
                    <div className="absolute place-self-center -z-10" style={{
                        background: `radial-gradient(circle at center, ${skill.iconColor}b0, ${skill.iconColor}00 70%)`,
                        width: (baseBackgroundSize + backgroundSizeOffset + skill.knowledge / 4).toString() + "vmax",
                        height: (baseBackgroundSize + backgroundSizeOffset + skill.knowledge / 4).toString() + "vmax"
                    }}/>
                </div>
                <div className="absolute top-[5%] w-[20%] h-[100dvh] translate-y-[-100%] left-[50%] z-[4] translate-x-[-50%] grid grid-rows-[1fr_auto]">
                    <div className={"bg-bottom bg-contain " + classes.top}></div>
                    <div className={"aspect-[22/35] bg-cover translate-y-[-1px] " + classes.bottom}></div>
                </div>
            </div>
        </div>
    )
}