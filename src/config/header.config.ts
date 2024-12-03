type HeaderConfig = {
    title: string,
    links: Array<{
        name: string,
        href: string
    }>
    clearance: number,
    pixelsToMax: number,
    transitionDuration: number,
    timingFunction: (x : number) => number
}

const headerConfig : HeaderConfig = {
    title: "WorldWideTurtle",
    links: [
        {
            name:"About",
            href:"#about"
        },
        {
            name:"Skills",
            href:"#skills"
        },
        {
            name:"Projects",
            href:"#projects"
        }
    ],
    clearance: 10,
    pixelsToMax: 20,
    transitionDuration: 500,
    timingFunction: (x : number) : number => 1 - Math.pow(1 - x, 3)
}

export default headerConfig