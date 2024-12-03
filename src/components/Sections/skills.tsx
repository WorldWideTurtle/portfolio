import skillsConfig from "@/config/skills.config"
import path from "path"
import SkillLantern from "../skillLantern";
import { readFile } from "fs/promises";


export default async function Skills() {
    const skillIconsPath = path.join(process.cwd(),"src/icons/skills/")
    const iconTable : Map<string,string> = new Map()

    async function loadSkillIcons() {
        const iconPromises = skillsConfig.skills.map(async (e)=>{
            const filePath = path.join(skillIconsPath, `${e.iconName}.svg`);
            try {
                let data = await readFile(filePath,'utf8')
                iconTable.set(e.iconName,data);
            } catch (error) {
                console.error(`Error reading file for ${e.iconName}:`,error)
                iconTable.set(e.iconName,e.skillName);
            }
        })

        await Promise.all(iconPromises)
    }

    await loadSkillIcons();

    function generateSkillIcons() {
        let skills = skillsConfig.skills;

        return (
        <>
            {skills.map((e,i)=>{
                return (
                    <SkillLantern key={e.skillName} icon={iconTable.get(e.iconName) ?? ""} skill={e} zIndex={skills.length + 5 - i}/>
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