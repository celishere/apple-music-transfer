import { useStore } from "zustand";

import { Step } from "@/shared/ui/Step";
import { ProgressLine } from "@/shared/ui/ProgressLine";

import useGlobalStore from "@/entities/Global/store/useGlobalStore";

import cls from "./Steps.module.scss";

export const Steps = () => {
    const store = useStore(useGlobalStore);
    const currentStep = store.step || 1;
    const steps = [1, 2, 3, 4, 5];

    return (
        <div className={cls.Steps}>
            <div className={cls.stepsContainer}>
                {steps.map((step, index) => (
                    <div key={step} className={cls.stepItem}>
                        <Step
                            number={step}
                            active={currentStep === step}
                            completed={currentStep > step}
                        />

                        {index < steps.length - 1 && (
                            <ProgressLine
                                active={currentStep > step}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}