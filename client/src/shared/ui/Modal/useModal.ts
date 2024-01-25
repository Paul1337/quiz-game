import { useState } from 'react';

export const useModal = (defaultShow?: boolean) => {
    const [show, setShow] = useState(defaultShow ?? false);

    return {
        isShowing: show,

        show() {
            setShow(true);
        },
        hide() {
            setShow(false);
        },
        toggle() {
            setShow(show => !show);
        },
    };
};
