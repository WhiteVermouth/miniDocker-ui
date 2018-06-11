function isValidIPAddress(address) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address)) {
    return true
  } else {
    return false
  }
}

function isValidDomain(v) {
  if (typeof v !== 'string')
    return false

  var parts = v.split('.')
  if (parts.length <= 1)
    return false

  var tld = parts.pop()
  var tldRegex = /^[a-zA-Z0-9]+$/gi

  if (!tldRegex.test(tld))
    return false

  var isValid = parts.every(function(host) {
    var hostRegex = /^(?!:\/\/)([a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])$/gi;
    return hostRegex.test(host)
  })

  return isValid
}

module.exports.isValidIPAddress = isValidIPAddress
module.exports.isValidDomain = isValidDomain