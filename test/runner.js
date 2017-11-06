const assert = require('assert')
const fs = require('fs')
const stylus = require('stylus')
const hunker = require('../')

/**
 * Load files matching test/example/*.styl
 */
const cases = fs.readdirSync('test/examples')
  .filter(file => file.includes('.styl'))
  .map(file => file.replace('.styl', ''))

/**
 * Load and run a single test case by name
 */
const runSingleTestCase = name => {
  const path = `test/examples/${name}.styl`
  const styl = fs.readFileSync(path, 'utf8')
  const css = fs.readFileSync(`test/examples/${name}.css`, 'utf8')

  const style = stylus(styl)
    .use(hunker())
    .set('filename', path)

  it(name, () => {
    style.render((err, actual) => {
      if (err) throw err;
      assert.equal(actual.trim(), css.trim())
    })
  })
}

describe('integration', () => {
  cases.forEach(runSingleTestCase)
})
