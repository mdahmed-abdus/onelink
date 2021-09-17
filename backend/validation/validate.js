module.exports = (schema, payload) => {
  const { error } = schema.validate(payload);
  return error?.details[0].message;
};
