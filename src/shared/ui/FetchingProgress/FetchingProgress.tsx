import { useEffect, useState } from "react";

import axios from "axios";
import axiosRetry from "axios-retry";

import useGlobalStore from "@/entities/Global/store/useGlobalStore";

import { LoaderIcon } from "@/shared/icons/LoaderIcon";

import { AlbumCard } from "@/shared/ui/AlbumCard";

import { FullAlbumData } from "@/shared/interfaces/albumData";
import { LibraryData } from "@/shared/interfaces/libraryData";

import cls from "./FetchingProgress.module.scss";

export const FetchingProgress = () => {
    const state = useGlobalStore();

    const client = axios.create();
    axiosRetry(client, { retries: 3 });

    const [isLoading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [after, setAfter] = useState(0);
    const [albums, setAlbums] = useState<FullAlbumData[]>([]);

    const filterAlbumData = (albumData: FullAlbumData): FullAlbumData | null => {
        if (!albumData.data?.[0]?.relationships?.tracks?.data) {
            return null;
        }

        const filteredTracks = albumData.data[0].relationships.tracks.data.filter(
            track => track.attributes?.playParams?.reporting === true
        );

        if (filteredTracks.length === 0) {
            return null;
        }

        return {
            ...albumData,
            data: [{
                ...albumData.data[0],
                relationships: {
                    ...albumData.data[0].relationships,
                    tracks: {
                        ...albumData.data[0].relationships.tracks,
                        data: filteredTracks,
                        meta: {
                            total: filteredTracks.length
                        }
                    }
                }
            }]
        };
    };

    useEffect(() => {
        if (!isLoading) {
            state.setAlbums(albums);
            state.setStep(3);
            return;
        }

        client.get<LibraryData>('/api/getRecentlyAdded', {
            params: { after },
            headers: { ...state.authData }
        })
            .then(async(response) => {
                const { data } = response.data;
                const filteredData = data.filter(entry => entry.type !== "library-playlists");

                const albumPromises = filteredData.map(entry =>
                    client.get<FullAlbumData>('/api/getAlbum', {
                        params: { id: entry.id },
                        headers: { ...state.authData }
                    })
                        .then(albumResponse => {
                            const filteredAlbum = filterAlbumData(albumResponse.data);

                            if (filteredAlbum) {
                                setAlbums(prevState => [...prevState, filteredAlbum]);
                            }

                            setProgress(prevState => prevState + 1);
                            return filteredAlbum;
                        })
                        .catch(error => {
                            console.error("Error fetching album:", error);
                            return null;
                        })
                );

                await Promise.all(albumPromises);
                setAfter(prevState => prevState + 25);

                if (!response.data.next) {
                    setLoading(false);
                }
            }).catch(error => console.error(error));
    }, [after]);

    return (
        <div className={cls.FetchingProgressBox}>
            <div className={cls.FetchingProgress}>
                {
                    albums.length > 0 ? (
                        <AlbumCard
                            attributes={albums[albums.length - 1].data[0].attributes}
                            relationships={albums[albums.length - 1].data[0].relationships}
                            hideCollapse
                        />
                    ) : <div style={{ height: "68px" }}/>
                }

                <LoaderIcon />
                <a>{ progress } albums processed</a>
            </div>
        </div>
    );
}