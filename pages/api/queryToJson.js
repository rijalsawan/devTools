export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const queryParams = req.query;

    if (Object.keys(queryParams).length === 0) {
        return res.status(400).json({ error: 'No query parameters provided.' });
    }

    const jsonData = JSON.stringify(queryParams, null, 2);

    // ✅ Return JSON instead of writing to a file
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
        message: 'Query parameters converted to JSON successfully',
        json: JSON.parse(jsonData),
    });
}
