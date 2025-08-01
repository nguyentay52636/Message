import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import HomePage from '@/modules/home/pages/HomePage';
import { ThemeProvider } from './components/ui/ThemeProvider';
import ChatPages from '@/modules/Chat/ChatPages';
function App() {
  const router = createBrowserRouter([
    // Main layout
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/chat',
          element: <ChatPages />
        }
      ],
    },
  ]);
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider >
    </>
  );
}

export default App;
