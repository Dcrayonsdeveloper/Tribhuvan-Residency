import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#8a5a2b" />
        <meta
          name="description"
          content="The Tribhuvan Residency — an elegant guest house in Ayodhya, just a short walk from Shree Ram Janmabhoomi Mandir. Clean AC rooms, warm hospitality and a peaceful stay."
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
