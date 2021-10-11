'use strict'
const BootBot = require('bootbot')

const bot = new BootBot({
  accessToken:
    'EAAMj6ZA9o2XkBADQGqikJ7o4effnSBCxeXnw7o22lumF3TpAONytmM8cxUso6koZB4pwjLb4CWr1bZACMd4nAb5eFdPTLmkQVYpOZBDpcVIE6BjsZAYjZBZAa1zGdLgZAktqt5cyFx2psK2iCs1nypfeqZAU12cPPZCgZCuhLpbp3QYgZCOq3LcjAWi7ZCCPXoi2P4iIZD',
  verifyToken: 'mymyshopchatbot',
  appSecret: '7f4da98c38aa310f62e877178fe26444'
})

bot.on('message', (payload, chat) => {
  const text = payload.message.text
  chat.say(`Echo: ${text}`)
})

bot.start()
