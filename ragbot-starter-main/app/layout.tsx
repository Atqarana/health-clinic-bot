import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = {
  title: "Health Clinic Support",
  description: "Health Clinic Support - Powered by Team ZASA ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
