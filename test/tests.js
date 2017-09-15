/* global window, CacheStore, describe, it, chai */
describe('CacheStore', function () {
  const cache = new CacheStore.default('__test_cache__') // eslint-disable-line
  it('#setItem', function () {
    cache.setItem('key1', 1)
    chai.assert.isOk(window.localStorage.getItem('__test_cache__') !== null)
  })
  it('#getItem', function () {
    chai.assert.equal(1, cache.getItem('key1'))
  })
  it('#getItem expires', function (done) {
    cache.setItem('key2', 2, +new Date() + 10)
    setTimeout(function () {
      chai.assert.equal(2, cache.getItem('key2'))
      setTimeout(function () {
        chai.assert.equal(null, cache.getItem('key2'))
        done()
      }, 5)
    }, 5)
  })
  it('#clearItem', function () {
    cache.clearItem('key1')
    chai.assert.equal(null, cache.getItem('key1'))
  })
  it('#getAll', function () {
    cache.setItem('key3', 3)
    cache.setItem('key4', 4)
    const map = cache.getAll()
    chai.assert.exists(map['key3'])
    chai.assert.exists(map['key4'])
  })
  it('#clear', function () {
    cache.clear()
    chai.assert.isNull(window.localStorage.getItem('__test_cache__'))
  })
})
