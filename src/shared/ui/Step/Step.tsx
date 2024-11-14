import cls from "./Step.module.scss";

interface StepProps {
    number: number;
    active?: boolean;
    completed?: boolean;
    small?: boolean;
}

export const Step = ({ number, active = false, completed = false, small = false }: StepProps) => {
    return (
        <div className={cls.stepWrapper}>
            <div className={`
                ${cls.step}
                ${active ? cls.active : ''}
                ${completed ? cls.completed : ''}
                ${small ? cls.small : ''}
            `}>
                <span>{number}</span>
            </div>
        </div>
    );
};