import { Steps } from "@/shared/ui/Steps";

import { CookiesUploader } from "@/shared/ui/CookiesUploader";
import { FetchingProgress } from "@/shared/ui/FetchingProgress";
import { AlbumsViewer } from "@/shared/ui/AlbumsViewer";
import { TransferProgress } from "@/shared/ui/TransferProgress";
import { EndScreen } from "@/shared/ui/EndScreen";
import { Guide } from "@/shared/ui/Guide";
import { GithubLink } from "@/shared/ui/GithubLink";

import useGlobalStore from "@/entities/Global/store/useGlobalStore";

import cls from "./MainLayout.module.scss";

export const MainLayout = () => {
    const state = useGlobalStore();

    const renderStep = () => {
        switch (state.step) {
            case 1:
                return (
                    <>
                        <CookiesUploader />
                        <Guide />
                    </>
                );
            case 2:
                return <FetchingProgress />;
            case 3:
                return <AlbumsViewer />;
            case 4:
                return (
                    <>
                        <CookiesUploader isUploading />
                        <Guide isUploading />
                    </>
                );
            case 5:
                return <TransferProgress />;
            case 6:
                return <EndScreen />
            default:
                return null;
        }
    }

    return (
        <div className={cls.MainLayout}>
            <GithubLink />
            <Steps />

            {renderStep()}
        </div>
    )
};