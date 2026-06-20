import "@/styles/globals.css";
import { Cormorant_Garamond, Poppins } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${display.variable} ${body.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
