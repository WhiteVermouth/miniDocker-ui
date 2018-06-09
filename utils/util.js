function validateIPAddress(address) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address)) {
    return true
  } else {
    return false
  }
}

function validateDomainName(address) {

}

module.exports.validateIPAddress = validateIPAddress
module.exports.validateDomainName = validateDomainName