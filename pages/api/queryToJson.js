import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Extract query parameters
    const queryParams = req.query;
    const jsonData = JSON.stringify(queryParams, null, 2);

    // Save JSON data to file
    const filePath = path.join(process.cwd(), 'public', 'queryData.json');
    fs.writeFileSync(filePath, jsonData);

    res.status(200).json({
        message: 'Query parameters converted and saved to JSON file',
        json: queryParams,
        downloadUrl: '/queryData.json',
    });
}
