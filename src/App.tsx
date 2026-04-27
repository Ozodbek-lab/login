import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const App = () => {
  return (
    // basename loyihangizning GitHub'dagi repozitoriya nomi bilan bir xil bo'lishi kerak
    <Router basename="/login">
      <Routes>
        <Route path="/" element={<Navigate to="/login-page" />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;