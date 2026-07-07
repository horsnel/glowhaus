
import { useState } from 'react';
import { Search } from 'lucide-react';
import StyleCard from '@/components/ui/StyleCard';
import { styles } from '@/lib/mockData';

const categories = ['All', 'Soft', 'Edgy', 'Classic', 'Y2K', 'Trending', 'New', 'Premium'];

export default function StylesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [displayCount, setDisplayCount] = useState(8);

  const filteredStyles = styles.filter(style => {
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         style.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
                           (activeCategory === 'Premium' ? style.isPremium : style.category === activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const displayedStyles = filteredStyles.slice(0, displayCount);
  const hasMore = displayCount < filteredStyles.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 8, filteredStyles.length));
  };

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <a href="/" className="font-bold text-xl text-[var(--text-primary)]">
              GlowHaus
            </a>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search styles..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-[var(--border-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? 'bg-[var(--accent)] text-white shadow-[var(--glow-soft)]'
                  : 'bg-[var(--secondary)] text-[var(--text-secondary)] hover:bg-[var(--secondary-alt)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-[var(--text-tertiary)] mb-4">
          {filteredStyles.length} style{filteredStyles.length !== 1 ? 's' : ''} found
        </p>

        {/* Styles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedStyles.map((style) => (
            <StyleCard 
              key={style.id} 
              style={style} 
              href={`/style/${style.id}`}
            />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="px-8 py-3 rounded-full font-semibold text-sm border border-[var(--border-light)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:shadow-[var(--glow-soft)] transition-all"
            >
              Load more styles
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredStyles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[var(--text-tertiary)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              No styles found
            </h3>
            <p className="text-[var(--text-secondary)]">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
