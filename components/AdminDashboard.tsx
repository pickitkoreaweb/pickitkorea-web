import React, { useState, useEffect } from 'react';
import { Users, Image, Save, Search, Package, Calendar, CreditCard, Upload, X, Check, PenTool, Plus, Trash2, FileSpreadsheet, ShieldAlert, Lock, Grid, RefreshCw, Pencil, Video } from 'lucide-react';

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
  introVideo: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
}

const DEFAULT_PORTFOLIO: GalleryItem[] = [
    {
      id: 1,
      title: "The Centurion Black",
      category: "black",
      image: "https://images.unsplash.com/photo-1614623466144-d83049185c7c?q=80&w=1600&auto=format&fit=crop",
      desc: "Full Vector Engraving"
    },
    {
      id: 2,
      title: "Royal Gold Signature",
      category: "gold",
      image: "https://images.unsplash.com/photo-1622675363311-ac97f3598473?q=80&w=1600&auto=format&fit=crop",
      desc: "24K Plating Finish"
    },
    {
      id: 3,
      title: "Sterling Silver Brush",
      category: "silver",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop",
      desc: "Industrial Hairline"
    },
];

interface AdminDashboardProps {
  siteImages: SiteImages;
  updateSiteImages: (newImages: SiteImages) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteImages, updateSiteImages }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'gallery'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null); // For Edit Mode
  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
      title: '',
      category: 'black',
      image: '',
      desc: ''
  });
  
  // Order State
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<Order['status']>('Pending');

  // Security
  const [resetPassword, setResetPassword] = useState('');

  // Content
  const [editingImages, setEditingImages] = useState<SiteImages>(siteImages);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    // 1. Load Users
    const storedUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
    setUsers(storedUsers);

    // 2. Load Gallery
    const storedGallery = localStorage.getItem('pickit_gallery');
    if (storedGallery) {
        try {
            setGalleryItems(JSON.parse(storedGallery));
        } catch (e) {
            console.error("Failed to parse gallery data", e);
            setGalleryItems(DEFAULT_PORTFOLIO);
        }
    } else {
        setGalleryItems(DEFAULT_PORTFOLIO);
        localStorage.setItem('pickit_gallery', JSON.stringify(DEFAULT_PORTFOLIO));
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
        const allOrders: Order[] = JSON.parse(localStorage.getItem('pickit_orders') || '[]');
        const filtered = allOrders.filter(o => o.customerId === selectedUser.customerId);
        setUserOrders(filtered);
        setResetPassword('');
    }
  }, [selectedUser]);

  // --- GALLERY FUNCTIONS ---

  const handleEditGalleryItem = (item: GalleryItem) => {
      setEditingItem(item);
      setGalleryForm({
          title: item.title,
          category: item.category,
          image: item.image,
          desc: item.desc
      });
      // Scroll to form
      const formElement = document.getElementById('gallery-form');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
      setEditingItem(null);
      setGalleryForm({ title: '', category: 'black', image: '', desc: '' });
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!galleryForm.title || !galleryForm.image || !galleryForm.desc) {
          alert("모든 필드를 입력해주세요.");
          return;
      }

      setGalleryItems(prevItems => {
          let updatedGallery: GalleryItem[];
          
          if (editingItem) {
              // Update existing
              updatedGallery = prevItems.map(item => 
                  item.id === editingItem.id ? { ...item, ...galleryForm } : item
              );
              alert("수정되었습니다.");
          } else {
              // Create new
              const newItem: GalleryItem = {
                  id: Date.now(),
                  ...galleryForm
              };
              updatedGallery = [newItem, ...prevItems];
              alert("등록되었습니다.");
          }
          
          localStorage.setItem('pickit_gallery', JSON.stringify(updatedGallery));
          return updatedGallery;
      });

      handleCancelEdit(); // Reset form
  };

  // Fixed Delete Handler using functional state update
  const handleDeleteGalleryItem = (id: number) => {
      if (window.confirm("정말로 이 포트폴리오 이미지를 삭제하시겠습니까?")) {
          setGalleryItems(prevItems => {
              const updatedGallery = prevItems.filter(item => item.id !== id);
              localStorage.setItem('pickit_gallery', JSON.stringify(updatedGallery));
              return updatedGallery;
          });
          
          // If deleting the item currently being edited, reset form
          if (editingItem?.id === id) {
              handleCancelEdit();
          }
      }
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                  setGalleryForm(prev => ({ ...prev, image: reader.result as string }));
              }
          };
          reader.readAsDataURL(file);
      }
  };

  // --- OTHER FUNCTIONS ---
  const handleExportExcel = () => {
    if (users.length === 0) { alert("내보낼 데이터가 없습니다."); return; }
    let csvContent = "\uFEFFCustomer ID,이름,ID,이메일,연락처,생년월일,주소,가입일,등급\n";
    users.forEach(user => {
        const safeAddress = user.address ? `"${user.address.replace(/"/g, '""')}"` : "";
        const row = [user.customerId, user.name, user.id, user.email, `'${user.phone}`, user.birthdate || '', safeAddress, user.joinedAt || '', user.role];
        csvContent += row.join(",") + "\n";
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PICKIT_Customer_Data_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePasswordReset = () => {
      if (!selectedUser) return;
      if (!resetPassword.trim()) { alert("변경할 비밀번호를 입력해주세요."); return; }
      if (window.confirm(`[관리자 권한]\n${selectedUser.name} 회원의 비밀번호를 변경하시겠습니까?`)) {
          const storedUsers = JSON.parse(localStorage.getItem('pickit_users_db') || '[]');
          const updatedUsers = storedUsers.map((u: any) => {
              if (u.id === selectedUser.id) return { ...u, password: resetPassword };
              return u;
          });
          localStorage.setItem('pickit_users_db', JSON.stringify(updatedUsers));
          setResetPassword('');
          alert("비밀번호가 변경되었습니다.");
      }
  };

  const createMockOrder = () => {
    if (!selectedUser) return;
    const newOrder: Order = {
        orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
        customerId: selectedUser.customerId,
        date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').slice(0, -1),
        item: 'Black Metal Custom',
        amount: '44,900 KRW',
        status: 'Pending',
        designFile: 'admin_created.ai'
    };
    const allOrders: Order[] = JSON.parse(localStorage.getItem('pickit_orders') || '[]');
    const updatedOrders = [newOrder, ...allOrders];
    localStorage.setItem('pickit_orders', JSON.stringify(updatedOrders));
    setUserOrders([newOrder, ...userOrders]);
  };

  const handleStatusUpdate = (orderId: string) => {
      const allOrders: Order[] = JSON.parse(localStorage.getItem('pickit_orders') || '[]');
      const updatedOrders = allOrders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
      localStorage.setItem('pickit_orders', JSON.stringify(updatedOrders));
      setUserOrders(userOrders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
      setEditingOrder(null);
  };

  const handleDeleteOrder = (orderId: string) => {
      if (window.confirm("Are you sure you want to permanently delete this order?")) {
          const allOrders: Order[] = JSON.parse(localStorage.getItem('pickit_orders') || '[]');
          const updatedOrders = allOrders.filter(o => o.orderId !== orderId);
          localStorage.setItem('pickit_orders', JSON.stringify(updatedOrders));
          setUserOrders(userOrders.filter(o => o.orderId !== orderId));
      }
  };
  
  const handleImageChange = (key: keyof SiteImages, value: string) => setEditingImages(prev => ({ ...prev, [key]: value }));
  const handleFileUpload = (key: keyof SiteImages, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => { if (typeof reader.result === 'string') handleImageChange(key, reader.result); };
    reader.readAsDataURL(file);
  };
  const saveContent = () => {
      updateSiteImages(editingImages);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const filteredUsers = users.filter(u => u.name.includes(searchTerm));

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800 pb-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">Admin Dashboard</h1>
                <p className="text-zinc-500 text-sm">System Management Console</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
                <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Users</button>
                <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'gallery' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Gallery</button>
                <button onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Content</button>
            </div>
        </div>

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
                {/* ... (Existing Gallery Tab Content - No Changes) ... */}
                {/* Form Side */}
                <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-fit sticky top-24" id="gallery-form">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">
                        {editingItem ? `Edit Item #${editingItem.id}` : 'Add New Item'}
                    </h3>
                    <form onSubmit={handleGallerySubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Title</label>
                            <input type="text" value={galleryForm.title} onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none" placeholder="Product Name" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Category</label>
                            <select value={galleryForm.category} onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none">
                                <option value="black">Black</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                                <option value="rose">Rose Gold</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Description</label>
                            <input type="text" value={galleryForm.desc} onChange={(e) => setGalleryForm({...galleryForm, desc: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none" placeholder="Short description" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Image</label>
                            <div className="relative">
                                <input type="file" accept="image/*" onChange={handleGalleryImageUpload} className="hidden" id="gallery-upload" />
                                <label htmlFor="gallery-upload" className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded p-3 text-sm text-white cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4" /> {editingItem ? 'Change Image' : 'Upload Image'}
                                </label>
                            </div>
                            {galleryForm.image && (
                                <div className="mt-4 rounded-lg overflow-hidden border border-zinc-700 bg-black">
                                    <img src={galleryForm.image} alt="Preview" className="w-full h-32 object-contain" />
                                </div>
                            )}
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                            {editingItem && (
                                <button type="button" onClick={handleCancelEdit} className="flex-1 bg-zinc-800 text-white font-bold p-3 rounded hover:bg-zinc-700 transition-colors">
                                    Cancel
                                </button>
                            )}
                            <button type="submit" className={`flex-1 font-bold p-3 rounded transition-colors ${editingItem ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-[#D4AF37] hover:bg-[#FCE2C4] text-black'}`}>
                                {editingItem ? 'Update Item' : 'Add Item'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Side */}
                <div className="lg:col-span-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-[800px] overflow-y-auto custom-scrollbar">
                     <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                         <h3 className="text-xl font-bold text-white">Gallery List ({galleryItems.length})</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {galleryItems.map((item) => (
                             <div key={item.id} className="relative bg-black border border-zinc-800 rounded-xl overflow-hidden group">
                                 <div className="aspect-[4/5] relative">
                                     <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80" />
                                     
                                     {/* Action Buttons */}
                                     <div className="absolute top-2 right-2 flex gap-2 z-50">
                                         <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                handleEditGalleryItem(item);
                                            }}
                                            className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-500 shadow-lg transform hover:scale-110 transition-all flex items-center justify-center cursor-pointer pointer-events-auto"
                                            title="Edit"
                                         >
                                             <Pencil className="w-3.5 h-3.5" />
                                         </button>
                                         <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                handleDeleteGalleryItem(item.id);
                                            }}
                                            className="bg-red-600 p-2 rounded-full text-white hover:bg-red-500 shadow-lg transform hover:scale-110 transition-all flex items-center justify-center cursor-pointer pointer-events-auto"
                                            title="Delete"
                                         >
                                             <Trash2 className="w-3.5 h-3.5" />
                                         </button>
                                     </div>
                                 </div>
                                 <div className="p-4">
                                     <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block mb-1">{item.category}</span>
                                     <h4 className="text-white font-bold text-sm truncate">{item.title}</h4>
                                     <p className="text-zinc-500 text-xs mt-1 truncate">{item.desc}</p>
                                 </div>
                                 
                                 {editingItem?.id === item.id && (
                                     <div className="absolute inset-0 bg-[#D4AF37]/20 border-2 border-[#D4AF37] pointer-events-none z-10 rounded-xl flex items-center justify-center">
                                         <span className="bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">EDITING...</span>
                                     </div>
                                 )}
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
                {/* ... (Existing Users Tab Content - No Changes) ... */}
                {/* User List */}
                <div className="lg:col-span-5 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-[700px] flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white font-bold text-lg">Member List</h2>
                        <button 
                            onClick={handleExportExcel}
                            className="flex items-center gap-2 px-3 py-1.5 bg-green-900/30 border border-green-800 text-green-500 text-xs font-bold rounded hover:bg-green-900/50 transition-colors"
                        >
                            <FileSpreadsheet className="w-4 h-4" /> Export
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
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
                    </div>
                </div>

                {/* User Details & Orders */}
                <div className="lg:col-span-7 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 h-[700px] overflow-y-auto custom-scrollbar">
                    {selectedUser ? (
                        <div className="animate-fade-in-up">
                            <div className="flex justify-between items-start mb-6 border-b border-zinc-800 pb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">{selectedUser.name}</h2>
                                    <div className="flex flex-col gap-1 text-sm text-zinc-400 mt-2">
                                        <div className="flex gap-4">
                                            <span className="bg-zinc-800 px-2 py-0.5 rounded text-white font-mono">{selectedUser.customerId}</span>
                                            <span className="border-l border-zinc-700 pl-4">{selectedUser.phone || 'N/A'}</span>
                                        </div>
                                        <div className="flex gap-4 mt-1">
                                            <span>{selectedUser.birthdate || 'N/A'}</span>
                                            <span className="border-l border-zinc-700 pl-4">{selectedUser.email}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-500 mt-2">{selectedUser.address || 'Address not registered'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Joined Date</p>
                                    <p className="text-white font-mono">{selectedUser.joinedAt || '2026-01-01'}</p>
                                </div>
                            </div>
                            
                            {/* Security Action */}
                            <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-5 mb-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <Lock className="w-4 h-4 text-red-500" />
                                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider">Password Reset</h3>
                                </div>
                                <div className="flex gap-3">
                                    <input 
                                        type="text" 
                                        value={resetPassword}
                                        onChange={(e) => setResetPassword(e.target.value)}
                                        placeholder="New Password" 
                                        className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white focus:border-red-500 outline-none placeholder-zinc-600"
                                    />
                                    <button 
                                        onClick={handlePasswordReset}
                                        className="px-4 py-2 bg-red-500 text-white font-bold text-xs rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Package className="w-5 h-5 text-[#D4AF37]" /> Order History
                                </h3>
                                <button onClick={createMockOrder} className="text-xs font-bold flex items-center gap-1 bg-white text-black px-3 py-1.5 rounded hover:bg-[#D4AF37] transition-colors"><Plus className="w-3 h-3" /> Create</button>
                            </div>
                            
                            <div className="space-y-4">
                                {userOrders.map((order, idx) => (
                                    <div key={idx} className="bg-black border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[#D4AF37] font-bold text-sm">{order.item}</span>
                                                </div>
                                                <p className="text-xs text-zinc-500">ID: {order.orderId}</p>
                                            </div>

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
                                                <div className="flex items-center gap-2">
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
                                                    <button onClick={() => handleDeleteOrder(order.orderId)} className="p-1.5 bg-zinc-900 text-zinc-500 rounded border border-zinc-800 hover:text-red-500 transition-colors"><Trash2 className="w-3 h-3" /></button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-zinc-400 border-t border-zinc-800 pt-3">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</span>
                                                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> {order.amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {userOrders.length === 0 && <div className="text-center py-10 text-zinc-500 text-sm">No purchase history.</div>}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                            <Users className="w-16 h-16 mb-4 opacity-20" />
                            <p>Select a user to view details</p>
                        </div>
                    )}
                </div>
            </div>
        )}
        
        {/* CONTENT TAB */}
        {activeTab === 'content' && (
            <div className="max-w-3xl mx-auto animate-fade-in-up">
                 
                 {/* Intro Video Section (NEW) */}
                 <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4 flex items-center gap-2">
                        <Video className="w-5 h-5 text-[#D4AF37]" /> Intro Popup Video
                    </h3>
                    <div className="space-y-6">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-700 bg-black">
                             <video 
                                src={editingImages.introVideo} 
                                className="w-full h-full object-cover opacity-80" 
                                autoPlay muted loop
                             />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Video URL (MP4 / WebM)</label>
                            <input 
                                type="text" 
                                value={editingImages.introVideo} 
                                onChange={(e) => handleImageChange('introVideo', e.target.value)}
                                className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none"
                                placeholder="https://example.com/video.mp4"
                            />
                            <p className="text-[10px] text-zinc-500 mt-2">
                                * Direct video link required (e.g., from Pexels, S3, or public hosting). YouTube links are not supported in this player.
                            </p>
                        </div>
                    </div>
                 </div>

                 {/* Hero Section */}
                 <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Hero Section Image</h3>
                    <div className="space-y-6">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-700 bg-black">
                             <img src={editingImages.heroBg} alt="Hero Preview" className="w-full h-full object-cover opacity-60" />
                        </div>
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

                 {/* QC Image Section */}
                 <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Quality Control (QC) Image</h3>
                    <div className="space-y-6">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-700 bg-black">
                             <img src={editingImages.feature1} alt="QC Preview" className="w-full h-full object-cover opacity-60" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        id="qc-upload"
                                    />
                                    <label 
                                        htmlFor="qc-upload"
                                        className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded p-3 text-sm text-white cursor-pointer transition-colors"
                                    >
                                        <Upload className="w-4 h-4" /> Choose File
                                    </label>
                                </div>
                             </div>
                        </div>
                    </div>
                 </div>

                 {/* Sticky Save Bar */}
                 <div className="sticky bottom-8 bg-[#111] border border-zinc-800 p-4 rounded-xl shadow-2xl flex justify-between items-center">
                    <div className="text-sm text-zinc-400">
                        {saveStatus === 'saved' ? (
                            <span className="text-green-500 flex items-center gap-2"><Check className="w-4 h-4" /> Changes saved</span>
                        ) : "Unsaved changes."}
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