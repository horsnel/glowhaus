
import { useState } from 'react';
import { Download, Trash2, Heart, Filter } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Sidebar from '@/components/layout/Sidebar';
import { mockGenerationJobs } from '@/lib/mockData';

const filters = ['All', 'Makeup', 'Hair', 'Favorites'];

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);

  const toggleFavorite = (jobId: string) => {
    setFavorites(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const toggleSelection = (jobId: string) => {
    setSelectedItems(prev => 
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleDelete = (jobId: string) => {
    // TODO: Delete generation job
    console.log('Deleting job:', jobId);
  };

  const handleBulkDelete = () => {
    // TODO: Bulk delete jobs
    console.log('Bulk deleting:', selectedItems);
    setSelectedItems([]);
    setIsBulkMode(false);
  };

  const filteredJobs = mockGenerationJobs.filter(job => {
    if (activeFilter === 'Favorites') return favorites.includes(job.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="history" />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">History</h1>
            <button
              onClick={() => setIsBulkMode(!isBulkMode)}
              className="text-sm text-[var(--accent)] hover:underline"
            >
              {isBulkMode ? 'Done' : 'Select'}
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-[var(--accent)] text-white shadow-[var(--glow-soft)]'
                    : 'bg-[var(--secondary)] text-[var(--text-secondary)] hover:bg-[var(--secondary-alt)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Bulk Actions */}
          {isBulkMode && selectedItems.length > 0 && (
            <GlassCard className="p-4 flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">
                {selectedItems.length} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedItems([])}
                  className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Clear
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </GlassCard>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="group relative rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Checkbox for bulk mode */}
                {isBulkMode && (
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(job.id)}
                      onChange={() => toggleSelection(job.id)}
                      className="w-5 h-5 rounded border-[var(--border-light)] text-[var(--accent)] focus:ring-[var(--accent)]/20"
                    />
                  </div>
                )}

                <a href={`/app/result/${job.id}`}>
                  <div className="aspect-square">
                    <img 
                      src={job.resultImage || job.originalImage} 
                      alt={job.styleName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </a>

                {/* Hover Actions */}
                {!isBulkMode && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <div>
                      <p className="text-white font-medium">{job.styleName}</p>
                      <p className="text-white/70 text-sm">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {/* TODO: Download */}}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(job.id)}
                        className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                          favorites.includes(job.id)
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(job.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  job.status === 'completed' ? 'bg-green-500 text-white' :
                  job.status === 'processing' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {job.status}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[var(--text-tertiary)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                No generations yet
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Start creating your first glow up transformation
              </p>
              <a 
                href="/app"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[var(--glow-soft)] hover:shadow-[var(--glow-medium)] transition-shadow"
              >
                Create your first look
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
