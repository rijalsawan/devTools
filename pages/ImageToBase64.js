import { useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState("");
    const [error, setError] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
        setBase64("");
        setError(null);
    };

    const handleConvert = async () => {
        if (!file) {
            setError("Please upload an image.");
            return;
        }

        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/imageToBase64", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setBase64(data.base64);
            } else {
                setError(data.error || "Conversion failed.");
            }
        } catch {
            setError("Error occurred while converting.");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(base64);
        alert("Base64 copied to clipboard!");
    };

    const handleDownload = () => {
        const blob = new Blob([base64], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "base64.txt";
        link.click();
    };

    return (
        <>
        <Head>
                <title>convert Image to base64 - Free & Instant</title>
                <meta name="description" content="convert img to base64 instantly with our free online tool. Simple, fast, and user-friendly." />
                <meta name="keywords" content="convert img to base64 free online, img to base64" />
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
                    Image to Base64
                    <p className="text-sm text-gray-500 font-normal mt-2">Convert your images to Base64</p>
                </h1>

                <div className="space-y-6">
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="file:border-none file:bg-blue-500 file:text-white file:rounded-md file:px-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleConvert}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Convert to Base64
                    </button>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {base64 && (
                        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                            <h2 className="text-lg font-bold text-gray-800">Base64 Output:</h2>
                            <textarea
                                readOnly
                                value={base64}
                                className="w-full h-40 border p-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>

                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={handleCopy}
                                    className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    📋 Copy
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    📥 Download
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
