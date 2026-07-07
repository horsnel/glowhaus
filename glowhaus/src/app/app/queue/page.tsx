import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lightbulb, Check } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import QueueOrb from '@/components/ui/QueueOrb';
import Sidebar from '@/components/layout/Sidebar';
import { queueTips } from '@/lib/mockData';

export default function QueuePage() {
  const navigate = useNavigate();
  const [queuePosition, setQueuePosition] = useState(3);
  const [estimatedTime, setEstimatedTime] = useState(8);
  const [currentTip, setCurrentTip] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Rotate tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % queueTips.length);
    }, 5000);
    return () => clearInterval(tipInterval);
  }, []);

  // Simulate queue progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setQueuePosition((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          setTimeout(() => {
            navigate('/app/result/job-007');
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
      setEstimatedTime((prev) => Math.max(0, prev - 2));
    }, 5000);

    return () => clearInterval(progressInterval);
  }, []);

  const handleCancel = () => {
    // TODO: Cancel generation job
    console.log('Cancelling job');
    navigate('/app');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[var(--dominant-alt)] flex items-center justify-center">
        <GlassCard className="p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Your glow up is ready!
          </h1>
          <p className="text-[var(--text-secondary)]">
            Redirecting to your result...
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="home" />

      <main className="lg:ml-64 min-h-screen flex items-center justify-center p-6">
        <GlassCard className="w-full max-w-lg p-8 text-center">
          {/* Queue Orb */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <QueueOrb size="lg" />
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[#E11D48]/30 animate-ping" />
              <div className="absolute inset-4 rounded-full border-2 border-[#E11D48]/20 animate-pulse" />
            </div>
          </div>

          {/* Position */}
          <div className="mb-6">
            <p className="text-[var(--text-secondary)] mb-2">You're</p>
            <h1 className="text-6xl font-black text-[var(--text-primary)] mb-2">
              #{queuePosition}
            </h1>
            <p className="text-[var(--text-secondary)]">in line</p>
          </div>

          {/* Estimated time */}
          <div className="mb-8">
            <p className="text-sm text-[var(--text-tertiary)]">Estimated wait time</p>
            <p className="text-2xl font-semibold text-[var(--accent)]">
              {estimatedTime} minutes
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-3 bg-[var(--secondary)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] rounded-full transition-all duration-500 animate-shimmer"
                style={{ width: `${((4 - queuePosition) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Why the wait */}
          <p className="text-sm text-[var(--text-tertiary)] mb-8">
            Why the wait? AI is crafting your perfect look...
          </p>

          {/* Tip carousel */}
          <div className="bg-[var(--secondary)] rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider">
                Pro Tip
              </span>
            </div>
            <p 
              key={currentTip}
              className="text-sm text-[var(--text-secondary)] animate-fade-in"
            >
              {queueTips[currentTip]}
            </p>
          </div>

          {/* Cancel button */}
          <button
            onClick={() => setShowCancelModal(true)}
            className="text-sm text-[var(--text-tertiary)] hover:text-red-500 transition-colors"
          >
            Cancel generation
          </button>
        </GlassCard>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <GlassCard className="max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Cancel Generation?
                </h3>
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="p-2 hover:bg-[var(--secondary)] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[var(--text-secondary)] mb-6">
                Your progress will be lost and tokens will be refunded. Are you sure?
              </p>
              <div className="flex gap-3">
                <GlowButton
                  variant="secondary"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1"
                >
                  Keep Waiting
                </GlowButton>
                <GlowButton
                  variant="primary"
                  onClick={handleCancel}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  Cancel
                </GlowButton>
              </div>
            </GlassCard>
          </div>
        )}
      </main>
    </div>
  );
}
