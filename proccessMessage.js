const stringSimilarity = require('string-similarity')

//cái áo Nike tshirt 4 còn không shop
const proccessMessage = (message) => {
  if (
    message.includes('hi') ||
    message.includes('hello') ||
    message.includes('chao shop')
  ) {
    typeMessage = 'XIN_CHAO'
  } else if (message.includes('bye') || message.includes('tam biet')) {
    typeMessage = 'KET_THUC'
  } else if (
    message.includes('còn không') ||
    message.includes('có hàng') ||
    message.includes('này không')
  ) {
    typeMessage = 'ASK_SKU'
  } else if (
    message.includes('sdt') ||
    message.includes('số điện thoại') ||
    message.includes('so dien thoai')
  ) {
    const similarity = stringSimilarity.compareTwoStrings(
      'cho tôi xin số điện thoại của shop',
      message
    )
    if (similarity > 0.65) {
      typeMessage = 'LAY_SDT'
    }
  }
  // console.log(typeMessage)
  return typeMessage
}

module.exports = proccessMessage
