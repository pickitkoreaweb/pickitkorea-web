import React, { useState, useEffect } from 'react';
import { User, Settings, LogOut, Save, ChevronRight, Clock, AlertTriangle, MessageSquare, ChevronDown, ShieldCheck } from 'lucide-react';

interface UserData {
  id: string; // Login ID
  customerId: string; // Unique PKT ID
  name: string;
  email: string;
  phone: string;
  birthdate?: string;
  address?: string;
  role: 'admin' | 'user';
  joinedAt: string;
}

interface Inquiry {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  password: string;
  status: 'waiting' | 'answered';
  reply?: string;
}

interface MyPageProps {
  currentUser: UserData;
  onLogout: () => void;
  onUpdateUser: (updatedUser: UserData) => void;
  setPage?: (page: string) => void;
}

const MyPage: React.FC<MyPageProps> = ({ currentUser, onLogout, onUpdateUser, setPage }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'inquiries'>('inquiries');
  const [myInquiries, setMyInquiries] = useState<Inquiry[]>([]);
  const [expandedInquiry, setExpandedInquiry] = useState<number | null>(null);
  
  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    phone: currentUser.phone || '',
    email: currentUser.email,
    birthdate: currentUser.birthdate || '',
    address: currentUser.address || ''
  });

  useEffect(() => {
    // Load Inquiries instead of Orders
    const allInquiries: Inquiry[] = JSON.parse(localStorage.getItem('pickit_inquiries') || '[]');
    // Filter inquiries where author matches current user's name
    // Note: In a real app, we should filter by ID, but based on InquiryBoard logic, we use name.
    const userInquiries = allInquiries.filter(item => item.author === currentUser.name);
    setMyInquiries(userInquiries);

    // Sync form with current user prop
    setEditForm({
        name: currentUser.name,
        phone: currentUser.phone || '',
        email: currentUser.email,
        birthdate: currentUser.birthdate || '',
        address: currentUser.address || ''
    });
  }, [currentUser]);

  const handleSaveProfile = () => {
      const updatedUser = { ...currentUser, ...editForm };
      
      // Update LocalStorage DB
      const allUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
      const updatedUsers = allUsers.map((u: UserData) => u.id === currentUser.id ? updatedUser : u);
      localStorage.setItem('pickit_users_db', JSON.stringify(updatedUsers));
      
      // Update Current Session
      localStorage.setItem('pickit_user', JSON.stringify(updatedUser));
      
      onUpdateUser(updatedUser);
      setIsEditing(false);
      alert("회원 정보가 성공적으로 수정되었습니다.");
  };

  const handleDeleteAccount = () => {
      if(window.confirm("정말로 탈퇴하시겠습니까? 탈퇴 시 모든 데이터는 복구할 수 없습니다.")) {
          // Remove User from DB
          const allUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
          const updatedUsers = allUsers.filter((u: UserData) => u.id !== currentUser.id);
          localStorage.setItem('pickit_users_db', JSON.stringify(updatedUsers));
          
          alert("회원 탈퇴가 완료되었습니다.");
          onLogout();
      }
  }

  const toggleInquiry = (id: number) => {
    if (expandedInquiry === id) {
        setExpandedInquiry(null);
    } else {
        setExpandedInquiry(id);
    }
  };

  return (
    <section className="pt-32 pb-24 px-6 bg-[#050505] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Profile Card */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none"></div>
             
             <div className="w-24 h-24 rounded-full bg-black border-2 border-[#D4AF37] p-1 shadow-[0_0_20px_rgba(212,175,55,0.2)] relative z-10">
                 <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold text-[#D4AF37]">
                     {currentUser.name[0]}
                 </div>
             </div>

             <div className="text-center md:text-left flex-1 relative z-10">
                 <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <h2 className="text-3xl font-serif text-white">{currentUser.name}</h2>
                     <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                         {currentUser.role === 'admin' ? 'Administrator' : 'VIP Member'}
                     </span>
                 </div>
                 <p className="text-zinc-500 font-mono text-sm mb-4">Customer ID: <span className="text-zinc-300">{currentUser.customerId}</span></p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-zinc-400">
                     <span className="flex items-center gap-1"><User className="w-3 h-3" /> {currentUser.id}</span>
                     <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Since {currentUser.joinedAt}</span>
                 </div>
             </div>

             <div className="flex gap-3 relative z-10">
                 <button onClick={onLogout} className="px-6 py-3 border border-zinc-700 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-xs font-bold flex items-center gap-2">
                     <LogOut className="w-4 h-4" /> LOGOUT
                 </button>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
                <nav className="flex flex-col gap-2 sticky top-24">
                    <button 
                        onClick={() => setActiveTab('inquiries')}
                        className={`text-left px-5 py-4 rounded-xl font-bold text-sm flex items-center justify-between transition-all ${activeTab === 'inquiries' ? 'bg-white text-black' : 'bg-zinc-900/30 text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
                    >
                        <span className="flex items-center gap-3"><MessageSquare className="w-4 h-4" /> 문의 내역 (Inquiries)</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`text-left px-5 py-4 rounded-xl font-bold text-sm flex items-center justify-between transition-all ${activeTab === 'profile' ? 'bg-white text-black' : 'bg-zinc-900/30 text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
                    >
                        <span className="flex items-center gap-3"><Settings className="w-4 h-4" /> 내 정보 관리 (Info)</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
                
                {/* INQUIRY HISTORY TAB */}
                {activeTab === 'inquiries' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[#D4AF37]" /> 문의 내역 (Inquiry History)
                            </h3>
                            <button 
                                onClick={() => setPage && setPage('contact')}
                                className="text-xs font-bold text-black bg-white px-4 py-2 rounded hover:bg-[#D4AF37] transition-colors"
                            >
                                새 문의하기
                            </button>
                        </div>

                        {myInquiries.length === 0 ? (
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-12 text-center">
                                <MessageSquare className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                                <h4 className="text-zinc-400 font-bold mb-2">No inquiries found</h4>
                                <p className="text-zinc-600 text-sm">작성된 문의 내역이 없습니다.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {myInquiries.map((inquiry) => (
                                    <div key={inquiry.id} className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden transition-all hover:border-zinc-700">
                                        {/* Inquiry Header */}
                                        <div 
                                            className="p-6 cursor-pointer flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                                            onClick={() => toggleInquiry(inquiry.id)}
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                                        inquiry.status === 'answered' 
                                                            ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' 
                                                            : 'border-zinc-600 text-zinc-500'
                                                    }`}>
                                                        {inquiry.status === 'answered' ? '답변완료' : '대기중'}
                                                    </span>
                                                    <span className="text-zinc-500 text-xs font-mono">{inquiry.date}</span>
                                                </div>
                                                <h4 className="text-white font-bold text-sm md:text-base hover:text-[#D4AF37] transition-colors">
                                                    {inquiry.title}
                                                </h4>
                                            </div>
                                            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${expandedInquiry === inquiry.id ? 'rotate-180' : ''}`} />
                                        </div>

                                        {/* Expanded Content */}
                                        {expandedInquiry === inquiry.id && (
                                            <div className="bg-black/30 border-t border-zinc-800 p-6 animate-fade-in-up">
                                                <div className="mb-6">
                                                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                                                        {inquiry.content}
                                                    </p>
                                                </div>

                                                {/* Admin Reply */}
                                                {inquiry.reply && (
                                                    <div className="bg-zinc-800/30 rounded-lg p-5 border border-zinc-700/50">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                                                            <span className="text-[#D4AF37] font-bold text-xs tracking-wider">PICKIT OFFICIAL</span>
                                                            <span className="text-zinc-500 text-[10px]">Administrator</span>
                                                        </div>
                                                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap pl-6 border-l border-zinc-700">
                                                            {inquiry.reply}
                                                        </p>
                                                    </div>
                                                )}

                                                {!inquiry.reply && (
                                                    <div className="flex items-center gap-2 text-zinc-500 text-xs bg-zinc-900/50 p-3 rounded">
                                                        <Clock className="w-3 h-3" />
                                                        <span>관리자 답변을 기다리고 있습니다.</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* PROFILE SETTINGS TAB */}
                {activeTab === 'profile' && (
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 animate-fade-in-up">
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-zinc-800">
                             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Settings className="w-5 h-5 text-[#D4AF37]" /> 내 정보 관리 (My Profile)
                             </h3>
                             {!isEditing ? (
                                 <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-[#D4AF37] hover:text-white underline">EDIT PROFILE</button>
                             ) : (
                                 <div className="flex gap-3">
                                     <button onClick={() => setIsEditing(false)} className="text-xs font-bold text-zinc-500 hover:text-white">CANCEL</button>
                                     <button onClick={handleSaveProfile} className="text-xs font-bold text-[#D4AF37] hover:text-white flex items-center gap-1">
                                         <Save className="w-3 h-3" /> SAVE CHANGES
                                     </button>
                                 </div>
                             )}
                        </div>

                        {/* Personal Info Group */}
                        <div className="mb-8">
                             <h4 className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest border-b border-zinc-800 pb-2">Personal Information</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-zinc-500 uppercase group-hover:text-[#D4AF37] transition-colors">이름 (Full Name)</label>
                                    <input 
                                        type="text" 
                                        disabled={!isEditing}
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                        className={`w-full bg-black border rounded-lg p-3 text-sm text-white focus:outline-none transition-all duration-300 ${isEditing ? 'border-zinc-600 focus:border-[#D4AF37] focus:bg-zinc-900' : 'border-zinc-800 text-zinc-400 cursor-not-allowed bg-zinc-950'}`}
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-zinc-500 uppercase group-hover:text-[#D4AF37] transition-colors">생년월일 (Birthdate)</label>
                                    <input 
                                        type="text" 
                                        disabled={!isEditing}
                                        value={editForm.birthdate}
                                        onChange={(e) => setEditForm({...editForm, birthdate: e.target.value})}
                                        placeholder="YYMMDD"
                                        maxLength={6}
                                        className={`w-full bg-black border rounded-lg p-3 text-sm text-white focus:outline-none transition-all duration-300 ${isEditing ? 'border-zinc-600 focus:border-[#D4AF37] focus:bg-zinc-900' : 'border-zinc-800 text-zinc-400 cursor-not-allowed bg-zinc-950'}`}
                                    />
                                </div>
                             </div>
                        </div>

                        {/* Contact Info Group */}
                        <div className="mb-8">
                             <h4 className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest border-b border-zinc-800 pb-2">Contact Details</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-zinc-500 uppercase group-hover:text-[#D4AF37] transition-colors">연락처 (Phone Number)</label>
                                    <input 
                                        type="text" 
                                        disabled={!isEditing}
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                        className={`w-full bg-black border rounded-lg p-3 text-sm text-white focus:outline-none transition-all duration-300 ${isEditing ? 'border-zinc-600 focus:border-[#D4AF37] focus:bg-zinc-900' : 'border-zinc-800 text-zinc-400 cursor-not-allowed bg-zinc-950'}`}
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-zinc-500 uppercase group-hover:text-[#D4AF37] transition-colors">이메일 (Email Address)</label>
                                    <input 
                                        type="email" 
                                        disabled={!isEditing}
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                        className={`w-full bg-black border rounded-lg p-3 text-sm text-white focus:outline-none transition-all duration-300 ${isEditing ? 'border-zinc-600 focus:border-[#D4AF37] focus:bg-zinc-900' : 'border-zinc-800 text-zinc-400 cursor-not-allowed bg-zinc-950'}`}
                                    />
                                </div>
                             </div>
                             <div className="space-y-2 group">
                                <label className="text-xs font-bold text-zinc-500 uppercase group-hover:text-[#D4AF37] transition-colors">배송지 주소 (Shipping Address)</label>
                                <input 
                                    type="text" 
                                    disabled={!isEditing}
                                    value={editForm.address}
                                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                    placeholder={!currentUser.address ? "배송지를 입력해주세요" : ""}
                                    className={`w-full bg-black border rounded-lg p-3 text-sm text-white focus:outline-none transition-all duration-300 ${isEditing ? 'border-zinc-600 focus:border-[#D4AF37] focus:bg-zinc-900' : 'border-zinc-800 text-zinc-400 cursor-not-allowed bg-zinc-950'}`}
                                />
                             </div>
                        </div>

                        {/* Account Security Group */}
                        <div className="mt-8 pt-6 border-t border-zinc-800">
                            <h4 className="text-sm font-bold text-white mb-4">Account Security</h4>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                                    <div>
                                        <p className="text-sm text-white font-medium">비밀번호 변경</p>
                                        <p className="text-xs text-zinc-500">마지막 변경일: 3개월 전</p>
                                    </div>
                                    <button disabled className="px-4 py-2 bg-zinc-800 text-zinc-500 text-xs rounded font-bold cursor-not-allowed">변경 불가</button>
                                </div>
                                <div className="flex justify-between items-center bg-red-900/10 p-4 rounded-lg border border-red-900/30">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <AlertTriangle className="w-4 h-4 text-red-500" />
                                            <p className="text-sm text-red-500 font-bold">회원 탈퇴 (Delete Account)</p>
                                        </div>
                                        <p className="text-xs text-zinc-500">탈퇴 시 모든 데이터는 영구 삭제됩니다.</p>
                                    </div>
                                    <button 
                                        onClick={handleDeleteAccount}
                                        className="px-4 py-2 border border-red-900/50 text-red-500 hover:bg-red-900/20 text-xs rounded font-bold transition-colors"
                                    >
                                        탈퇴하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default MyPage;