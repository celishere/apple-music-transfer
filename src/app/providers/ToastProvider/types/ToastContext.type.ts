import { Toast } from "../types/Toast.type";

export type ToastContextType = {
    addToast: (toast: Toast) => void;
    removeToast: (id?: string) => void;
    toasts: Toast[];
    base: (props: Toast) => void;
    error: (props: Toast) => void;
    success: (props: Toast) => void;
};