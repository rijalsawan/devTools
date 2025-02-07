import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false, // ✅ Required for file uploads
    },
};

// Function to convert .env content to Netlify TOML format
function convertEnvToToml(envContent) {
    const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    let tomlContent = "[build]\n  command = \"npm run build\"\n  functions = \"functions\"\n\n[context.production.environment]\n";

    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            tomlContent += `  ${key.trim()} = "${value.trim()}"\n`;
        }
    });

    return tomlContent;
}

// Function to parse file uploads with Formidable
const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({ keepExtensions: true, multiples: false });

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
        
        // ✅ Fix: Extract file correctly from Formidable
        const uploadedFile = files.file;
        
        if (!uploadedFile) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // ✅ Fix: Check if `uploadedFile` is an array (Formidable v3 behavior)
        const filePath = Array.isArray(uploadedFile) ? uploadedFile[0].filepath : uploadedFile.filepath;

        if (!filePath) {
            return res.status(500).json({ error: 'Failed to retrieve uploaded file path.' });
        }

        // ✅ Read .env file content
        const envContent = fs.readFileSync(filePath, 'utf8');
        const tomlContent = convertEnvToToml(envContent);

        // ✅ Ensure public directory exists
        const uploadDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // ✅ Save netlify.toml file
        const outputFilePath = path.join(uploadDir, 'netlify.toml');
        fs.writeFileSync(outputFilePath, tomlContent);

        res.status(200).json({
            message: 'Converted successfully',
            downloadUrl: '/netlify.toml',
        });
    } catch (error) {
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
}
