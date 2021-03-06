const responseQuickreply = {
  text: 'Pick a color:',
  quick_replies: [
    {
      content_type: 'text',
      title: 'Red',
      payload: '<POSTBACK_PAYLOAD>',
      image_url: 'http://example.com/img/red.png'
    },
    {
      content_type: 'text',
      title: 'Green',
      payload: '<POSTBACK_PAYLOAD>',
      image_url: 'http://example.com/img/green.png'
    }
  ]
}

const responseChoosePaymentType = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title:
            'Dạ cảm ơn bạn đã cung cấp thông tin ạ! Vui lòng chọn hình thức thanh toán ạ! Đặc biệt nếu chuyển khoảng trước sẽ được hỗ trợ 50% phí vận chuyển!',
          subtitle: 'Nhấn nút để trả lời ạ!',
          buttons: [
            {
              type: 'postback',
              title: 'Chuyển khoản',
              payload: 'chuyen-khoan'
            },
            {
              type: 'postback',
              title: 'Nhận hàng trả tiền - COD',
              payload: 'cod'
            }
          ]
        }
      ]
    }
  }
}
const responsePaymentType = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title:
            'Dạ chúng tôi có 2 cách thanh toán qua COD và chuyển khoảng trước ạ! Đặc biệt nếu chuyển khoảng trước sẽ được hỗ trợ 50% phí vận chuyển!',
          subtitle: 'Nhấn nút để trả lời ạ!',
          buttons: [
            {
              type: 'postback',
              title: 'Chuyển khoản',
              payload: 'chuyen-khoan'
            },
            {
              type: 'postback',
              title: 'Nhận hàng trả tiền - COD',
              payload: 'cod'
            }
          ]
        }
      ]
    }
  }
}
const responseCheckInfo = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: 'Vui lòng xác nhận đã nhập đúng thông tin ạ',
          subtitle: 'Nhấn nút để trả lời ạ!',
          buttons: [
            {
              type: 'postback',
              title: 'Đã nhập đúng',
              payload: 'da-nhap-dung-info'
            },
            {
              type: 'postback',
              title: 'Chưa tôi muốn nhập lại',
              payload: 'chua-nhap-dung-info'
            }
          ]
        }
      ]
    }
  }
}
const responseFirstQuestion = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: 'Chào bạn! Bạn cần mua hàng hay hỗ trợ ạ!',
          subtitle: 'Nhấn nút để trả lời ạ!',
          buttons: [
            {
              type: 'postback',
              title: 'Cần mua hàng',
              payload: 'shopping'
            },
            {
              type: 'postback',
              title: 'Tìm sản phẩm',
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
const responseClipSKU = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'media',
      elements: [
        {
          media_type: 'video',
          url: 'https://business.facebook.com/camauf/videos/207417294764413'
        }
      ]
    }
  }
}
const responseSKU = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: 'Hi Bạn!',
          image_url:
            'https://vieclam.thegioididong.com/uploads/img/news/241/sku1.png',
          subtitle:
            'Bạn vui lòng cung cấp SKU có trên thông tin sản phẩm theo cú pháp SKU:XXXXXX',
          default_action: {
            type: 'web_url',
            url: 'https://petersfancybrownhats.com',
            webview_height_ratio: 'tall'
          },
          buttons: [
            {
              type: 'postback',
              title: 'Xem clip hướng dẫn',
              payload: 'clip-huong-dan'
            }
          ]
        }
      ]
    }
  }
}
const responseProductType = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: 'Vui lòng chọn loại sản phẩm bạn muốn mua',
          subtitle: 'Nhấn nút để trả lời ạ!',
          buttons: [
            {
              type: 'postback',
              title: 'Quần áo nam',
              payload: 'quan-ao-nam'
            },
            {
              type: 'postback',
              title: 'Quần áo nữ',
              payload: 'quan-ao-nu'
            },
            {
              type: 'postback',
              title: 'Giày Dép',
              payload: 'giay-dep'
            }
          ]
        }
      ]
    }
  }
}

const responseFeedBack = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'customer_feedback',
      title: 'Rate your experience with Original Coast Clothing.', // Business needs to define.
      subtitle:
        'Let Original Coast Clothing know how they are doing by answering two questions', // Business needs to define.
      button_title: 'Rate Experience', // Business needs to define.
      feedback_screens: [
        {
          questions: [
            {
              id: 'hauydmns8', // Unique id for question that business sets
              type: 'csat',
              title:
                'How would you rate your experience with Original Coast Clothing?', // Optional. If business does not define, we show standard text. Standard text based on question type ("csat", "nps", "ces" >>> "text")
              score_label: 'neg_pos', // Optional
              score_option: 'five_stars', // Optional
              // Optional. Inherits the title and id from the previous question on the same page.  Only free-from input is allowed. No other title will show.
              follow_up: {
                type: 'free_form',
                placeholder: 'Give additional feedback' // Optional
              }
            }
          ]
        }
      ],
      business_privacy: {
        url: 'https://www.example.com'
      },
      expires_in_days: 3 // Optional, default 1 day, business defines 1-7 days
    }
  }
}

module.exports = {
  responseFirstQuestion,
  responseProductType,
  responseFeedBack,
  responseSKU,
  responseClipSKU,
  responseQuickreply,
  responseCheckInfo,
  responseChoosePaymentType,
  responsePaymentType
}
