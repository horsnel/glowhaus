
import { useState } from 'react';
import { Calendar, Plus, Camera, Smile, Meh, Frown, Sparkles, Download } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import Modal from '@/components/ui/Modal';
import Sidebar from '@/components/layout/Sidebar';
import { mockProgressEntries } from '@/lib/mockData';

const moods = [
  { id: 'great', icon: Smile, label: 'Great', color: 'text-green-500' },
  { id: 'good', icon: Smile, label: 'Good', color: 'text-blue-500' },
  { id: 'okay', icon: Meh, label: 'Okay', color: 'text-yellow-500' },
  { id: 'bad', icon: Frown, label: 'Bad', color: 'text-red-500' },
];

export default function ProgressPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [selectedMood, setSelectedMood] = useState('good');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload to Supabase Storage
      console.log('Uploading progress photo:', file.name);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // TODO: Save progress entry
    console.log('Saving entry:', { date: selectedDate, notes, mood: selectedMood });
    setShowAddModal(false);
    setNotes('');
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="progress" />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Progress Diary</h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Day {mockProgressEntries.length} of your glow up journey
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {/* TODO: Export video */}}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--secondary)] transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <GlowButton onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Add Entry
              </GlowButton>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] to-[var(--secondary)]" />

            <div className="space-y-6">
              {mockProgressEntries.map((entry, index) => (
                <div key={entry.id} className="relative flex gap-6">
                  {/* Node */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    index === 0 
                      ? 'bg-[var(--accent)] shadow-[var(--glow-soft)]' 
                      : 'bg-white border-2 border-[var(--accent)]'
                  }`}>
                    <Sparkles className={`w-5 h-5 ${index === 0 ? 'text-white' : 'text-[var(--accent)]'}`} />
                  </div>

                  {/* Content */}
                  <GlassCard className="flex-1 p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={entry.photo} 
                          alt={`Day ${mockProgressEntries.length - index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[var(--accent)]">
                            Day {mockProgressEntries.length - index}
                          </span>
                          <span className="text-xs text-[var(--text-tertiary)]">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">{entry.notes}</p>
                        <div className="flex items-center gap-3">
                          {entry.glowUpScore && (
                            <span className="px-2 py-1 rounded-full bg-[var(--accent-pale)] text-[var(--accent)] text-xs font-medium">
                              Glow Score: {entry.glowUpScore}
                            </span>
                          )}
                          <span className="text-lg">
                            {entry.mood === 'great' && '😄'}
                            {entry.mood === 'good' && '🙂'}
                            {entry.mood === 'okay' && '😐'}
                            {entry.mood === 'bad' && '😔'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Entry Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Progress Entry"
      >
        <div className="space-y-4">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Photo
            </label>
            <div className="border-2 border-dashed border-[var(--border-light)] rounded-xl p-6 text-center hover:border-[var(--accent)] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="progress-photo"
              />
              <label htmlFor="progress-photo" className="cursor-pointer">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto" />
                ) : (
                  <>
                    <Camera className="w-8 h-8 mx-auto mb-2 text-[var(--text-tertiary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">Click to upload photo</p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
            />
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              How are you feeling?
            </label>
            <div className="flex gap-2">
              {moods.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                      selectedMood === mood.id
                        ? 'border-[var(--accent)] bg-[var(--accent-pale)]'
                        : 'border-[var(--border-light)] hover:border-[var(--accent)]/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${mood.color}`} />
                    <span className="text-xs">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How's your skin doing today?"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <GlowButton
              variant="secondary"
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </GlowButton>
            <GlowButton
              onClick={handleSave}
              disabled={!previewImage}
              className="flex-1"
            >
              Save Entry
            </GlowButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
