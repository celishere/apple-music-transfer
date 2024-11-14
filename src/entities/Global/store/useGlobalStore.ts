import { create } from "zustand";

import { AuthHeaders } from "@/shared/api/api";
import { FullAlbumData } from "@/shared/interfaces/albumData";

interface GlobalState {
    authData?: AuthHeaders,
    transferAuthData?: AuthHeaders,
    albums?: FullAlbumData[],
    step: number,
    setStep: (data: number) => void;
    setAuth: (data: AuthHeaders) => void;
    setTransferAuth: (data: AuthHeaders) => void;
    setAlbums: (data: FullAlbumData[]) => void;
    reset: () => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
    step: 1,
    setStep: (data: number) => set(() => ({ step: data })),
    setAuth: (data: AuthHeaders) => set(() => ({ authData: data })),
    setTransferAuth: (data: AuthHeaders) => set(() => ({ transferAuthData: data })),
    setAlbums: (data: FullAlbumData[]) => set(() => ({ albums: data })),
    reset: () => set(() => ({
        authData: undefined,
        transferAuthData: undefined,
        albums: undefined,
        step: 1
    })),
}));

export default useGlobalStore;