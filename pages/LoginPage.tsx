import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import TelegramLogin from '../components/TelegramLogin';

// Animatsiya manzillari
const ANIMATIONS = {
  IDLE: "https://lottie.host/d2a94c99-9de7-46ae-bdb7-1c5b05f3cfd1/EM5jckEoO5.lottie",
  TYPING: "https://lottie.host/5f994902-e397-462c-9508-7f7594089df0/6jkxkfx43h.lottie",
  HIDE: "https://lottie.host/d21d4f77-30b1-44af-b9b1-dcb90c930cd3/GxN5kYEE6j.lottie"
};

const LoginPage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<'IDLE' | 'TYPING' | 'HIDE'>('IDLE');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Kirish funksiyasi
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Iltimos, email va parolni kiriting!");
      return;
    }

    console.log("Kirish ma'lumotlari:", { email, password });
    
    // Muvaffaqiyatli kirishdan keyin formani tozalash
    setEmail('');
    setPassword('');
    setActiveStatus('IDLE');
    
    alert("Tizimga muvaffaqiyatli kirdingiz!");
  };

  // Ayiqchaning o'lchamlarini holatga qarab o'zgartirish
  const getDimension = (status: string) => {
    switch (status) {
      case 'HIDE': return { size: '270px', top: '-55px' };
      case 'IDLE': return { size: '320px', top: '-80px' };
      case 'TYPING': return { size: '230px', top: '-28px' };
      default: return { size: '300px', top: '0px' };
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        
        {/* Lottie Animatsiya qismi */}
        <div style={styles.lottieContainer}>
          {(Object.keys(ANIMATIONS) as Array<keyof typeof ANIMATIONS>).map((key) => {
            const { size, top } = getDimension(key);
            return (
              <div
                key={key}
                style={{
                  ...styles.lottieLayer,
                  opacity: activeStatus === key ? 1 : 0,
                  visibility: activeStatus === key ? 'visible' : 'hidden',
                  width: size,
                  height: size,
                  top: top,
                }}
              >
                <DotLottieReact 
                  src={ANIMATIONS[key]} 
                  loop 
                  autoplay 
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            );
          })}
        </div>

        <h2 style={styles.title}>Tizimga kirish</h2>

        <form style={styles.form} onSubmit={handleLogin}>
          <MyInput
            placeholder="Email manzilingiz"
            value={email}
            onChange={setEmail}
            onFocus={() => setActiveStatus('TYPING')}
            onBlur={() => setActiveStatus('IDLE')}
          />
          
          <MyInput
            type="password"
            placeholder="Parolingiz"
            value={password}
            onChange={setPassword}
            onFocus={() => setActiveStatus('HIDE')}
            onBlur={() => setActiveStatus('IDLE')}
          />

          <div style={styles.buttonGroup}>
            <MyButton type="submit">Kirish</MyButton>

            {/* Ajratuvchi 'yoki' qismi */}
            <div style={styles.dividerContainer}>
              <div style={styles.line}></div>
              <span style={styles.dividerText}>yoki</span>
              <div style={styles.line}></div>
            </div>

            {/* Telegram orqali kirish komponenti */}
            <TelegramLogin />

            <MyButton 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/register')}
            >
              Hisobingiz yo'qmi? Ro'yxatdan o'ting
            </MyButton>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Stillar ---
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
    transition: 'opacity 0.5s ease-in-out, width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    willChange: 'width, height, top, opacity',
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

export default LoginPage;