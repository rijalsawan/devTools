export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { value, action } = req.query;

    if (!value) {
        return res.status(400).json({ error: 'Value is required for conversion.' });
    }

    let result;

    if (action === 'hexToRgb') {
        // Convert HEX to RGB
        const hex = value.replace("#", "");
        if (hex.length !== 3 && hex.length !== 6) {
            return res.status(400).json({ error: 'Invalid HEX format.' });
        }

        const bigint = parseInt(hex.length === 3 ? hex.split("").map(c => c + c).join("") : hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        result = `rgb(${r}, ${g}, ${b})`;
    } else if (action === 'rgbToHex') {
        // Convert RGB to HEX
        const rgbMatch = value.match(/\d+/g);
        if (!rgbMatch || rgbMatch.length !== 3) {
            return res.status(400).json({ error: 'Invalid RGB format.' });
        }

        const r = Math.min(255, Math.max(0, parseInt(rgbMatch[0])));
        const g = Math.min(255, Math.max(0, parseInt(rgbMatch[1])));
        const b = Math.min(255, Math.max(0, parseInt(rgbMatch[2])));

        result = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
    } else {
        return res.status(400).json({ error: 'Invalid action. Use hexToRgb or rgbToHex.' });
    }

    res.status(200).json({ result });
}
