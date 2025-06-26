import { useEffect, useState } from "preact/hooks";

export default function CountdownTimer(
  props: { seconds: number; onFinish?: () => void },
) {
  const [timeLeft, setTimeLeft] = useState(props.seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (props.onFinish) props.onFinish();
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60));
  const seconds = String(timeLeft % 60);

  return (
    <span
      class="countdown font-mono text-6xl"
      aria-live="polite"
    >
      <span style={{ "--value": minutes }} aria-label={minutes}>
        {minutes}
      </span>
      :
      <span style={{ "--value": seconds }} aria-label={seconds}>
        {seconds}
      </span>
    </span>
  );
}
