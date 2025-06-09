import { define } from "@/utils.ts";
import Logo from "@/components/Logo.tsx";
import RandomQuote from "@/islands/RandomQuote.tsx";
import GibberishChat from "../islands/GibberishChat.tsx";

export default define.page(function Home() {
  return (
    <main class="layout">
      <div class="col-span-full mt-2-1">
        <div tabindex={0} class="flex items-center gap-1-1 dotted">
          <Logo size={164} />
          <div class="prose">
            <h1 class="mb-1-4">Welcome to Fresh Lunchbox</h1>
            <p></p>
          </div>
          <p></p>
        </div>
      </div>
      <RandomQuote />
      <GibberishChat />
    </main>
  );
});
