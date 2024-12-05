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
        <ul aria-label="List of my skills" aria-setsize={skills.length} className="flex flex-wrap justify-between">
            {skills.map((e,i)=>{
                return (
                    <SkillLantern style={{
                        marginTop: `${Math.random() * 3}vmax`,
                        marginInline: `${Math.random() * 3 + 1}vmax`
                    }} key={e.skillName} icon={iconTable.get(e.iconName) ?? ""} skill={e} zIndex={skills.length + 5 - i} aria-posinset={i + 1}/>
                ) 
            })}
        </ul>
        )
    }
    
    return (
        <div className="px-[5%] pt-16 pb-12 overflow-hidden relative mt-16">
            <h1 id="skills" className="sr-only translate-y-[-8rem]">Skills</h1>
            <div className="absolute w-full h-16 bg-gradient-to-b from-primary-100 to-transparent top-0 z-50"></div>
            {generateSkillIcons()}
        </div>
    )
}