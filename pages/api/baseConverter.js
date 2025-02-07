export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { value, fromBase, toBase } = req.query;

    if (!value || !fromBase || !toBase) {
        return res.status(400).json({ error: 'Value, fromBase, and toBase are required.' });
    }

    const fromBaseInt = parseInt(fromBase, 10);
    const toBaseInt = parseInt(toBase, 10);

    if (isNaN(fromBaseInt) || isNaN(toBaseInt) || fromBaseInt < 2 || toBaseInt < 2 || fromBaseInt > 36 || toBaseInt > 36) {
        return res.status(400).json({ error: 'Invalid base. Supported bases: 2 to 36.' });
    }

    try {
        // Convert input number to decimal (base 10)
        const decimalValue = parseInt(value, fromBaseInt);

        if (isNaN(decimalValue)) {
            return res.status(400).json({ error: 'Invalid number format for the selected base.' });
        }

        // Convert from decimal to the desired base
        const convertedValue = decimalValue.toString(toBaseInt).toUpperCase();

        res.status(200).json({ result: convertedValue });
    } catch (error) {
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
}
