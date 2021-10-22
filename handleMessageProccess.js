const proccessMessage = require('./proccessMessage')
const axios = require('axios')

var Storage = require('node-storage')
var store = new Storage('./data')
const {
  responseFirstQuestion,
  responseSKU,
  responseCheckInfo,
  responsePaymentType
} = require('./response')
const {
  XIN_CHAO,
  KET_THUC,
  LAY_SDT,
  ASK_SKU,
  HET_HANG,
  CON_HANG,
  CHECK_PRODUCT,
  CHECK_INFO,
  CACH_THANH_TOAN
} = require('./contanst')
const findProductBySKU = async (sku) => {
  try {
    const res = await axios.get(
      sku
        ? `https://cmscart-server.herokuapp.com/api/products/sku/${sku}`
        : 'https://cmscart-server.herokuapp.com/api/products'
    )
    if (res.data.length > 0) {
      return res.data[0].inStock === true ? true : false
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

const handleMessageProccess = async (
  senderPsid,
  receivedMessage,
  recipientId
) => {
  let typeMessage = ''
  if (receivedMessage.text) {
    const message = receivedMessage.text.toLowerCase()

    if (store.get(recipientId)) {
      const getdata = store.get(recipientId)
      console.log('getdata', getdata)
      if (getdata === 'dong-y-mua') {
        typeMessage = 'CHECK_INFO'
      }
    } else {
      if (message.includes('sku')) {
        const sku = message.split(':')[1]
        const findSKU = await findProductBySKU(sku)
        if (findSKU) {
          typeMessage = 'CON_HANG'
        } else {
          typeMessage = 'HET_HANG'
        }
      } else {
        typeMessage = proccessMessage(message)
      }
    }
    console.log(typeMessage)
    switch (typeMessage) {
      case CACH_THANH_TOAN:
        response = responsePaymentType
        break
      case CHECK_INFO:
        response = responseCheckInfo
        break
      case XIN_CHAO:
        response = responseFirstQuestion
        break
      case KET_THUC:
        response = {
          text: 'Rất vui được hỗ trợ cho bạn, Cảm ơn bạn đã quan tâm đến shop. Chúc bạn một ngày tốt lành, hẹn sớm gặp lại!'
        }
        break
      case CHECK_PRODUCT:
        response = responseSKU
        break
      case LAY_SDT:
        response = {
          text: 'Đây là số điện thoại và địa chỉ của Shop: 0944191101 - 1002 Tạ Quang Bữu, P6, Quận 8, HCM'
        }
        break
      case CON_HANG:
        response = {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: [
                {
                  title: 'Dạ, Sản phẩm này vẫn còn ạ!',
                  subtitle:
                    'Bạn có muốn mua sản phẩm này không ạ! Nhấn nút để trả lời ạ!',
                  buttons: [
                    {
                      type: 'postback',
                      title: 'Đồng ý mua',
                      payload: 'dong-y-mua'
                    },
                    {
                      type: 'postback',
                      title: 'Tìm sản phẩm khác',
                      payload: 'check-product'
                    },
                    {
                      type: 'postback',
                      title: 'Hỗ trợ!',
                      payload: 'support'
                    }
                  ]
                }
              ]
            }
          }
        }
        break
      case HET_HANG:
        response = {
          text: 'Dạ, Sản phẩm này hết ạ!'
        }
        break
      case ASK_SKU:
        response = responseSKU

        break
      default:
        response = {
          text: 'Rất tiếc mình không hiểu vấn đề bạn đang nói, vui lòng liên hệ trực tiếp với nhân viên của shop Hotline : 0123456789'
        }
        break
    }
  } else if (receivedMessage.attachments) {
    console.log('att', receivedMessage)
    // Get the URL of the message attachment
  }
  return response
}

module.exports = handleMessageProccess
