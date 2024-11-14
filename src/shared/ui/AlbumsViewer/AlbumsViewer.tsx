import { useEffect } from "react";

import { AlbumCard } from "@/shared/ui/AlbumCard";

import useGlobalStore from "@/entities/Global/store/useGlobalStore";

import cls from "./AlbumsViewer.module.scss";

export const AlbumsViewer = () => {
    const state = useGlobalStore();

    useEffect(() => {
        state.setStep(3);
    }, []);

    if (!state.albums) return null;

    const nextStep = () => state.setStep(4);

    return (
        <div className={cls.AlbumsViewerBox}>
            <div className={cls.AlbumsViewer}>
                <div className={cls.AlbumsViewerScroll}>
                    {state.albums.map((album, index) => {
                        if (!album.data) return;

                        const attributes = album.data[0].attributes;
                        const relationships = album.data[0].relationships;

                        return (
                            <AlbumCard
                                key={index}
                                attributes={attributes}
                                relationships={relationships}
                            />
                        )
                    })}
                </div>

                <button
                    className={cls.AlbumsViewerBtn}
                    onClick={nextStep}
                >
                    Transfer
                </button>
            </div>
        </div>
    )
}