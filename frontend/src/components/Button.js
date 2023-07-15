function Button({ type = 'submit', externalStyle, text, onClick }) {
  return (
    <button
      type={type}
      className={`bg-primary hover:brightness-90 px-20 text-center py-3 text-white rounded-lg ${externalStyle}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
