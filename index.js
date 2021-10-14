'use strict'
var MessengerPlatform = require('facebook-bot-messenger')
const accessToken =
  'EAAMj6ZA9o2XkBAEdaCeI4AEoGVZAijRpvgr7u9QkegJBZAGkZB0r17hNz10aZCP7aHvZCmYNsPaxk27H1BrWcJaZBZAXupBp3CGP68ieDDfM1StpAN4kHbT1ZAPytEgtomDgmWesUyRLZBC74MvYw60YZC9zS52wAuxa72uZAx7uj5S65ZAqyVraZCCoZAvf03YrGi3TykZD'
const app = require('express')()
const server = require('http').Server(app)
const bot = MessengerPlatform.create(
  {
    pageID: '1747848738825682',
    appID: '883911238932857',
    appSecret: '7f4da98c38aa310f62e877178fe26444',
    validationToken: 'mymyshopchatbot',
    pageToken:
      'EAAMj6ZA9o2XkBAI19cHsXa1YknPk9wJa4hD408QoFStm1ZBCyYQbdYnApQkIrPOdDTojF8Ta5loZA3QRQgfzV1qwGR2Dtp6H2PKAZCqNpMZBzZCfJVyukZAjSCxonQZCZAL8CkTG1rDrfBZB8R17PBVZBoC4B6gLDbw6ZAwZBpOJbhBi6wmjkArRkSGTaq4RghtJ00VMZD'
  },
  server
)
app.use(bot.webhook('/webhook'))
bot.on(MessengerPlatform.Events.MESSAGE, function (userId, message) {
  // add code below.
  console.log(userId)
  console.log(message)
  //bot.sendTextMessage(userId, message)
})
server.listen(process.env.PORT || 1337, () =>
  console.log('webhook is listening')
)
// Sets server port and logs message on success
