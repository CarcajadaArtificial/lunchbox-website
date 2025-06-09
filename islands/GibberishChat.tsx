import { cn } from "@vyn/cn";
import { useEffect, useState } from "preact/hooks";

interface Message {
  user: 0 | 1 | 2;
  content: string;
}

function generateRandomWord(length: number): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}

function generateGibberish(words: number): string {
  const parts: string[] = [];
  for (let i = 0; i < words; i++) {
    const len = Math.floor(Math.random() * 7) + 2;
    parts.push(generateRandomWord(len));
  }
  return parts.join(" ");
}

function transformSentence(str: string): string {
  if (str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1) + ".";
}

const users = [
  generateRandomWord(2).toUpperCase(),
  generateRandomWord(2).toUpperCase(),
  "ME",
];

export default function () {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const seed = Math.random();
      if (seed >= 0.1) return;

      const simpleSeed = Math.trunc(seed * 100);

      setMessages([{
        user: simpleSeed % 2 === 0 ? 0 : 1,
        content: transformSentence(generateGibberish((simpleSeed + 1) * 2)),
      }, ...messages]);
    }, 500);

    return () => clearInterval(intervalId);
  }, [messages]);

  return (
    <div class="col-span-full md:col-span-3 lg:col-span-4">
      <div class="p-1-2 bg-base-200">
        Gibberish Chat
      </div>
      <div class="p-1-2 dotted h-96 overflow-y-scroll flex flex-col-reverse">
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
      <div class="p-1-2 bg-base-200">
        <form
          class="join"
          onSubmit={(ev) => {
            ev.preventDefault();
            const input = document
              .getElementById("gibberish-input") as HTMLInputElement;

            setMessages([{
              user: 2,
              content: input.value,
            }, ...messages]);

            input.value = "";
          }}
        >
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
      </div>
    </div>
  );
}
