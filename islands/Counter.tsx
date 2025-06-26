import type { Signal } from "@preact/signals";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="col-span-full md:col-span-3 lg:col-span-4">
      <div class="prose p-1-2 bg-base-200">
        <h2>Counter</h2>
      </div>
      <div class="bg-dotted p-1-2">
        <div class="prose">
          This is the signal based Counter island that comes with Fresh init.
        </div>

        <div class="flex justify-center gap-3-4 py-1-1 mx-auto">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            onClick={() => props.count.value -= 1}
            tabIndex={0}
          >
            -1
          </button>
          <span class="text-xl tabular-nums">{props.count}</span>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            onClick={() => props.count.value += 1}
            tabIndex={0}
          >
            +1
          </button>
        </div>
      </div>
    </div>
  );
}
