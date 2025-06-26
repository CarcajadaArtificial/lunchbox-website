import { useEffect, useRef } from "preact/hooks";
import { handleKeyboard, Key } from "@carcajada/teclas";

export default function ImageModal(props: { src: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current!;
    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === dlg) dlg.close();
    };
    dlg.addEventListener("click", onBackdropClick);
    return () => dlg.removeEventListener("click", onBackdropClick);
  }, []);

  return (
    <div>
      <img
        class="vignette cursor-pointer"
        tabindex={0}
        src={props.src}
        onClick={() => dialogRef.current!.showModal()}
        onKeyUp={handleKeyboard([
          { keys: [Key.Enter], cb: () => dialogRef.current!.showModal() },
        ])}
      />
      <dialog ref={dialogRef} class="modal">
        <div class="modal-box inline-block w-auto max-w-none overflow-auto p-0">
          <img
            class="vignette max-w-none max-h-[90vh] block"
            style={{ width: "auto", height: "auto" }}
            src={props.src}
          />
        </div>
        <form method="dialog" class="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </div>
  );
}
