function plugin() {
  return function(style) {
    style.include(__dirname)
  }
}

module.exports = plugin
