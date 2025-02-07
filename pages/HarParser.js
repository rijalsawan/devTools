import { useState } from "react";

export default function Home() {
    const [file, setFile] = useState(null);
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
        setEntries([]);
        setError(null);
    };

    const handleParse = async () => {
        if (!file) {
            setError("Please upload a HAR file.");
            return;
        }

        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/harParser", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setEntries(data.entries);
            } else {
                setError(data.error || "Failed to parse HAR file.");
            }
        } catch {
            setError("Error occurred while processing.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">HAR File Viewer</h1>

            <input
                type="file"
                accept=".har"
                onChange={handleFileUpload}
                className="mb-4 border p-2 rounded"
            />

            <button
                onClick={handleParse}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Parse HAR File
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {entries.length > 0 && (
                <div className="mt-4 p-4 border rounded w-full max-w-2xl bg-gray-100">
                    <h2 className="text-lg font-bold">Parsed Requests</h2>

                    <input
                        type="text"
                        placeholder="Filter by method, URL, status..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded w-full mb-4"
                    />

                    <ul className="space-y-2">
                        {entries
                            .filter(entry => 
                                entry.method.includes(filter) || 
                                entry.url.includes(filter) || 
                                String(entry.status).includes(filter)
                            )
                            .map((entry, index) => (
                                <li key={index} className="p-3 bg-white border rounded shadow">
                                    <p><strong>Method:</strong> {entry.method}</p>
                                    <p><strong>URL:</strong> {entry.url}</p>
                                    <p><strong>Status:</strong> {entry.status} ({entry.statusText})</p>
                                    <p><strong>Response Size:</strong> {entry.responseBodySize} bytes</p>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
