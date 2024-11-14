interface ResourceLink {
    id: string;
    type: string;
    href: string;
}

interface Artwork {
    width: number;
    height: number;
    url: string;
    hasP3: boolean;
}

interface PlayParams {
    id: string;
    kind: string;
    isLibrary?: boolean;
    reporting?: boolean;
    catalogId?: string;
    reportingId?: string;
}

export interface AlbumAttributes {
    trackCount: number;
    genreNames: string[];
    releaseDate: string;
    name: string;
    artistName: string;
    artwork: Artwork;
    dateAdded: string;
    playParams: PlayParams;
}

interface SongAttributes extends AlbumAttributes {
    discNumber: number;
    albumName: string;
    hasLyrics: boolean;
    trackNumber: number;
    durationInMillis: number;
}

interface ArtistAttributes {
    name: string;
    url?: string;
}

export interface AlbumRelationships {
    tracks: {
        href: string;
        data: Album[];
        meta?: { total: number };
    };
    catalog?: { href: string; data: ResourceLink[] };
    artists?: { href: string; data: ResourceLink[] };
}

interface SongRelationships {
    catalog: {
        href: string;
        data: ResourceLink[];
    };
}

interface Album {
    id: string;
    type: string;
    href: string;
    attributes: AlbumAttributes;
    relationships: AlbumRelationships;
}

interface Song {
    id: string;
    type: string;
    href: string;
    attributes: SongAttributes;
    relationships: SongRelationships;
}

interface Artist {
    id: string;
    type: string;
    href: string;
    attributes: ArtistAttributes;
}

export interface FullAlbumData {
    data: Album[];
    resources: {
        'library-albums': Record<string, Album>;
        'library-artists': Record<string, Artist>;
        'library-songs': Record<string, Song>;
    };
}