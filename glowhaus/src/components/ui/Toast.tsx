
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  onClose: (id: string) => void;
  duration?: number;
}

export default function Toast({ 
  id, 
  type, 
  title, 
  message, 
  onClose,
  duration = 5000 
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  };

  const borderColors = {
    success: 'border-green-500/30',
    error: 'border-red-500/30',
    info: 'border-blue-500/30',
    warning: 'border-yellow-500/30',
  };

  return (
    <div 
      className={cn(
        'glass-card p-4 min-w-[300px] max-w-md',
        'animate-slide-in border-l-4',
        borderColors[type]
      )}
    >
      <div className="flex items-start gap-3">
        {icons[type]}
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--text-primary)]">{title}</h4>
          {message && (
            <p className="text-sm text-[var(--text-secondary)] mt-1">{message}</p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
