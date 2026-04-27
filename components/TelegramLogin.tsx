import React, { useEffect, useRef } from 'react';

// 1. Foydalanuvchi ma'lumotlari uchun aniq tur
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

// 2. Window obyektini to'g'ri kengaytirish (any-siz variant)
declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
  }
}

const TelegramLogin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Eski tugmalarni tozalash
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Skript yaratish
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    
    // Botingiz usernami
    script.setAttribute('data-telegram-login', 'my_free_server_bot'); 
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '15');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');

    containerRef.current?.appendChild(script);

    // 3. Callback funksiyasini yuklash (Xatolik shu yerda edi)
    window.onTelegramAuth = (user: TelegramUser) => {
      console.log("Muvaffaqiyatli login:", user);
      alert(`Xush kelibsiz, ${user.first_name}!`);
    };

    // Tozalash mantiqi
    return () => {
      window.onTelegramAuth = undefined;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        minHeight: '44px', 
        margin: '15px 0' 
      }} 
    />
  );
};

export default TelegramLogin;