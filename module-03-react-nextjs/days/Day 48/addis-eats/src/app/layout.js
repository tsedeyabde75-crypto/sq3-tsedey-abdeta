import './globals.css';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: 'Addis Eats | Ethiopian Food Delivery in Addis Ababa',
  description: 'Explore Ethiopian favorites from Doro Wat to Kitfo, create your account, and follow your Addis Eats order.',
  keywords: 'Ethiopian food, food delivery, Addis Ababa, Doro Wat, Kitfo, Tibs, Addis Eats',
  openGraph: {
    title: 'Addis Eats',
    description: 'Ethiopian food delivery in Addis Ababa. Explore authentic traditional dishes prepared fresh daily.',
    url: 'https://addiseats.vercel.app',
    siteName: 'Addis Eats',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947',
        width: 1200,
        height: 630,
        alt: 'Addis Eats Traditional Food Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Addis Eats | Ethiopian Food Delivery',
    description: 'Explore Ethiopian favorites from Doro Wat to Kitfo.',
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        <CartProvider>
          <FavoritesProvider>
            <ClientLayout>{children}</ClientLayout>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}