import { useState } from "react";

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [convertedValue, setConvertedValue] = useState("");
    const [conversionType, setConversionType] = useState("hexToRgb");
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        setError(null);
        setConvertedValue("");

        if (!inputValue.trim()) {
            setError("Please enter a color value.");
            return;
        }

        try {
            const response = await fetch(`/api/colorConverter?value=${encodeURIComponent(inputValue)}&action=${conversionType}`);
            const data = await response.json();

            if (response.ok) {
                setConvertedValue(data.result);
            } else {
                setError(data.error || "Conversion failed.");
            }
        } catch {
            setError("Error occurred while converting.");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(convertedValue);
        alert("Color copied to clipboard!");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">HEX ↔ RGB Converter</h1>

            <select
                className="mb-4 p-2 border rounded"
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
            >
                <option value="hexToRgb">Convert HEX to RGB</option>
                <option value="rgbToHex">Convert RGB to HEX</option>
            </select>

            <input
                type="text"
                placeholder={conversionType === "hexToRgb" ? "Enter HEX (e.g., #FF5733)" : "Enter RGB (e.g., rgb(255, 87, 51))"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 rounded w-full max-w-md mb-4"
            />

            <button
                onClick={handleConvert}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Convert
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {convertedValue && (
                <div className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-md">
                    <h2 className="text-lg font-bold">Converted Color:</h2>
                    <div
                        className="w-full h-12 mt-2 rounded"
                        style={{ backgroundColor: convertedValue }}
                    ></div>
                    <pre className="break-words mt-2">{convertedValue}</pre>

                    <button
                        onClick={handleCopy}
                        className="px-4 py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                    >
                        📋 Copy
                    </button>
                </div>
            )}
        </div>
    );
}
