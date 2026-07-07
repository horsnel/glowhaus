'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Chrome, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import AnimatedInput from '@/components/ui/AnimatedInput';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // TODO: Connect to Supabase Auth
    console.log('Logging in:', { email, password });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/app');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // TODO: Connect to Google OAuth
    console.log('Google OAuth login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--dominant-alt)] mesh-gradient-1 p-4">
      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#E11D48]/10 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#F43F5E]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <GlassCard className="w-full max-w-md p-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] flex items-center justify-center shadow-[var(--glow-soft)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[var(--text-primary)]">GlowHaus</span>
          </a>
        </div>

        <h1 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-2">
          Welcome back
        </h1>
        <p className="text-center text-[var(--text-secondary)] mb-8">
          Sign in to continue your glow up journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatedInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            error={!!error}
            icon={<Mail className="w-5 h-5" />}
          />

          <AnimatedInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            error={!!error}
            icon={<Lock className="w-5 h-5" />}
          />

          {error && (
            <p className="text-sm text-red-500 text-center animate-shake">{error}</p>
          )}

          <GlowButton
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
          >
            Sign in
          </GlowButton>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[var(--border-light)]" />
          <span className="text-sm text-[var(--text-tertiary)]">or</span>
          <div className="flex-1 h-px bg-[var(--border-light)]" />
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-full border border-[var(--border-light)] bg-white hover:bg-[var(--secondary)] transition-colors"
        >
          <Chrome className="w-5 h-5" />
          <span className="font-medium text-sm text-[var(--text-primary)]">Continue with Google</span>
        </button>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <a 
            href="#" 
            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            Forgot password?
          </a>
          <p className="text-sm text-[var(--text-secondary)]">
            Don't have an account?{' '}
            <a 
              href="/signup" 
              className="font-medium text-[var(--accent)] hover:underline transition-all hover:shadow-[var(--glow-text)]"
            >
              Sign up
            </a>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
