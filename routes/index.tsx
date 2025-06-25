import { define } from "@/utils.ts";
import Logo from "@/components/Logo.tsx";
import RandomQuote from "@/islands/RandomQuote.tsx";
import GibberishChat from "@/islands/GibberishChat.tsx";
// import PointlessProcess from "@/islands/PointlessProcess.tsx";

export default define.page(function Home() {
  return (
    <>
      <main class="layout my-3-1" style={{ gridTemplateRows: "masonry" }}>
        <div class="col-span-full">
          <div tabindex={0} class="flex items-center gap-1-1 bg-dotted">
            <Logo size={164} />
            <div class="prose">
              <h1 class="mb-1-4">Welcome to Fresh Lunchbox</h1>
              <p></p>
            </div>
            <p></p>
          </div>
        </div>
        <div class="col-span-full">
          <a class="btn btn-small btn-soft" tabindex={0}>
            Suggest a widget
          </a>
        </div>
        <RandomQuote />
        <GibberishChat />
        {/* <PointlessProcess /> */}
      </main>
      <div class="bg-dotted">
        <footer class="footer layout min-h-36 py-2-1">
          <nav class="col-span-full md:col-span-3 lg:col-span-4">
            <h6 class="footer-title">Links</h6>
            <a
              class="link link-hover"
              href="https://github.com/CarcajadaArtificial/lunchbox"
            >
              GitHub
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
});
