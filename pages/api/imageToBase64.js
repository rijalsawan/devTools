import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false, // Required for file uploads
    },
};

// Parse file uploads with Formidable
const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({ keepExtensions: true });

        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve(files);
        });
    });
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const files = await parseForm(req);
        const uploadedFile = files.file;

        if (!uploadedFile) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = Array.isArray(uploadedFile) ? uploadedFile[0].filepath : uploadedFile.filepath;
        const fileBuffer = fs.readFileSync(filePath);

        // Convert to Base64
        const base64String = `data:${uploadedFile.mimetype};base64,${fileBuffer.toString('base64')}`;

        res.status(200).json({ base64: base64String });
    } catch (error) {
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
}
