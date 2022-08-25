const setCookie = (key, value) => {
  //Set The Expire Time for Cookie
  const expires = 3600;
  //Set The Cookie
  document.cookie = key + "=" + value + "; " + expires + "; path=/";
};
module.exports = setCookie;
