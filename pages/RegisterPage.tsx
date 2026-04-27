import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import TelegramLogin from '../components/TelegramLogin';

const ANIMATIONS = {
  IDLE: "https://lottie.host/d2a94c99-9de7-46ae-bdb7-1c5b05f3cfd1/EM5jckEoO5.lottie",
  TYPING: "https://lottie.host/5f994902-e397-462c-9508-7f7594089df0/6jkxkfx43h.lottie",
  HIDE: "https://lottie.host/d21d4f77-30b1-44af-b9b1-dcb90c930cd3/GxN5kYEE6j.lottie"
};

const RegisterPage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<'IDLE' | 'TYPING' | 'HIDE'>('IDLE');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    console.log("Ro'yxatdan o'tish:", { username, password });
    setUsername('');
    setPassword('');
    setActiveStatus('IDLE');
    alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
  };

  const getDimension = (status: string) => {
    switch (status) {
      case 'HIDE': return { size: '270px', top: '-55px' };
      case 'IDLE': return { size: '320px', top: '-80px' };
      case 'TYPING': return { size: '230px', top: '-28px' };
      default: return { size: '300px', top: '0px' };
    }
  };

  const renderLottie = (status: keyof typeof ANIMATIONS) => {
    const { size, top } = getDimension(status);
    return (
      <div
        style={{
          ...styles.lottieLayer,
          opacity: activeStatus === status ? 1 : 0,
          visibility: activeStatus === status ? 'visible' : 'hidden',
          width: size,
          height: size,
          top: top,
        }}
      >
        <DotLottieReact 
          src={ANIMATIONS[status]} 
          loop 
          autoplay 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.lottieContainer}>
          {renderLottie('IDLE')}
          {renderLottie('TYPING')}
          {renderLottie('HIDE')}
        </div>

        <h2 style={styles.title}>Ro'yxatdan o'tish</h2>

        <form style={styles.form} onSubmit={handleSubmit}>
          <MyInput
            placeholder="Foydalanuvchi nomi"
            value={username}
            onChange={setUsername}
            onFocus={() => setActiveStatus('TYPING')}
            onBlur={() => setActiveStatus('IDLE')}
          />
          
          <MyInput
            type="password"
            placeholder="Parol"
            value={password}
            onChange={setPassword}
            onFocus={() => setActiveStatus('HIDE')}
            onBlur={() => setActiveStatus('IDLE')}
          />

          <div style={styles.buttonGroup}>
            <MyButton type="submit">Tasdiqlash</MyButton>

            {/* Ikkita tugma orasidagi 'yoki' qismi */}
            <div style={styles.dividerContainer}>
              <div style={styles.line}></div>
              <span style={styles.dividerText}>yoki</span>
              <div style={styles.line}></div>
            </div>

            {/* Telegram Login Vidjeti */}
            <TelegramLogin />

            <MyButton 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/login-page')}
            >
              Allaqachon ro'yxatdan o'tganmisiz?
            </MyButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#cbd5e1',
    fontFamily: '"Inter", sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '50px 40px 40px 40px',
    borderRadius: '35px',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
    width: '400px',
    textAlign: 'center',
    position: 'relative',
  },
  lottieContainer: {
    position: 'relative',
    width: '100%',
    height: '180px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieLayer: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  title: {
    fontSize: '26px',
    color: '#1e293b',
    marginBottom: '25px',
    fontWeight: '800',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  buttonGroup: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    gap: '10px',
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default RegisterPage;