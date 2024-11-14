import { NextApiRequest, NextApiResponse } from "next";

import { addSong, AuthHeaders } from "@/shared/api/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const songId = Number(req.query.songId ?? 0);

            const authHeaders: AuthHeaders = {
                authorization: req.headers.authorization ?? '',
                'media-user-token': req.headers['media-user-token'] as string
            };

            const response = await addSong(authHeaders, songId);

            if (response.status != 200) throw Error('Something went wrong');

            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: (error as Error).message });
            return;
        }
    }
}