const links = [
    ["about"],
    ["projects"],
    ["skills"],
    ["contacts"]
]

export default function Header() {
    return (
        <header className="w-full flex justify-between pl-6 py-2 text-3xl pr-12 fixed">
            <h1>WorldWideTurtle</h1>
            <nav className="hidden md:inline">
                <ul className="flex gap-6">
                    {links.map(e=>(
                        <li key={e[0]}><a href={`#${e[0]}`}>{e[0]}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}