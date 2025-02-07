import { useState } from "react";

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
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">URL Encoder & Decoder</h1>

            <input
                type="text"
                placeholder="Enter text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border p-2 rounded w-full max-w-md mb-4"
            />

            <div className="flex space-x-4">
                <button
                    onClick={handleEncode}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Encode
                </button>
                <button
                    onClick={handleDecode}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Decode
                </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {encodedText && (
                <div className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-md">
                    <h2 className="text-lg font-bold">Encoded URL:</h2>
                    <pre className="break-words">{encodedText}</pre>
                </div>
            )}

            {decodedText && (
                <div className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-md">
                    <h2 className="text-lg font-bold">Decoded Text:</h2>
                    <pre className="break-words">{decodedText}</pre>
                </div>
            )}
        </div>
    );
}
