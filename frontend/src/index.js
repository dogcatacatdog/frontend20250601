import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Navbar from './components/Navbar';
import App from './App';
import Contact from './Contact';

function Root() {
  const [page, setPage] = useState('main');

  return (
    <div className="app-bg">
      <Navbar onMenuClick={setPage} active={page} />
      <div className="content-container">
        {page === 'main' ? <App /> : <Contact />}
      </div>
      <div
        className="copyright"
        style={{ textAlign: 'center', fontSize: '12px', color: 'navy' }}
      >
        <p>© 2025 Dae-Seong Yang. All rights reserved.</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

