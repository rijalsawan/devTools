export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { json } = req.body;

        if (!json) {
            return res.status(400).json({ error: 'JSON data is required.' });
        }

        // Format JSON
        const formattedJson = JSON.stringify(JSON.parse(json), null, 4);

        res.status(200).json({ formattedJson });
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON format.' });
    }
}
