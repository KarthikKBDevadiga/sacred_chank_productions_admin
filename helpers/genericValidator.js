const genericValidator = (value, setError, name) => {
  if (!value) {
    if (setError) setError(name + " Can't Be Empty");
    return false;
  }
  return true;
};

export default genericValidator;
