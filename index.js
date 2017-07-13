'use strict';

module.exports = statistics;

/* Get stats for a file, list of files, or list of messages. */
function statistics(files) {
  var total = 0;
  var result = {
    true: 0,
    false: 0,
    null: 0
  };

  count(files);

  return {
    fatal: result.true,
    nonfatal: result.false + result.null,
    warn: result.false,
    info: result.null,
    total: total
  };

  function count(value) {
    var index;
    var length;

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
        var fatality = value[index].fatal;
        var increment = Boolean(fatality);

        /* Set indeterminate state to be `null` */
        if (fatality === null || fatality === undefined) {
          increment = null;
        }

        result[increment]++;
        total++;
      }
    }
  }
}
