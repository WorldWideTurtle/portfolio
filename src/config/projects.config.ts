interface Project {
    name: string,
    text: string,
    links: {
        github: string,
        demo: string | null,
        project: string,
    },
    images: {
        small: string,
        large: string
    }
}

interface ProjectsConfig {
    projects: Array<Project>
} 

const projectsConfig : ProjectsConfig = {
    projects: [
        {
            name: "Sudoku-Solver",
            links: {
                github: "/",
                demo: "/",
                project: "/"
            },
            images: {
                large: "/solver-large",
                small: "/solver-small"
            },
            text: "Hello"
        }
    ]
}

export default projectsConfig;