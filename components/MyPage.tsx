import React, { useState, useEffect } from 'react';
import { User, Package, Settings, LogOut, Save, ChevronRight, Truck, Clock, AlertTriangle } from 'lucide-react';

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

interface Order {
  orderId: string;
  customerId: string;
  date: string;
  item: string;
  amount: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  trackingNum?: string;
}

interface MyPageProps {
  currentUser: UserData;
  onLogout: () => void;
  onUpdateUser: (updatedUser: UserData) => void;
}

const MyPage: React.FC<MyPageProps> = ({ currentUser, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  
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
    // Load Orders
    const allOrders: Order[] = JSON.parse(localStorage.getItem('pickit_orders') || '[]');
    const myOrders = allOrders.filter(o => o.customerId === currentUser.customerId);
    setOrders(myOrders);

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

  const getStatusStep = (status: string) => {
      switch(status) {
          case 'Pending': return 1;
          case 'Processing': return 2;
          case 'Shipped': return 3;
          case 'Delivered': return 4;
          default: return 0;
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
                        onClick={() => setActiveTab('orders')}
                        className={`text-left px-5 py-4 rounded-xl font-bold text-sm flex items-center justify-between transition-all ${activeTab === 'orders' ? 'bg-white text-black' : 'bg-zinc-900/30 text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
                    >
                        <span className="flex items-center gap-3"><Package className="w-4 h-4" /> 주문 내역 (Orders)</span>
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
                
                {/* ORDER HISTORY TAB */}
                {activeTab === 'orders' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Truck className="w-5 h-5 text-[#D4AF37]" /> 주문 내역 (Order History)
                        </h3>

                        {orders.length === 0 ? (
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-12 text-center">
                                <Package className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                                <h4 className="text-zinc-400 font-bold mb-2">No orders found</h4>
                                <p className="text-zinc-600 text-sm">아직 주문 내역이 없습니다. 나만의 메탈 카드를 만들어보세요.</p>
                            </div>
                        ) : (
                            orders.map((order, idx) => {
                                const step = getStatusStep(order.status);
                                return (
                                    <div key={idx} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-zinc-700 transition-all">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-[#D4AF37] font-bold text-lg">{order.item}</span>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                                        order.status === 'Delivered' ? 'border-green-900 text-green-500 bg-green-900/20' : 
                                                        order.status === 'Shipped' ? 'border-blue-900 text-blue-500 bg-blue-900/20' :
                                                        'border-yellow-900 text-yellow-500 bg-yellow-900/20'
                                                    }`}>
                                                        {order.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex gap-4 text-xs text-zinc-500 font-mono">
                                                    <span>Order ID: {order.orderId}</span>
                                                    <span>|</span>
                                                    <span>{order.date}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-white font-bold text-xl">{order.amount}</span>
                                            </div>
                                        </div>

                                        {/* Status Progress Bar */}
                                        <div className="relative pt-4 pb-2">
                                            <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -translate-y-1/2 rounded-full"></div>
                                            <div 
                                                className="absolute top-1/2 left-0 h-1 bg-[#D4AF37] -translate-y-1/2 rounded-full transition-all duration-1000"
                                                style={{ width: `${((step - 1) / 3) * 100}%` }}
                                            ></div>
                                            
                                            <div className="relative flex justify-between">
                                                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((s, i) => {
                                                    const isCompleted = i + 1 <= step;
                                                    return (
                                                        <div key={s} className="flex flex-col items-center gap-2">
                                                            <div className={`w-3 h-3 rounded-full border-2 transition-all ${isCompleted ? 'bg-[#D4AF37] border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-zinc-900 border-zinc-600'}`}></div>
                                                            <span className={`text-[10px] uppercase font-bold tracking-wider ${isCompleted ? 'text-white' : 'text-zinc-600'}`}>{s}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
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