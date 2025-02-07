import { useState } from "react";

export default function Home() {
    const [file, setFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [error, setError] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
        setDownloadUrl(null);
        setError(null);
    };

    const handleConvert = async () => {
        if (!file) {
            setError("Please upload a .env file.");
            return;
        }

        setError(null);
        setDownloadUrl(null);

        const formData = new FormData();
        formData.append("file", file); // ✅ Send file as FormData

        try {
            const response = await fetch("/api/envToToml", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setDownloadUrl(data.downloadUrl);
            } else {
                setError(data.error || "Conversion failed.");
            }
        } catch {
            setError("Error occurred while converting.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">.env to Netlify TOML Converter</h1>

            <input
                type="file"
                accept=".env"
                onChange={handleFileUpload}
                className="mb-4 border p-2 rounded"
            />

            <button
                onClick={handleConvert}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Convert to TOML
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {downloadUrl && (
                <div className="mt-4">
                    <a href={downloadUrl} download className="text-blue-500 underline">
                        📥 Download netlify.toml
                    </a>
                </div>
            )}
        </div>
    );
}
