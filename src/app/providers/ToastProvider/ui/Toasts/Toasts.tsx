import { FC } from "react";

import Image from "next/image";

import { useToast } from "@/shared/lib/hooks/useToast";

import cls from "./Toasts.module.scss";

export const Toasts: FC = () => {
    const { toasts, removeToast } = useToast();

    const latestToasts = toasts.slice(-3);

    return (
        <div className={ cls.ToastsContainer }>
            <div className={ cls.Toasts }>
                { latestToasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`${cls.Toast} ${cls[toast.type + 'Container']} ${toast.isDeleted ? cls.ToastHide : ''}`}
                        onClick={() => removeToast(toast.id)}
                    >
                        {
                            toast.icon && (
                                <Image
                                    src={ toast.icon }
                                    width={ 50 }
                                    height={ 50 }
                                    alt={ toast.message }
                                />
                            )
                        }
                        <div className={ cls[toast.type + 'Text'] }>
                            <a>{ toast.message }</a>

                            {toast.subtitle && <span>{ toast.subtitle }</span>}
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}