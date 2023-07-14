function Button({ type = 'submit', externalStyle, text }) {
  return (
    <div>
      <button
        type={type}
        className={`bg-primary hover:brightness-90 py-3 text-white ${externalStyle}`}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
