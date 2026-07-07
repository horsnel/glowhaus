import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import LandingPage from './App';
import StylesPage from './app/styles/page';
import StyleDetailPage from './app/style/[id]/page';
import CommunityPage from './app/community/page';
import TokensPage from './app/tokens/page';
import LoginPage from './app/login/page';
import SignupPage from './app/signup/page';
import OnboardingPage from './app/onboarding/page';
import PrivacyPage from './app/legal/privacy/page';
import TermsPage from './app/legal/terms/page';
import DashboardPage from './app/app/page';
import HistoryPage from './app/app/history/page';
import FavoritesPage from './app/app/favorites/page';
import SkinPage from './app/app/skin/page';
import ProgressPage from './app/app/progress/page';
import NotificationsPage from './app/app/notifications/page';
import SettingsPage from './app/app/settings/page';
import ExportPage from './app/app/export/page';
import QueuePage from './app/app/queue/page';
import ResultPage from './app/app/result/[id]/page';

/**
 * Global click interceptor for SPA navigation.
 *
 * The original codebase uses `<a href="/path">` everywhere. Rather than
 * rewrite every anchor in 20+ files, we intercept clicks on internal
 * anchor tags here and convert them to client-side navigations.
 *
 * Rules:
 *  - Left-click only (no modifier keys, no middle-click)
 *  - Only same-origin, same-path prefix links (starts with "/")
 *  - Skip hash-only links like `#section` (let the browser anchor-jump)
 *  - Skip `target="_blank"` or `download` attributes
 *  - Skip clicks where the user pressed a modifier key
 */
function AnchorInterceptor({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      // Only handle plain left-clicks
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Skip external links (http://, https://, mailto:, tel:)
      if (/^(https?:|mailto:|tel:)/i.test(href)) return;

      // Skip download links
      if (anchor.hasAttribute('download')) return;

      // Skip target=_blank
      if (anchor.target && anchor.target !== '_self') return;

      // Hash-only links on the same page: let the browser handle it
      if (href.startsWith('#')) {
        // If it's just "#" with nothing else, do nothing (placeholder)
        if (href === '#') {
          event.preventDefault();
          return;
        }
        // Otherwise, smooth-scroll to the element
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          event.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      // Internal SPA links starting with "/"
      if (href.startsWith('/')) {
        event.preventDefault();
        // Avoid duplicate navigations to the same path
        if (location.pathname + location.search === href) return;
        navigate(href);
      }
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [navigate, location]);

  return <>{children}</>;
}

export function RouterProvider() {
  return (
    <BrowserRouter>
      <AnchorInterceptor>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/styles" element={<StylesPage />} />
          <Route path="/style/:id" element={<StyleDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/legal/privacy" element={<PrivacyPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
          <Route path="/app" element={<DashboardPage />} />
          <Route path="/app/history" element={<HistoryPage />} />
          <Route path="/app/favorites" element={<FavoritesPage />} />
          <Route path="/app/skin" element={<SkinPage />} />
          <Route path="/app/progress" element={<ProgressPage />} />
          <Route path="/app/notifications" element={<NotificationsPage />} />
          <Route path="/app/settings" element={<SettingsPage />} />
          <Route path="/app/export" element={<ExportPage />} />
          <Route path="/app/queue" element={<QueuePage />} />
          <Route path="/app/result/:id" element={<ResultPage />} />
          {/* Fallback: any unknown route goes home */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AnchorInterceptor>
    </BrowserRouter>
  );
}
