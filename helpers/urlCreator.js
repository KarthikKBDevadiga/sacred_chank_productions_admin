const urlCreator = (url, data) => {
  const ret = [];
  for (let d in data) {
    if (data[d] != null)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  }
  if (ret.length > 0) {
    return url + "?" + ret.join("&");
  } else return url;
};
export default urlCreator;
