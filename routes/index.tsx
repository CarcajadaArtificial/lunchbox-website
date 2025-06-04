import { define } from "@/utils.ts";
import Logo from "@/components/Logo.tsx";
import Markdown from "@/components/Markdown.tsx";

export default define.page(async function Home() {
  return (
    <main class="layout">
      <div class="col-span-full mt-2-1">
        <div class="flex flex-col items-center justify-center">
          <div tabindex={0}>
            <Logo size={164} />
          </div>
          <Markdown
            content={await (await fetch(
              "https://raw.githubusercontent.com/CarcajadaArtificial/lunchbox/refs/heads/main/README.md",
            )).text()}
          />
        </div>
      </div>
    </main>
  );
});
