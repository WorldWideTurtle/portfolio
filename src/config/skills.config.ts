type Skill = {
    skillName: string,
    iconName: string,
    iconColor: string,
    knowledge: 1 | 2 | 3 | 4 | 5
}

export type {Skill}

type SkillsConfig = {
    baseIconSize: number,
    baseBackgroundSize: number,
    backgroundSizeOffset: number,
    maxTilt: number,
    tiltDuration: number,
    tiltEasing: string,
    skills: Array<Skill>
}

const skillsConfig : SkillsConfig = {
    baseIconSize: 3,
    baseBackgroundSize: 5.5,
    backgroundSizeOffset: 2,
    maxTilt: 10,
    tiltDuration: 400,
    tiltEasing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    skills: [
        {
            skillName: "HTML",
            iconName: "html",
            iconColor: "#E14E1D",
            knowledge: 5
        },
        {
            skillName: "JavaScript",
            iconName: "javascript",
            iconColor: "#F0DB4F",
            knowledge: 5
        },
        {
            skillName: "CSS",
            iconName: "css",
            iconColor: "#663399",
            knowledge: 5
        },
        {
            skillName: "TailwindCSS",
            iconName: "tailwind",
            iconColor: "#32B1C1",
            knowledge: 3
        },
        {
            skillName: "React",
            iconName: "react",
            iconColor: "#00D8FF",
            knowledge: 2
        },
        {
            skillName: "NextJS",
            iconName: "nextjs",
            iconColor: "#ffffff",
            knowledge: 2
        },
        {
            skillName: "NodeJS",
            iconName: "nodejs",
            iconColor: "#81CD39",
            knowledge: 3
        },
        {
            skillName: "ExpressJS",
            iconName: "express",
            iconColor: "#ffffff",
            knowledge: 2
        },
        {
            skillName: "Figma",
            iconName: "figma",
            iconColor: "#0ACF83",
            knowledge: 3
        },
        {
            skillName: "GitHub",
            iconName: "github",
            iconColor: "#ffffff",
            knowledge: 3
        },
        {
            skillName: "Blender",
            iconName: "blender",
            iconColor: "#EA7600",
            knowledge: 2
        },
        {
            skillName: "AutoCAD",
            iconName: "autocad",
            iconColor: "#BF2223",
            knowledge: 3
        },
        {
            skillName: "Discord",
            iconName: "discord",
            iconColor: "#5865F2",
            knowledge: 3
        },
        {
            skillName: "Illustrator",
            iconName: "illustrator",
            iconColor: "#FF9A00",
            knowledge: 3
        },
        {
            skillName: "Obsidian",
            iconName: "obsidian",
            iconColor: "#ffffff",
            knowledge: 4
        }
    ]
}

export default skillsConfig;