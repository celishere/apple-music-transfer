import axios from "axios";

import { AlbumData, LibraryData } from "@/shared/interfaces/libraryData";

export interface AuthHeaders {
    authorization: string;
    'media-user-token': string;
}

const APPLE_MUSIC_HOMEPAGE_URL = 'https://beta.music.apple.com';
const APPLE_MUSIC_LIBRARY_URL = 'https://amp-api.music.apple.com/v1/me/library';
const RECENTLY_ADDED_URL = `${APPLE_MUSIC_LIBRARY_URL}/recently-added`;
const GET_ALBUM_URL = `${APPLE_MUSIC_LIBRARY_URL}/albums`;

export const getSession = async (token: string): Promise<AuthHeaders> => {
    const { data } = await axios.get(APPLE_MUSIC_HOMEPAGE_URL, {
        headers: {
            'media-user-token': token,
            'origin': APPLE_MUSIC_HOMEPAGE_URL
        }
    });

    const indexJsUri = data.match("/(assets/index-legacy-[^/]+\.js)")![1];
    const indexJsPage = await axios.get(`${APPLE_MUSIC_HOMEPAGE_URL}/${indexJsUri}`);

    const bearerToken = indexJsPage.data.match('(?=eyJh)(.*?)(?=")')![1];

    return {
        authorization: `Bearer ${bearerToken}`,
        'media-user-token': token
    }
}

export const getRecentlyAdded = async (authHeaders: AuthHeaders, after: number) =>
    axios.get<LibraryData>(RECENTLY_ADDED_URL, {
        params: {
            'limit': 25,
            'offset': after
        },
        headers: {
            ...authHeaders,
            origin: 'https://music.apple.com'
        }
    });

export const getAlbum = async (authHeaders: AuthHeaders, albumId: string) =>
    axios.get<AlbumData>(`${GET_ALBUM_URL}/${albumId}`, {
        headers: {
            ...authHeaders,
            origin: 'https://music.apple.com'
        }
    });

export const addSong = async (authHeaders: AuthHeaders, songId: number) =>
    axios.post(`https://amp-api.music.apple.com/v1/me/library`, '', {
        headers: {
            ...authHeaders,
            origin: 'https://music.apple.com'
        },
        params: {
            'art%5Burl%5D': 'f',
            'format%5Bresources%5D': 'map',
            'ids%5Bsongs%5D': songId,
            'representation': 'ids'
        }
    });