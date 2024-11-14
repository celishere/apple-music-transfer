import { createContext, useState, FC, ReactNode } from 'react';

import { nanoid } from "nanoid";

import { Toasts } from "../Toasts";

import { Toast } from "../../types/Toast.type";
import { ToastContextType } from "../../types/ToastContext.type";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Toast) => {
        setToasts((prevToasts) => [...prevToasts, { ...toast }]);
        setTimeout(() => removeToast(toast.id), toast.delay ? toast.delay : 3000);
    };

    const removeToast = (id?: string, force: boolean = false) => {
        setToasts((prevToasts) =>
            prevToasts.map((toast) => {
                if (toast.id === id) {
                    if (!force && !toast.isDeleted) {
                        setTimeout(() => removeToast(toast.id, true), 300);

                        return { ...toast, isDeleted: true };
                    }

                    return undefined;
                }

                return toast;
            }).filter(Boolean) as Toast[]
        );
    };

    const base = (props: Toast) => {
        addToast({ ...props, id: nanoid(), type: 'base' });
    };

    const error = (props: Toast) => {
        addToast({ ...props, id: nanoid(), type: 'error' });
    };

    const success = (props: Toast) => {
        addToast({ ...props, id: nanoid(), type: 'success' });
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast, toasts, base, error, success }}>
            { children }
            <Toasts />
        </ToastContext.Provider>
    );
};