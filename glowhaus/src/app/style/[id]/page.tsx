
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, Sparkles, Check, ShoppingBag, Users, Play } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import { styles, mockProducts, mockCommunityPosts } from '@/lib/mockData';

// Avatar colors cycle for users without an explicit avatar URL
const AVATAR_COLORS = [
  'bg-[#E11D48]',
  'bg-[#F43F5E]',
  'bg-[#8B5CF6]',
  'bg-[#3B82F6]',
  'bg-[#10B981]',
  'bg-[#F59E0B]',
  'bg-[#EC4899]',
  'bg-[#06B6D4]',
];

function MiniAvatar({
  name,
  url,
  index = 0,
}: {
  name: string;
  url?: string;
  index?: number;
}) {
  const initial = name.charAt(0).toUpperCase();
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  if (!url) {
    return (
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-[10px] ${color}`}
      >
        {initial}
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={name}
      className="w-6 h-6 rounded-full object-cover"
    />
  );
}

export default function StyleDetailPage() {
  // Get style ID from URL params (react-router)
  const params = useParams();
  const styleId = params.id || 'soft-glam';
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [selectedQuality, setSelectedQuality] = useState<'standard' | 'hd' | '4k'>('hd');

  const style = styles.find(s => s.id === styleId) || styles[0];
  const relatedPosts = mockCommunityPosts.filter(p => p.styleId === styleId).slice(0, 4);

  const qualityOptions = [
    { id: 'standard', label: 'Standard', tokens: style.tokenCost },
    { id: 'hd', label: 'HD', tokens: style.tokenCost + 5 },
    { id: '4k', label: '4K', tokens: style.tokenCost + 15 },
  ];

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <img 
          src={style.previewImage} 
          alt={style.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <a 
          href="/styles"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </a>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {style.name}
                </h1>
                <p className="text-white/80 max-w-xl">{style.description}</p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">
                    {qualityOptions.find(q => q.id === selectedQuality)?.tokens} tokens
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 -mt-8 relative z-10">
        <GlassCard className="p-6 mb-8">
          {/* Quality Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
              Select Quality
            </label>
            <div className="flex gap-3">
              {qualityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedQuality(option.id as 'standard' | 'hd' | '4k')}
                  disabled={!style.qualityTiers.includes(option.id as 'standard' | 'hd' | '4k')}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                    selectedQuality === option.id
                      ? 'border-[var(--accent)] bg-[var(--accent-pale)]'
                      : 'border-[var(--border-light)] hover:border-[var(--accent)]/50'
                  } ${!style.qualityTiers.includes(option.id as 'standard' | 'hd' | '4k') ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="block font-medium text-[var(--text-primary)]">{option.label}</span>
                  <span className="text-sm text-[var(--accent)]">{option.tokens} tokens</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a 
            href={`/app?style=${style.id}&quality=${selectedQuality}`}
            className="block w-full py-4 rounded-xl font-semibold text-white text-center bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[var(--glow-soft)] hover:shadow-[var(--glow-medium)] hover:-translate-y-0.5 transition-all"
          >
            Try this style
          </a>
        </GlassCard>

        {/* Tutorial Steps */}
        {style.tutorial && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-[var(--accent)]" />
              Step-by-step tutorial
            </h2>
            <div className="space-y-3">
              {style.tutorial.map((step) => (
                <GlassCard 
                  key={step.step}
                  className="overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
                    className="w-full flex items-center gap-4 p-4 text-left hover:bg-[var(--secondary)]/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      expandedStep === step.step 
                        ? 'bg-[var(--accent)] text-white' 
                        : 'bg-[var(--secondary)] text-[var(--text-primary)]'
                    }`}>
                      {step.step}
                    </div>
                    <span className="font-medium text-[var(--text-primary)] flex-1">{step.title}</span>
                    <Check className={`w-5 h-5 transition-colors ${
                      expandedStep === step.step ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'
                    }`} />
                  </button>
                  {expandedStep === step.step && (
                    <div className="px-4 pb-4 pl-[4.5rem]">
                      <p className="text-[var(--text-secondary)]">{step.description}</p>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[var(--accent)]" />
            Products you'll need
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockProducts.map((product) => (
              <a 
                key={product.id} 
                href={product.affiliateLink}
                className="group glass-card p-4 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square rounded-xl bg-[var(--secondary)] mb-3 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <p className="font-medium text-sm text-[var(--text-primary)] line-clamp-1">{product.name}</p>
                <p className="text-xs text-[var(--text-tertiary)]">{product.brand}</p>
                <p className="text-sm font-semibold text-[var(--accent)] mt-1">₦{product.price.toLocaleString()}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Community Examples */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--accent)]" />
              Community examples
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedPosts.map((post, idx) => (
                <div 
                  key={post.id}
                  className="group relative rounded-xl overflow-hidden aspect-[3/4]"
                >
                  <img 
                    src={post.image} 
                    alt={`${post.userName}'s look`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <div className="flex items-center gap-2">
                      <MiniAvatar
                        name={post.userName}
                        url={post.userAvatar}
                        index={idx}
                      />
                      <span className="text-white text-sm">{post.userName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
