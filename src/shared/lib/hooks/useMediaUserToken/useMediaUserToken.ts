interface Cookie {
    name: string;
    value: string;
    domain: string;
    expirationDate?: number;
    hostOnly: boolean;
    httpOnly: boolean;
    path: string;
    sameSite: string;
    secure: boolean;
    session: boolean;
    storeId: string;
}

export const useMediaUserToken = (cookiesRaw: string): string | undefined => {
    try {
        const cookies: Cookie[] = JSON.parse(cookiesRaw);

        const mediaUserToken = cookies.find(
            (cookie: Cookie) => cookie.name === 'media-user-token' &&
                cookie.domain.includes('.music.apple.com')
        )?.value;

        if (!mediaUserToken) {
            throw new Error('Media-User-Token not found');
        }

        return mediaUserToken;
    } catch (error) {
        console.error('Error extracting Media-User-Token:', error);
        return undefined;
    }
}