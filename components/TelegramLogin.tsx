import React, { useEffect, useRef } from 'react';

// Telegramdan keladigan foydalanuvchi ma'lumotlari turi
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

// Global window obyektiga funksiyani tanitish
declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
  }
}

const TelegramLogin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vidjet ko'payib ketmasligi uchun tozalash
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    
    // SIZNING BOTINGIZNING USERNAMI SHU YERDA:
    script.setAttribute('data-telegram-login', 'my_free_server_bot'); 
    
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '15');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');

    containerRef.current?.appendChild(script);

    // Foydalanuvchi tasdiqlaganidan keyin ishlaydigan qism
    window.onTelegramAuth = (user: TelegramUser) => {
      console.log("Telegram ma'lumotlari:", user);
      alert(`Xush kelibsiz, ${user.first_name}!`);
    };

    return () => {
      delete (window as Partial<Window>).onTelegramAuth;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        minHeight: '40px',
        margin: '10px 0' 
      }} 
    />
  );
};

export default TelegramLogin;