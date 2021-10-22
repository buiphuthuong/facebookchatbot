const axios = require('axios')

var Storage = require('node-storage')
var store = new Storage('./data')
const {
  responseProductType,
  responseFeedBack,
  responseSKU,
  responseClipSKU,
  responseChoosePaymentType
} = require('./response')

const getProducts = async (cat) => {
  let elementArray = []
  try {
    const res = await axios.get(
      cat
        ? `https://cmscart-server.herokuapp.com/api/products?category=${cat}`
        : 'https://cmscart-server.herokuapp.com/api/products'
    )
    //  console.log(res.data)
    // console.log('aaa')

    res.data.forEach((element) => {
      let elementObj = {
        title: element.title,
        image_url: element.img,
        subtitle: element.desc,
        default_action: {
          type: 'web_url',
          url: `https://serene-leavitt-e5a5ec.netlify.app/product/${element._id}`,
          webview_height_ratio: 'tall'
        },
        buttons: [
          {
            type: 'web_url',
            url: `https://serene-leavitt-e5a5ec.netlify.app/product/${element._id}`,
            title: 'Xem Ngay'
          }
        ]
      }
      elementArray.push(elementObj)
    })
    return elementArray
  } catch (error) {
    console.log(error)
  }
}
const handlePostbackProccess = async (payload) => {
  // Set the response based on the postback payload
  if (payload === 'shopping') {
    response = responseProductType
  } else if (payload === 'quan-ao-nam') {
    const elementArray = await getProducts('tshirt')
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
