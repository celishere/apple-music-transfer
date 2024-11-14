import Image from "next/image";

import cls from "./ErrorLayout.module.scss";

const ERROR_EMOJI = "%F0%9F%98%B5";

export const ErrorLayout = () => {
    const reloadPage = () => location.reload();

    return (
        <div className={cls.ErrorPage}>
            <Image
                src={`https://emojicdn.elk.sh/${ERROR_EMOJI}`}
                alt="Hero"
                width={60}
                height={60}
            />

            <div>
                <a>Something went wrong</a>
            </div>

            <button onClick={reloadPage}>
                Refresh page
            </button>
        </div>
    )
}