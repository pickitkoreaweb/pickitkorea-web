import React, { useState, useEffect } from 'react';
import { Users, Image, Save, Search, Package, Calendar, CreditCard, Upload, X, Trash2, Check, PenTool, Plus } from 'lucide-react';

interface User {
  id: string;
  customerId: string; // Unique PKT ID
  name: string;
  role: 'admin' | 'user';
  email: string;
  phone?: string;
  birthdate?: string;
  address?: string;
  joinedAt?: string;
}

interface Order {
  orderId: string;
  customerId: string;
  date: string;
  item: string;
  amount: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  designFile?: string;
}

interface SiteImages {
  heroBg: string;
  feature1: string; // QC Image
}

interface AdminDashboardProps {
  siteImages: SiteImages;
  updateSiteImages: (newImages: SiteImages) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteImages, updateSiteImages }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Order Editing State
  const [editingOrder, setEditingOrder] = useState<string | null>(null); // Order ID
  const [newStatus, setNewStatus] = useState<Order['status']>('Pending');

  // Content Management State
  const [editingImages, setEditingImages] = useState<SiteImages>(siteImages);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    // Load Users from LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    // Load Orders whenever selectedUser changes
    if (selectedUser) {
        const allOrders: Order[] = JSON.parse(localStorage.getItem('pickit_orders') || '[]');
        const filtered = allOrders.filter(o => o.customerId === selectedUser.customerId);
        setUserOrders(filtered);
    }
  }, [selectedUser]);

  // Create a Mock Order for the selected user (Admin function)
  const createMockOrder = () => {
    if (!selectedUser) return;
    
    const newOrder: Order = {
        orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
        customerId: selectedUser.customerId,
        date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').slice(0, -1),
        item: 'Black Metal Custom',
        amount: '150,000 KRW',
        status: 'Pending',
        designFile: 'admin_created.ai'
    };

    const allOrders: Order[] = JSON.parse(localStorage.getItem('pickit_orders') || '[]');
    const updatedOrders = [newOrder, ...allOrders];
    localStorage.setItem('pickit_orders', JSON.stringify(updatedOrders));
    
    // Update local state
    setUserOrders([newOrder, ...userOrders]);
  };

  const handleStatusUpdate = (orderId: string) => {
      const allOrders: Order[] = JSON.parse(localStorage.getItem('pickit_orders') || '[]');
      const updatedOrders = allOrders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
      localStorage.setItem('pickit_orders', JSON.stringify(updatedOrders));
      
      // Update local state
      setUserOrders(userOrders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
      setEditingOrder(null);
  };

  const filteredUsers = users.filter(u => 
    u.name.includes(searchTerm) || u.email.includes(searchTerm) || u.customerId?.includes(searchTerm)
  );

  // Content Management Logic
  const handleImageChange = (key: keyof SiteImages, value: string) => {
    setEditingImages(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (key: keyof SiteImages, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            handleImageChange(key, reader.result);
        }
    };
    reader.readAsDataURL(file);
  };

  const saveContent = () => {
    setSaveStatus('saving');
    setTimeout(() => {
        updateSiteImages(editingImages);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800 pb-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">Admin Dashboard</h1>
                <p className="text-zinc-500 text-sm">Manage users, orders, and website content.</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
                <button 
                    onClick={() => setActiveTab('users')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" /> User Management
                    </div>
                </button>
                <button 
                    onClick={() => setActiveTab('content')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Image className="w-4 h-4" /> Content Management
                    </div>
                </button>
            </div>
        </div>

        {/* --- USER MANAGEMENT TAB --- */}
        {activeTab === 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
                {/* User List */}
                <div className="lg:col-span-5 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-[700px] flex flex-col">
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                            type="text" 
                            placeholder="Search Name or Customer ID..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black border border-zinc-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-[#D4AF37] outline-none"
                        />
                    </div>
                    
                    <div className="overflow-y-auto flex-1 space-y-2 custom-scrollbar pr-2">
                        {filteredUsers.map(user => (
                            <div 
                                key={user.id} 
                                onClick={() => setSelectedUser(user)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedUser?.id === user.id ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-black border-zinc-800 hover:border-zinc-600'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`font-bold text-sm ${selectedUser?.id === user.id ? 'text-[#D4AF37]' : 'text-white'}`}>{user.name}</p>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                                            <span className="font-mono text-zinc-400">{user.customerId}</span>
                                            <span>|</span>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${user.role === 'admin' ? 'bg-red-900/30 text-red-500' : 'bg-zinc-800 text-zinc-400'}`}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {filteredUsers.length === 0 && (
                            <p className="text-zinc-500 text-center text-sm py-10">No users found.</p>
                        )}
                    </div>
                </div>

                {/* User Details & Orders */}
                <div className="lg:col-span-7 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 h-[700px] overflow-y-auto custom-scrollbar">
                    {selectedUser ? (
                        <div className="animate-fade-in-up">
                            <div className="flex justify-between items-start mb-8 border-b border-zinc-800 pb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">{selectedUser.name}</h2>
                                    <div className="flex flex-col gap-1 text-sm text-zinc-400 mt-2">
                                        <div className="flex gap-4">
                                            <span className="bg-zinc-800 px-2 py-0.5 rounded text-white font-mono">{selectedUser.customerId}</span>
                                            <span className="border-l border-zinc-700 pl-4">Phone: {selectedUser.phone || 'N/A'}</span>
                                        </div>
                                        <div className="flex gap-4 mt-1">
                                            <span>Birthdate: {selectedUser.birthdate || 'N/A'}</span>
                                            <span className="border-l border-zinc-700 pl-4">Email: {selectedUser.email}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-500 mt-2">Address: {selectedUser.address || 'Not registered'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Joined Date</p>
                                    <p className="text-white font-mono">{selectedUser.joinedAt || '2026-01-01'}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Package className="w-5 h-5 text-[#D4AF37]" /> Order History
                                </h3>
                                <button 
                                    onClick={createMockOrder}
                                    className="text-xs font-bold flex items-center gap-1 bg-white text-black px-3 py-1.5 rounded hover:bg-[#D4AF37] transition-colors"
                                >
                                    <Plus className="w-3 h-3" /> Create Order
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {userOrders.map((order, idx) => (
                                    <div key={idx} className="bg-black border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[#D4AF37] font-bold text-sm">{order.item}</span>
                                                </div>
                                                <p className="text-xs text-zinc-500">Order ID: {order.orderId}</p>
                                            </div>

                                            {/* Status Editing */}
                                            {editingOrder === order.orderId ? (
                                                <div className="flex items-center gap-2">
                                                    <select 
                                                        value={newStatus}
                                                        onChange={(e) => setNewStatus(e.target.value as Order['status'])}
                                                        className="bg-zinc-800 text-white text-xs p-1 rounded border border-zinc-600"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                    <button onClick={() => handleStatusUpdate(order.orderId)} className="p-1 bg-green-900/50 text-green-500 rounded hover:bg-green-900"><Check className="w-3 h-3" /></button>
                                                    <button onClick={() => setEditingOrder(null)} className="p-1 bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700"><X className="w-3 h-3" /></button>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => {
                                                        setEditingOrder(order.orderId);
                                                        setNewStatus(order.status);
                                                    }}
                                                    className={`text-xs font-bold px-2 py-1 rounded border flex items-center gap-2 hover:opacity-80 transition-opacity ${
                                                        order.status === 'Delivered' ? 'border-green-900 text-green-500 bg-green-900/10' :
                                                        order.status === 'Shipped' ? 'border-blue-900 text-blue-500 bg-blue-900/10' :
                                                        'border-yellow-900 text-yellow-500 bg-yellow-900/10'
                                                    }`}
                                                >
                                                    {order.status}
                                                    <PenTool className="w-3 h-3 opacity-50" />
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="flex justify-between items-center text-xs text-zinc-400 border-t border-zinc-800 pt-3">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</span>
                                                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> {order.amount}</span>
                                            </div>
                                            {order.designFile && (
                                                <span className="text-zinc-500 flex items-center gap-1">
                                                    Design: {order.designFile}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {userOrders.length === 0 && (
                                    <div className="text-center py-10 text-zinc-500 text-sm bg-zinc-900/10 rounded-xl">
                                        No purchase history found. <br/>
                                        Click 'Create Order' to add one.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                            <Users className="w-16 h-16 mb-4 opacity-20" />
                            <p>Select a user from the list to view details</p>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* --- CONTENT MANAGEMENT TAB --- */}
        {activeTab === 'content' && (
            <div className="max-w-3xl mx-auto animate-fade-in-up">
                 <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Hero Section Image</h3>
                    
                    <div className="space-y-6">
                        {/* Preview */}
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-700 bg-black">
                             <img src={editingImages.heroBg} alt="Hero Preview" className="w-full h-full object-cover opacity-60" />
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-white font-bold text-lg drop-shadow-md">Hero Background Preview</span>
                             </div>
                        </div>

                        {/* Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Image URL</label>
                                <input 
                                    type="text" 
                                    value={editingImages.heroBg} 
                                    onChange={(e) => handleImageChange('heroBg', e.target.value)}
                                    className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none"
                                />
                             </div>
                             <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Upload File</label>
                                <div className="relative">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => e.target.files && handleFileUpload('heroBg', e.target.files[0])}
                                        className="hidden"
                                        id="hero-upload"
                                    />
                                    <label 
                                        htmlFor="hero-upload"
                                        className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded p-3 text-sm text-white cursor-pointer transition-colors"
                                    >
                                        <Upload className="w-4 h-4" /> Choose File
                                    </label>
                                </div>
                             </div>
                        </div>
                    </div>
                 </div>

                 <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Features QC Image</h3>
                    
                    <div className="space-y-6">
                        {/* Preview */}
                        <div className="flex gap-6">
                            <div className="w-1/3 aspect-[4/5] rounded-xl overflow-hidden border border-zinc-700 bg-black">
                                <img src={editingImages.feature1} alt="Feature Preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Image URL</label>
                                    <input 
                                        type="text" 
                                        value={editingImages.feature1} 
                                        onChange={(e) => handleImageChange('feature1', e.target.value)}
                                        className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Upload File</label>
                                    <div className="relative">
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => e.target.files && handleFileUpload('feature1', e.target.files[0])}
                                            className="hidden"
                                            id="feature-upload"
                                        />
                                        <label 
                                            htmlFor="feature-upload"
                                            className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded p-3 text-sm text-white cursor-pointer transition-colors"
                                        >
                                            <Upload className="w-4 h-4" /> Choose File
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Sticky Save Bar */}
                 <div className="sticky bottom-8 bg-[#111] border border-zinc-800 p-4 rounded-xl shadow-2xl flex justify-between items-center">
                    <div className="text-sm text-zinc-400">
                        {saveStatus === 'saved' ? (
                            <span className="text-green-500 flex items-center gap-2"><Check className="w-4 h-4" /> Changes saved successfully</span>
                        ) : (
                            "Unsaved changes will be lost."
                        )}
                    </div>
                    <button 
                        onClick={saveContent}
                        disabled={saveStatus === 'saving'}
                        className="px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FCE2C4] transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {saveStatus === 'saving' ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                    </button>
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;