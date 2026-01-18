import React, { useState } from 'react';

type PolicyTab = 'shipping' | 'returns' | 'privacy' | 'terms';

const PolicyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PolicyTab>('shipping');

  const tabs: {id: PolicyTab; label: string}[] = [
    { id: 'shipping', label: '배송 및 제작' },
    { id: 'returns', label: '보증 및 A/S' },
    { id: 'privacy', label: '개인정보 처리방침' },
    { id: 'terms', label: '이용약관' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'shipping':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-serif text-white mb-4">Shipping Information</h3>
            <p className="text-zinc-400">PICKIT 제품은 주문 후 제작되는 핸드메이드 제품입니다. 최고의 품질을 위해 정밀한 공정을 거치므로 제작 시간이 소요됩니다.</p>
            
            <div className="border-l-2 border-zinc-800 pl-6 space-y-4">
                <div>
                    <h4 className="text-white font-bold mb-1">제작 기간 (Production Time)</h4>
                    <p className="text-zinc-500 text-sm">레이저 각인 및 품질 검수(QC)에 <span className="text-white">영업일 기준 2-3일</span>이 소요됩니다.</p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-1">배송 기간 (Delivery Time)</h4>
                    <p className="text-zinc-500 text-sm">CJ 대한통운 또는 우체국 택배를 통해 발송되며, 발송 후 <span className="text-white">1-2일</span> 내 수령 가능합니다.</p>
                </div>
            </div>
            <p className="text-zinc-500 text-sm mt-4">※ 연휴 및 주문 폭주 기간에는 제작 기간이 1~2일 추가될 수 있습니다.</p>
          </div>
        );
      case 'returns':
        return (
           <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-serif text-white mb-4">Warranty & Returns</h3>
            <p className="text-zinc-400">모든 PICKIT 카드는 고객님의 고유한 정보가 각인된 주문 제작 상품이므로, 단순 변심에 의한 반품 및 환불은 불가능합니다.</p>
            
            <h4 className="text-white font-bold mt-8 mb-2">6개월 품질 보증 (Limited Warranty)</h4>
            <p className="text-zinc-500 text-sm mb-4">제품 수령일로부터 6개월간, 다음과 같은 경우 무상 A/S 또는 재제작을 지원합니다.</p>
            <ul className="list-disc list-inside text-zinc-500 text-sm space-y-2">
                <li>금속 코팅의 비정상적인 변색 또는 벗겨짐</li>
                <li>당사 공정상 발생한 각인 오류</li>
                <li>제품 수령 직후 발견된 구조적 결함</li>
            </ul>

            <h4 className="text-white font-bold mt-8 mb-2">보증 제외 항목</h4>
            <p className="text-zinc-500 text-sm">고객의 IC칩 이식 과정 중 발생한 손상, 일상적인 사용으로 인한 스크래치, 과도한 힘으로 인한 휘어짐 등은 보증 대상에서 제외됩니다.</p>
          </div>
        );
      case 'privacy':
        return (
           <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-serif text-white mb-4">Privacy Policy</h3>
            <p className="text-zinc-400 text-sm">최종 수정일: 2026년 1월</p>
            <p className="text-zinc-400">PICKIT은 고객님의 개인정보를 소중하게 생각합니다. 제공해주신 정보(성함 등 각인 데이터)는 오직 제품 제작을 위해서만 사용됩니다.</p>
            <p className="text-zinc-400">보안을 위해, 제작이 완료되고 배송이 확인된 시점으로부터 <span className="text-white">30일 후 모든 각인 데이터는 당사 서버에서 영구 삭제</span>됩니다. 저희는 고객의 데이터를 제3자에게 절대 제공하거나 판매하지 않습니다.</p>
          </div>
        );
      case 'terms':
        return (
           <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-serif text-white mb-4">Terms of Service</h3>
            <p className="text-zinc-400">PICKIT은 카드 커스터마이징 서비스를 제공하는 써드파티 업체이며, 금융기관이나 은행이 아닙니다.</p>
            <p className="text-zinc-400 mt-4">
                1. 고객은 본 서비스를 통해 커스텀하고자 하는 카드의 적법한 소유자여야 합니다.<br/>
                2. IC 칩 이식 작업(DIY)은 전적으로 고객의 책임하에 진행되며, 이식 중 기존 카드의 칩이 손상되어 발생하는 문제에 대해 PICKIT은 책임지지 않습니다.<br/>
                3. PICKIT 메탈 카드는 결제 기능 외 교통카드(RF) 기능이 포함되어 있지 않음을 인지하고 동의합니다.
            </p>
          </div>
        );
    }
  };

  return (
    <section className="py-24 px-6 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-white mb-4">Legal & Support</h2>
            <div className="w-20 h-[1px] bg-zinc-800 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-1/4">
                <div className="flex flex-col gap-1 sticky top-32">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-left px-4 py-3 text-sm font-medium rounded-lg transition-all interactable ${activeTab === tab.id ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full md:w-3/4 min-h-[400px] bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 md:p-12">
                {renderContent()}
            </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyView;