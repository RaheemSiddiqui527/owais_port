// components/PerformanceLayout.jsx
"use client";
import React from "react";
import Head from "next/head";
import Script from "next/script";
import { SWRConfig } from "swr";

export default function PerformanceLayout({ children }) {
  return (
    <>
      <Head>
        {/* — Preconnects for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* — Preload your key font */}
        <link
          rel="preload"
          href="/fonts/Inter-VariableFont_slnt,wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* — PWA manifest (if you use next-pwa) */}
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* — Critical polyfills or “beforeInteractive” scripts */}
      <Script
        id="polyfills"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // example: minimal polyfill for fetch
            if (!self.fetch) {
              import('whatwg-fetch');
            }
          `,
        }}
      />

      {/* — Lazy-load analytics or other non-critical scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX', { send_page_view: false });
        `}
      </Script>

      {/* — Global SWR config for caching & revalidation */}
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
          revalidateOnFocus: false,
          dedupingInterval: 60 * 1000, // 1 minute
        }}
      >
        {children}
      </SWRConfig>
    </>
  );
}
