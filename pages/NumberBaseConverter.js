import { useState } from "react";
import Head from "next/head";

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [fromBase, setFromBase] = useState("10");
    const [toBase, setToBase] = useState("2");
    const [convertedValue, setConvertedValue] = useState("");
    const [error, setError] = useState(null);

    // Mapping bases to human-readable names
    const baseOptions = [
        { value: "2", name: "Binary (Base 2)" },
        { value: "8", name: "Octal (Base 8)" },
        { value: "10", name: "Decimal (Base 10)" },
        { value: "16", name: "Hexadecimal (Base 16)" },
        { value: "36", name: "Base 36 (Alphanumeric)" }
    ];

    const handleConvert = async () => {
        setError(null);
        setConvertedValue("");

        if (!inputValue.trim()) {
            setError("Please enter a number.");
            return;
        }

        try {
            const response = await fetch(`/api/baseConverter?value=${encodeURIComponent(inputValue)}&fromBase=${fromBase}&toBase=${toBase}`);
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
        alert("Converted value copied to clipboard!");
    };

    return (
        <>
        <Head>
                <title>Number base Converter - Free & Instant</title>
                <meta name="description" content="convert number bases instantly with our free online tool. Simple, fast, and user-friendly." />
                <meta name="keywords" content="number base converter free online, number base converter, binary to decimal, decimal to binary" />
                <meta name="robots" content="index, follow" />
            </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 md:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8 border-b pb-4">
                    Number Base Converter
                    <p className="text-sm text-gray-500 font-normal mt-2">Convert between different number bases</p>
                </h1>

                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Enter number..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-full">
                            <label className="text-gray-700 font-medium block mb-2">From Base:</label>
                            <select
                                value={fromBase}
                                onChange={(e) => setFromBase(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                {baseOptions.map((base) => (
                                    <option key={base.value} value={base.value}>
                                        {base.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="text-gray-700 font-medium block mb-2">To Base:</label>
                            <select
                                value={toBase}
                                onChange={(e) => setToBase(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                {baseOptions.map((base) => (
                                    <option key={base.value} value={base.value}>
                                        {base.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

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
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Converted Value:</h2>
                            <pre className="break-words bg-white p-3 rounded border">{convertedValue}</pre>
                            <button
                                onClick={handleCopy}
                                className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                </svg>
                                Copy to Clipboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
