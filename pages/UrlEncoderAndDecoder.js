import { useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
    const [inputText, setInputText] = useState("");
    const [encodedText, setEncodedText] = useState("");
    const [decodedText, setDecodedText] = useState("");
    const [error, setError] = useState(null);

    const handleEncode = async () => {
        setError(null);
        setDecodedText("");

        if (!inputText.trim()) {
            setError("Please enter text to encode.");
            return;
        }

        try {
            const response = await fetch(`/api/urlEncoder?text=${encodeURIComponent(inputText)}&action=encode`);
            const data = await response.json();

            if (response.ok) {
                setEncodedText(data.result);
            } else {
                setError(data.error || "Encoding failed.");
            }
        } catch {
            setError("Error occurred while encoding.");
        }
    };

    const handleDecode = async () => {
        setError(null);
        setEncodedText("");

        if (!inputText.trim()) {
            setError("Please enter text to decode.");
            return;
        }

        try {
            const response = await fetch(`/api/urlEncoder?text=${encodeURIComponent(inputText)}&action=decode`);
            const data = await response.json();

            if (response.ok) {
                setDecodedText(data.result);
            } else {
                setError(data.error || "Decoding failed.");
            }
        } catch {
            setError("Error occurred while decoding.");
        }
    };

    return (
        <>
        <Head>
                <title>Url encoder and decoder - Free & Instant</title>
                <meta name="description" content="encode/decode urls instantly with our free online tool. Simple, fast, and user-friendly." />
            <meta name="keywords" content="encode/decode url online free, encode url, decode url" />
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
                    URL Encoder & Decoder
                    <p className="text-sm text-gray-500 font-normal mt-2">Transform URL strings</p>
                </h1>

                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Enter text here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-4">
                        <button
                            onClick={handleEncode}
                            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Encode
                        </button>
                        <button
                            onClick={handleDecode}
                            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Decode
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {encodedText && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Encoded URL:</h2>
                            <pre className="break-words text-gray-600 text-wrap">{encodedText}</pre>
                        </div>
                    )}

                    {decodedText && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Decoded Text:</h2>
                            <pre className="break-words text-gray-600 text-wrap">{decodedText}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
