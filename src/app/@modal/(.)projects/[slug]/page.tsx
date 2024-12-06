import Modal from "./modal";

export default async function Page({
    params
} : {
    params : Promise<{slug : string}>
}) {
    const id = await params;

    return (
        <Modal>
            {id.slug}
        </Modal>
    )
}

