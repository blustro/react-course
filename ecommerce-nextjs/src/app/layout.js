import { Header } from '@/components/Header';
import { StoreProvider } from '@/store/StoreProvider';
import './globals.css';

export const metadata = {
  title: 'Ecommerce Project',
  description: 'Built with Next.js and Redux',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
