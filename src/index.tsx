import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app'; // App 컴포넌트를 불러옴

// index.html의 'root' div에 App을 렌더링
const root = createRoot(document.getElementById('root')!);
root.render(<App />);