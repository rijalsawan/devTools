import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
export default function App({ Component, pageProps }) {
  return <>
  <Head>
                <title>Free Online Tools - Convert JSON, CSV, YAML & More</title>
                <meta name="description" content="Use our free online tools to convert JSON, CSV, YAML, encode/decode URLs, format JSON, and more. Instant conversion and user-friendly experience." />
                <meta name="keywords" content="CSV to JSON, YAML to JSON, JSON Formatter, Base64 Encoder, URL Encoder, HEX to RGB Converter" />
                <meta name="robots" content="index, follow" />
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
  <Component {...pageProps} />
  </>;
}
