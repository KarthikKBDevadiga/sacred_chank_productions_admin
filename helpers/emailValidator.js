const emailValidator = (email, setError) => {
  if (!email) {
    if (setError) setError("Email Cant Be Empty");
    return false;
  }
  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!emailRegex.test(email)) {
    if (setError) setError("Email Is Invalid");
    return false;
  }
  return true;
};

export default emailValidator;
