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
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Parse HAR file content
        const harData = JSON.parse(fileContent);

        // Extract HTTP request/response details
        const entries = harData.log.entries.map(entry => ({
            method: entry.request.method,
            url: entry.request.url,
            status: entry.response.status,
            statusText: entry.response.statusText,
            requestHeaders: entry.request.headers,
            responseHeaders: entry.response.headers,
            responseBodySize: entry.response.bodySize
        }));

        res.status(200).json({ entries });
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse HAR file', details: error.message });
    }
}
