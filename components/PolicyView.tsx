import React, { useState } from 'react';

type PolicyTab = 'shipping' | 'returns' | 'privacy' | 'terms';

const PolicyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PolicyTab>('shipping');

  const tabs: {id: PolicyTab; label: string}[] = [
    { id: 'shipping', label: 'Shipping' },
    { id: 'returns', label: 'Returns & Warranty' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'shipping':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-serif text-white mb-4">Shipping Information</h3>
            <p className="text-zinc-400">PICKIT products are crafted to order. We prioritize precision over speed to ensure every card meets our exacting standards.</p>
            
            <div className="border-l-2 border-zinc-800 pl-6 space-y-4">
                <div>
                    <h4 className="text-white font-bold mb-1">Production Time</h4>
                    <p className="text-zinc-500 text-sm">2-3 Business Days for Laser Engraving & Quality Control.</p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-1">Delivery Time</h4>
                    <p className="text-zinc-500 text-sm">Domestic (Korea): 1-2 Business Days via CJ Logistics or Post Office.</p>
                </div>
            </div>
            <p className="text-zinc-500 text-sm mt-4">Note: During high volume periods (holidays), production may take an additional 1-2 days.</p>
          </div>
        );
      case 'returns':
        return (
           <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-serif text-white mb-4">Warranty & Returns</h3>
            <p className="text-zinc-400">Because every PICKIT card is custom engraved with your unique details, we cannot accept returns for "change of mind." However, we stand firmly behind our quality.</p>
            
            <h4 className="text-white font-bold mt-8 mb-2">6-Month Limited Warranty</h4>
            <ul className="list-disc list-inside text-zinc-500 text-sm space-y-2">
                <li>Defects in the metal coating (peeling or abnormal discoloration).</li>
                <li>Errors in laser engraving caused by our production process.</li>
                <li>Structural defects present upon arrival.</li>
            </ul>

            <h4 className="text-white font-bold mt-8 mb-2">Non-Covered Issues</h4>
            <p className="text-zinc-500 text-sm">Damage caused by the user during the IC chip transfer process, scratches from daily wear and tear, or bending due to excessive force are not covered.</p>
          </div>
        );
      case 'privacy':
        return (
           <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-serif text-white mb-4">Privacy Policy</h3>
            <p className="text-zinc-400 text-sm">Last updated: January 2026</p>
            <p className="text-zinc-400">PICKIT respects your privacy. We do not sell your data. The information you provide (Name, Card Numbers for engraving) is used strictly for the production of your card and is deleted from our production servers 30 days after delivery confirmation.</p>
          </div>
        );
      case 'terms':
        return (
           <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-serif text-white mb-4">Terms of Service</h3>
            <p className="text-zinc-400">By using our service, you acknowledge that PICKIT is a third-party card customization service. We are not a bank or financial institution.</p>
            <p className="text-zinc-400 mt-4">You agree that you are the lawful owner of the card you are transferring. You assume full responsibility for the transfer of the EMV chip.</p>
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