import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Phone, ShieldCheck, ArrowRight, Check, X, FileText, KeyRound, ArrowLeft, Loader2, Calendar, Smartphone, Timer, CheckCircle } from 'lucide-react';

interface AuthViewProps {
  onLogin: (userData: any) => void;
  setPage: (page: any) => void;
}

type AuthMode = 'login' | 'signup' | 'find';

const AuthView: React.FC<AuthViewProps> = ({ onLogin, setPage }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showTermsModal, setShowTermsModal] = useState(false);
  
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
    birthdate: '',
    agreePrivacy: false,
    agreeTerms: false
  });

  // Verification State
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyTimer, setVerifyTimer] = useState(180); // 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'request' | 'confirm'>('request');
  const [selectedCarrier, setSelectedCarrier] = useState('SKT');

  // Find Password State
  const [findData, setFindData] = useState({ name: '', phone: '' });
  const [findStatus, setFindStatus] = useState<'idle' | 'searching' | 'success'>('idle');
  const [findError, setFindError] = useState('');

  // Timer Logic
  useEffect(() => {
    let interval: number;
    if (isTimerRunning && verifyTimer > 0) {
      interval = setInterval(() => {
        setVerifyTimer((prev) => prev - 1);
      }, 1000);
    } else if (verifyTimer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, verifyTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const generateCustomerId = () => {
     const year = new Date().getFullYear().toString().slice(2);
     const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
     return `PKT-${year}-${randomNum}`;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // 1. Admin Check
    if (loginId === 'pickitko92' && loginPw === 'goqudeo12!') {
      const adminUser = {
        id: 'pickitko92',
        customerId: 'ADMIN-MASTER',
        name: 'PICKIT MASTER',
        role: 'admin',
        email: 'pickit.korea.official@gmail.com',
        joinedAt: '2025-01-01'
      };
      localStorage.setItem('pickit_user', JSON.stringify(adminUser));
      onLogin(adminUser);
      setPage('home');
      return;
    }

    // 2. Local Storage User Check
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
    
    if (!isPhoneVerified) {
        alert("휴대폰 본인인증을 완료해주세요.");
        return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!signupData.agreeTerms) {
      alert("서비스 이용약관에 동의해야 합니다.");
      return;
    }

    if (!signupData.agreePrivacy) {
      alert("개인정보 수집 및 이용에 동의해야 합니다.");
      return;
    }

    const newUser = {
      id: signupData.id,
      customerId: generateCustomerId(),
      password: signupData.password,
      name: signupData.name,
      phone: signupData.phone,
      email: signupData.email,
      birthdate: signupData.birthdate,
      address: '', 
      joinedAt: new Date().toLocaleDateString('ko-KR')
    };

    const storedUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
    
    if (storedUsers.find((u: any) => u.id === newUser.id)) {
        alert("이미 존재하는 아이디입니다.");
        return;
    }

    storedUsers.push(newUser);
    localStorage.setItem('pickit_users_db', JSON.stringify(storedUsers));

    alert(`회원가입이 완료되었습니다.\n고객번호: ${newUser.customerId}`);
    setAuthMode('login');
  };

  // Verification Handlers
  const openVerificationModal = () => {
    if (!signupData.name || !signupData.phone) {
        alert("이름과 휴대폰 번호를 입력해주세요.");
        return;
    }
    setVerificationStep('request');
    setVerifyCode('');
    setVerifyTimer(180);
    setShowVerifyModal(true);
  };

  const requestVerificationCode = () => {
      // Simulate API Call
      setIsTimerRunning(true);
      setVerificationStep('confirm');
      alert(`[PICKIT] 인증번호 [123456]이 발송되었습니다.\n(시뮬레이션 모드)`);
  };

  const confirmVerificationCode = () => {
      if (verifyCode === '123456') {
          setIsPhoneVerified(true);
          setShowVerifyModal(false);
          setIsTimerRunning(false);
          alert("본인인증이 완료되었습니다.");
      } else {
          alert("인증번호가 일치하지 않습니다.");
      }
  };

  const handleFindSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFindStatus('searching');
      setFindError('');

      setTimeout(() => {
          if (findData.name === 'PICKIT MASTER' && findData.phone === '010-8282-1043') {
             setFindStatus('success');
             return;
          }

          const storedUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
          const user = storedUsers.find((u: any) => u.name === findData.name && u.phone === findData.phone);

          if (user) {
              setFindStatus('success');
          } else {
              setFindStatus('idle');
              setFindError('일치하는 회원 정보를 찾을 수 없습니다.');
          }
      }, 1500);
  };

  return (
    <section className="py-32 px-6 bg-black min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/10 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Toggle Header (Only show when not in 'find' mode) */}
        {authMode !== 'find' && (
            <div className="flex mb-8 bg-zinc-900/50 p-1 rounded-full border border-zinc-800">
            <button 
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3 text-xs font-bold tracking-widest rounded-full transition-all duration-300 ${authMode === 'login' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
                LOGIN
            </button>
            <button 
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3 text-xs font-bold tracking-widest rounded-full transition-all duration-300 ${authMode === 'signup' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
                SIGN UP
            </button>
            </div>
        )}

        {/* LOGIN FORM */}
        {authMode === 'login' && (
          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-md animate-fade-in-up shadow-2xl">
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
                className="w-full py-4 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#FCE2C4] transition-colors mt-4 shadow-[0_0_20px_rgba(212,175,55,0.2)] tracking-widest"
              >
                LOGIN
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                    setAuthMode('find');
                    setFindStatus('idle');
                    setFindError('');
                    setFindData({ name: '', phone: '' });
                }} 
                className="text-zinc-600 text-xs hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        )}

        {/* FIND PASSWORD FORM */}
        {authMode === 'find' && (
             <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-md animate-fade-in-up relative overflow-hidden shadow-2xl">
                <button 
                    onClick={() => setAuthMode('login')}
                    className="absolute top-6 left-6 text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="text-center mb-8 pt-4">
                    <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                         <KeyRound className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h2 className="text-2xl font-serif text-white mb-2">Find Account</h2>
                    <p className="text-zinc-500 text-sm">가입 시 등록한 정보를 입력해주세요.</p>
                </div>

                {findStatus !== 'success' ? (
                    <form onSubmit={handleFindSubmit} className="space-y-4">
                        <div className="space-y-1">
                             <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input 
                                  type="text" 
                                  placeholder="Name (가입 실명)"
                                  value={findData.name}
                                  onChange={(e) => setFindData({...findData, name: e.target.value})}
                                  className="w-full bg-black border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                                  required
                                />
                             </div>
                        </div>
                        <div className="space-y-1">
                             <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input 
                                  type="text" 
                                  placeholder="Phone (010-0000-0000)"
                                  value={findData.phone}
                                  onChange={(e) => setFindData({...findData, phone: e.target.value})}
                                  className="w-full bg-black border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                                  required
                                />
                             </div>
                        </div>

                        {findError && (
                            <p className="text-red-500 text-xs text-center flex items-center justify-center gap-1 animate-pulse">
                                <X className="w-3 h-3" /> {findError}
                            </p>
                        )}

                        <button 
                            type="submit" 
                            disabled={findStatus === 'searching'}
                            className="w-full py-4 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors mt-4 flex items-center justify-center gap-2"
                        >
                            {findStatus === 'searching' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "VERIFY USER"
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center animate-fade-in-up">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
                                <Check className="w-5 h-5" />
                                <span className="font-bold text-sm">인증 성공</span>
                            </div>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                입력하신 휴대폰 번호로<br/>
                                <strong className="text-white">임시 비밀번호</strong>가 발송되었습니다.
                            </p>
                        </div>
                        <button 
                            onClick={() => setAuthMode('login')}
                            className="w-full py-4 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#FCE2C4] transition-colors"
                        >
                            BACK TO LOGIN
                        </button>
                    </div>
                )}
             </div>
        )}

        {/* SIGN UP FORM */}
        {authMode === 'signup' && (
          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-md animate-fade-in-up shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif text-white mb-2">Create Account</h2>
              <p className="text-zinc-500 text-sm">본인 인증 후 안전하게 가입하세요.</p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                 <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Name (실명)"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        className={`w-full bg-black border rounded-xl p-3 pl-3 text-white text-sm focus:outline-none transition-colors ${isPhoneVerified ? 'border-green-900/50 text-green-500 bg-green-900/10' : 'border-zinc-800 focus:border-white'}`}
                        required
                        readOnly={isPhoneVerified}
                    />
                    {isPhoneVerified && <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-green-500" />}
                 </div>
                 <input 
                    type="text" 
                    placeholder="Birthdate (900101)"
                    value={signupData.birthdate}
                    onChange={(e) => setSignupData({...signupData, birthdate: e.target.value})}
                    maxLength={6}
                    className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white text-sm focus:border-white outline-none"
                    required
                 />
              </div>

              {/* Phone Verification Section */}
              <div className="flex gap-2">
                 <div className="relative flex-1">
                    <input 
                        type="text" 
                        placeholder="Phone (010-0000-0000)"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        className={`w-full bg-black border rounded-xl p-3 text-white text-sm focus:outline-none transition-colors ${isPhoneVerified ? 'border-green-900/50 text-green-500 bg-green-900/10' : 'border-zinc-800 focus:border-white'}`}
                        required
                        readOnly={isPhoneVerified}
                    />
                    {isPhoneVerified && <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-green-500" />}
                 </div>
                 <button 
                    type="button"
                    onClick={openVerificationModal}
                    disabled={isPhoneVerified}
                    className={`px-4 rounded-xl text-xs font-bold transition-colors border whitespace-nowrap ${isPhoneVerified ? 'bg-green-900/20 border-green-800 text-green-500 cursor-default' : 'bg-[#D4AF37] border-[#D4AF37] text-black hover:bg-[#FCE2C4]'}`}
                 >
                    {isPhoneVerified ? <CheckCircle className="w-4 h-4" /> : "본인인증"}
                 </button>
              </div>
              {isPhoneVerified && (
                  <p className="text-[10px] text-green-500 flex items-center gap-1 pl-1">
                      <CheckCircle className="w-3 h-3" /> 본인인증이 완료되었습니다.
                  </p>
              )}

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

              {/* Terms and Privacy Agreements */}
              <div className="mt-4 bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800">
                  
                  {/* Terms of Service */}
                  <div className="p-4">
                       <div className="flex items-start gap-3">
                          <div className="relative flex items-center mt-0.5">
                              <input 
                                type="checkbox" 
                                id="terms-check"
                                checked={signupData.agreeTerms}
                                onChange={(e) => setSignupData({...signupData, agreeTerms: e.target.checked})}
                                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-zinc-600 checked:border-[#D4AF37] checked:bg-[#D4AF37] transition-all"
                              />
                              <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-black opacity-0 peer-checked:opacity-100" />
                          </div>
                          <div className="flex-1">
                              <label htmlFor="terms-check" className="text-xs text-white font-bold cursor-pointer select-none">
                                  [필수] 서비스 이용약관 동의
                              </label>
                              <div className="text-[10px] text-zinc-500 mt-1 flex justify-between items-center">
                                  <span>IC칩 이식 책임 및 사용 제한에 관한 내용 포함</span>
                                  <button type="button" onClick={() => setShowTermsModal(true)} className="text-[#D4AF37] underline hover:text-white">전문보기</button>
                              </div>
                          </div>
                       </div>
                  </div>

                  {/* Privacy Policy */}
                  <div className="p-4">
                      <div className="flex items-start gap-3">
                          <div className="relative flex items-center mt-0.5">
                              <input 
                                type="checkbox" 
                                id="privacy-check"
                                checked={signupData.agreePrivacy}
                                onChange={(e) => setSignupData({...signupData, agreePrivacy: e.target.checked})}
                                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-zinc-600 checked:border-[#D4AF37] checked:bg-[#D4AF37] transition-all"
                              />
                              <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-black opacity-0 peer-checked:opacity-100" />
                          </div>
                          <div className="flex-1">
                              <label htmlFor="privacy-check" className="text-xs text-white font-bold cursor-pointer select-none">
                                  [필수] 개인정보 수집 및 이용 동의
                              </label>
                              <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                                  회원가입 시 수집된 개인정보는 서비스 이용 기간 동안 보관되며, 탈퇴 시 즉시 파기됩니다.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed tracking-widest shadow-lg"
                disabled={!isPhoneVerified}
              >
                CREATE ACCOUNT
              </button>
            </form>
          </div>
        )}

        {/* VERIFICATION MODAL */}
        {showVerifyModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
                <div className="bg-[#111] border border-zinc-700 rounded-2xl w-full max-w-sm shadow-2xl relative overflow-hidden">
                    <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                            <h3 className="text-white font-bold text-sm">휴대폰 본인인증</h3>
                        </div>
                        <button onClick={() => setShowVerifyModal(false)} className="text-zinc-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        {verificationStep === 'request' ? (
                            <>
                                <p className="text-zinc-400 text-xs mb-2">
                                    본인 명의의 휴대폰 번호로 인증번호를 발송합니다.
                                </p>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-2">
                                        {['SKT', 'KT', 'LGU+'].map(carrier => (
                                            <button 
                                                key={carrier}
                                                onClick={() => setSelectedCarrier(carrier)}
                                                className={`py-2 text-xs font-bold rounded border transition-colors ${selectedCarrier === carrier ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-500 border-zinc-700 hover:border-zinc-500'}`}
                                            >
                                                {carrier}
                                            </button>
                                        ))}
                                        <button className="py-2 text-xs font-bold rounded border bg-zinc-900 text-zinc-500 border-zinc-700 opacity-50 cursor-not-allowed">알뜰폰</button>
                                    </div>
                                    
                                    <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                                        <p className="text-xs text-zinc-500 mb-1">휴대폰 번호</p>
                                        <p className="text-white font-mono">{signupData.phone}</p>
                                    </div>

                                    <button 
                                        onClick={requestVerificationCode}
                                        className="w-full py-3 bg-[#D4AF37] text-black font-bold text-xs rounded hover:bg-[#FCE2C4] transition-colors"
                                    >
                                        인증번호 발송
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-center mb-4">
                                    <Smartphone className="w-10 h-10 text-zinc-700 mx-auto mb-2" />
                                    <p className="text-white text-sm font-bold">인증번호가 발송되었습니다.</p>
                                    <p className="text-zinc-500 text-xs">문자로 수신된 6자리 번호를 입력해주세요.</p>
                                </div>

                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={verifyCode}
                                        onChange={(e) => setVerifyCode(e.target.value)}
                                        placeholder="123456"
                                        className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-center text-white text-lg tracking-[0.5em] focus:border-[#D4AF37] outline-none"
                                        maxLength={6}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#D4AF37] text-xs font-mono font-bold">
                                        <Timer className="w-3 h-3" />
                                        {formatTime(verifyTimer)}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setVerificationStep('request')}
                                        className="flex-1 py-3 border border-zinc-700 text-zinc-400 font-bold text-xs rounded hover:bg-zinc-900"
                                    >
                                        재발송
                                    </button>
                                    <button 
                                        onClick={confirmVerificationCode}
                                        className="flex-1 py-3 bg-white text-black font-bold text-xs rounded hover:bg-zinc-200"
                                    >
                                        인증 확인
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Terms Modal */}
        {showTermsModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
                <div className="bg-[#111] border border-zinc-700 rounded-2xl w-full max-w-lg flex flex-col max-h-[80vh] shadow-2xl">
                    <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#D4AF37]" />
                            <h3 className="text-white font-bold text-sm">서비스 이용약관 (Terms of Service)</h3>
                        </div>
                        <button onClick={() => setShowTermsModal(false)} className="text-zinc-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto text-zinc-400 text-xs leading-relaxed space-y-4 custom-scrollbar">
                        <div className="bg-zinc-900/30 p-4 rounded border border-zinc-800">
                             <h4 className="text-white font-bold mb-1">제 1 조 (목적 및 서비스의 정의)</h4>
                             <p>본 약관은 PICKIT(이하 "회사")이 제공하는 메탈 플레이트 커스텀 서비스의 이용 조건을 규정합니다. 회사는 금융기관이 아니며, 고객이 소유한 카드의 외관을 변경할 수 있는 자재와 가공 서비스를 제공하는 써드파티 업체입니다.</p>
                        </div>

                        <div>
                             <h4 className="text-white font-bold mb-1">제 2 조 (면책 사항 - 중요)</h4>
                             <ul className="list-disc list-inside space-y-1 pl-1">
                                 <li><span className="text-red-400 font-bold">IC 칩 이식 책임:</span> IC 칩 이식(DIY)은 고객 본인의 책임하에 진행되는 작업입니다. 이식 과정에서 발생하는 기존 카드 및 칩의 파손, 기능 고장에 대해 회사는 민·형사상 책임을 지지 않습니다.</li>
                                 <li><span className="text-red-400 font-bold">기능 제한:</span> 메탈 카드는 소재 특성상 '교통카드(RF)' 및 '비접촉 결제(NFC)' 기능이 작동하지 않습니다. 고객은 이를 인지하고 동의한 것으로 간주합니다.</li>
                                 <li><span className="text-red-400 font-bold">ATM 사용:</span> 메탈 카드의 두께와 무게로 인해 일부 구형 ATM 기기에서는 이용이 제한될 수 있습니다.</li>
                             </ul>
                        </div>

                        <div>
                             <h4 className="text-white font-bold mb-1">제 3 조 (환불 및 교환)</h4>
                             <p>본 제품은 고객의 요청에 따라 각인이 진행되는 '주문 제작 상품'입니다. 제작이 시작된 이후에는 단순 변심으로 인한 취소 및 환불이 절대 불가합니다. 단, 제품 수령 직후 발견된 회사의 귀책사유(각인 오류, 소재 불량)에 대해서는 6개월간 무상 A/S를 제공합니다.</p>
                        </div>

                        <div>
                             <h4 className="text-white font-bold mb-1">제 4 조 (저작권 책임)</h4>
                             <p>커스텀 각인을 위해 고객이 업로드한 이미지(로고, 캐릭터 등)에 대한 저작권 및 상표권 책임은 전적으로 고객에게 있습니다. 회사는 고객이 요청한 디자인을 가공할 뿐이며, 이로 인해 발생하는 제3자의 권리 침해 분쟁에 대해 책임지지 않습니다.</p>
                        </div>
                    </div>

                    <div className="p-5 border-t border-zinc-800 bg-zinc-900/50 rounded-b-2xl">
                        <button 
                            onClick={() => {
                                setSignupData(prev => ({ ...prev, agreeTerms: true }));
                                setShowTermsModal(false);
                            }}
                            className="w-full py-3 bg-[#D4AF37] text-black font-bold text-xs rounded hover:bg-[#b08d1e] transition-colors"
                        >
                            위 내용을 확인하였으며 동의합니다
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </section>
  );
};

export default AuthView;