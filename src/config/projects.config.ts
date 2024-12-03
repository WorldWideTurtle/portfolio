import { imageDescription } from "./types.config";

interface Project {
    name: string,
    text: {
        short: string,
        keyPoints: string[]
    },
    links: {
        github: string,
        demo?: string,
        project: string,
    },
    image: imageDescription
}

export type { Project };

interface ProjectsConfig {
    projects: Array<Project>
} 

const projectsConfig : ProjectsConfig = {
    projects: [
        {
            name: "Sudoku-Solver",
            links: {
                github: "/",
                demo: "https://www.f0und.de",
                project: "/sudoku-solver"
            },
            image: {
                src: "/solver-large",
                alt: "Image of my sudoku solver showing both a dark and light mode view"
            },
            text: {
                short: 'A high-performance sudoku solver written using <abbr title="Javascript">JS</abbr>, <abbr title="Cascading Style Sheets">CSS</abbr> and <abbr title="Hypertext Mark-up Language">CSS</abbr>.',
                keyPoints: [
                    "Incredibly fast due to bitwise operations and typed arrays",
                    "Multithreaded solving of lists",
                    "SPA with routing"
                ]
            }
        },
        {
            name: "EVA - JS Game engine",
            links: {
                github: "/",
                project: "/eva"
            },
            image: {
                src: "/solver-large",
                alt: "Image of my sudoku solver showing both a dark and light mode view"
            },
            text: {
                short: 'A high-performance sudoku solver written using <abbr title="Javascript">JS</abbr>, <abbr title="Cascading Style Sheets">CSS</abbr> and <abbr title="Hypertext Mark-up Language">CSS</abbr>.',
                keyPoints: [
                    "Incredibly fast due to bitwise operations and typed arrays",
                    "Multithreaded solving of lists",
                    "SPA with routing"
                ]
            }
        },
        {
            name: "Sudoku-Solver",
            links: {
                github: "/",
                demo: "https://www.f0und.de",
                project: "/sudoku-solver"
            },
            image: {
                src: "/solver-large",
                alt: "Image of my sudoku solver showing both a dark and light mode view"
            },
            text: {
                short: 'A high-performance sudoku solver written using <abbr title="Javascript">JS</abbr>, <abbr title="Cascading Style Sheets">CSS</abbr> and <abbr title="Hypertext Mark-up Language">CSS</abbr>.',
                keyPoints: [
                    "Incredibly fast due to bitwise operations and typed arrays",
                    "Multithreaded solving of lists",
                    "SPA with routing"
                ]
            }
        },
        {
            name: "Sudoku-Solver",
            links: {
                github: "/",
                demo: "https://www.f0und.de",
                project: "/sudoku-solver"
            },
            image: {
                src: "/solver-large",
                alt: "Image of my sudoku solver showing both a dark and light mode view"
            },
            text: {
                short: 'A high-performance sudoku solver written using <abbr title="Javascript">JS</abbr>, <abbr title="Cascading Style Sheets">CSS</abbr> and <abbr title="Hypertext Mark-up Language">CSS</abbr>.',
                keyPoints: [
                    "Incredibly fast due to bitwise operations and typed arrays",
                    "Multithreaded solving of lists",
                    "SPA with routing"
                ]
            }
        },
    ]
}

export default projectsConfig;