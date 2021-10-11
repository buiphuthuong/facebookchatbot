'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express().use(bodyParser.json())

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an image!`
    }
  }

  // Sends the response message
  callSendAPI(sender_psid, response)
}
// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response

  // Get the payload for the postback
  let payload = received_postback.payload

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { text: 'Thanks!' }
  } else if (payload === 'no') {
    response = { text: 'Oops, try sending another image.' }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response)
}
// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid
    },
    message: response
  }

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token:
          'EAAMj6ZA9o2XkBAPMmZBUysByZBYb6nLjm4LMSKHHIlaTpmx51guWy7RJudfKmWPFE5NkuhCV8ZC8ZBkRZB7fnZCCTtjr8xZA4f9ZBr3bPX3WawlEnBUZCNJBIifpziG6eU6Yt6AmcLtfacZBM4Ubh7RO7dHkFKi7E3RSCuwVI9v4NZAEA2YW7BsDwE5I7iKE18pHyNIZD'
      },
      method: 'POST',
      json: request_body
    },
    (err, res, body) => {
      if (!err) {
        console.log('message sent 2!')
      } else {
        console.error('Unable to send message:' + err)
      }
    }
  )
}

app.post('/webhook', (req, res) => {
  let body = req.body

  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched

    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0]
      console.log(webhook_event)

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id
      console.log('Sender PSID: ' + sender_psid)

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message)
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback)
      }
    })

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED')
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404)
  }
})

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = 'mymyshopchatbot'
  //curl -X GET "localhost:1337/webhook?hub.verify_token=EAAMj6ZA9o2XkBAJtjClr4yupQz8kZALbeDH0HlgecT9C5y76Q6NSmeWGsMhN5y9RdZBU87SbnXOXeVT1o8l9Gn2931fkFvNh0G45nEImt96bhH2h4W3099E4BS6cI9Q8neLQV9c2h9E3YCKSNer1Ab5InT7ZAyEsZC6TcrlgVdc6ZBE2aQWESxKNxveRRG5s0ZD&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
  // Parse the query params
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
  }
})

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'))
