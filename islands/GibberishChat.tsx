import { cn } from "@vyn/cn";
import { useEffect, useState } from "preact/hooks";
import {
  generateGibberish,
  generateRandomWord,
  transformSentence,
} from "@/src/utils.ts";

export default function () {
  const { messages, loop, userSubmit, clear } = useGibberishChat();

  loop();

  return (
    <div class="col-span-full md:col-span-3 lg:col-span-4">
      <div class="prose p-1-2 bg-base-200">
        <h2>Gibberish Group Chat</h2>
      </div>
      <div
        class="p-1-2 bg-dotted h-96 overflow-y-scroll flex flex-col-reverse"
        tabindex={0}
      >
        {messages.map((message) => (
          <div
            class={cn("chat", message.user === 2 ? "chat-end" : "chat-start")}
          >
            <div class="chat-image avatar avatar-placeholder">
              <div class="bg-neutral text-neutral-content w-8 rounded-full">
                <span class="text-xs">{users[message.user]}</span>
              </div>
            </div>
            <div
              class={cn(
                "chat-bubble",
                message.user === 2 ? "chat-bubble-primary" : null,
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div class="p-1-2 bg-base-200 flex justify-between">
        <form class="join" onSubmit={userSubmit}>
          <input
            id="gibberish-input"
            class="join-item input input-sm"
            type="text"
            tabindex={0}
          />
          <button
            type="submit"
            class="join-item btn btn-sm"
            tabindex={0}
          >
            Send
          </button>
        </form>
        <button
          tabIndex={0}
          class="btn btn-sm btn-soft"
          type="button"
          onClick={clear}
        >
          Clear messages
        </button>
      </div>
    </div>
  );
}

interface Message {
  user: 0 | 1 | 2;
  content: string;
}

const users = [
  generateRandomWord(2).toUpperCase(),
  generateRandomWord(2).toUpperCase(),
  "ME",
];

function useGibberishChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  return {
    messages,

    clear: () => setMessages([]),

    loop: () =>
      useEffect(() => {
        const intervalId = setInterval(() => {
          if (messages.length > 20) return;
          const seed = Math.random();
          if (seed >= 0.1) return;

          const simpleSeed = Math.trunc(seed * 100);

          setMessages([{
            user: simpleSeed % 2 === 0 ? 0 : 1,
            content: transformSentence(generateGibberish((simpleSeed + 1) * 2)),
          }, ...messages]);
        }, 500);

        return () => clearInterval(intervalId);
      }, [messages]),

    userSubmit: (ev: Event) => {
      ev.preventDefault();
      const input = document
        .getElementById("gibberish-input") as HTMLInputElement;
      if (input.value && input.value.length > 0) {
        setMessages([{
          user: 2,
          content: input.value,
        }, ...messages]);
      }
      input.value = "";
    },
  };
}
