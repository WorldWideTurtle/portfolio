import NavPad from "@/components/navPad"

export default async function page({params} : {params : Promise<{slug : string}>}) {
    const slug = (await params).slug
    return (
        <div className="h-dvh">
        <NavPad />
        <div>{slug}</div>
        </div>
    )
}