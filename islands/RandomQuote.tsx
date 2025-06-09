import { useState } from "preact/hooks";
import { handleKeyboard, Key } from "@carcajada/teclas";

const quotableUrl = "http://api.quotable.io/random";

async function fetchQuote() {
  const res = await (await fetch(quotableUrl))
    .json();
  return `${res.content} - ${res.author}`;
}

export default function () {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <div class="col-span-full md:col-span-3 lg:col-span-4">
      <div class="dotted p-1-2 mb-1-1">
        <div class="prose">
          <h2 class="mb-1-4">Random quote generator</h2>
          <p class="mb-1-1">
            This feed is brought to you by the{" "}
            <a href="quotable.io">Quotable</a> public API of random quotes:{" "}
            <code>{quotableUrl}</code> click on quotes or press the{" "}
            <kbd class="kbd">Enter</kbd>{" "}
            key when focusing on a quote to remove it.
          </p>
        </div>
        <button
          class="btn btn-primary btn-sm"
          type="button"
          tabindex={0}
          onClick={async () => {
            setLoading(true);
            setQuotes([await fetchQuote(), ...quotes]);
            setLoading(false);
          }}
        >
          Give me a quote!
        </button>
      </div>
      <div class="stack w-full">
        {isLoading ? <div class="skeleton min-h-16"></div> : null}
        {quotes.map((quote, i) => (
          <div
            class="bg-base-200 border border-base-300 p-1-2 rounded cursor-pointer"
            key={i}
            tabindex={i === 0 ? 0 : -1}
            onClick={() => setQuotes(quotes.slice(1))}
            onKeyUp={handleKeyboard([{
              keys: [Key.Enter],
              cb: () => setQuotes(quotes.slice(1)),
            }])}
          >
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
}
