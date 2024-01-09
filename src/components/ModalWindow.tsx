import React, {useRef, useEffect, memo} from "react";
import {createPortal} from "react-dom";


export const ModalWindow = memo(({cssClasses, open, children, onClose}: any) => {

    const dialog: React.RefObject<HTMLDialogElement> = useRef(null);
    useEffect(() => {

        const modal: HTMLDialogElement = dialog.current!;

        if (open)
            modal.showModal();

        return () => modal.close();

    }, [open]);

    return createPortal(
        (
            <dialog onClose={onClose} className={cssClasses} ref={dialog}>
                {children}
            </dialog>

        ),
        document.getElementById('modal')!);

});