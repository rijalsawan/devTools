import { useState } from "react";
import Head from "next/head";
import Script from "next/script";

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
        <>
        <Head>
                <title>.env to netlifytoml Converter - Free & Instant</title>
                <meta name="description" content="Convert .env to netlifytoml instantly with our free online converter. Simple, fast, and user-friendly." />
                <meta name="keywords" content=".env to netlifytoml, Free .env to netlifytoml online tool" />
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
                    File Converter
                    <p className="text-sm text-gray-500 font-normal mt-2">.env → TOML</p>
                </h1>

                <div className="space-y-6">
                    <div className="relative">
                        <input
                            type="file"
                            accept=".env"
                            onChange={handleFileUpload}
                            className="file:border-none file:bg-blue-500 file:text-white file:rounded-md file:px-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleConvert}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Convert to TOML
                    </button>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {downloadUrl && (
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <a
                                href={downloadUrl}
                                download
                                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                </svg>
                                Download netlify.toml
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
