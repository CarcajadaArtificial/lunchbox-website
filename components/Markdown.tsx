import { md } from "@lunchbox/ui";
import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";

export default (
  props: { content: string },
) => (
  <div
    class="prose"
    {...md({
      content: props.content,
      transform: (content: string) => {
        const doc = new DOMParser().parseFromString(content, "text/html");
        const body = doc.body;
        Array.from(body.children).forEach((el) => {
          if (!(el instanceof Element)) return;
          else if (
            el.tagName.toLowerCase() === "details" &&
            el.querySelector("summary") instanceof Element
          ) {
            el.querySelector("summary")!.setAttribute("tabindex", "0");
          } else {
            el.setAttribute("tabindex", "0");
          }
        });
        return body.innerHTML;
      },
    })}
  />
);
