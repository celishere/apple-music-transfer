import cls from "./ProgressBar.module.scss";

interface ProgressBarProps {
    progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <div
            className={cls.ProgressBar}
            style={{ backgroundSize: `${progress}% 100%` }}
        />
    );
}