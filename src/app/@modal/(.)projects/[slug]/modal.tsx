'use client'

import { useRouter } from "next/navigation";
import { MouseEvent, MutableRefObject, ReactNode, useEffect, useRef } from "react";

export default function Modal({children} : {children : ReactNode}) {
    const router = useRouter()
    const dialogRef : MutableRefObject<HTMLDialogElement | null> = useRef(null);

    useEffect(() => {
        if (dialogRef.current === null) return;
        if (!dialogRef.current.open) {
          dialogRef.current.showModal();
        }
      }, []);

    function onDismiss() {
        router.back();
    }

    function clickHandler(event : MouseEvent) {
        if (dialogRef.current === null) return;
        const rect = dialogRef.current.getBoundingClientRect();
        if (
            event.clientX < rect.left || 
            event.clientX > rect.right || 
            event.clientY < rect.top || 
            event.clientY > rect.bottom
        ) {
            onDismiss();
        }
    }

    return (
        <dialog ref={dialogRef} onClick={clickHandler} className="modal" onClose={onDismiss}>
            {children}
            <button onClick={onDismiss} className="close-button size-4" />
        </dialog>
    )
}