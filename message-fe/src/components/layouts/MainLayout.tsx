import { SiderNavBar } from '@/components/SiderNavBar';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <SiderNavBar />
      {children || <Outlet />}
    </div>
  );
}
