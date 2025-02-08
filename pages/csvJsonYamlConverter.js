import { useState } from "react";
import Head from "next/head";

export default function Home() {
    const [file, setFile] = useState(null);
    const [outputFormat, setOutputFormat] = useState("json");
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setDownloadUrl(null);
        setError(null);
    };

    const handleUpload = async () => {
      if (!file) {
          setError("Please select a file first!");
          return;
      }
  
      setLoading(true);
      setError(null);
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("outputFormat", outputFormat); // ✅ Ensuring correct format
  
      console.log("Uploading file with format:", outputFormat); // Debugging
  
      try {
          const response = await fetch("/api/csvJsonYamlConverter", {
              method: "POST",
              body: formData,
          });
  
          const data = await response.json();
          console.log("API Response:", data); // Debugging response
  
          if (response.ok) {
              setDownloadUrl(data.downloadUrl);
          } else {
              setError(data.error || "An error occurred");
          }
      } catch (error) {
          setError("Failed to upload file");
      }
  
      setLoading(false);
  };
  

    return (
      <>
      <Head>
                <title>CSV to JSON Converter - Free & Instant</title>
                <meta name="description" content="Convert CSV to JSON instantly with our free online converter. Simple, fast, and user-friendly." />
                <meta name="keywords" content="CSV to JSON, CSV Converter, Free CSV to JSON online tool" />
                <meta name="robots" content="index, follow" />
            </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8 border-b pb-4">
        File Converter
        <p className="text-sm text-gray-500 font-normal mt-2">CSV/YAML ↔ JSON</p>
        </h1>
        
        <div className="space-y-6">
        <div className="relative  ">
          <input 
          type="file" 
          accept=".csv,.yaml,.yml,.json" 
          onChange={handleFileChange} 
          className="file:border-none file:bg-blue-500 file:text-white file:rounded-md file:px-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="text-gray-700 font-medium">Convert to:</label>
          <select
          className="w-full sm:w-auto p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
          <option value="yaml">YAML</option>
          </select>
        </div>
        
        <button
          onClick={handleUpload}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Converting...
          </span>
          ) : "Upload & Convert"}
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
            Download Converted File
          </a>
          </div>
        )}
        </div>
      </div>
      </div>
      </>
    );
}