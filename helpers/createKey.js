const createKey = (length) => {
  return (
    Math.random().toString(36).substr(2, 3) +
    "" +
    Math.random().toString(36).substr(2, 3) +
    "" +
    Math.random().toString(36).substr(2, 4)
  );
};
module.exports = createKey;
