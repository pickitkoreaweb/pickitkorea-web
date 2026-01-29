import React, { useState, useEffect } from 'react';
import { Users, Image, Save, Search, Package, Calendar, CreditCard, Upload, X, Check, PenTool, Plus, Trash2, FileSpreadsheet, ShieldAlert, Lock, Grid, RefreshCw, Pencil, Video, FileText, Download, Scale, Layers, Palette, Copy, CheckCircle, AlertTriangle, Code } from 'lucide-react';

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

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
}

interface MaterialItem {
  id: number;
  name: string;
  type: string;
  desc: string;
  image: string;
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

// Updated Default Materials
const DEFAULT_MATERIALS: MaterialItem[] = [
    {
      id: 0,
      name: "STS304 MIRROR",
      type: "Super Mirror Finish",
      desc: "완벽하게 연마된 거울 같은 표면. 8K급 고해상도 반사율을 자랑하는 스테인리스 스틸의 가장 화려한 마감입니다. 지문 방지 코팅이 더해져 관리가 용이합니다.",
      image: "https://images.unsplash.com/photo-1629804257639-6539a2b726aa?q=80&w=2000&auto=format&fit=crop" // Liquid Chrome
    },
    {
      id: 1,
      name: "STS304 HAIRLINE",
      type: "Directional Satin",
      desc: "한 방향으로 뻗은 미세한 결이 특징인 헤어라인 마감. 빛의 각도에 따라 은은하게 변화하는 광택이 고급스러움을 더하며, 생활 스크래치에 강합니다.",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" // Classic Brushed
    },
    {
      id: 2,
      name: "STS304 BRUSHED",
      type: "Vibration Finish",
      desc: "불규칙한 연마 자국이 만들어내는 독특한 빈티지 텍스처. 거친 듯 부드러운 질감으로 금속 본연의 물성을 가장 잘 표현한 인더스트리얼 마감입니다.",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000&auto=format&fit=crop" // Sandblasted/Rough
    }
];

// Strategic Articles Content (HTML formatted for Word)
const ARTICLES_HTML = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>주식회사 피킷코리아 정관</title>
<style>
body { font-family: 'Batang', serif; line-height: 1.6; }
h1 { text-align: center; font-size: 24pt; margin-bottom: 30px; }
h2 { font-size: 16pt; margin-top: 20px; border-bottom: 1px solid #000; padding-bottom: 5px; }
p { font-size: 11pt; margin-bottom: 10px; }
.chapter { font-weight: bold; font-size: 14pt; margin-top: 30px; text-align: center; }
.article-title { font-weight: bold; margin-right: 10px; }
.highlight { background-color: #ffff00; }
</style>
</head><body>
<h1>주식회사 피킷코리아 정관</h1>
<p style="text-align: center; color: red; font-weight: bold;">(Strategic Edition for 10 Million KRW Capital)</p>

<div class="chapter">제1장 총칙</div>

<p><span class="article-title">제1조 (상호)</span>본 회사는 주식회사 피킷코리아 (영문명: PICKIT KOREA Inc.)라 한다.</p>

<p><span class="article-title">제2조 (목적)</span>본 회사는 다음의 사업을 영위함을 목적으로 한다.<br>
1. 금속 카드 및 특수 소재 카드 제조, 가공 및 판매업<br>
2. 디자인 용역 및 브랜드 컨설팅업<br>
3. 전자상거래 및 통신판매업<br>
4. 소프트웨어 개발, 공급 및 자문업<br>
5. 무역업 및 무역대리업 (수출입업)<br>
6. 부동산 개발, 공급, 매매 및 임대업<br>
7. 부동산 컨설팅 및 분양 대행업<br>
8. 위 각 호에 부대하는 일체의 사업</p>

<p><span class="article-title">제4조 (공고방법)</span>본 회사의 공고는 회사의 인터넷 홈페이지(https://pickit-korea.com)에 게재한다. 단, 전산장애 등으로 게재할 수 없을 때는 서울특별시 내에서 발행되는 '매일경제신문'에 게재한다.</p>

<div class="chapter">제2장 주식</div>

<p><span class="article-title">제5조 (발행예정주식의 총수)</span>본 회사가 장차 발행할 주식의 총수(수권자본)는 100,000,000주로 한다.<br>
<span style="font-size:9pt; color:gray;">(설명: 이는 미래에 발행 가능한 한도이며, 지금 당장 발행해야 하는 주식 수가 아닙니다.)</span></p>

<p><span class="article-title">제6조 (1주의 금액)</span>주식 1주의 금액은 금 100원으로 한다.</p>

<p><span class="article-title">제7조 (설립 시에 발행하는 주식의 총수)</span>본 회사가 설립 시에 발행하는 주식의 총수는 <strong>100,000주</strong>(금 일천만 원)로 한다.<br>
<span style="font-size:9pt; color:blue;">(계산: 100,000주 x 100원 = 자본금 1,000만 원)</span></p>

<div class="chapter">제3장 주주총회</div>
<p><span class="article-title">제17조 (소집통지 및 공고)</span>주주총회를 소집함에는 그 일시, 장소 및 회의의 목적사항을 총회일 2주 간 전에 주주에게 서면 또는 전자문서로 통지하여야 한다. 단, 자본금 총액이 10억 원 미만인 경우에는 주주 전원의 동의가 있을 때 소집절차 없이 개최할 수 있다.</p>

<br><br>
<p style="text-align:center;">2026년 3월 1일</p>
<p style="text-align:center; font-weight:bold; font-size:14pt;">주식회사 피킷코리아</p>
<p style="text-align:center;">발기인 대표 김 정 우 (인)</p>
</body></html>
`;

interface AdminDashboardProps {
  siteImages: SiteImages;
  updateSiteImages: (newImages: SiteImages) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteImages, updateSiteImages }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'gallery' | 'materials' | 'legal' | 'assets'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null); 
  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
      title: '',
      category: 'black',
      image: '',
      desc: ''
  });

  // Materials State (NEW)
  const [materialItems, setMaterialItems] = useState<MaterialItem[]>([]);
  const [editingMaterial, setEditingMaterial] = useState<MaterialItem | null>(null);
  const [materialForm, setMaterialForm] = useState<Omit<MaterialItem, 'id'>>({
      name: '',
      type: '',
      desc: '',
      image: ''
  });
  
  // Order State
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<Order['status']>('Pending');

  // Security
  const [resetPassword, setResetPassword] = useState('');

  // Content
  const [editingImages, setEditingImages] = useState<SiteImages>(siteImages);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Assets State
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
            setGalleryItems(DEFAULT_PORTFOLIO);
        }
    } else {
        setGalleryItems(DEFAULT_PORTFOLIO);
        localStorage.setItem('pickit_gallery', JSON.stringify(DEFAULT_PORTFOLIO));
    }

    // 3. Load Materials (NEW) - Using v3 key
    const storedMaterials = localStorage.getItem('pickit_materials_v3');
    if (storedMaterials) {
        try {
            setMaterialItems(JSON.parse(storedMaterials));
        } catch (e) {
            setMaterialItems(DEFAULT_MATERIALS);
        }
    } else {
        setMaterialItems(DEFAULT_MATERIALS);
        localStorage.setItem('pickit_materials_v3', JSON.stringify(DEFAULT_MATERIALS));
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

  // --- ASSETS FUNCTIONS ---
  const handleCopySvg = (svgContent: string, id: string) => {
      navigator.clipboard.writeText(svgContent).then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 2000);
      });
  };

  const handleDownloadSvg = (svgContent: string, filename: string) => {
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  // --- EXPORT FUNCTIONS (NEW) ---
  const handleExportData = (type: 'gallery' | 'materials') => {
      const data = type === 'gallery' ? galleryItems : materialItems;
      const jsonString = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(jsonString).then(() => {
          alert(`${type === 'gallery' ? '갤러리' : '소재'} 데이터가 클립보드에 복사되었습니다.\n\n이 코드를 개발자에게 전달하시면 실제 사이트에 영구적으로 반영됩니다.`);
      });
  };

  // --- LEGAL FUNCTIONS ---
  const handleDownloadArticles = () => {
      const blob = new Blob([ARTICLES_HTML], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'PICKIT_Strategic_Articles_of_Incorporation_2026.doc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  // --- GALLERY FUNCTIONS ---
  const handleEditGalleryItem = (item: GalleryItem) => {
      setEditingItem(item);
      setGalleryForm({
          title: item.title,
          category: item.category,
          image: item.image,
          desc: item.desc
      });
      const formElement = document.getElementById('gallery-form');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelGalleryEdit = () => {
      setEditingItem(null);
      setGalleryForm({ title: '', category: 'black', image: '', desc: '' });
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!galleryForm.title || !galleryForm.image) {
          alert("이미지와 제목은 필수입니다.");
          return;
      }

      setGalleryItems(prevItems => {
          let updatedGallery: GalleryItem[];
          if (editingItem) {
              updatedGallery = prevItems.map(item => item.id === editingItem.id ? { ...item, ...galleryForm } : item);
              alert("수정되었습니다.");
          } else {
              const newItem: GalleryItem = { id: Date.now(), ...galleryForm };
              updatedGallery = [newItem, ...prevItems];
              alert("등록되었습니다.");
          }
          localStorage.setItem('pickit_gallery', JSON.stringify(updatedGallery));
          return updatedGallery;
      });
      handleCancelGalleryEdit();
  };

  const handleDeleteGalleryItem = (id: number) => {
      if (window.confirm("정말로 이 이미지를 삭제하시겠습니까?")) {
          setGalleryItems(prevItems => {
              const updated = prevItems.filter(item => item.id !== id);
              localStorage.setItem('pickit_gallery', JSON.stringify(updated));
              return updated;
          });
          if (editingItem?.id === id) handleCancelGalleryEdit();
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

  // --- MATERIAL FUNCTIONS (NEW) ---
  const handleEditMaterial = (item: MaterialItem) => {
      setEditingMaterial(item);
      setMaterialForm({
          name: item.name,
          type: item.type,
          desc: item.desc,
          image: item.image
      });
      const formElement = document.getElementById('material-form');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelMaterialEdit = () => {
      setEditingMaterial(null);
      setMaterialForm({ name: '', type: '', desc: '', image: '' });
  };

  const handleMaterialSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!materialForm.name || !materialForm.image) {
          alert("소재 이름과 이미지는 필수입니다.");
          return;
      }

      setMaterialItems(prevItems => {
          let updatedMaterials: MaterialItem[];
          if (editingMaterial) {
              updatedMaterials = prevItems.map(item => item.id === editingMaterial.id ? { ...item, ...materialForm } : item);
              alert("소재 정보가 수정되었습니다.");
          } else {
              const newItem: MaterialItem = { id: Date.now(), ...materialForm };
              updatedMaterials = [newItem, ...prevItems];
              alert("새 소재가 등록되었습니다.");
          }
          localStorage.setItem('pickit_materials_v3', JSON.stringify(updatedMaterials));
          return updatedMaterials;
      });
      handleCancelMaterialEdit();
  };

  const handleDeleteMaterial = (id: number) => {
      if (window.confirm("정말로 이 소재를 삭제하시겠습니까?")) {
          setMaterialItems(prevItems => {
              const updated = prevItems.filter(item => item.id !== id);
              localStorage.setItem('pickit_materials_v3', JSON.stringify(updated));
              return updated;
          });
          if (editingMaterial?.id === id) handleCancelMaterialEdit();
      }
  };

  const handleMaterialImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                  setMaterialForm(prev => ({ ...prev, image: reader.result as string }));
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

  // --- SVG ASSETS DEFINITION ---
  const symbolSvg = `<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradSymbol" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#e4e4e7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#71717a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="25" y="25" width="50" height="50" fill="url(#gradSymbol)" transform="rotate(45 50 50)" />
  <circle cx="50" cy="50" r="8" fill="#000000" />
</svg>`;

  const wordmarkSvg = `<svg width="300" height="80" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-weight="bold" font-size="40" letter-spacing="0.2em" fill="#ffffff">PICKIT</text>
  <rect x="135" y="55" width="30" height="2" fill="#D4AF37" />
</svg>`;

  const symbolDarkSvg = `<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradSymbolDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3f3f46;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#18181b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="25" y="25" width="50" height="50" fill="url(#gradSymbolDark)" transform="rotate(45 50 50)" />
  <circle cx="50" cy="50" r="8" fill="#ffffff" />
</svg>`;

  const wordmarkDarkSvg = `<svg width="300" height="80" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-weight="bold" font-size="40" letter-spacing="0.2em" fill="#000000">PICKIT</text>
  <rect x="135" y="55" width="30" height="2" fill="#D4AF37" />
</svg>`;

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800 pb-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">Admin Dashboard</h1>
                <p className="text-zinc-500 text-sm">System Management Console</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Users</button>
                <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'gallery' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Gallery</button>
                <button onClick={() => setActiveTab('materials')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'materials' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Materials</button>
                <button onClick={() => setActiveTab('assets')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'assets' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Brand Assets</button>
                <button onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Content</button>
                <button onClick={() => setActiveTab('legal')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'legal' ? 'bg-red-900/30 text-red-500 border border-red-900/50' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>Legal</button>
            </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
                <h4 className="text-yellow-500 font-bold text-sm mb-1">Local Storage Mode</h4>
                <p className="text-yellow-200/70 text-xs leading-relaxed">
                    현재 수정하신 데이터는 <strong>관리자님의 로컬 브라우저에만 저장</strong>되며, 실제 사이트(다른 사용자)에는 반영되지 않습니다.<br/>
                    변경사항을 실제 사이트에 반영하려면 각 탭의 <strong>'Export Data'</strong> 버튼을 눌러 데이터를 복사한 후, 개발자에게 전달해 주세요.
                </p>
            </div>
        </div>

        {/* ASSETS TAB (NEW) */}
        {activeTab === 'assets' && (
            <div className="animate-fade-in-up">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Palette className="w-6 h-6 text-[#D4AF37]" /> Brand Identity Assets
                    </h2>
                    <p className="text-zinc-400 text-sm mt-2">
                        사업계획서 및 마케팅 자료에 사용할 수 있는 공식 로고 벡터(SVG) 파일입니다. <br/>
                        'Download Vector' 버튼을 클릭하면 AI(일러스트레이터) 호환 파일이 다운로드됩니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Symbol Logo */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center">
                        <div className="w-full aspect-square flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-zinc-950 rounded-xl border border-zinc-800 mb-6 relative group overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                                <div dangerouslySetInnerHTML={{ __html: symbolSvg }} className="w-48 h-48" />
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold text-lg">Primary Symbol</h3>
                                <p className="text-zinc-500 text-xs">Geometric Diamond (Silver)</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleCopySvg(symbolSvg, 'symbol')}
                                    className="p-2 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                    title="Copy Code"
                                >
                                    {copiedId === 'symbol' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button 
                                    onClick={() => handleDownloadSvg(symbolSvg, 'PICKIT_Symbol_Vector')}
                                    className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-lg hover:bg-[#FCE2C4] transition-colors flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Vector (.SVG)
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Wordmark */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center">
                        <div className="w-full aspect-square flex items-center justify-center bg-black rounded-xl border border-zinc-800 mb-6 relative group overflow-hidden">
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div dangerouslySetInnerHTML={{ __html: wordmarkSvg }} className="w-64" />
                             </div>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold text-lg">Official Wordmark</h3>
                                <p className="text-zinc-500 text-xs">Serif Typography (White/Gold)</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleCopySvg(wordmarkSvg, 'wordmark')}
                                    className="p-2 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                    title="Copy Code"
                                >
                                    {copiedId === 'wordmark' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button 
                                    onClick={() => handleDownloadSvg(wordmarkSvg, 'PICKIT_Wordmark_Vector')}
                                    className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-lg hover:bg-[#FCE2C4] transition-colors flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Vector (.SVG)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dark Versions Section */}
                <div className="mt-12 mb-8">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-4">
                        <Palette className="w-5 h-5 text-white" /> For Light Backgrounds (White Version)
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Symbol Logo Dark */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center">
                        <div className="w-full aspect-square flex items-center justify-center bg-white rounded-xl border border-zinc-800 mb-6 relative group overflow-hidden shadow-inner">
                            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                                <div dangerouslySetInnerHTML={{ __html: symbolDarkSvg }} className="w-48 h-48" />
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold text-lg">Symbol (Dark)</h3>
                                <p className="text-zinc-500 text-xs">For Business Cards / Documents</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleCopySvg(symbolDarkSvg, 'symbolDark')}
                                    className="p-2 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                    title="Copy Code"
                                >
                                    {copiedId === 'symbolDark' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button 
                                    onClick={() => handleDownloadSvg(symbolDarkSvg, 'PICKIT_Symbol_Dark_Vector')}
                                    className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Vector
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Wordmark Dark */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center">
                        <div className="w-full aspect-square flex items-center justify-center bg-white rounded-xl border border-zinc-800 mb-6 relative group overflow-hidden shadow-inner">
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div dangerouslySetInnerHTML={{ __html: wordmarkDarkSvg }} className="w-64" />
                             </div>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold text-lg">Wordmark (Dark)</h3>
                                <p className="text-zinc-500 text-xs">Black Text for White Papers</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleCopySvg(wordmarkDarkSvg, 'wordmarkDark')}
                                    className="p-2 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                >
                                    {copiedId === 'wordmarkDark' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button 
                                    onClick={() => handleDownloadSvg(wordmarkDarkSvg, 'PICKIT_Wordmark_Dark_Vector')}
                                    className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Vector
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* LEGAL TAB */}
        {activeTab === 'legal' && (
            <div className="max-w-4xl mx-auto animate-fade-in-up">
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-red-900/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <div className="flex items-start justify-between mb-8 relative z-10">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                <Scale className="w-6 h-6 text-[#D4AF37]" /> Corporate Legal Docs
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                2026년 설립 예정인 주식회사 피킷코리아의 법인 설립용 정관입니다.<br/>
                                창업자(대표이사)의 권한 보호 및 투자 유치에 최적화된 전략 정관입니다.
                            </p>
                        </div>
                        <button 
                            onClick={handleDownloadArticles}
                            className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FCE2C4] transition-colors shadow-lg shadow-[#D4AF37]/20"
                        >
                            <Download className="w-4 h-4" />
                            Download .DOC
                        </button>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-white text-black p-8 rounded-xl h-[600px] overflow-y-auto font-serif shadow-inner border border-zinc-700">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <h1 className="text-3xl font-bold text-center border-b-2 border-black pb-4 mb-8">주식회사 피킷코리아 정관</h1>
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">제1장 총칙</h2>
                                <p><strong>제1조 (상호)</strong> 본 회사는 주식회사 피킷코리아 (영문명: PICKIT KOREA Inc.)라 한다.</p>
                                <p><strong>제2조 (목적)</strong> 본 회사는 다음의 사업을 영위함을 목적으로 한다...</p>
                                <h2 className="text-xl font-bold mt-8">제2장 주식 (전략적 조항)</h2>
                                <p className="bg-gray-100 p-2 rounded">
                                    <strong>제5조 (발행예정주식의 총수)</strong><br/>
                                    본 회사가 장차 발행할 주식의 총수(수권자본)는 100,000,000주로 한다. (설정 한도)
                                </p>
                                <p className="bg-yellow-100 p-2 rounded border border-yellow-400">
                                    <strong>제7조 (설립 시에 발행하는 주식의 총수) ★</strong><br/>
                                    본 회사가 설립 시에 발행하는 주식의 총수는 <strong>100,000주</strong>로 한다.<br/>
                                    <span className="text-xs text-gray-600">(100원 x 100,000주 = 자본금 1,000만 원)</span>
                                </p>
                            </div>
                            <div className="mt-12 text-center text-gray-500 text-sm">
                                [전체 내용은 다운로드된 파일에서 확인 가능합니다]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* MATERIALS TAB (NEW) */}
        {activeTab === 'materials' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
                {/* Form Side */}
                <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-fit sticky top-24" id="material-form">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#D4AF37]" /> {editingMaterial ? 'Edit Material' : 'Add New Material'}
                    </h3>
                    <form onSubmit={handleMaterialSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Name (e.g., STS304 Mirror)</label>
                            <input type="text" value={materialForm.name} onChange={(e) => setMaterialForm({...materialForm, name: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none" placeholder="Material Name" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Type / Subtitle</label>
                            <input type="text" value={materialForm.type} onChange={(e) => setMaterialForm({...materialForm, type: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none" placeholder="e.g., Super Mirror Finish" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Description</label>
                            <textarea rows={4} value={materialForm.desc} onChange={(e) => setMaterialForm({...materialForm, desc: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none resize-none" placeholder="Description..." />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Texture Image</label>
                            <div className="relative">
                                <input type="file" accept="image/*" onChange={handleMaterialImageUpload} className="hidden" id="material-upload" />
                                <label htmlFor="material-upload" className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded p-3 text-sm text-white cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4" /> {editingMaterial ? 'Change Texture' : 'Upload Texture'}
                                </label>
                            </div>
                            {materialForm.image && (
                                <div className="mt-4 rounded-full w-24 h-24 overflow-hidden border-2 border-zinc-700 bg-black mx-auto">
                                    <img src={materialForm.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                            {editingMaterial && (
                                <button type="button" onClick={handleCancelMaterialEdit} className="flex-1 bg-zinc-800 text-white font-bold p-3 rounded hover:bg-zinc-700 transition-colors">
                                    Cancel
                                </button>
                            )}
                            <button type="submit" className={`flex-1 font-bold p-3 rounded transition-colors ${editingMaterial ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-[#D4AF37] hover:bg-[#FCE2C4] text-black'}`}>
                                {editingMaterial ? 'Update Material' : 'Add Material'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Side */}
                <div className="lg:col-span-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-[800px] overflow-y-auto custom-scrollbar">
                     <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                         <h3 className="text-xl font-bold text-white">Material Library ({materialItems.length})</h3>
                         <button 
                            onClick={() => handleExportData('materials')}
                            className="text-xs font-bold flex items-center gap-2 bg-[#D4AF37] text-black px-3 py-1.5 rounded hover:bg-[#FCE2C4] transition-colors"
                         >
                             <Code className="w-3 h-3" /> Export Data
                         </button>
                     </div>
                     <div className="space-y-3">
                         {materialItems.map((item) => (
                             <div key={item.id} className="flex items-center gap-4 bg-black border border-zinc-800 rounded-xl p-4 group">
                                 <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-700 shrink-0">
                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                 </div>
                                 <div className="flex-1">
                                     <h4 className="text-white font-bold text-sm">{item.name}</h4>
                                     <p className="text-zinc-500 text-xs mb-1">{item.type}</p>
                                     <p className="text-zinc-600 text-xs line-clamp-1">{item.desc}</p>
                                 </div>
                                 <div className="flex gap-2">
                                     <button onClick={() => handleEditMaterial(item)} className="p-2 bg-zinc-900 text-zinc-400 hover:text-blue-400 rounded"><Pencil className="w-4 h-4" /></button>
                                     <button onClick={() => handleDeleteMaterial(item.id)} className="p-2 bg-zinc-900 text-zinc-400 hover:text-red-500 rounded"><Trash2 className="w-4 h-4" /></button>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
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
                                <button type="button" onClick={handleCancelGalleryEdit} className="flex-1 bg-zinc-800 text-white font-bold p-3 rounded hover:bg-zinc-700 transition-colors">
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
                         <button 
                            onClick={() => handleExportData('gallery')}
                            className="text-xs font-bold flex items-center gap-2 bg-[#D4AF37] text-black px-3 py-1.5 rounded hover:bg-[#FCE2C4] transition-colors"
                         >
                             <Code className="w-3 h-3" /> Export Data
                         </button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {galleryItems.map((item) => (
                             <div key={item.id} className="relative bg-black border border-zinc-800 rounded-xl overflow-hidden group">
                                 <div className="aspect-[4/5] relative">
                                     <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80" />
                                     <div className="absolute top-2 right-2 flex gap-2 z-50">
                                         <button type="button" onClick={(e) => { e.stopPropagation(); handleEditGalleryItem(item); }} className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-500 shadow-lg transform hover:scale-110 transition-all">
                                             <Pencil className="w-3.5 h-3.5" />
                                         </button>
                                         <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteGalleryItem(item.id); }} className="bg-red-600 p-2 rounded-full text-white hover:bg-red-500 shadow-lg transform hover:scale-110 transition-all">
                                             <Trash2 className="w-3.5 h-3.5" />
                                         </button>
                                     </div>
                                 </div>
                                 <div className="p-4">
                                     <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block mb-1">{item.category}</span>
                                     <h4 className="text-white font-bold text-sm truncate">{item.title}</h4>
                                     <p className="text-zinc-500 text-xs mt-1 truncate">{item.desc}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
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