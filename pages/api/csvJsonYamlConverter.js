import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import csvtojson from 'csvtojson';
import { parse as jsonToCsv } from 'json2csv';
import yaml from 'js-yaml';

export const config = {
    api: {
        bodyParser: false,
    },
};

// Function to parse uploaded file
const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({ keepExtensions: true, multiples: false });
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

async function convertCsvToJson(filePath) {
    return await csvtojson().fromFile(filePath);
}

function convertYamlToJson(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContent);
}

function convertJsonToCsv(jsonData) {
    return jsonToCsv(jsonData);
}

function convertJsonToYaml(jsonData) {
    return yaml.dump(jsonData);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { fields, files } = await parseForm(req);
        const uploadedFile = files.file;

        // ✅ Fix: Extract `outputFormat` as a clean string
        let outputFormat = fields.outputFormat;
        if (Array.isArray(outputFormat)) {
            outputFormat = outputFormat[0]; // Extract first value if array
        }
        outputFormat = String(outputFormat || "").trim().toLowerCase(); // Convert to string & lowercase

        console.log("Received output format:", outputFormat); // Debugging

        if (!uploadedFile) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = Array.isArray(uploadedFile) ? uploadedFile[0].filepath : uploadedFile.filepath;
        if (!fs.existsSync(filePath)) {
            return res.status(500).json({ error: 'Conversion failed', details: 'File does not exist after upload.' });
        }

        const ext = path.extname(filePath).toLowerCase();
        let jsonData;
        let outputData;
        let outputExt;

        // ✅ Fix: Ensure YAML to JSON conversion works properly
        if (ext === '.yaml' || ext === '.yml') {
            jsonData = convertYamlToJson(filePath);
            outputExt = '.json';
            outputData = JSON.stringify(jsonData, null, 2);
        } 
        // ✅ Fix: Ensure JSON to CSV/YAML conversion works
        else if (ext === '.json') {
            const rawJson = fs.readFileSync(filePath, 'utf8');
            jsonData = JSON.parse(rawJson);

            if (outputFormat === 'csv') {
                outputExt = '.csv';
                outputData = convertJsonToCsv(jsonData);
            } else if (outputFormat === 'yaml') {
                outputExt = '.yaml';
                outputData = convertJsonToYaml(jsonData);
            } else {
                return res.status(400).json({ error: 'Invalid output format. Use csv or yaml.' });
            }
        } 
        // ✅ Fix: Ensure CSV to JSON conversion works
        else if (ext === '.csv') {
            jsonData = await convertCsvToJson(filePath);
            outputExt = '.json';
            outputData = JSON.stringify(jsonData, null, 2);
        } 
        else {
            return res.status(400).json({ error: 'Unsupported file format. Use CSV, YAML, or JSON.' });
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const outputFilePath = path.join(uploadDir, `converted${outputExt}`);
        fs.writeFileSync(outputFilePath, outputData);

        return res.status(200).json({
            message: 'File converted successfully',
            downloadUrl: `/uploads/converted${outputExt}`,
        });

    } catch (error) {
        return res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
}
