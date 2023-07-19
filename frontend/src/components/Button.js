function Button({
  type = 'submit',
  text,
  disabled = false,
  onClick,
  buttonType = 'filled',
  color = 'primary',
  externalStyle,
}) {
  const basicStyles =
    'hover:brightness-90 px-20 text-center py-3 rounded-lg disabled:brightness-75 disabled:hover:brightness-75';

  let classes = `${basicStyles} bg-${color} text-white ${externalStyle}`;

  if (buttonType === 'outline') {
    classes = `${basicStyles} border border-${color} bg-transparent hover:backdrop-brightness-150 text-${color} ${externalStyle}`;
  }

  if (buttonType === 'underline') {
    classes = `${basicStyles}  px-0 py-0 w-fit text-${color} hover:underline ${externalStyle}`;
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? 'Loading...' : text}
    </button>
  );
}

export default Button;
