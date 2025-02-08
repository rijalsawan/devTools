import "@/styles/globals.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return <>
  <Head>
                <title>Free Online Tools - Convert JSON, CSV, YAML & More</title>
                <meta name="description" content="Use our free online tools to convert JSON, CSV, YAML, encode/decode URLs, format JSON, and more. Instant conversion and user-friendly experience." />
                <meta name="keywords" content="CSV to JSON, YAML to JSON, JSON Formatter, Base64 Encoder, URL Encoder, HEX to RGB Converter" />
                <meta name="robots" content="index, follow" />
            </Head>
  <Component {...pageProps} />
  </>;
}
