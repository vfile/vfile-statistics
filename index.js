'use strict';

module.exports = statistics;

/* Get stats for a file, list of files, or list of messages. */
function statistics(files) {
  var result = {true: 0, false: 0, null: 0};

  count(files);

  return {
    fatal: result.true,
    nonfatal: result.false + result.null,
    warn: result.false,
    info: result.null,
    total: result.true + result.false + result.null
  };

  function count(value) {
    var index;
    var length;
    var fatality;

    if (!value) {
      return;
    }

    if (value.messages) {
      count(value.messages);
    } else if (value[0] && value[0].messages) {
      index = -1;
      length = value.length;

      while (++index < length) {
        count(value[index].messages);
      }
    } else {
      index = -1;
      length = value.length;

      while (++index < length) {
        fatality = value[index].fatal;
        result[fatality === null || fatality === undefined ? null : Boolean(fatality)]++;
      }
    }
  }
}
