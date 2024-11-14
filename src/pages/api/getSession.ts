import { NextApiRequest, NextApiResponse } from "next";
import { Files, IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

import { useMediaUserToken } from "@/shared/lib/hooks/useMediaUserToken";
import { getSession } from "@/shared/api/api";

export const config = {
    api: {
        bodyParser: false,
    }
};

interface IFile {
    filepath: string;
}

interface IFormData {
    files: Files
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const data: IFormData = await new Promise((resolve, reject) => {
            const form = new IncomingForm();

            form.parse(req, (err, _, files) => {
                if (err) return reject(err);
                resolve({files});
            });
        });

        try {
            const files = data.files;
            if (!files.cookiesRaw || files.cookiesRaw?.length === 0) throw new Error('Cookie file not found.');

            const cookies = files.cookiesRaw[0] as unknown as IFile;
            const cookiesPath = cookies.filepath;

            const fileData = await fs.readFile(cookiesPath);
            const content = fileData.toString();

            const mediaUserToken = useMediaUserToken(content);
            if (!mediaUserToken) throw new Error('Wrong auth.');

            const authHeaders = await getSession(mediaUserToken);

            res.status(200).json(authHeaders);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}