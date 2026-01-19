import React, { useState, useEffect } from 'react';
import { Lock, PenTool, ChevronRight, User, Calendar, ShieldCheck, AlertCircle, X, Trash2, Crown } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  password: string;
  status: 'waiting' | 'answered';
  reply?: string;
}

interface InquiryBoardProps {
  currentUser: {
    id: string;
    name: string;
    role: 'admin' | 'user';
  } | null;
}

const InquiryBoard: React.FC<InquiryBoardProps> = ({ currentUser }) => {
  const [view, setView] = useState<'list' | 'write' | 'read'>('list');
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Initial Data Load (Simulated Database)
  useEffect(() => {
    const savedPosts = localStorage.getItem('pickit_inquiries');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Default Mock Data
      const initialPosts: Post[] = [
        {
            id: 103,
            title: '블랙 에디션 각인 관련 문의드립니다.',
            author: '김**',
            date: '2026.01.24',
            content: '로고 파일이 ai파일인데 업로드가 안되네요. 메일로 보내도 될까요?',
            password: '1234',
            status: 'answered',
            reply: '안녕하세요 PICKIT입니다. 네, 해당 파일은 pickit.korea.official@gmail.com 으로 주문자 성함과 함께 보내주시면 확인 후 시안 작업 진행해드리겠습니다. 감사합니다.'
        },
        {
            id: 102,
            title: 'IC칩 이식 실패 시 어떻게 하나요?',
            author: '이**',
            date: '2026.01.23',
            content: '똥손이라 걱정되는데 혹시 실패하면 카드 다시 사야하나요?',
            password: '1234',
            status: 'waiting'
        },
        {
            id: 101,
            title: '배송지 변경 요청',
            author: '박**',
            date: '2026.01.20',
            content: '이사가는 바람에 주소가 바뀌었습니다.',
            password: '1234',
            status: 'answered',
            reply: '안녕하세요. 요청하신 주소지로 변경 완료되었습니다. 금일 발송 예정입니다.'
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('pickit_inquiries', JSON.stringify(initialPosts));
    }
  }, []);

  // Save changes to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
        localStorage.setItem('pickit_inquiries', JSON.stringify(posts));
    }
  }, [posts]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

  // Write Form State
  const [formData, setFormData] = useState({
    title: '',
    author: currentUser ? currentUser.name : '',
    password: '',
    content: ''
  });

  // Handle Post Click
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setPasswordInput('');
    setIsPasswordIncorrect(false);

    // ADMIN PRIVILEGE: Bypass password check
    if (currentUser?.role === 'admin') {
      setView('read');
    }
  };

  // Verify Password
  const verifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPost && passwordInput === selectedPost.password) {
      setView('read');
    } else {
      setIsPasswordIncorrect(true);
    }
  };

  // Handle Write Submit
  const handleWriteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-mask author name if not admin, but for now just taking input or user name
    const authorName = formData.author || (currentUser ? currentUser.name : 'Guest');
    const maskedAuthor = currentUser?.role === 'admin' ? authorName : authorName.substring(0, 1) + '**';

    const newPost: Post = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      title: formData.title,
      author: maskedAuthor, 
      date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').slice(0, -1),
      content: formData.content,
      password: formData.password,
      status: 'waiting'
    };
    
    setPosts([newPost, ...posts]);
    setFormData({ title: '', author: currentUser ? currentUser.name : '', password: '', content: '' });
    setView('list');
  };

  // ADMIN: Delete Post
  const handleDeletePost = () => {
    if (selectedPost && currentUser?.role === 'admin') {
        if(window.confirm("관리자 권한으로 이 게시글을 영구 삭제하시겠습니까?")) {
            const updatedPosts = posts.filter(p => p.id !== selectedPost.id);
            setPosts(updatedPosts);
            closeDetail();
        }
    }
  };

  const closeDetail = () => {
    setSelectedPost(null);
    setView('list');
  };

  return (
    <section className="py-24 px-6 bg-[#050505] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-zinc-900 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800 pb-8 gap-6">
          <div>
             <div className="flex items-center gap-2 mb-2">
                 <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase block">1:1 Private Board</span>
                 {currentUser?.role === 'admin' && (
                     <span className="bg-red-900/30 text-red-500 border border-red-900 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                        <Crown className="w-3 h-3" /> ADMIN MODE
                     </span>
                 )}
             </div>
             <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Customer Inquiry</h2>
             <p className="text-zinc-500 text-sm">작성자와 관리자만 확인할 수 있는 비밀 게시판입니다.</p>
          </div>
          
          {view === 'list' && (
            <button 
              onClick={() => setView('write')}
              className="px-6 py-3 bg-white text-black text-xs font-bold tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2"
            >
              <PenTool className="w-4 h-4" />
              WRITE INQUIRY
            </button>
          )}
        </div>

        {/* VIEW: LIST */}
        {view === 'list' && (
          <div className="animate-fade-in-up">
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-800 pb-4 px-4">
              <div className="col-span-1 text-center">No</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-6">Subject</div>
              <div className="col-span-2 text-center">Author</div>
              <div className="col-span-2 text-center">Date</div>
            </div>

            {/* List Items */}
            <div className="space-y-2 md:space-y-0">
              {posts.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 md:py-5 border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors cursor-pointer group items-center relative ${currentUser?.role === 'admin' ? 'bg-zinc-900/10' : ''}`}
                >
                  <div className="hidden md:block col-span-1 text-center text-zinc-600 text-xs font-mono">{post.id}</div>
                  
                  <div className="col-span-2 md:col-span-1 flex md:justify-center">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                      post.status === 'answered' 
                        ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' 
                        : 'border-zinc-700 text-zinc-500'
                    }`}>
                      {post.status === 'answered' ? '답변완료' : '대기중'}
                    </span>
                  </div>

                  <div className="col-span-8 md:col-span-6 flex items-center gap-2">
                    {currentUser?.role === 'admin' ? (
                        <ShieldCheck className="w-3 h-3 text-red-500" /> 
                    ) : (
                        <Lock className="w-3 h-3 text-zinc-600" />
                    )}
                    <span className={`text-sm transition-colors truncate ${currentUser?.role === 'admin' ? 'text-white font-medium' : 'text-zinc-300 group-hover:text-white'}`}>
                      {post.title}
                    </span>
                  </div>

                  <div className="col-span-6 md:col-span-2 flex items-center md:justify-center gap-1 text-xs text-zinc-500">
                    <User className="w-3 h-3 md:hidden" />
                    {post.author}
                  </div>

                  <div className="col-span-6 md:col-span-2 flex items-center md:justify-center gap-1 text-xs text-zinc-600 font-mono text-right md:text-center">
                    <Calendar className="w-3 h-3 md:hidden" />
                    {post.date}
                  </div>
                  
                  {/* Mobile Arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden text-zinc-700">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
              
              {posts.length === 0 && (
                  <div className="py-20 text-center text-zinc-600 text-sm">
                      게시글이 존재하지 않습니다.
                  </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: WRITE */}
        {view === 'write' && (
          <form onSubmit={handleWriteSubmit} className="max-w-2xl mx-auto animate-fade-in-up bg-zinc-900/20 p-8 rounded-2xl border border-zinc-800">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Subject</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-white focus:outline-none transition-colors"
                  placeholder="제목을 입력해주세요"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Author</label>
                  <input 
                    type="text" 
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className={`w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-white focus:outline-none transition-colors ${currentUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="작성자명"
                    required
                    readOnly={!!currentUser}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-white focus:outline-none transition-colors"
                    placeholder="비밀번호 4자리"
                    required
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea 
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-white focus:outline-none transition-colors resize-none"
                  placeholder="문의 내용을 입력해주세요. (비밀글로 보호됩니다)"
                  required
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setView('list')}
                  className="flex-1 py-3 border border-zinc-700 text-zinc-400 font-bold text-xs rounded hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-[#D4AF37] text-black font-bold text-xs rounded hover:bg-[#b08d1e] transition-colors"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        )}

        {/* VIEW: READ */}
        {view === 'read' && selectedPost && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <div className="border border-zinc-800 rounded-2xl overflow-hidden relative">
              
              {/* ADMIN DELETE BUTTON */}
              {currentUser?.role === 'admin' && (
                  <button 
                    onClick={handleDeletePost}
                    className="absolute top-6 right-6 text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded transition-colors z-20 flex items-center gap-2 text-xs font-bold"
                  >
                      <Trash2 className="w-4 h-4" /> DELETE
                  </button>
              )}

              {/* Post Header */}
              <div className="bg-zinc-900/50 p-6 border-b border-zinc-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      selectedPost.status === 'answered' 
                        ? 'border-[#D4AF37] text-[#D4AF37]' 
                        : 'border-zinc-600 text-zinc-500'
                    }`}>
                      {selectedPost.status === 'answered' ? '답변완료' : '대기중'}
                  </span>
                  <span className="text-zinc-500 text-xs font-mono">{selectedPost.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 pr-12">{selectedPost.title}</h3>
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                   <User className="w-3 h-3" />
                   {selectedPost.author}
                   {currentUser?.role === 'admin' && (
                       <span className="ml-2 text-zinc-700 text-xs">(Pass: {selectedPost.password})</span>
                   )}
                </div>
              </div>

              {/* Post Body */}
              <div className="p-8 bg-[#0a0a0a] min-h-[200px]">
                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
              </div>

              {/* Admin Reply Section */}
              {(selectedPost.reply || currentUser?.role === 'admin') && (
                <div className="bg-zinc-900 p-6 border-t border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] font-bold text-xs tracking-wider">PICKIT OFFICIAL</span>
                  </div>
                  
                  {selectedPost.reply ? (
                       <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap pl-6 border-l border-zinc-700">
                           {selectedPost.reply}
                       </p>
                  ) : (
                      <div className="pl-6 border-l border-zinc-700">
                          <textarea 
                             placeholder="관리자 답변을 입력하세요..." 
                             className="w-full bg-black/50 border border-zinc-700 rounded p-3 text-sm text-white resize-none h-24 focus:border-[#D4AF37] outline-none"
                          ></textarea>
                          <button className="mt-2 px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded hover:bg-white transition-colors">
                              등록하기
                          </button>
                      </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <button 
                onClick={closeDetail}
                className="px-8 py-3 border border-zinc-700 text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition-colors"
              >
                BACK TO LIST
              </button>
            </div>
          </div>
        )}

        {/* PASSWORD MODAL (Skipped if Admin) */}
        {selectedPost && view === 'list' && currentUser?.role !== 'admin' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up">
            <div className="bg-[#111] border border-zinc-800 p-8 rounded-2xl w-full max-w-sm relative shadow-2xl">
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-bold text-lg">Password Required</h3>
                <p className="text-zinc-500 text-xs mt-1">이 글은 비밀글로 보호되어 있습니다.</p>
              </div>

              <form onSubmit={verifyPassword} className="space-y-4">
                <div>
                   <input 
                    type="password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-center text-white tracking-[0.5em] focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:tracking-normal"
                    placeholder="Enter Password"
                    autoFocus
                   />
                   {isPasswordIncorrect && (
                     <div className="flex items-center justify-center gap-1 mt-2 text-red-500 text-xs animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        <span>비밀번호가 일치하지 않습니다.</span>
                     </div>
                   )}
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-white text-black font-bold text-xs rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  UNLOCK POST
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default InquiryBoard;