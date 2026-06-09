import React from 'react';
import { useApp } from '../context/AppContext';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="not-found-page container">
      <div className="not-found-code">404</div>
      <h1>Page Not Found</h1>
      <p>The collection or page you are seeking does not exist or has been relocated to our archives.</p>
      <button className="btn-primary" onClick={() => navigateTo('home')} style={{ marginTop: 'var(--space-sm)' }}>
        Return to Home
      </button>
    </div>
  );
};
export default NotFoundPage;
