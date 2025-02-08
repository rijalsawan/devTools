import { useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
    const [params, setParams] = useState([{ key: "", value: "" }]);
    const [jsonOutput, setJsonOutput] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [error, setError] = useState(null);

    // Handle input changes for key-value pairs
    const handleChange = (index, field, value) => {
        const newParams = [...params];
        newParams[index][field] = value;
        setParams(newParams);
    };

    // Add new key-value input field
    const addParam = () => {
        setParams([...params, { key: "", value: "" }]);
    };

    // Remove a key-value input field
    const removeParam = (index) => {
        const newParams = params.filter((_, i) => i !== index);
        setParams(newParams);
    };

    // Convert params to JSON
    const handleConvert = async () => {
        setError(null);
        setDownloadUrl(null);

        const queryParams = params
            .filter((param) => param.key.trim() !== "" && param.value.trim() !== "")
            .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
            .join("&");

        if (!queryParams) {
            setError("Please add at least one valid key-value pair.");
            return;
        }

        try {
            const response = await fetch(`/api/queryToJson?${queryParams}`);
            const data = await response.json();

            if (response.ok) {
                setJsonOutput(data.json);
                setDownloadUrl(data.downloadUrl);
            } else {
                setError(data.error || "An error occurred.");
            }
        } catch (error) {
            setError("Failed to convert query parameters.");
        }
    };

    return (
        <>
        <Head>
                <title>Query to Json converter - Free & Instant</title>
                <meta name="description" content="convert query to Json instantly with our free online tool. Simple, fast, and user-friendly." />
            <meta name="keywords" content="query to json online free, query to json converter, query to json" />
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
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8 border-b pb-4">
                    Query Parameters to JSON
                    <p className="text-sm text-gray-500 font-normal mt-2">Convert Query Parameters to JSON format</p>
                </h1>

                <div className="space-y-4">
                    {params.map((param, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Key"
                                value={param.key}
                                onChange={(e) => handleChange(index, "key", e.target.value)}
                                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={param.value}
                                onChange={(e) => handleChange(index, "value", e.target.value)}
                                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            <button
                                onClick={() => removeParam(index)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            onClick={addParam}
                            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Parameter
                        </button>
                        <button
                            onClick={handleConvert}
                            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Convert to JSON
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {jsonOutput && (
                        <div className="mt-6">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">JSON Output:</h2>
                                <pre className="bg-white p-4 rounded-lg overflow-x-auto text-sm border-2 border-gray-200">
                                    {JSON.stringify(jsonOutput, null, 2)}
                                </pre>

                                <div className="flex justify-center gap-4 mt-4">
                                    <button
                                        onClick={() => navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2))}
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                        </svg>
                                        Copy JSON
                                    </button>

                                    {downloadUrl && (
                                        <a
                                            href={downloadUrl}
                                            download="queryData.json"
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                            </svg>
                                            Download JSON File
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
