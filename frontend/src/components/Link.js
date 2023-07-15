function Link({ href, target = '', text, externalStyle, onClick = () => {} }) {
  return (
    <a
      href={href}
      target={target}
      onClick={onClick}
      rel="noopener"
      className={`text-primary hover:underline ${externalStyle}`}
    >
      {text}
    </a>
  );
}

export default Link;
