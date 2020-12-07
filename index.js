'use strict'

module.exports = statistics

// Get stats for a file, list of files, or list of messages.
function statistics(value) {
  var result = {true: 0, false: 0, null: 0}

  if (value) {
    if (value[0] && value[0].messages) {
      // Multiple vfiles.
      countInAll(value)
    } else {
      // One vfile / messages.
      countAll(value.messages || value)
    }
  }

  return {
    fatal: result.true,
    nonfatal: result.false + result.null,
    warn: result.false,
    info: result.null,
    total: result.true + result.false + result.null
  }

  function countInAll(files) {
    var index = -1

    while (++index < files.length) {
      countAll(files[index].messages)
    }
  }

  function countAll(messages) {
    var index = -1

    while (++index < messages.length) {
      result[
        messages[index].fatal == null ? null : Boolean(messages[index].fatal)
      ]++
    }
  }
}
