import { useState } from "preact/hooks";
import { handleKeyboard, Key } from "@carcajada/teclas";

const quoteUrl = "https://thequoteshub.com/api/random-quote";

async function fetchQuote() {
  const res = await (await fetch(quoteUrl))
    .json();
  console.log(res);
  return `${res.text} - ${res.author}`;
}

export default function () {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <div class="col-span-full md:col-span-3 lg:col-span-4">
      <div class="prose p-1-2 bg-base-200">
        <h2>Random quote generator</h2>
      </div>
      <div class="bg-dotted p-1-2 mb-1-1">
        <div class="prose">
          <p class="mb-1-1">
            This feed is brought to you by the{" "}
            <a tabIndex={0} href="https://thequoteshub.com">The Quotes Hub</a>
            {" "}
            public API of random quotes: <code>/api/random-quote</code>{" "}
            click on a quote or press the <kbd class="kbd">Enter</kbd>{" "}
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
