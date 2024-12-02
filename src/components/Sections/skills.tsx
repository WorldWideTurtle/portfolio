import skillsConfig from "@/config/skills.config"
import { readFileSync } from "fs"
import path from "path"
import SkillLantern from "../skillLantern";


export default function Skills() {
    // Read icon file in sync since it's easier
    // This page is compiled at build time so speed is not a concern
    function getSkillIcon(name : string) : string {
        return readFileSync(path.join(process.cwd(),"src/icons/skills/", name + ".svg"),{ encoding: 'utf8', flag: 'r' });
    }

    function generateSkillIcons() {
        let skills = skillsConfig.skills;

        return (
        <>
            {skills.map((e,i)=>{
                return (
                    <SkillLantern key={e.skillName} icon={getSkillIcon(e.iconName)} skill={e} zIndex={skills.length + 5 - i}/>
                ) 
            })}
        </>
        )
    }
    
    return (
        <div className="px-[5%] flex flex-wrap justify-between gap-8 pt-16 pb-12 overflow-hidden relative mt-16">
            <h1 id="skills" className="sr-only translate-y-[-8rem]">Skills</h1>
            <div className="absolute w-full h-16 bg-gradient-to-b from-primary-100 to-transparent top-0 z-50"></div>
            {generateSkillIcons()}
        </div>
    )
}