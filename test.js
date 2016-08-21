/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module
 * @fileoverview Test suite for `vfile-statistics`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var vfile = require('vfile');
var statistics = require('./');

/* Tests. */
test('statistics()', function (t) {
  var file = vfile();
  var other = vfile();

  t.deepEqual(statistics(), {fatal: 0, nonfatal: 0, total: 0});
  t.deepEqual(statistics(file), {fatal: 0, nonfatal: 0, total: 0});
  t.deepEqual(statistics([file, other]), {fatal: 0, nonfatal: 0, total: 0});

  file.message('This');
  t.deepEqual(statistics(file.messages), {fatal: 0, nonfatal: 1, total: 1});
  t.deepEqual(statistics(file), {fatal: 0, nonfatal: 1, total: 1});
  t.deepEqual(statistics([file, other]), {fatal: 0, nonfatal: 1, total: 1});

  file.message('That');
  t.deepEqual(statistics(file), {fatal: 0, nonfatal: 2, total: 2});

  try {
    file.fail('Again');
  } catch (err) {}

  t.deepEqual(statistics(file), {fatal: 1, nonfatal: 2, total: 3});

  t.end();
});
