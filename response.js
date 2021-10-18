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
      ],

      buttons: [
        {
          title: 'View More',
          type: 'postback',
          payload: 'payload'
        }
      ]
    }
  }
}

module.exports = {
  responseFirstQuestion,
  responseProductType,
  responseFeedBack
}
