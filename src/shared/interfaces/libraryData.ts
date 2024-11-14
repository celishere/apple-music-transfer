interface AlbumArtwork {
    width: number;
    height: number;
    url: string;
    hasP3: boolean;
}

interface PlayParams {
    id: string;
    kind: string;
    isLibrary: boolean;
}

interface AlbumAttributes {
    trackCount: number;
    genreNames: string[];
    releaseDate: string;
    name: string;
    artistName: string;
    artwork: AlbumArtwork;
    playParams: PlayParams;
    dateAdded: string;
}

export interface AlbumData {
    id: string;
    type: string;
    href: string;
    attributes: AlbumAttributes;
}

export interface LibraryData {
    next?: string;
    data: AlbumData[];
}