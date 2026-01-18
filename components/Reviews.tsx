import React from 'react';
import { Quote } from 'lucide-react';

const Reviews: React.FC = () => {
  const reviews = [
    {
      text: "The weight of the card changes everything. It's not just a payment method, it's a conversation starter.",
      author: "James L.",
      title: "Venture Capitalist",
      tier: "BLACK EDITION"
    },
    {
      text: "I was skeptical about the DIY chip transfer, but the guide was flawless. The result is absolutely stunning.",
      author: "Sarah K.",
      title: "Creative Director",
      tier: "ROSE GOLD"
    },
    {
      text: "Comparable to the Centurion card in feel and finish. The laser engraving detail is microscopic perfection.",
      author: "Michael R.",
      title: "Architect",
      tier: "SILVER BRUSHED"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <span className="text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Voices of the Elite</span>
           <h2 className="text-3xl md:text-5xl font-serif text-white">Member Experiences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-2xl relative group hover:bg-zinc-900/40 transition-colors duration-500">
              <Quote className="w-8 h-8 text-zinc-700 mb-6 group-hover:text-white transition-colors" />
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 font-light italic">"{review.text}"</p>
              
              <div className="flex items-end justify-between border-t border-zinc-800 pt-6">
                <div>
                   <h4 className="text-white font-bold">{review.author}</h4>
                   <span className="text-xs text-zinc-500 uppercase tracking-wider">{review.title}</span>
                </div>
                <span className="text-[9px] font-bold text-zinc-600 border border-zinc-700 px-2 py-1 rounded bg-black">
                   {review.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;