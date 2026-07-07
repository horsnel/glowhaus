
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Share2, Link2, Heart, ChevronLeft, Sparkles, Check } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import Sidebar from '@/components/layout/Sidebar';
import { useTilt } from '@/hooks/useTilt';
import { mockGenerationJobs, styles, mockProducts } from '@/lib/mockData';

export default function ResultPage() {
  // Get job ID from URL params (react-router)
  const params = useParams();
  const jobId = params.id || 'job-001';
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  
  const { ref: tiltRef, style: tiltStyle, handlers: tiltHandlers } = useTilt();

  // Find the job (mock - in real app would fetch from API)
  const job = mockGenerationJobs.find(j => j.id === jobId) || mockGenerationJobs[0];
  const style = styles.find(s => s.id === job.styleId);

  const handleDownload = () => {
    // TODO: Download result image
    console.log('Downloading result:', jobId);
  };

  const handleShare = () => {
    // TODO: Share to social media
    console.log('Sharing result:', jobId);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Save/remove favorite
    console.log(isFavorite ? 'Removing from favorites' : 'Adding to favorites', jobId);
  };

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="history" />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <div className="flex items-center justify-between">
            <a 
              href="/app/history" 
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to history
            </a>
            <h1 className="text-lg font-semibold text-[var(--text-primary)]">{job.styleName}</h1>
            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Before/After Slider with 3D Tilt */}
          <div 
            ref={tiltRef}
            style={tiltStyle}
            {...tiltHandlers}
            className="tilt-container"
          >
            <BeforeAfterSlider
              beforeImage={job.originalImage}
              afterImage={job.resultImage || job.originalImage}
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap gap-3 justify-center">
            <GlowButton onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download HD
            </GlowButton>
            <a 
              href="/app/export"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border border-[rgba(0,0,0,0.1)] text-[#1F2937] hover:border-[#E11D48] hover:shadow-[0_0_20px_rgba(225,29,72,0.3)]"
            >
              <Share2 className="w-4 h-4" />
              Share to TikTok
            </a>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border border-[rgba(0,0,0,0.1)] text-[#1F2937] hover:border-[#E11D48] hover:shadow-[0_0_20px_rgba(225,29,72,0.3)]"
            >
              <Link2 className="w-4 h-4" />
              Copy link
            </button>
            <button
              onClick={handleFavorite}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                isFavorite 
                  ? 'bg-[#E11D48] text-white shadow-[0_0_20px_rgba(225,29,72,0.5)]' 
                  : 'border border-[rgba(0,0,0,0.1)] text-[#1F2937] hover:border-[#E11D48]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>

          {/* Style Details */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Style Details</h2>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-sm font-medium text-[var(--accent)]">{job.tokensUsed} tokens</span>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">{style?.description}</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[var(--secondary)] rounded-full text-xs font-medium text-[var(--text-secondary)]">
                {job.quality.toUpperCase()}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                Completed
              </span>
            </div>
          </GlassCard>

          {/* Tutorial Steps */}
          {style?.tutorial && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                How to recreate this look
              </h2>
              <div className="space-y-3">
                {style.tutorial.map((step) => (
                  <div 
                    key={step.step}
                    className="border border-[var(--border-light)] rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-[var(--secondary)] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-sm font-semibold">
                        {step.step}
                      </div>
                      <span className="font-medium text-[var(--text-primary)] flex-1">{step.title}</span>
                      <Check className="w-5 h-5 text-[var(--text-tertiary)]" />
                    </button>
                    {expandedStep === step.step && (
                      <div className="px-4 pb-4 pl-16">
                        <p className="text-sm text-[var(--text-secondary)]">{step.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Product Recommendations */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Products to achieve this look
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockProducts.map((product) => (
                <a 
                  key={product.id} 
                  href={product.affiliateLink}
                  className="group"
                >
                  <div className="aspect-square rounded-xl bg-[var(--secondary)] mb-2 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="font-medium text-sm text-[var(--text-primary)] line-clamp-1">{product.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{product.brand}</p>
                  <p className="text-sm font-semibold text-[var(--accent)]">₦{product.price.toLocaleString()}</p>
                </a>
              ))}
            </div>
          </GlassCard>

          {/* Try Another Style */}
          <div className="text-center">
            <a 
              href="/app"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[0_4px_15px_rgba(225,29,72,0.4)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Try another style
            </a>
          </div>
        </div>
      </main>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-4 right-4 glass-card px-4 py-3 flex items-center gap-2 animate-slide-in">
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-sm text-[var(--text-primary)]">Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
