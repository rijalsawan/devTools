import { useState } from "react";
import Head from "next/head";

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
        <>
        <Head>
                <title>convert Hex/Rgb to Hex/Rgb - Free & Instant</title>
                <meta name="description" content="convert hex to rgb or rgb to hex instantly with our free online tool. Simple, fast, and user-friendly." />
                <meta name="keywords" content="convert hex to rgb free online, convert rgb to hex free online" />
                <meta name="robots" content="index, follow" />
            </Head>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 md:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8 border-b pb-4">
                    Color Converter
                    <p className="text-sm text-gray-500 font-normal mt-2">HEX ↔ RGB</p>
                </h1>

                <div className="space-y-6">
                    <select
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleConvert}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Convert
                    </button>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {convertedValue && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Converted Color:</h2>
                            <div
                                className="w-full h-16 rounded-lg shadow-inner"
                                style={{ backgroundColor: convertedValue }}
                            ></div>
                            <pre className="mt-3 text-gray-700 break-words">{convertedValue}</pre>
                            <button
                                onClick={handleCopy}
                                className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                📋 Copy Color
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
