const stringSimilarity = require('string-similarity')

//cái áo Nike tshirt 4 còn không shop
//cho xem mẫu áo thun nam
//gửi mình xem mẫu áo thun nam
//bạn/anh/chị/shop có áo thun nam không
//cách thanh toán/ thanh toán như thế nào shop
//bên shop có thu hộ không / có cod không
//có cho kiểm tra hàng không shop / kiểm hàng được không shop / xem hàng trước được không shop

const proccessMessage = (message) => {
  let typeMessage = ''
  if (
    (message.includes('hi') && message.length <= 3) ||
    message.includes('hello') ||
    message.includes('hi shop') ||
    message.includes('alo') ||
    message.includes('chao shop')
  ) {
    typeMessage = 'XIN_CHAO'
  } else if (message.includes('bye') || message.includes('tam biet')) {
    typeMessage = 'KET_THUC'
  } else if (
    message.includes('có không') ||
    message.includes('còn không') ||
    message.includes('muốn mua') ||
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
  } else if (
    message.includes('địa chỉ của') ||
    message.includes('địa chỉ shop') ||
    message.includes('xin địa chỉ') ||
    message.includes('xin dia chi')
  ) {
    typeMessage = 'LAY_SDT'
  } else if (
    message.includes('cách thanh toán') ||
    message.includes('thanh toán thế nào') ||
    message.includes('hình thức thanh toán') ||
    message.includes('thanh toán bằng cách') ||
    message.includes('thanh toán qua')
  ) {
    typeMessage = 'CACH_THANH_TOAN'
  } else if (
    message.includes('ok') ||
    message.includes('cảm ơn') ||
    message.includes('thanks')
  ) {
    typeMessage = 'KET_THUC'
  }
  // console.log(typeMessage)
  return typeMessage
}

module.exports = proccessMessage
