export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text, action } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'Text is required for encoding/decoding.' });
    }

    let result;
    
    if (action === 'encode') {
        result = encodeURIComponent(text);
    } else if (action === 'decode') {
        result = decodeURIComponent(text);
    } else {
        return res.status(400).json({ error: 'Invalid action. Use encode or decode.' });
    }

    res.status(200).json({ result });
}
