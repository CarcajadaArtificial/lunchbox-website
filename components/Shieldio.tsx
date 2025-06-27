export default function (props: { src: string; alt: string; href: string }) {
  return (
    <a href={props.href} tabIndex={0}>
      <img
        class="vignette grayscale"
        src={props.src}
        alt={props.alt}
      />
    </a>
  );
}
