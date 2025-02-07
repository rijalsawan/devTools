import Link from 'next/link';

export default function Home() {
  const tools = [
    { name: 'CSV/JSON/YAML Converter', component: 'csvJsonYamlConverter', icon: '🔄' },
    { name: 'ENV to Netlify TOML', component: 'EnvToNetlifyTomlConverter', icon: '📝' },
    { name: 'HAR Parser', component: 'HarParser', icon: '🔍' },
    { name: 'HEX & RGB Converter', component: 'HexAndRgbConverter', icon: '🎨' },
    { name: 'Image to Base64', component: 'ImageToBase64', icon: '🖼️' },
    { name: 'JSON Formatter', component: 'JsonFormatter', icon: '📊' },
    { name: 'Number Base Converter', component: 'NumberBaseConverter', icon: '🔢' },
    { name: 'Query to JSON', component: 'QueryToJson', icon: '🔗' },
    { name: 'URL Encoder/Decoder', component: 'UrlEncoderAndDecoder', icon: '🌐' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="container mx-auto"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
          Developer Tools
          <div className="h-1 w-24 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link href={`/${tool.component}`} key={tool.component}>
              <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-8 border border-gray-100">
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
                    {tool.name}
                  </h2>
                  <p className="text-gray-600 text-center text-sm">
                    Click to use this tool
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
  );
}
