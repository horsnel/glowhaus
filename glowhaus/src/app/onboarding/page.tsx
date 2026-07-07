import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Upload, Bell, Check, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';

const steps = [
  { id: 'skin_type', title: 'Skin Type', description: 'What\'s your skin type?' },
  { id: 'vibe', title: 'Aesthetic Vibe', description: 'What\'s your aesthetic vibe?' },
  { id: 'goal', title: 'Main Goal', description: 'What\'s your main goal?' },
  { id: 'inspo', title: 'Inspiration', description: 'Upload 3 inspo pics (optional)' },
  { id: 'notifications', title: 'Notifications', description: 'Enable notifications?' },
];

const skinTypes = ['Oily', 'Dry', 'Combination', 'Not sure'];
const vibes = ['Soft', 'Edgy', 'Classic', 'Y2K'];
const goals = ['Everyday', 'Makeup skills', 'Transformation'];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skinType: '',
    vibe: '',
    goal: '',
    inspoImages: [] as string[],
    notificationsEnabled: false,
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleComplete = async () => {
    setLoading(true);
    
    // TODO: Save onboarding data to backend
    console.log('Onboarding completed:', formData);

    setTimeout(() => {
      setLoading(false);
      navigate('/app');
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // TODO: Upload images to Supabase Storage
      console.log('Uploading images:', Array.from(files).map(f => f.name));
      
      // Create preview URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        inspoImages: [...prev.inspoImages, ...newImages].slice(0, 3)
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inspoImages: prev.inspoImages.filter((_, i) => i !== index)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Skin Type
        return (
          <div className="grid grid-cols-2 gap-4">
            {skinTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFormData(prev => ({ ...prev, skinType: type }))}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  formData.skinType === type
                    ? 'border-[#E11D48] bg-[#FFF5F5] shadow-[0_0_20px_rgba(225,29,72,0.3)]'
                    : 'border-[var(--border-light)] bg-white hover:border-[#E11D48]/50'
                }`}
              >
                <span className="font-medium text-[var(--text-primary)]">{type}</span>
              </button>
            ))}
          </div>
        );

      case 1: // Vibe
        return (
          <div className="grid grid-cols-2 gap-4">
            {vibes.map((vibe) => (
              <button
                key={vibe}
                onClick={() => setFormData(prev => ({ ...prev, vibe }))}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  formData.vibe === vibe
                    ? 'border-[#E11D48] bg-[#FFF5F5] shadow-[0_0_20px_rgba(225,29,72,0.3)]'
                    : 'border-[var(--border-light)] bg-white hover:border-[#E11D48]/50'
                }`}
              >
                <span className="font-medium text-[var(--text-primary)]">{vibe}</span>
              </button>
            ))}
          </div>
        );

      case 2: // Goal
        return (
          <div className="space-y-4">
            {goals.map((goal) => (
              <button
                key={goal}
                onClick={() => setFormData(prev => ({ ...prev, goal }))}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  formData.goal === goal
                    ? 'border-[#E11D48] bg-[#FFF5F5] shadow-[0_0_20px_rgba(225,29,72,0.3)]'
                    : 'border-[var(--border-light)] bg-white hover:border-[#E11D48]/50'
                }`}
              >
                <span className="font-medium text-[var(--text-primary)]">{goal}</span>
              </button>
            ))}
          </div>
        );

      case 3: // Inspo Images
        return (
          <div className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                formData.inspoImages.length < 3
                  ? 'border-[var(--border-light)] hover:border-[#E11D48] hover:bg-[#FFF5F5]'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={formData.inspoImages.length >= 3}
                className="hidden"
                id="inspo-upload"
              />
              <label 
                htmlFor="inspo-upload"
                className={`cursor-pointer flex flex-col items-center gap-3 ${
                  formData.inspoImages.length >= 3 ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[var(--secondary)] flex items-center justify-center">
                  <Upload className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Drop images or click to upload</p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {formData.inspoImages.length}/3 images
                  </p>
                </div>
              </label>
            </div>

            {/* Preview thumbnails */}
            {formData.inspoImages.length > 0 && (
              <div className="flex gap-3">
                {formData.inspoImages.map((image, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <img src={image} alt={`Inspo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-black/70"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4: // Notifications
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[var(--accent-pale)] flex items-center justify-center mx-auto">
              <Bell className={`w-10 h-10 transition-all duration-300 ${
                formData.notificationsEnabled ? 'text-[#E11D48]' : 'text-[var(--text-tertiary)]'
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Stay in the loop
              </h3>
              <p className="text-[var(--text-secondary)]">
                Get notified when your transformations are ready and discover new styles.
              </p>
            </div>
            <button
              onClick={() => setFormData(prev => ({ 
                ...prev, 
                notificationsEnabled: !prev.notificationsEnabled 
              }))}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                formData.notificationsEnabled ? 'bg-[#E11D48]' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                formData.notificationsEnabled ? 'translate-x-9' : 'translate-x-1'
              }`} />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--dominant-alt)] mesh-gradient-1 p-4">
      {/* Background glow */}
      <div className="fixed top-1/3 left-1/3 w-96 h-96 bg-[#E11D48]/10 rounded-full blur-3xl animate-pulse" />

      <GlassCard className="w-full max-w-lg p-8 relative z-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    index < currentStep 
                      ? 'bg-[#E11D48] text-white' 
                      : index === currentStep
                      ? 'bg-[#E11D48] text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                      : 'bg-[var(--secondary)] text-[var(--text-tertiary)]'
                  }`}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${
                      index < currentStep ? 'bg-[#E11D48]' : 'bg-[var(--border-light)]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="h-1 bg-[var(--secondary)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] transition-all duration-500 animate-shimmer"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            {steps[currentStep].description}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Step content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
              currentStep === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--secondary)]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                Skip
              </button>
            )}
            <GlowButton
              onClick={handleNext}
              loading={loading}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </GlowButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
