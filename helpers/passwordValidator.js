const passwordValidator = (password, setError) => {
  if (!password) {
    setError("Password Cant Be Empty");
    return false;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  if (!passwordRegex.test(password)) {
    setError(
      "Password Should Contatin Uppercase Lowercase Character And Digit"
    );
    return false;
  }
  return true;
};

export default passwordValidator;
