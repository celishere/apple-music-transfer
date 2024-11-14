import { NextApiRequest, NextApiResponse } from "next";

import { AuthHeaders, getRecentlyAdded } from "@/shared/api/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const after = Number(req.query.after ?? 0);

            const authHeaders: AuthHeaders = {
                authorization: req.headers.authorization ?? '',
                'media-user-token': req.headers['media-user-token'] as string
            };

            const response = await getRecentlyAdded(authHeaders, after);

            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: (error as Error).message });
            return;
        }
    }
}