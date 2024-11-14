import { useEffect, useState } from "react";

import axios from "axios";
import axiosRetry from "axios-retry";

import { AlbumAttributes, FullAlbumData } from "@/shared/interfaces/albumData";

import useGlobalStore from "@/entities/Global/store/useGlobalStore";

import { useToast } from "@/shared/lib/hooks/useToast";

import { AlbumCard } from "@/shared/ui/AlbumCard";
import { ProgressBar } from "@/shared/ui/ProgressBar";

import { LoaderIcon } from "@/shared/icons/LoaderIcon";

import cls from "./TransferProgress.module.scss";

export const TransferProgress = () => {
    const state = useGlobalStore();
    const client = axios.create();
    axiosRetry(client, { retries: 15 });

    const toasts = useToast();

    const [isLoading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentAlbum, setCurrentAlbum] = useState<FullAlbumData>();
    const [currentSong, setCurrentSong] = useState<AlbumAttributes>();

    const currentProgress = Math.floor(progress / (state.albums?.length ?? 0) * 100);

    const processAlbum = async (album: FullAlbumData) => {
        setCurrentAlbum(album);

        const tracks = album.data[0].relationships.tracks.data;

        for (const track of tracks) {
            try {
                setCurrentSong(track.attributes);

                await client.post('/api/addSong', '', {
                    params: {
                        songId: track.attributes.playParams.catalogId
                    },
                    headers: {
                        ...state.transferAuthData
                    }
                });
            } catch (error) {
                toasts.error({ message: `Error processing track ${track.id}` });
                console.error(`Error processing track ${track.id}:`, error);
            }
        }
    };

    useEffect(() => {
        const processAllAlbums = async () => {
            try {
                if (!state.albums?.length) {
                    setLoading(false);
                    return;
                }

                for (const album of state.albums.reverse()) {
                    await processAlbum(album);

                    setProgress(prev => prev + 1);
                }
            } catch (error) {
                toasts.error({ message: `Error processing albums` });
                console.error(`Error processing album:`, error);
            } finally {
                setLoading(false);
                state.setStep(6);
            }
        };

        processAllAlbums();
    }, [state.albums]);

    return (
        <div className={cls.FetchingProgressBox}>
            <div className={cls.FetchingProgress}>
                {currentAlbum && (
                    <div className={cls.FetchingProgressAlbumInfo}>
                        <AlbumCard
                            attributes={currentAlbum.data[0].attributes}
                            relationships={currentAlbum.data[0].relationships}
                            hideCollapse
                        />

                        <span className={cls.FetchingProgressSongName}>{currentSong?.name}</span>
                    </div>
                )}

                {
                    isLoading && (
                        <>
                            <LoaderIcon />

                            <div className={cls.FetchingProgressBar}>
                                <ProgressBar progress={currentProgress} />
                                <span>{currentProgress}%</span>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};