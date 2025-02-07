import { useState } from "react";

export default function Home() {
    const [jsonInput, setJsonInput] = useState("");
    const [formattedJson, setFormattedJson] = useState("");
    const [error, setError] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);

    const handleFormat = async () => {
        setError(null);
        setDownloadUrl(null);

        if (!jsonInput.trim()) {
            setError("Please enter JSON data.");
            return;
        }

        try {
            const response = await fetch("/api/jsonFormatter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ json: jsonInput }),
            });

            const data = await response.json();

            if (response.ok) {
                setFormattedJson(data.formattedJson);
                generateDownloadLink(data.formattedJson);
            } else {
                setError(data.error || "Formatting failed.");
            }
        } catch {
            setError("Error occurred while formatting JSON.");
        }
    };

    const generateDownloadLink = (json) => {
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(formattedJson);
        alert("Formatted JSON copied to clipboard!");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">JSON Formatter</h1>

            <textarea
                placeholder="Enter JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="border p-2 rounded w-full max-w-lg h-40"
            />

            <button
                onClick={handleFormat}
                className="px-4 py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
            >
                Format JSON
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {formattedJson && (
                <div className="mt-4 p-4 border rounded w-full max-w-lg bg-gray-100">
                    <h2 className="text-lg font-bold">Formatted JSON:</h2>
                    <pre className="whitespace-pre-wrap break-words">{formattedJson}</pre>

                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            📋 Copy to Clipboard
                        </button>

                        {downloadUrl && (
                            <a
                                href={downloadUrl}
                                download="formatted.json"
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                📥 Download JSON
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
