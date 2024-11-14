import { useState } from "react";

import Image from "next/image";

import { AlbumAttributes, AlbumRelationships } from "@/shared/interfaces/albumData";

import { CollapseIcon } from "@/shared/icons/CollapseIcon";

import cls from "./AlbumCard.module.scss";

interface AlbumCardProps {
    attributes: AlbumAttributes;
    relationships: AlbumRelationships;
    hideCollapse?: boolean;
}

export const AlbumCard = (props: AlbumCardProps) => {
    const { attributes, relationships, hideCollapse = false } = props;
    const [collapsed, setCollapsed] = useState(false);

    const convertUrl = attributes.artwork ?
        attributes.artwork.url
            .replace("{w}", "240")
            .replace("{h}", "240") : "";

    const collapse = () => !hideCollapse && setCollapsed(prevState => !prevState);

    return (
        <div className={cls.AlbumCardEntity}>
            <div className={cls.AlbumCardBox}>
                <div className={cls.AlbumCard}>
                    {attributes.artwork && (
                            <Image
                                src={convertUrl}
                                alt=""
                                width={60}
                                height={60}
                                loading="eager"
                                unoptimized
                                draggable={false}
                            />
                        )
                    }

                    <div className={cls.AlbumCardMetadata}>
                        <span>{attributes.name}</span>
                        <span>{attributes.artistName}</span>
                    </div>
                </div>

                {!hideCollapse && (
                    <button onClick={collapse} data-open={collapsed ? "true" : "false"}>
                        <CollapseIcon/>
                    </button>
                )}
            </div>

            <div className={cls.AlbumCardSpoilerItem} data-open={collapsed ? "true" : "false"}>
                {relationships.tracks.data.map((track, index) => (
                        <span key={index}>{index + 1}. {track.attributes.name}</span>
                    ))
                }
            </div>
        </div>
    )
}