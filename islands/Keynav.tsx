import { useEffect } from "preact/hooks";

const DIRECTIONS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];
type Direction = typeof DIRECTIONS[number];

const SHAKE_CLASSES = [
  "shake_up",
  "shake_down",
  "shake_left",
  "shake_right",
  "shake",
] as const;
type ShakeClass = typeof SHAKE_CLASSES[number];

function overlaps(aMin: number, aMax: number, bMin: number, bMax: number) {
  return !(aMax < bMin || aMin > bMax);
}

function findCandidate(
  current: HTMLElement,
  direction: Direction,
  candidates: HTMLElement[],
  padding: number = 0,
): HTMLElement | null {
  const currentRect = current.getBoundingClientRect();
  const paddedY = {
    min: currentRect.top - padding,
    max: currentRect.bottom + padding,
  };
  const paddedX = {
    min: currentRect.left - padding,
    max: currentRect.right + padding,
  };

  let closest: HTMLElement | null = null;
  let minDistance = Infinity;

  for (const el of candidates) {
    if (el === current) continue;
    const rect = el.getBoundingClientRect();
    let distance: number = Infinity;

    switch (direction) {
      case "ArrowRight":
        if (
          rect.left > currentRect.right &&
          overlaps(rect.top, rect.bottom, paddedY.min, paddedY.max)
        ) {
          distance = rect.left - currentRect.right;
        } else {
          continue;
        }
        break;

      case "ArrowLeft":
        if (
          rect.right < currentRect.left &&
          overlaps(rect.top, rect.bottom, paddedY.min, paddedY.max)
        ) {
          distance = currentRect.left - rect.right;
        } else {
          continue;
        }
        break;

      case "ArrowDown":
        if (
          rect.top > currentRect.bottom &&
          overlaps(rect.left, rect.right, paddedX.min, paddedX.max)
        ) {
          distance = rect.top - currentRect.bottom;
        } else {
          continue;
        }
        break;

      case "ArrowUp":
        if (
          rect.bottom < currentRect.top &&
          overlaps(rect.left, rect.right, paddedX.min, paddedX.max)
        ) {
          distance = currentRect.top - rect.bottom;
        } else {
          continue;
        }
        break;
    }

    if (distance < minDistance) {
      minDistance = distance;
      closest = el;
    }
  }

  return closest;
}

function resetShake(el: HTMLElement, exclude?: ShakeClass) {
  SHAKE_CLASSES.forEach((cls) => {
    if (cls !== exclude && el.classList.contains(cls)) {
      el.classList.remove(cls);
    }
  });
}

function handleKeyDown(this: HTMLElement, e: KeyboardEvent) {
  const { key } = e;

  if (key === "Enter") {
    resetShake(this);
    void this.offsetWidth;
    this.classList.add("shake");
    return;
  }

  if (key === "Esc") this.blur();

  if (!DIRECTIONS.includes(key)) return;

  e.preventDefault();
  resetShake(this);

  const tabbedElements = Array.from(
    document.querySelectorAll<HTMLElement>('[tabindex="0"]'),
  );
  const candidate = findCandidate(this, key, tabbedElements, 100);

  if (candidate) {
    this.removeEventListener("keydown", handleKeyDown);
    candidate.focus();
    return;
  }

  const dir = key.replace("Arrow", "").toLowerCase();
  const shakeClass = `shake_${dir}` as ShakeClass;

  this.classList.add(shakeClass);
}

/**
 * Attach the `handleKeyDown()` listener when an element is focused.
 */
function handleFocusIn(e: FocusEvent) {
  const t = e.target;
  if (t instanceof HTMLElement && t.tabIndex === 0) {
    t.addEventListener("keydown", handleKeyDown);
  }
}

/**
 * Remove the `handleKeyDown()` listener when an element is focused.
 */
function handleFocusOut(e: FocusEvent) {
  const t = e.target;
  if (t instanceof HTMLElement && t.tabIndex === 0) {
    t.removeEventListener("keydown", handleKeyDown);
    resetShake(t);
  }
}

function keynav() {
  document.addEventListener("focusin", handleFocusIn);
  document.addEventListener("focusout", handleFocusOut);
}

export default function () {
  useEffect(keynav, []);

  return null;
}
