import React, { useState } from 'react';
import { User, Lock, Mail, Phone, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface AuthViewProps {
  onLogin: (userData: any) => void;
  setPage: (page: any) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin, setPage }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Login State
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup State
  const [signupData, setSignupData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    email: '',
    agreePrivacy: false
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // 1. Admin Check
    if (loginId === 'pickitko92' && loginPw === 'goqudeo12!') {
      const adminUser = {
        id: 'pickitko92',
        name: 'PICKIT MASTER',
        role: 'admin',
        email: 'pickit.korea.official@gmail.com'
      };
      // Save to session (simulated)
      localStorage.setItem('pickit_user', JSON.stringify(adminUser));
      onLogin(adminUser);
      setPage('home');
      return;
    }

    // 2. Local Storage User Check (Simulation)
    const storedUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
    const user = storedUsers.find((u: any) => u.id === loginId && u.password === loginPw);

    if (user) {
      const userData = { ...user, role: 'user' };
      localStorage.setItem('pickit_user', JSON.stringify(userData));
      onLogin(userData);
      setPage('home');
    } else {
      setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!signupData.agreePrivacy) {
      alert("개인정보 수집 및 이용에 동의해야 합니다.");
      return;
    }

    // Simulate saving to DB
    const newUser = {
      id: signupData.id,
      password: signupData.password,
      name: signupData.name,
      phone: signupData.phone,
      email: signupData.email,
      joinedAt: new Date().toISOString()
    };

    const storedUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
    
    if (storedUsers.find((u: any) => u.id === newUser.id)) {
        alert("이미 존재하는 아이디입니다.");
        return;
    }

    storedUsers.push(newUser);
    localStorage.setItem('pickit_users_db', JSON.stringify(storedUsers));

    // Simulate sending data to official email (Console log + Alert)
    console.log(`[System] New User Data sent to pickit.korea.official@gmail.com:`, newUser);
    alert("회원가입이 완료되었습니다. 로그인해주세요.");
    setIsLoginView(true);
  };

  return (
    <section className="py-32 px-6 bg-black min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/10 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Toggle Header */}
        <div className="flex mb-8 bg-zinc-900/50 p-1 rounded-full border border-zinc-800">
          <button 
            onClick={() => setIsLoginView(true)}
            className={`flex-1 py-3 text-xs font-bold tracking-widest rounded-full transition-all duration-300 ${isLoginView ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
          >
            LOGIN
          </button>
          <button 
            onClick={() => setIsLoginView(false)}
            className={`flex-1 py-3 text-xs font-bold tracking-widest rounded-full transition-all duration-300 ${!isLoginView ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
          >
            SIGN UP
          </button>
        </div>

        {/* LOGIN FORM */}
        {isLoginView && (
          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-md animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-white mb-2">Welcome Back</h2>
              <p className="text-zinc-500 text-sm">PICKIT의 프리미엄 서비스를 이용해보세요.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                 <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                      type="text" 
                      placeholder="Username / ID"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                 </div>
              </div>
              <div className="space-y-1">
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                      type="password" 
                      placeholder="Password"
                      value={loginPw}
                      onChange={(e) => setLoginPw(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                 </div>
              </div>

              {loginError && (
                <p className="text-red-500 text-xs text-center">{loginError}</p>
              )}

              <button 
                type="submit" 
                className="w-full py-4 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#FCE2C4] transition-colors mt-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                LOGIN
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button className="text-zinc-600 text-xs hover:text-white transition-colors underline">Forgot Password?</button>
            </div>
          </div>
        )}

        {/* SIGN UP FORM */}
        {!isLoginView && (
          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-md animate-fade-in-up">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif text-white mb-2">Create Account</h2>
              <p className="text-zinc-500 text-sm">회원가입 정보는 안전하게 암호화되어 관리됩니다.</p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                 <input 
                    type="text" 
                    placeholder="Name (실명)"
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                    className="bg-black border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-white outline-none"
                    required
                 />
                 <input 
                    type="text" 
                    placeholder="Phone"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                    className="bg-black border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-white outline-none"
                    required
                 />
              </div>
              
              <input 
                type="email" 
                placeholder="Email Address"
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-white outline-none"
                required
              />

              <input 
                type="text" 
                placeholder="Create ID"
                value={signupData.id}
                onChange={(e) => setSignupData({...signupData, id: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-white outline-none"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                 <input 
                    type="password" 
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    className="bg-black border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-white outline-none"
                    required
                 />
                 <input 
                    type="password" 
                    placeholder="Confirm PW"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    className="bg-black border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-white outline-none"
                    required
                 />
              </div>

              {/* Privacy Policy Agreement */}
              <div className="mt-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="flex items-start gap-3">
                      <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            id="privacy-check"
                            checked={signupData.agreePrivacy}
                            onChange={(e) => setSignupData({...signupData, agreePrivacy: e.target.checked})}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-zinc-600 checked:border-[#D4AF37] checked:bg-[#D4AF37] transition-all"
                          />
                          <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-black opacity-0 peer-checked:opacity-100" />
                      </div>
                      <label htmlFor="privacy-check" className="text-xs text-zinc-400 cursor-pointer select-none leading-relaxed">
                          <span className="text-white font-bold">[필수] 개인정보 수집 및 이용 동의</span><br/>
                          회원가입 시 수집된 개인정보는 서비스 이용 기간 동안 보관되며, 회원 탈퇴 시 즉시 파기됩니다. 데이터는 pickit.korea.official@gmail.com 계정을 통해 안전하게 관리됩니다.
                      </label>
                  </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors mt-4"
              >
                CREATE ACCOUNT
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};

export default AuthView;