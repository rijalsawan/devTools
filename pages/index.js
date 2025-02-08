import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

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
    <>
    <Head>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Online Tools",
                        "url": "https://dev-tools-mocha.vercel.app/",
                        "description": "Convert CSV to JSON, format JSON, encode/decode Base64, and more!",
                        "sameAs": [
                            "https://twitter.com/rijalsawan",
                            "https://github.com/rijalsawan"
                        ]
                    })}
                </script>
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
            <div className="flex flex-col mt-20 items-center justify-center">
                <h1 className="text-2xl font-bold">Welcome to Free Online Tools</h1>
                <p>Convert JSON, CSV, YAML, encode/decode URLs, and more!</p>
            </div>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              href={`/${tool.component}`}
              key={tool.component}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100/50 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-200 transition-colors">
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-slate-800 mb-1">
                      {tool.name}
                    </h2>
                    {tool.description && (
                      <p className="text-sm text-slate-500">
                        {tool.description}
                      </p>
                    )}
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-800 transition-colors"></div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
