import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

const PurchaseNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<{name: string, location: string, item: string} | null>(null);

  // Fake Data for Social Proof
  const names = ['김*우', '이*진', '박*준', '최*훈', '정*영', '강*호', '윤*서', '장*혁', '임*아', '한*수'];
  const locations = ['서울 강남구', '경기 분당', '부산 해운대구', '서울 용산구', '대구 수성구', '서울 송파구', '인천 연수구', '경기 수원', '서울 서초구', '대전 유성구'];
  const items = ['Black Edition', 'Rose Gold Custom', 'Sterling Silver', 'Royal Gold', 'Business Card Set'];

  useEffect(() => {
    // Initial delay before first notification
    const initialTimeout = setTimeout(() => {
        triggerNotification();
    }, 5000);

    // Loop for notifications
    const interval = setInterval(() => {
        triggerNotification();
    }, Math.floor(Math.random() * 20000) + 15000); // Random interval between 15s and 35s

    return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
    };
  }, []);

  const triggerNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomItem = items[Math.floor(Math.random() * items.length)];

      setCurrentNotification({
          name: randomName,
          location: randomLocation,
          item: randomItem
      });
      setVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
          setVisible(false);
      }, 4000);
  };

  if (!currentNotification) return null;

  return (
    <div 
        className={`fixed z-[80] transition-all duration-700 ease-in-out transform flex items-center gap-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-4 rounded-xl shadow-2xl w-[320px] max-w-[90vw]
        ${visible ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        bottom-6 left-6 md:bottom-8 md:left-8
        `}
    >
        <div className="relative shrink-0">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-700">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border border-black">
                <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
        </div>

        <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-400 mb-0.5 flex items-center gap-1">
                <span className="font-bold text-zinc-300">{currentNotification.name}</span>님 구매완료
                <span className="text-[10px] text-zinc-600">| {currentNotification.location}</span>
            </p>
            <p className="text-sm font-bold text-white truncate text-ellipsis">
                {currentNotification.item}
            </p>
            <p className="text-[10px] text-[#D4AF37] mt-1 font-medium animate-pulse">
                방금 전 주문이 접수되었습니다.
            </p>
        </div>
    </div>
  );
};

export default PurchaseNotification;