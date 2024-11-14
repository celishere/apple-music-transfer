import { Suspense } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import "@/app/styles/index.scss";

const App = (props: AppProps) => {
    const {
        Component,
        pageProps
    } = props;

    return (
        <>
            <Head>
                <meta name="robots" content="all" />
                <meta name="theme-color" content="#4a2600" />
                <meta name="msapplication-TileColor" content="#4a2600" />
                <link rel="icon" type="image/png" sizes="16x16" href="favicon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="favicon.png" />
            </Head>

            <Suspense fallback={ <a>Loading...</a> }>
                <Component {...pageProps} />
            </Suspense>
        </>
    )
};

export default App;