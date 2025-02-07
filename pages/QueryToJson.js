import { useState } from "react";

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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-blue-500 mb-8">
                Query Parameters to JSON
            </h1>

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
                {params.map((param, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-3 mb-4">
                        <input
                            type="text"
                            placeholder="Key"
                            value={param.key}
                            onChange={(e) => handleChange(index, "key", e.target.value)}
                            className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                        <input
                            type="text"
                            placeholder="Value"
                            value={param.value}
                            onChange={(e) => handleChange(index, "value", e.target.value)}
                            className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                        <button
                            onClick={() => removeParam(index)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                        onClick={addParam}
                        className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                        Add Parameter
                    </button>

                    <button
                        onClick={handleConvert}
                        className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                        Convert to JSON
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {jsonOutput && (
                <div className="mt-6 w-full max-w-3xl">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">JSON Output:</h2>
                        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                            {JSON.stringify(jsonOutput, null, 2)}
                        </pre>

                        {downloadUrl && (
                            <a
                                href={downloadUrl}
                                download="queryData.json"
                                className="mt-4 inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                                Download JSON File
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
