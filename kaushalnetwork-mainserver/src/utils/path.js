const normalizePath = (path) => {
  return path.replace(/\\/g, '/');
};

module.exports = { normalizePath };
