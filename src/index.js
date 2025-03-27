import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';





const root = ReactDOM.createRoot(document.getElementById('root'));

function Root() {
  useEffect(() => {
    const handleScroll = (event) => {
      let direction;
      if (event.type === 'wheel') {
        event.preventDefault();
        direction = event.deltaY > 0 ? 1 : -1;
      } else if (event.type === 'keydown') {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          direction = event.key === 'ArrowDown' ? 1 : -1;
        } else {
          return;
        }
      } else {
        return;
      }

    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('keydown', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll, { passive: true });
      window.removeEventListener('keydown', handleScroll);
    };
  }, []);

  return <App />;
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();