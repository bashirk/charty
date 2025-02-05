import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/elly-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />

        <title>Elly AI</title>
        <meta property="og:title" content="Elly AI" />
        <meta
          property="og:image"
          content="https://www.elly-ai.vercel.app/elly-og.png"
        />
        <meta property="og:url" content="https://www.elly-ai.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta
          property="og:description"
          content="Pitch with confidence! Get access to valid data with beautiful visualizations"
        />
        <meta
          name="description"
          content="Pitch with confidence! Get access to valid data with beautiful visualizations"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codecoggy" />
        <meta name="twitter:title" content="Elly AI - human language to confident business intelligence" />
        <meta
          name="twitter:description"
          content="Pitch with confidence! Get access to valid data with beautiful visualizations"
        />
        <meta
          name="twitter:image"
          content="https://elly-ai.vercel.app/elly-og.png"
        />
      </Head>

      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap"
        rel="stylesheet"
      />

      <script 
      async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5111592454908081"
      crossOrigin="anonymous">
      </script>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
