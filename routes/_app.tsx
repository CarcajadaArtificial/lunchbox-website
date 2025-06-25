import type { PageProps } from "fresh";
import Keynav from "../islands/Keynav.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lunchbox</title>
        <link rel="stylesheet" href="/styles.css" />

        {/* Favicon Links */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Lunchbox" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* SEO */}
        <meta
          name="description"
          content="This is the Lunchbox website source."
        />
      </head>
      <body>
        <Component />
        <Keynav />
      </body>
    </html>
  );
}
