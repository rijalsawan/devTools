import { useState } from "react";
import Head from "next/head";

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
        <>
        <Head>
                <title>Har Parser - Free & Instant</title>
                <meta name="description" content="parse har files instantly with our free online converter. Simple, fast, and user-friendly." />
                <meta name="keywords" content="parse har files, Free har parsing online tool" />
                <meta name="robots" content="index, follow" />
            </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 md:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8 border-b pb-4">
                    HAR File Viewer
                    <p className="text-sm text-gray-500 font-normal mt-2">HTTP Archive Format Parser</p>
                </h1>

                <div className="space-y-6">
                    <div className="relative">
                        <input
                            type="file"
                            accept=".har"
                            onChange={handleFileUpload}
                            className="file:border-none file:bg-blue-500 file:text-white file:rounded-md file:px-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleParse}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Parse HAR File
                    </button>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {entries.length > 0 && (
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Filter by method, URL, status..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            />

                            <ul className="space-y-4">
                                {entries
                                    .filter(entry => 
                                        entry.method.includes(filter) || 
                                        entry.url.includes(filter) || 
                                        String(entry.status).includes(filter)
                                    )
                                    .map((entry, index) => (
                                        <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm border">
                                            <p className="font-medium">Method: <span className="text-blue-600">{entry.method}</span></p>
                                            <p className="text-gray-700 break-all">URL: {entry.url}</p>
                                            <p className="text-gray-700">Status: {entry.status} ({entry.statusText})</p>
                                            <p className="text-gray-700">Response Size: {entry.responseBodySize} bytes</p>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
