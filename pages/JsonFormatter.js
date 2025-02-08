import { useState } from "react";
import Head from "next/head";
import Script from "next/script";
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
        <>
        <Head>
                <title>Json Formatter - Free & Instant</title>
                <meta name="description" content="format Json instantly with our free online tool. Simple, fast, and user-friendly." />
                <meta name="keywords" content="Json formatter online free, json formatter" />
                <meta name="robots" content="index, follow" />
            </Head>
            {/* Google Tag (gtag.js) */}
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-52R3J5ZQW2"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-52R3J5ZQW2', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 md:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8 border-b pb-4">
                    JSON Formatter
                    <p className="text-sm text-gray-500 font-normal mt-2">Beautify & Format JSON</p>
                </h1>

                <div className="space-y-6">
                    <textarea
                        placeholder="Enter JSON here..."
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors focus:outline-none focus:border-blue-500 h-40"
                    />

                    <button
                        onClick={handleFormat}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Format JSON
                    </button>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {formattedJson && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Formatted JSON:</h2>
                            <pre className="whitespace-pre-wrap break-words bg-white p-4 rounded-lg border border-gray-200">{formattedJson}</pre>

                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <button
                                    onClick={handleCopy}
                                    className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    📋 Copy to Clipboard
                                </button>

                                {downloadUrl && (
                                    <a
                                        href={downloadUrl}
                                        download="formatted.json"
                                        className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    >
                                        📥 Download JSON
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
