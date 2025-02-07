import { useState } from "react";

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
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Image to Base64 Converter</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="mb-4 border p-2 rounded"
            />

            <button
                onClick={handleConvert}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Convert to Base64
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {base64 && (
                <div className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-lg">
                    <h2 className="text-lg font-bold">Base64 Output:</h2>
                    <textarea
                        readOnly
                        value={base64}
                        className="w-full h-40 border p-2 rounded mt-2"
                    ></textarea>

                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            📋 Copy
                        </button>
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            📥 Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
