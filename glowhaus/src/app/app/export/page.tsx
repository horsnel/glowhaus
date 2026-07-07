
import { useState } from 'react';
import { Download, Share2, Music, Hash, Settings, Play, Check } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import Sidebar from '@/components/layout/Sidebar';
import { hashtagSuggestions } from '@/lib/mockData';

const formats = [
  { id: 'split', label: 'Split-screen', description: 'Before | After side by side' },
  { id: 'wipe', label: 'Before-after wipe', description: 'Smooth transition reveal' },
  { id: 'morph', label: 'Transition morph', description: 'Morphing transformation' },
];

const trendingSounds = [
  { id: 1, name: 'Glow Up Challenge', artist: '@glowhaus', duration: '15s' },
  { id: 2, name: 'Transformation', artist: '@beautytrends', duration: '20s' },
  { id: 3, name: 'Before & After', artist: '@makeupviral', duration: '12s' },
];

export default function ExportPage() {
  const [selectedFormat, setSelectedFormat] = useState('split');
  const [selectedSound, setSelectedSound] = useState<number | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [duration, setDuration] = useState(15);
  const [quality, setQuality] = useState('1080p');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const toggleHashtag = (tag: string) => {
    setSelectedHashtags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // TODO: Generate video
    console.log('Generating video:', {
      format: selectedFormat,
      sound: selectedSound,
      hashtags: selectedHashtags,
      duration,
      quality,
    });

    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
    }, 3000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[var(--dominant-alt)]">
        <Sidebar activeItem="home" />
        <main className="lg:ml-64 min-h-screen flex items-center justify-center p-6">
          <GlassCard className="max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Video ready!
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Your TikTok video has been generated successfully
            </p>
            <div className="flex gap-3">
              <GlowButton variant="secondary" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </GlowButton>
              <GlowButton className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share to TikTok
              </GlowButton>
            </div>
          </GlassCard>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="home" />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">TikTok Export</h1>
        </header>

        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Preview */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Preview</h2>
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-white text-center">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm opacity-70">Preview will appear here</p>
              </div>
            </div>
          </GlassCard>

          {/* Format Selection */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Choose Format</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedFormat === format.id
                      ? 'border-[var(--accent)] bg-[var(--accent-pale)]'
                      : 'border-[var(--border-light)] hover:border-[var(--accent)]/50'
                  }`}
                >
                  <span className="block font-medium text-[var(--text-primary)] mb-1">
                    {format.label}
                  </span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {format.description}
                  </span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Audio Selection */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-[var(--accent)]" />
              Trending Audio
            </h2>
            <div className="space-y-2">
              {trendingSounds.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => setSelectedSound(sound.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    selectedSound === sound.id
                      ? 'bg-[var(--accent-pale)] border border-[var(--accent)]'
                      : 'bg-[var(--secondary)] hover:bg-[var(--secondary-alt)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedSound === sound.id ? 'bg-[var(--accent)]' : 'bg-white'
                    }`}>
                      <Play className={`w-4 h-4 ${selectedSound === sound.id ? 'text-white' : 'text-[var(--text-primary)]'}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-[var(--text-primary)]">{sound.name}</p>
                      <p className="text-sm text-[var(--text-tertiary)]">{sound.artist}</p>
                    </div>
                  </div>
                  <span className="text-sm text-[var(--text-tertiary)]">{sound.duration}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Hashtags */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-[var(--accent)]" />
              Hashtags
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {hashtagSuggestions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleHashtag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedHashtags.includes(tag)
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-pale)] hover:text-[var(--accent)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedHashtags(hashtagSuggestions)}
              className="text-sm text-[var(--accent)] hover:underline"
            >
              Select all hashtags
            </button>
          </GlassCard>

          {/* Caption */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Caption</h2>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your caption..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-none"
            />
            <div className="flex gap-2 mt-3">
              {['✨ Glow up complete!', '💄 Which look do you prefer?', '🔥 Transformation time!'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setCaption(suggestion)}
                  className="px-3 py-1.5 rounded-full bg-[var(--secondary)] text-xs text-[var(--text-secondary)] hover:bg-[var(--accent-pale)] hover:text-[var(--accent)] transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Settings */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[var(--accent)]" />
              Video Settings
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                >
                  <option value={10}>10 seconds</option>
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>60 seconds</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">Quality</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                >
                  <option value="720p">720p HD</option>
                  <option value="1080p">1080p Full HD</option>
                  <option value="4k">4K Ultra HD</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Generate Button */}
          <GlowButton
            onClick={handleGenerate}
            loading={isGenerating}
            className="w-full py-4 text-lg"
          >
            Generate Video
          </GlowButton>
        </div>
      </main>
    </div>
  );
}
