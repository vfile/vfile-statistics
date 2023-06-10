import assert from 'node:assert/strict'
import test from 'node:test'
import {VFile} from 'vfile'
import {statistics} from 'vfile-statistics'

test('statistics', async function () {
  assert.deepEqual(
    Object.keys(await import('vfile-statistics')).sort(),
    ['statistics'],
    'should expose the public api'
  )

  const file = new VFile()
  const other = new VFile()

  assert.throws(function () {
    // @ts-expect-error: check that a runtime error is thrown.
    statistics()
  }, /Expected file or message for `value`, not `undefined`/)

  assert.deepEqual(statistics(file), {
    fatal: 0,
    nonfatal: 0,
    warn: 0,
    info: 0,
    total: 0
  })

  assert.deepEqual(statistics([file, other]), {
    fatal: 0,
    nonfatal: 0,
    warn: 0,
    info: 0,
    total: 0
  })

  file.message('This')

  assert.deepEqual(statistics(file.messages), {
    fatal: 0,
    nonfatal: 1,
    warn: 1,
    info: 0,
    total: 1
  })

  assert.deepEqual(statistics(file), {
    fatal: 0,
    nonfatal: 1,
    warn: 1,
    info: 0,
    total: 1
  })

  assert.deepEqual(statistics([file, other]), {
    fatal: 0,
    nonfatal: 1,
    warn: 1,
    info: 0,
    total: 1
  })

  file.message('That')

  assert.deepEqual(statistics(file), {
    fatal: 0,
    nonfatal: 2,
    warn: 2,
    info: 0,
    total: 2
  })

  file.info('Info')

  assert.deepEqual(statistics(file), {
    fatal: 0,
    nonfatal: 3,
    warn: 2,
    info: 1,
    total: 3
  })

  try {
    file.fail('Again')
  } catch {}

  assert.deepEqual(statistics(file), {
    fatal: 1,
    nonfatal: 3,
    warn: 2,
    info: 1,
    total: 4
  })
})
