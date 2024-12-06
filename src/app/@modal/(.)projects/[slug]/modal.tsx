'use client'

import { useRouter } from "next/navigation";
import { MouseEvent, MutableRefObject, ReactNode, useEffect, useRef } from "react";
import CloseIcon from "@/icons/Close.svg"

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
        <dialog 
            ref={dialogRef} 
            onClick={clickHandler} 
            className="bg-primary-300 border-solid border-[1px] border-primary-500 rounded-lg" 
            onClose={onDismiss}
        >
            <div className="w-full flex justify-end">
                <button onClick={onDismiss} className="close-button size-6 stroke-white-900 hover:stroke-accent-red">
                    <CloseIcon className="w-full "/>
                </button>
            </div>
            <div className="p-2">
                {children}
            </div>
        </dialog>
    )
}