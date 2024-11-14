import { AppProps } from "next/app";

import App from "@/app/App";

import { ToastProvider } from "@/app/providers/ToastProvider";
import { ErrorBoundary  } from "@/app/providers/ErrorBoundary";

import "../app/styles/index.scss";

export default function NextApp(props: AppProps) {
    return (
        <ToastProvider>
            <ErrorBoundary>
                <App {...props} />
            </ErrorBoundary>
        </ToastProvider>
    );
}