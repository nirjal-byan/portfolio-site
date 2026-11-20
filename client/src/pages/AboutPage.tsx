import { ExternalLink, Film, Gamepad2, Music2 } from 'lucide-react';
import Experience from '../sections/Experience/Experience';
import Skills from '../sections/Skills/Skills';
import Certifications from '../sections/Certifications/Certifications';
import GitHubContributions from '../sections/GitHubContributions/GitHubContributions';
import Contact from '../sections/Contact/Contact';

export default function AboutPage() {
  return (
    <>
      <section className="about-profile [padding:40px_0_46px]">
        <div className="about-portrait-row flex items-center min-h-[120px] mb-[22px]">
          <img
            className="about-portrait block w-[120px] h-[120px] rounded-[3px] object-contain [filter:grayscale(100%)] [transition:filter_.35s_ease]"
            src={import.meta.env.BASE_URL + 'assets/images/profile.png'}
            alt="Nirjal Byanjankar"
            width="120"
            height="120"
          />
          <div className="portrait-note flex items-center ml-[10px] text-ink [transform:rotate(-3deg)_translateY(-2px)]" aria-label="22 year old">
            <svg viewBox="0 0 72 30" aria-hidden="true">
              <path d="M69 7C54 5 42 8 31 16C25 20 19 22 8 22" />
              <path d="M14 16L7 22L15 26" />
            </svg>
            <span>22 years old</span>
          </div>
        </div>

        <div className="about-copy text-[14px] leading-[1.65]">
          <p>
            I'm a software product engineer based in Lalitpur, specializing in product design.
            I turn ideas into full stack applications, from the first sketch to a thoughtful
            interface and the system behind it.
          </p>
          <p>
            Take the work seriously but leave a little room for fun. Away from the screen,
            you'll usually find me spending time in nature, or just chasing hobbies.
          </p>
        </div>
      </section>

      <Experience />
      <Skills />
      <Certifications />

      <section className="now-section" aria-labelledby="now-title">
        <h2 id="now-title">Now</h2>
        <p>
          Currently building Yompi, a trekking and tourism discovery platform for Nepal with an
          interactive map of real terrain, peaks, passes and trails.
        </p>
        <ul>
          <li>Building with a Next.js and TypeScript frontend, a NestJS API, and PostgreSQL with PostGIS.</li>
          <li>Rendering the interactive map with PixiJS, with trek details backed by cited sources.</li>
          <li>Running services in a consistent Docker environment, with the design work done in Figma.</li>
        </ul>
      </section>

      <GitHubContributions />

      <section className="about-life [border-top:1px_solid_var(--line)] [padding:30px_0]" aria-labelledby="outside-work-title">
        <h2 id="outside-work-title">Beyond the work</h2>
        <div className="about-life-list grid gap-[13px]">
          <p><Music2 size={16} /><span>I love progressive rock and blues — odd time signatures welcome</span></p>
          <p><Gamepad2 size={16} /><span>Chasing sunsets across the Wild West in Red Dead Redemption 2</span></p>
          <p><Film size={16} /><span>I like films such as <em>Into the Wild</em> — a reminder to wander, connect, and remember that “Happiness is only real when shared.”</span></p>
        </div>
      </section>

      <section className="now-playing [border-top:1px_solid_var(--line)] [padding:30px_0]" aria-labelledby="now-playing-title">
        <h2 id="now-playing-title">Now playing</h2>
        <a
          className="now-playing-card grid grid-cols-[72px_minmax(0,_1fr)_auto] items-center gap-[16px] text-ink no-underline"
          href="https://open.spotify.com/track/739sLmfUkVFoyPtb0C3263?si=aZ1dM9wCS9WyiKEqYB3zOA&amp;utm_source=copy_link"
          target="_blank"
          rel="noreferrer"
          aria-label="Listen to Girl from the North Country by Bob Dylan on Spotify"
        >
          <img
            className="now-playing-cover block w-[72px] h-[72px] rounded-[3px] object-cover"
            src={import.meta.env.BASE_URL + 'assets/images/freewheelin-bob-dylan.jpg'}
            alt="The Freewheelin’ Bob Dylan album cover"
            width="72"
            height="72"
          />
          <span className="now-playing-copy grid min-w-[0] gap-[5px] text-[14px]">
            <strong>Girl from the North Country</strong>
            <span>Bob Dylan · The Freewheelin’ Bob Dylan</span>
          </span>
          <span className="now-playing-link inline-flex items-center gap-[4px] text-muted text-[11px] [transition:color_.2s_ease]">Spotify <ExternalLink size={11} /></span>
        </a>
      </section>

      <Contact />

    </>
  );
}
