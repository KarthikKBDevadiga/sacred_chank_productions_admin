const getYoutubeVideoId = (url) => {
  if (url == null) return "";
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  if (match) return match[7];
  return "";
  // return (match&&match[7].length==11)? match[7] : 'false'
};
export default getYoutubeVideoId;
