'use client';

import { useState } from 'react';
import { User, Lock, Shield, Bell, Coins, LogOut, Camera, ChevronRight, Download, Trash2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import Modal from '@/components/ui/Modal';
import TokenDisplay from '@/components/ui/TokenDisplay';
import TierBadge from '@/components/ui/TierBadge';
import Sidebar from '@/components/layout/Sidebar';
import { mockUser } from '@/lib/mockData';

export default function SettingsPage() {
  const [user, setUser] = useState(mockUser);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newStyles: true,
    community: false,
    marketing: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSignOut = () => {
    // TODO: Sign out
    console.log('Signing out');
    window.location.href = '/';
  };

  const handleDeleteAccount = () => {
    // TODO: Delete account
    console.log('Deleting account');
    setShowDeleteModal(false);
  };

  const handleDownloadData = () => {
    // TODO: Download user data
    console.log('Downloading data');
  };

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="settings" />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Settings</h1>
        </header>

        <div className="p-6 max-w-2xl mx-auto space-y-6">
          {/* Profile Section */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--accent)]" />
              Profile
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[var(--secondary)] overflow-hidden">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-[var(--glow-soft)] hover:shadow-[var(--glow-medium)] transition-shadow">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{user.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Username</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-4 py-2 rounded-xl border border-[var(--border-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Bio</label>
                <textarea
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-[var(--border-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-none"
                />
              </div>
              <GlowButton>Save Changes</GlowButton>
            </div>
          </GlassCard>

          {/* Account Section */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[var(--accent)]" />
              Account
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[var(--secondary)] hover:bg-[var(--secondary-alt)] transition-colors">
                <span className="text-[var(--text-primary)]">Change Password</span>
                <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)]" />
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors"
              >
                <span className="text-red-600">Delete Account</span>
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </GlassCard>

          {/* Privacy Section */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--accent)]" />
              Privacy
            </h2>
            <div className="space-y-3">
              <button 
                onClick={handleDownloadData}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[var(--secondary)] hover:bg-[var(--secondary-alt)] transition-colors"
              >
                <span className="text-[var(--text-primary)]">Download My Data</span>
                <Download className="w-5 h-5 text-[var(--text-tertiary)]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[var(--secondary)] hover:bg-[var(--secondary-alt)] transition-colors">
                <span className="text-[var(--text-primary)]">Clear Generation History</span>
                <Trash2 className="w-5 h-5 text-[var(--text-tertiary)]" />
              </button>
            </div>
          </GlassCard>

          {/* Notifications Section */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[var(--accent)]" />
              Notifications
            </h2>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-[var(--text-primary)] capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <button
                    onClick={() => toggleNotification(key as keyof typeof notifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-[var(--accent)]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform ${
                      value ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Tokens Section */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-[var(--accent)]" />
              Tokens
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Current Balance</p>
                <TokenDisplay tokens={user.tokens} size="lg" />
              </div>
              <TierBadge tier={user.tier} />
            </div>
            <a 
              href="/tokens"
              className="block w-full py-3 rounded-xl font-semibold text-center text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[var(--glow-soft)] hover:shadow-[var(--glow-medium)] transition-shadow"
            >
              Purchase Tokens
            </a>
          </GlassCard>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </main>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="text-red-600 text-sm">
              Warning: This action cannot be undone. All your data, including generations, 
              favorites, and progress will be permanently deleted.
            </p>
          </div>
          <p className="text-[var(--text-secondary)]">
            Are you sure you want to delete your account?
          </p>
          <div className="flex gap-3 pt-2">
            <GlowButton
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
            >
              Cancel
            </GlowButton>
            <GlowButton
              onClick={handleDeleteAccount}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Delete Account
            </GlowButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
