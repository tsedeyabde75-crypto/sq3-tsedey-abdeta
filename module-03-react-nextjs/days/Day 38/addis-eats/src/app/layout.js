import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian Food Ordering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}