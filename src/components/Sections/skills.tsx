import skillsConfig from "@/config/skills.config"
import { readFileSync } from "fs"
import path from "path"
import SkillLantern from "../skillLantern";


export default function Skills() {
    function getSkillIcon(name : string) : string {
        return readFileSync(path.join(process.cwd(),"src/icons/skills/", name + ".svg"),{ encoding: 'utf8', flag: 'r' });
    }

    function generateSkillIcons() {
        let skills = skillsConfig.skills;
        let baseIconSize = skillsConfig.baseIconSize;

        return (
        <>
            {skills.map((e,i)=>{
                return (
                <div className="relative w-fit isolate" key={e.skillName} style={{
                    zIndex: skills.length + 5 - i,
                    height: (baseIconSize + e.knowledge / 2).toString() + "vmax"
                }}>
                    <SkillLantern key={e.skillName} icon={getSkillIcon(e.iconName)} skill={e} />
                </div> 
                ) 
            })}
        </>
        )
    }

    generateSkillIcons();
    
    return (
        <div className="relative overflow-x-clip">
            <h1 id="about" className="sr-only">About</h1>
            {<div className="px-[5%] flex flex-wrap justify-between gap-8">
                {generateSkillIcons()}
            </div>}
        </div>
    )
}