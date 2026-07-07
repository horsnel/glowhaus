import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Sparkles, Zap, Crown } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import StyleCard from '@/components/ui/StyleCard';
import TokenDisplay from '@/components/ui/TokenDisplay';
import TierBadge from '@/components/ui/TierBadge';
import Sidebar from '@/components/layout/Sidebar';
import { mockUser, styles, mockGenerationJobs } from '@/lib/mockData';

const popularStyles = styles.slice(0, 5);

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const uploadZoneRef = useRef<HTMLDivElement>(null);

  // Spotlight cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (uploadZoneRef.current) {
        const rect = uploadZoneRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const uploadZone = uploadZoneRef.current;
    if (uploadZone) {
      uploadZone.addEventListener('mousemove', handleMouseMove);
      return () => uploadZone.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // TODO: Upload file to Supabase Storage
      console.log('Uploading file:', files[0].name);
      // Navigate to queue
      navigate('/app/queue');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // TODO: Upload file to Supabase Storage
      console.log('Uploading file:', files[0].name);
      // Navigate to queue
      navigate('/app/queue');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="home" />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Dashboard</h1>
            <div className="flex items-center gap-4">
              <TokenDisplay tokens={mockUser.tokens} size="sm" />
              <TierBadge tier={mockUser.tier} />
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Upload Zone */}
          <GlassCard className="p-8 relative overflow-hidden">
            {/* Spotlight effect */}
            <div 
              className="absolute pointer-events-none transition-opacity duration-300"
              style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 100,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(225,29,72,0.15) 0%, transparent 70%)',
                opacity: mousePosition.x > 0 ? 1 : 0,
              }}
            />

            <div
              ref={uploadZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging 
                  ? 'border-[#E11D48] bg-[#FFF5F5] shadow-[0_0_30px_rgba(225,29,72,0.3)]' 
                  : 'border-[var(--border-light)] hover:border-[#E11D48]/50'
              }`}
            >
              {/* Animated ring on drag */}
              {isDragging && (
                <div className="absolute inset-0 rounded-2xl border-2 border-[#E11D48] animate-ping opacity-30" />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  isDragging ? 'bg-[#E11D48] scale-110' : 'bg-[var(--secondary)]'
                }`}>
                  <Upload className={`w-6 h-6 transition-colors ${
                    isDragging ? 'text-white' : 'text-[var(--accent)]'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {isDragging ? 'Drop your photo here' : 'Upload your photo'}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Drag and drop or click to browse
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-tertiary)]">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    JPG, PNG
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Max 10MB
                  </span>
                </div>
              </label>
            </div>
          </GlassCard>

          {/* Pro Upgrade Banner (for free users) */}
          {mockUser.tier === 'free' && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#E11D48] to-[#F43F5E] p-6 animate-glow-pulse">
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Upgrade to Pro</h3>
                    <p className="text-white/80 text-sm">Get HD quality, no watermarks, and priority queue</p>
                  </div>
                </div>
                <a 
                  href="/tokens"
                  className="px-6 py-2 bg-white text-[#E11D48] rounded-full font-semibold text-sm hover:shadow-lg transition-shadow"
                >
                  Upgrade
                </a>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10" />
            </div>
          )}

          {/* Popular Styles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Trending Now</h2>
              <a href="/styles" className="text-sm text-[var(--accent)] hover:underline">
                View all
              </a>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {popularStyles.map((style) => (
                <div key={style.id} className="flex-shrink-0 w-48">
                  <StyleCard style={style} href={`/style/${style.id}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Generations */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recent Generations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockGenerationJobs.slice(0, 6).map((job) => (
                <a 
                  key={job.id} 
                  href={`/app/result/${job.id}`}
                  className="group relative rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square">
                    <img 
                      src={job.resultImage || job.originalImage} 
                      alt={job.styleName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-medium">{job.styleName}</p>
                    <p className="text-white/70 text-sm">{job.status}</p>
                  </div>
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'completed' ? 'bg-green-500 text-white' :
                    job.status === 'processing' ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {job.status}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
