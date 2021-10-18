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
              title: 'Hỗ trợ!',
              payload: 'support'
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
      template_type: 'list',
      top_element_style: 'compact',
      elements: [
        {
          title: 'Classic T-Shirt Collection',
          subtitle: 'See all our colors',
          image_url: 'https://peterssendreceiveapp.ngrok.io/img/collection.png',
          buttons: [
            {
              title: 'View',
              type: 'web_url',
              url: 'https://peterssendreceiveapp.ngrok.io/collection',
              messenger_extensions: true,
              webview_height_ratio: 'tall',
              fallback_url: 'https://peterssendreceiveapp.ngrok.io/'
            }
          ]
        }
      ]
    }
  }
}

module.exports = { responseFirstQuestion, responseProductType }
