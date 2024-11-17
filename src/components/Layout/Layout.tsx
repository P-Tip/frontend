// components/layout/Layout.tsx
import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import './Layout.css';
import './BaseBlock.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
