import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage'; // Hozirgi kodingizni nomi RegisterPage bo'lsin
import LoginPage from '../pages/LoginPage';       // Yangi yaratadigan sahifangiz

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Asosiy sahifa ochilganda avtomatik login'ga yuboradi */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;