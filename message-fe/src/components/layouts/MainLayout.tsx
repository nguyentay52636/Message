import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {/* Header */}
      <Header />
      {children || <Outlet />}
      {/* Footer */}
      <Footer />
    </div>
  );
}
