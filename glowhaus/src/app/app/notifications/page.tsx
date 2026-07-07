
import { useState } from 'react';
import { Check, Sparkles, Lightbulb, AlertTriangle, Users, Bell, CheckCheck } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Sidebar from '@/components/layout/Sidebar';
import { mockNotifications } from '@/lib/mockData';

const iconMap = {
  job_complete: { icon: Check, color: 'text-green-500', bg: 'bg-green-100' },
  new_style: { icon: Sparkles, color: 'text-[var(--accent)]', bg: 'bg-[var(--accent-pale)]' },
  tip: { icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  low_tokens: { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-100' },
  community: { icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [swipedId, setSwipedId] = useState<string | null>(null);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="home" />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Notifications</h1>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[var(--accent)] text-white text-xs font-medium animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all read
              </button>
            )}
          </div>
        </header>

        <div className="p-6 max-w-2xl mx-auto space-y-3">
          {notifications.map((notification) => {
            const { icon: Icon, color, bg } = iconMap[notification.type];
            
            return (
              <div
                key={notification.id}
                className={`relative overflow-hidden transition-all duration-300 ${
                  swipedId === notification.id ? 'translate-x-[-100px]' : ''
                }`}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  const startX = touch.clientX;
                  
                  const handleTouchEnd = (e: TouchEvent) => {
                    const endX = e.changedTouches[0].clientX;
                    if (startX - endX > 100) {
                      setSwipedId(notification.id);
                      setTimeout(() => dismissNotification(notification.id), 300);
                    }
                    document.removeEventListener('touchend', handleTouchEnd);
                  };
                  
                  document.addEventListener('touchend', handleTouchEnd);
                }}
              >
                {/* Swipe action background */}
                <div className="absolute inset-0 bg-red-500 flex items-center justify-end pr-6 rounded-xl">
                  <span className="text-white font-medium">Dismiss</span>
                </div>

                <GlassCard 
                  className={`p-4 relative z-10 cursor-pointer transition-all ${
                    !notification.isRead ? 'border-l-4 border-l-[var(--accent)]' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                  hover={false}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-medium ${!notification.isRead ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-tertiary)] mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}

          {/* Empty State */}
          {notifications.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-[var(--text-tertiary)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                All caught up!
              </h3>
              <p className="text-[var(--text-secondary)]">
                You have no new notifications
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
