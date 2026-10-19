import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Navbar from './components/NavBar';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const [isAboutPage, setIsAboutPage] = useState(() => {
    if (window.location.hash === '#/about') window.history.replaceState({}, '', '/about');
    else if (window.location.hash === '#/') window.history.replaceState({}, '', '/');
    return window.location.pathname.replace(/\/$/, '') === '/about';
  });
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 0.75,
      smoothTouch: 0,
      effects: false,
    });

    return () => smoother.kill();
  }, []);
  useEffect(() => {
    const handleNavigation = () => {
      setIsAboutPage(window.location.pathname.replace(/\/$/, '') === '/about');
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(0, false);
      else window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);
  useEffect(() => {
    document.title = isAboutPage ? 'About — Nirjal Byanjankar' : 'Nirjal Byanjankar';
  }, [isAboutPage]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try { return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage is optional. */ }
  }, [theme]);
  useEffect(() => {
    const lockHome = !isAboutPage && !projectsExpanded;
    document.body.classList.toggle('home-page', !isAboutPage);
    document.body.classList.toggle('home-projects-collapsed', lockHome);
    return () => {
      document.body.classList.remove('home-page');
      document.body.classList.remove('home-projects-collapsed');
    };
  }, [isAboutPage, projectsExpanded]);
  useEffect(() => {
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 650);
    return () => window.clearTimeout(refresh);
  }, [isAboutPage, projectsExpanded]);
  const themeTransitionActive = useRef(false);
  const handleThemeToggle = () => {
    if (themeTransitionActive.current) return;
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };

    if (!transitionDocument.startViewTransition || reduceMotion) {
      setTheme(nextTheme);
      return;
    }

    themeTransitionActive.current = true;
    const enteringDark = nextTheme === 'dark';
    // A slanted curtain travels across the viewport, reversing with the theme.
    const curtain = enteringDark
      ? [
          'polygon(100% 0, 100% 0, 100% 100%, 120% 100%)',
          'polygon(38% 0, 100% 0, 100% 100%, 62% 100%)',
          'polygon(-24% 0, 100% 0, 100% 100%, 0% 100%)',
        ]
      : [
          'polygon(0 0, -20% 0, 0 100%, 0 100%)',
          'polygon(0 0, 38% 0, 62% 100%, 0 100%)',
          'polygon(0 0, 100% 0, 124% 100%, 0 100%)',
        ];

    const transition = transitionDocument.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: curtain },
        {
          duration: 950,
          easing: 'cubic-bezier(.65, 0, .2, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    }).catch(() => undefined);
    transition.finished.catch(() => undefined).finally(() => {
      themeTransitionActive.current = false;
    });
  };
  const navigate = (path: '/' | '/about') => {
    if (window.location.pathname === path) return;
    window.history.pushState({}, '', path);
    setIsAboutPage(path === '/about');
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, false);
    else window.scrollTo({ top: 0, behavior: 'instant' });
  };
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="portfolio w-[min(520px,_calc(100%_-_40px))] min-h-[100dvh] [margin:0_auto] pt-[28px] flex flex-col">
          <a className="skip-link fixed top-[-80px] left-[20px] bg-ink text-paper [padding:12px_20px] z-[100]" href="#main">Skip to content</a>
          <Navbar theme={theme} toggleTheme={handleThemeToggle} isAboutPage={isAboutPage} onNavigate={navigate} />
          <main key={isAboutPage ? 'about' : 'home'} id="main" className={`${isAboutPage ? 'about-main' : 'home-main'} page-enter [transform-origin:top_center] [animation:page-enter_.58s_cubic-bezier(.16,_1,_.3,_1)_both]`}>
            {isAboutPage ? <AboutPage /> : <><Hero /><Projects expanded={projectsExpanded} onExpandedChange={setProjectsExpanded} /></>}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
