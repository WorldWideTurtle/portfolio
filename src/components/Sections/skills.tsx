import Image from "next/image"
import LanternIcon from "@/icons/Lantern.svg"
import ChainIcon from "@/icons/Chain.svg"
import skillsConfig from "@/config/skills.config"
import { readFileSync } from "fs"
import path from "path"


export default function Skills() {
    function getSkillIcon(name : string) : string {
        return readFileSync(path.join(process.cwd(),"src/icons/skills/", name + ".svg"),{ encoding: 'utf8', flag: 'r' });
    }
    function generateSkillIcons() {
        let skills = skillsConfig.skills;
        return (
        <>
            {skills.map((e,i)=>{
                return (
                <div className="relative w-fit isolate" key={e.skillName} style={{
                    zIndex: skills.length + 5 - i
                }}>
                    <div className="origin-top grid relative w-[12vw] max-w-[100px]">
                        <LanternIcon className="fill-primary-light w-full col-start-1 row-start-1"/>
                        <div className="col-start-1 row-start-1 w-[85%] place-self-center z-10 translate-y-[-30%]" dangerouslySetInnerHTML={{ __html: getSkillIcon(e.iconName)}}/>
                        <div className="absolute place-self-center z-[5] size-[15vw] max-w-[200px] max-h-[200px] translate-y-[-15%]" style={{
                            background: `radial-gradient(circle at center, ${e.iconColor + "30"}, ${e.iconColor + "00"} 70%)`
                        }}/>
                        <div className="absolute place-self-center -z-10 size-[24vw] max-w-[220px] max-h-[220px] translate-y-[-15%]" style={{
                            background: `radial-gradient(circle at center, ${e.iconColor + "a0"}, ${e.iconColor + "00"} 70%)`
                        }}/>
                    </div>
                    <ChainIcon className="absolute top-[3%] w-[25%] translate-y-[-100%] left-[50%] translate-x-[-50%]" />
                </div> 
                ) 
            })}
        </>
        )
    }

    generateSkillIcons();
    
    return (
        <div className="relative overflow-x-clip">
            {/* <Image 
                src={"/clouds.webp"}
                alt="Misty fog image"
                width={1080}
                height={400}
                className="absolute w-full md:h-auto h-[120dvh] z-0 pointer-events-none"
            />  */}
            <h1 id="about" className="sr-only">About</h1>
            {<div className="px-4 flex flex-wrap justify-between gap-8">
                {generateSkillIcons()}
            </div>}
        </div>
    )
}