import { SuccessIcon } from "@/shared/icons/SuccessIcon";

import useGlobalStore from "@/entities/Global/store/useGlobalStore";

import cls from "./EndScreen.module.scss";

export const EndScreen = () => {
    const state = useGlobalStore();

    const reset = () => state.reset();

    return (
        <div className={cls.EndScreenBox}>
            <div className={cls.EndScreen}>
                <SuccessIcon />

                <span>Successful transfer</span>

                <button onClick={reset}>Back to home</button>
            </div>
        </div>
    );
}