
import { useState } from 'react';
import { Heart, FolderPlus, Share2, MoreVertical, X } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import Modal from '@/components/ui/Modal';
import Sidebar from '@/components/layout/Sidebar';
import { mockGenerationJobs } from '@/lib/mockData';

export default function FavoritesPage() {
  const [collections, setCollections] = useState<string[]>(['My Collection']);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('My Collection');
  const [favorites] = useState(mockGenerationJobs.filter(j => j.isFavorite));

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      setCollections([...collections, newCollectionName.trim()]);
      setNewCollectionName('');
      setShowCreateModal(false);
    }
  };

  const handleShareCollection = () => {
    // TODO: Generate shareable link
    const shareUrl = `${window.location.origin}/collection/${selectedCollection}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Collection link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="favorites" />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Favorites</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-pale)] transition-colors"
              >
                <FolderPlus className="w-4 h-4" />
                New Collection
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Collection Selector */}
          <div className="flex items-center gap-4">
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="px-4 py-2 rounded-full border border-[var(--border-light)] bg-white text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            >
              {collections.map((collection) => (
                <option key={collection} value={collection}>
                  {collection}
                </option>
              ))}
            </select>
            <button
              onClick={handleShareCollection}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--secondary)] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((job) => (
              <div 
                key={job.id}
                className="group relative rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <a href={`/app/result/${job.id}`}>
                  <div className="aspect-square">
                    <img 
                      src={job.resultImage || job.originalImage} 
                      alt={job.styleName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </a>

                {/* Heart indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[var(--glow-soft)]">
                  <Heart className="w-4 h-4 text-white fill-current" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <div>
                    <p className="text-white font-medium">{job.styleName}</p>
                    <p className="text-white/70 text-sm">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="relative">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {/* Dropdown would go here */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {favorites.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[var(--text-tertiary)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                No favorites yet
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Heart your favorite looks to save them here
              </p>
              <a 
                href="/app/history"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[var(--glow-soft)] hover:shadow-[var(--glow-medium)] transition-shadow"
              >
                Browse history
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Create Collection Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Collection"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Collection Name
            </label>
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g., Night Out Looks"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <GlowButton
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
              className="flex-1"
            >
              Cancel
            </GlowButton>
            <GlowButton
              onClick={handleCreateCollection}
              disabled={!newCollectionName.trim()}
              className="flex-1"
            >
              Create
            </GlowButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
