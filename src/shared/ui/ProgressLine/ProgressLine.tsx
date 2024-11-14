import cls from "./ProgressLine.module.scss";

interface ProgressLineProps {
    active: boolean;
}

export const ProgressLine = ({ active }: ProgressLineProps) => {
    return (
        <div className={cls.lineContainer}>
            <div className={`
                ${cls.line}
                ${active ? cls.active : ''}
            `} />
        </div>
    );
};