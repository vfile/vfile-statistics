import test from 'tape'
import {VFile} from 'vfile'
import {statistics} from './index.js'

test('statistics()', function (t) {
  var file = new VFile()
  var other = new VFile()

  t.deepEqual(statistics(), {fatal: 0, nonfatal: 0, warn: 0, info: 0, total: 0})

  t.deepEqual(statistics(file), {
    fatal: 0,
    nonfatal: 0,
    warn: 0,
    info: 0,
    total: 0
  })

  t.deepEqual(statistics([file, other]), {
    fatal: 0,
    nonfatal: 0,
    warn: 0,
    info: 0,
    total: 0
  })

  file.message('This')

  t.deepEqual(statistics(file.messages), {
    fatal: 0,
    nonfatal: 1,
    warn: 1,
    info: 0,
    total: 1
  })

  t.deepEqual(statistics(file), {
    fatal: 0,
    nonfatal: 1,
    warn: 1,
    info: 0,
    total: 1
  })

  t.deepEqual(statistics([file, other]), {
    fatal: 0,
    nonfatal: 1,
    warn: 1,
    info: 0,
    total: 1
  })

  file.message('That')

  t.deepEqual(statistics(file), {
    fatal: 0,
    nonfatal: 2,
    warn: 2,
    info: 0,
    total: 2
  })

  file.info('Info')

  t.deepEqual(statistics(file), {
    fatal: 0,
    nonfatal: 3,
    warn: 2,
    info: 1,
    total: 3
  })

  try {
    file.fail('Again')
  } catch {}

  t.deepEqual(statistics(file), {
    fatal: 1,
    nonfatal: 3,
    warn: 2,
    info: 1,
    total: 4
  })

  t.end()
})
