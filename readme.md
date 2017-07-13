# vfile-statistics [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Count [vfile][] messages per category (fatal, warn, info, nonfatal and total).

## Installation

[npm][npm-install]:

```bash
npm install vfile-statistics
```

## Usage

```js
var statistics = require('vfile-statistics');
var vfile = require('vfile');

var file = vfile({path: '~/example.md'});

file.message('This could be better');
file.message('That could be better');

try {
  file.fail('This is terribly wrong');
} catch (err) {}

var msg = file.message('That could be better');
msg.fatal = null;
console.log(statistics(file));
```

Yields:

```js
{ fatal: 1, nonfatal: 3, warn: 2, info: 1, total: 4 }
```

## API

### `statistics(file)`

Pass a [vfile][], list of vfiles, or a list of messages
(`file.messages`), get counts per category.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/vfile/vfile-statistics.svg

[travis]: https://travis-ci.org/vfile/vfile-statistics

[codecov-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-statistics.svg

[codecov]: https://codecov.io/github/vfile/vfile-statistics

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[vfile]: https://github.com/vfile/vfile
