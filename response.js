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

module.exports = { responseFirstQuestion, responseProductType }
