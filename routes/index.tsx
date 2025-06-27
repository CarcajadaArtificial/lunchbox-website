import { define } from "@/utils.ts";
import Logo from "@/components/Logo.tsx";
import Shieldio from "@/components/Shieldio.tsx";
import RandomQuote from "@/islands/RandomQuote.tsx";
import GibberishChat from "@/islands/GibberishChat.tsx";
import PointlessProcess from "@/islands/PointlessProcess.tsx";
import Counter from "@/islands/Counter.tsx";
import { useSignal } from "@preact/signals";

export default define.page(function Home() {
  return (
    <>
      <main class="layout my-3-1" style={{ gridTemplateRows: "masonry" }}>
        <Header />
        <Links />
        <Counter count={useSignal(3)} />
        <GibberishChat />
        <RandomQuote />
        <PointlessProcess />
      </main>
      <Footer />
    </>
  );
});

const Footer = () => (
  <div class="bg-dotted">
    <footer class="footer layout min-h-36 py-2-1">
      <nav class="col-span-full md:col-span-3 lg:col-span-4">
        <h6 class="footer-title">Links</h6>
        <a
          class="link link-hover"
          href="https://github.com/CarcajadaArtificial/lunchbox"
          tabindex={0}
        >
          GitHub
        </a>
      </nav>
    </footer>
  </div>
);

const Links = () => (
  <div class="col-span-full">
    <div class="mb-1-1 flex gap-1-2">
      <Shieldio
        alt="GitHub Repo stars"
        src="https://img.shields.io/github/stars/CarcajadaArtificial/lunchbox"
        href="https://github.com/CarcajadaArtificial/lunchbox"
      />
      <Shieldio
        alt="JSR Version"
        src="https://img.shields.io/jsr/v/%40lunchbox/ui"
        href="https://jsr.io/@lunchbox/ui"
      />
    </div>
    <div class="flex gap-1-2">
      <a
        href="https://github.com/CarcajadaArtificial/lunchbox/discussions/12"
        class="btn btn-small btn-soft"
        tabindex={0}
      >
        Suggest a widget
      </a>
      <a
        href="https://stalecity.net/posts/lunchbox"
        class="btn btn-small btn-soft"
        tabindex={0}
      >
        Read the story
      </a>
    </div>
  </div>
);

const Header = () => (
  <div class="col-span-full">
    <header
      tabindex={0}
      class="flex flex-col md:flex-row items-center gap-1-1 px-1-2 pb-3-4 bg-dotted"
    >
      <Logo size={164} />
      <div class="prose mt-3-4">
        <h1 class="mb-1-4">Welcome to Fresh Lunchbox</h1>
        <p>
          A lightweight, server-first styling layer built on top of TailwindCSS
          v4 and DaisyUI v5, tailor-made for Deno Fresh v2 and Preact.
        </p>
        <p class="touchscreen-hidden">
          This site was made for fun keyboard navigation. For this use the{" "}
          <kbd class="kbd -mt-1-4 mx-1-4">Tab</kbd>{" "}
          key, then move around using the arrow keys.
          <kbd class="kbd -mt-1-4 ml-1-2">↑</kbd>{" "}
          <kbd class="kbd -mt-1-4">→</kbd> <kbd class="kbd -mt-1-4">↓</kbd>{" "}
          <kbd class="kbd -mt-1-4">←</kbd>
        </p>
      </div>
    </header>
  </div>
);
