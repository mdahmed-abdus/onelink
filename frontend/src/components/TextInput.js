function TextInput({
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeHolder = '',
  externalStyle,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeHolder}
      className={`min-w-[300px] bg-secondary py-3 rounded-lg outline-none text-center text-primary placeholder:text-center placeholder:text-primary placeholder:text-opacity-50 ${externalStyle}`}
    />
  );
}

export default TextInput;
