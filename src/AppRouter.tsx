import { Navigate, Route, Routes } from 'react-router-dom';
import App from './App';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App initialPage="home2" />} />
      <Route path="/starlink" element={<App initialPage="starlink" />} />
      <Route path="/connectivite" element={<App initialPage="connectivite" />} />
      <Route path="/contact" element={<App initialPage="contact" />} />
      <Route path="/travel" element={<App initialPage="travel" />} />
      <Route path="/cloud" element={<App initialPage="cloud" />} />
      <Route path="/about" element={<App initialPage="about" />} />
      <Route path="/iot" element={<App initialPage="iot" />} />

      {/* Fallback: on renvoie sur l’accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;

