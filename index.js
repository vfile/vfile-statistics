/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 *
 * @typedef Statistics
 *   Statistics.
 * @property {number} fatal
 *   Fatal errors (`fatal: true`)
 * @property {number} warn
 *   Warnings (`fatal: false`)
 * @property {number} info
 *   Informational messages (`fatal: null|undefined`)
 * @property {number} nonfatal
 *   Warning + info
 * @property {number} total
 *   Nonfatal + fatal
 */

/**
 * Get stats for a file, list of files, or list of messages.
 *
 * @param {Array<VFile|VFileMessage>|VFile|VFileMessage} [value]
 * @returns {Statistics}
 */
export function statistics(value) {
  const result = {true: 0, false: 0, null: 0}

  if (value) {
    if (Array.isArray(value)) {
      list(value)
    } else {
      one(value)
    }
  }

  return {
    fatal: result.true,
    nonfatal: result.false + result.null,
    warn: result.false,
    info: result.null,
    total: result.true + result.false + result.null
  }

  /**
   * @param {Array<VFile|VFileMessage>} value
   * @returns {void}
   */
  function list(value) {
    let index = -1

    while (++index < value.length) {
      one(value[index])
    }
  }

  /**
   * @param {VFile|VFileMessage} value
   * @returns {void}
   */
  function one(value) {
    if ('messages' in value) return list(value.messages)

    result[
      value.fatal === undefined || value.fatal === null
        ? null
        : Boolean(value.fatal)
    ]++
  }
}
