import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import KakaoLoaderGate from './KakaoLoaderGate';

ReactDOM.createRoot(document.getElementById('root')).render(
  <KakaoLoaderGate>
    <App />
  </KakaoLoaderGate>
);
