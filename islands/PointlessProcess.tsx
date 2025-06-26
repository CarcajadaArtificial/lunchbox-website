import { useState } from "preact/hooks";
import Countdown from "./Countdown.tsx";
import ImageModal from "./ImageModal.tsx";

export default function () {
  const { step, nextStep } = useStep();

  const submitNextStep = (ev: Event) => {
    ev.preventDefault();
    nextStep();
  };

  return (
    <div class="col-span-full md:col-span-3 lg:col-span-4">
      <div class="prose p-1-2 bg-base-200">
        <h2>Pointless Process</h2>
      </div>

      <div class="bg-dotted p-1-2">
        {step === 0 && (
          <>
            <div class="prose mb-1-1">
              <div role="alert" class="p-1-2 alert alert-warning">
                Warning: This widget is completely pointless, completing this
                process will achieve absolutely nothing and will only amount to
                the losing of your dear time.
              </div>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              onClick={nextStep}
              tabIndex={0}
            >
              Start Process
            </button>
          </>
        )}

        <ul class="steps steps-vertical">
          {step >= 1 &&
            (
              <li class="step step-primary">
                Process started
              </li>
            )}
          {step >= 2 &&
            (
              <li class="step step-primary">
                Process start confirmed
              </li>
            )}
          {step >= 3 &&
            (
              <li class="step step-primary">
                Diophantine equation solved
              </li>
            )}
          {step >= 4 &&
            (
              <li class="step step-primary">
                Pointless request processed
              </li>
            )}
          {step >= 5 &&
            (
              <li class="step step-primary">
                Process completed
              </li>
            )}
        </ul>

        {step === 1 && (
          <div>
            <p>
              Perfect! Thank you for starting the Pointless Process. I would
              like to confirm you didn't start it by accident, could you
              confirm?
            </p>
            <form
              onSubmit={submitNextStep}
            >
              <label class="block my-1-2">
                <input
                  required
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  tabindex={0}
                />
                <span class="ml-1-2 text-sm">
                  I hereby confirm I want to start the Pointless Process.
                </span>
              </label>
              <button
                class="btn btn-sm btn-primary"
                type="submit"
                tabindex={0}
              >
                Confirm start
              </button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div>
            <div class="prose">
              Perfect, now please solve this Diophantine Equation to progress.
              {" "}
              <code>y(x^2 - y) = z^2 + 1</code>
            </div>
            <form class="join mt-1-1" onSubmit={submitNextStep}>
              <input
                placeholder="(x, y, z)"
                class="join-item input input-sm"
                type="text"
                tabindex={0}
                required
              />
              <button
                type="submit"
                class="join-item btn btn-sm"
                tabindex={0}
              >
                Submit Answer
              </button>
            </form>
            <p class="text-xs mt-1-4">
              Don't worry, there isn't a known answer. Submitting anything will
              advance you to the next step
            </p>
          </div>
        )}
        {step === 3 && (
          <div class="text-center mb-1-1">
            <div class="prose mt-1-4 mb-3-4">
              <p class="">
                Thank you for solving an unsolvable Diophatine equation, we'll
                now process your pointless request, please wait.
              </p>
            </div>
            <Countdown seconds={5 * 60} onFinish={nextStep} />
          </div>
        )}
        {step === 4 && (
          <div class="text-center prose mt-1-4">
            <p class="mb-1-2">
              Thank you for wating. You've just completed the Pointless Process,
              feel free to click the button to generate your Pointless Process
              Completion Certificate.
            </p>
            <form
              onSubmit={submitNextStep}
            >
              <button
                class="btn btn-sm btn-primary"
                type="submit"
                tabindex={0}
              >
                Show certificate
              </button>
            </form>
          </div>
        )}
        {step === 5 && <ImageModal src="certificate.png" />}
      </div>
    </div>
  );
}

function useStep() {
  const [step, setStep] = useState<number>(0);

  return {
    step,
    nextStep: () => setStep(step + 1),
  };
}
