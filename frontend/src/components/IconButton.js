function IconButton({ type = 'submit', icon, className, onClick }) {
  return (
    <button
      type={type}
      className={`px-4 py-3 hover:brightness-90 border border-primary rounded-lg ${className}`}
      onClick={onClick}
    >
      <img
        src={icon.icon}
        alt={icon.name}
        className="w-[25px] h-[25px] object-contain"
      />
    </button>
  );
}

export default IconButton;
