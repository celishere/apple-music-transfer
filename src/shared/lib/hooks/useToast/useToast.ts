import { useContext } from "react";

import { ToastContext } from "@/app/providers/ToastProvider";

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastsProvider.');
    }

    return context;
};