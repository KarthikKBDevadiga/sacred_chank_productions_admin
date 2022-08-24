function ImageLoader({ src, width, height }) {
  return src + "?width=" + width + "&height=" + height;
}
module.exports = ImageLoader;
