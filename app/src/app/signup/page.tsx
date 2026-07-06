'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Check, Chrome, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import AnimatedInput from '@/components/ui/AnimatedInput';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms of service');
      return;
    }

    setLoading(true);

    // TODO: Connect to Supabase Auth
    console.log('Signing up:', { email, password });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/onboarding';
    }, 1500);
  };

  const handleGoogleSignup = () => {
    // TODO: Connect to Google OAuth
    console.log('Google OAuth signup');
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
          Create your account
        </h1>
        <p className="text-center text-[var(--text-secondary)] mb-8">
          Start your glow up journey today
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatedInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            icon={<Mail className="w-5 h-5" />}
          />

          <div>
            <AnimatedInput
              type="password"
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={setPassword}
              icon={<Lock className="w-5 h-5" />}
            />
            {/* Password strength indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 rounded-full transition-colors ${
                        level <= passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs mt-1 ${passwordStrength > 0 ? 'text-' + strengthColors[passwordStrength - 1].replace('bg-', '') : 'text-gray-400'}`}>
                  {strengthLabels[passwordStrength - 1] || 'Enter password'}
                </p>
              </div>
            )}
          </div>

          <AnimatedInput
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            icon={<Check className="w-5 h-5" />}
          />

          {/* Terms checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 rounded border-[var(--border-light)] text-[#E11D48] focus:ring-[#E11D48]/20"
              />
              {agreedToTerms && (
                <Check className="absolute inset-0 w-3 h-3 m-auto text-white pointer-events-none" />
              )}
            </div>
            <span className="text-sm text-[var(--text-secondary)]">
              I agree to the{' '}
              <a href="/legal/terms" className="text-[var(--accent)] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/legal/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</a>
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-500 text-center animate-shake">{error}</p>
          )}

          <GlowButton
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
          >
            Create account
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
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-full border border-[var(--border-light)] bg-white hover:bg-[var(--secondary)] transition-colors"
        >
          <Chrome className="w-5 h-5" />
          <span className="font-medium text-sm text-[var(--text-primary)]">Continue with Google</span>
        </button>

        {/* Links */}
        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="font-medium text-[var(--accent)] hover:underline transition-all hover:shadow-[var(--glow-text)]"
          >
            Sign in
          </a>
        </p>
      </GlassCard>
    </div>
  );
}
