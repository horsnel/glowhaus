
import { useState } from 'react';
import { Search, ThumbsUp, Plus, Users, Flag } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { mockCommunityPosts } from '@/lib/mockData';

const filters = ['Trending', 'New', 'Following'];

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

function UserAvatar({
  name,
  url,
  index = 0,
  className = 'w-8 h-8',
}: {
  name: string;
  url?: string;
  index?: number;
  className?: string;
}) {
  const initial = name.charAt(0).toUpperCase();
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  if (!url) {
    return (
      <div
        className={`${className} rounded-full flex items-center justify-center text-white font-semibold text-sm ${color}`}
      >
        {initial}
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={name}
      className={`${className} rounded-full object-cover`}
    />
  );
}

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [upvotedPosts, setUpvotedPosts] = useState<string[]>([]);

  const handleUpvote = (postId: string) => {
    setUpvotedPosts(prev => 
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
    // TODO: Send upvote to backend
    console.log('Upvoting post:', postId);
  };

  const handleReport = (postId: string) => {
    // TODO: Report post
    console.log('Reporting post:', postId);
  };

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <a href="/" className="font-bold text-xl text-[var(--text-primary)]">
              Community
            </a>
            <a
              href="/app"
              className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[var(--glow-soft)]"
            >
              <Plus className="w-4 h-4" />
              Submit Look
            </a>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search community looks..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-[var(--border-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-[var(--accent)] text-white shadow-[var(--glow-soft)]'
                  : 'bg-[var(--secondary)] text-[var(--text-secondary)] hover:bg-[var(--secondary-alt)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {mockCommunityPosts.map((post, index) => (
            <GlassCard 
              key={post.id} 
              className="break-inside-avoid overflow-hidden"
              hover={false}
            >
              {/* Image */}
              <div className="relative aspect-[3/4]">
                <img 
                  src={post.image} 
                  alt={`${post.userName}'s look`}
                  className="w-full h-full object-cover"
                />
                
                {/* Style Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-[var(--text-primary)]">
                    {post.styleName}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <UserAvatar
                      name={post.userName}
                      url={post.userAvatar}
                      index={index}
                    />
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {post.userName}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                      upvotedPosts.includes(post.id)
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-pale)] hover:text-[var(--accent)]'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${upvotedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">
                      {post.upvotes + (upvotedPosts.includes(post.id) ? 1 : 0)}
                    </span>
                  </button>

                  <button
                    onClick={() => handleReport(post.id)}
                    className="p-2 rounded-full text-[var(--text-tertiary)] hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Top Creators Sidebar (Desktop) */}
        <div className="hidden lg:block fixed right-8 top-32 w-64">
          <GlassCard className="p-4">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--accent)]" />
              Top Creators
            </h3>
            <div className="space-y-3">
              {mockCommunityPosts.slice(0, 5).map((post, index) => (
                <div key={post.id} className="flex items-center gap-3">
                  <span className="w-5 text-sm font-bold text-[var(--accent)]">#{index + 1}</span>
                  <UserAvatar
                    name={post.userName}
                    url={post.userAvatar}
                    index={index}
                  />
                  <span className="text-sm text-[var(--text-primary)] flex-1">{post.userName}</span>
                  <span className="text-xs text-[var(--text-tertiary)]">{post.upvotes}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <a
        href="/app"
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white shadow-[var(--glow-medium)] flex items-center justify-center animate-glow-pulse"
      >
        <Plus className="w-6 h-6" />
      </a>
    </div>
  );
}
