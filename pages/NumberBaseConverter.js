import { useState } from "react";

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
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Number Base Converter</h1>

            <input
                type="text"
                placeholder="Enter number..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 rounded w-full max-w-md mb-4"
            />

            <div className="flex space-x-4 mb-4">
                <div>
                    <label className="block font-bold mb-1">From Base</label>
                    <select
                        value={fromBase}
                        onChange={(e) => setFromBase(e.target.value)}
                        className="p-2 border rounded"
                    >
                        {baseOptions.map((base) => (
                            <option key={base.value} value={base.value}>
                                {base.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-bold mb-1">To Base</label>
                    <select
                        value={toBase}
                        onChange={(e) => setToBase(e.target.value)}
                        className="p-2 border rounded"
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
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Convert
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {convertedValue && (
                <div className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-md">
                    <h2 className="text-lg font-bold">Converted Value:</h2>
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
