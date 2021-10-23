var Storage = require('node-storage')
var store = new Storage('./data')
const {
  responseProductType,
  responseFeedBack,
  responseSKU,
  responseClipSKU,
  responseChoosePaymentType
} = require('./response')

const callAPI = require('./callAPI')
const handlePostbackProccess = async (payload, recipientId) => {
  // Set the response based on the postback payload
  if (payload === 'shopping') {
    response = responseProductType
  } else if (payload === 'quan-ao-nam') {
    const elementArray = await callAPI.getProducts('tshirt')
    // console.log('elementArray', elementArray)
    const responseProductList = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: elementArray
        }
      }
    }
    response = responseProductList
  } else if (payload === 'support') {
    response = responseFeedBack
  } else if (payload === 'clip-huong-dan') {
    response = responseClipSKU
  } else if (payload === 'check-product') {
    response = responseSKU
  } else if (payload === 'dong-y-mua') {
    store.put(recipientId, 'dong-y-mua')

    response = {
      text: 'Dạ vui lòng cho shop xin họ tên, địa chỉ và số điện thoại ạ! Lưu ý: nhập theo cú pháp Nguyễn Văn A - 1002 Tạ Quang Bửu, P6, Quận 8, Tp HCM - 0944191101'
    }
  } else if (payload === 'da-nhap-dung-info') {
    store.remove(recipientId)
    response = responseChoosePaymentType
  } else if (payload === 'chua-nhap-dung-info') {
    response = {
      text: 'Dạ vui lòng cho shop xin họ tên, địa chỉ và số điện thoại ạ! Lưu ý: nhập theo cú pháp Nguyễn Văn A - 1002 Tạ Quang Bửu, P6, Quận 8, Tp HCM - 0944191101'
    }
  } else if (payload === 'chuyen-khoan') {
    response = {
      text: 'Dạ đây là số tài khoản của shop : VIETCOMBANK - 0191000310651 - BUI PHU THUONG hoặc MOMO: 0944191101. **** Lưu ý nhập số điện thoại ở phần ghi chú ạ ****'
    }
  } else if (payload === 'cod') {
    response = {
      text: 'Dạ chúng tôi đã ghi nhận thông tin ạ! Chúng tôi sẽ liên lạc sớm với bạn ạ!'
    }
  }
  return response
}

module.exports = handlePostbackProccess
