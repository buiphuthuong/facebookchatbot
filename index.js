/**
 * Copyright 2021-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `yarn install`
 * 3. Add your VERIFY_TOKEN and PAGE_ACCESS_TOKEN to your environment vars
 */

'use strict'

// Use dotenv to read .env vars into Node
require('dotenv').config()

// Imports dependencies and set up http server
const request = require('request'),
  express = require('express'),
  { urlencoded, json } = require('body-parser'),
  app = express()

const {
  responseFirstQuestion,
  responseProductType,
  responseFeedBack
} = require('./response')
const { XIN_CHAO, KET_THUC, LAY_SDT } = require('./contanst')
const proccessMessage = require('./proccessMessage')
// Parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

// Parse application/json
app.use(json())

const axios = require('axios')

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

// Respond with 'Hello World' when a GET request is made to the homepage
app.get('/', function (_req, res) {
  res.send('Hello World')
})

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
  // Your verify token. Should be a random string.
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN

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

// Creates the endpoint for your webhook
app.post('/webhook', (req, res) => {
  let body = req.body

  // Checks if this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhookEvent = entry.messaging[0]
      console.log(webhookEvent)

      // Get the sender PSID
      let senderPsid = webhookEvent.sender.id
      console.log('Sender PSID: ' + senderPsid)

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message)
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback)
      }
    })

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED')
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404)
  }
})

// Handles messages events
function handleMessage(senderPsid, receivedMessage) {
  let response

  // Checks if the message contains text
  let typeMessage = ''
  if (receivedMessage.text) {
    const message = receivedMessage.text.toLowerCase()
    typeMessage = proccessMessage(message)
    switch (typeMessage) {
      case XIN_CHAO:
        response = responseFirstQuestion
        break
      case KET_THUC:
        response = {
          text: 'Rất vui được hỗ trợ cho bạn, Cảm ơn bạn đã quan tâm đến shop. Chúc bạn một ngày tốt lành, hẹn sớm gặp lại!'
        }
        break
      case LAY_SDT:
        response = {
          text: 'Đây là số điện thoại và địa chỉ của Shop: 0944191101 - 1002 Tạ Quang Bữu, P6, Quận 8, HCM'
        }
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

  console.log(response)
  // Send the response message
  callSendAPI(senderPsid, response)
}

// Handles messaging_postbacks events
async function handlePostback(senderPsid, receivedPostback) {
  let response

  // Get the payload for the postback
  let payload = receivedPostback.payload
  console.log('payload', payload)
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
  }
  if (payload === 'yes') {
    response = { text: 'Thanks!' }
  } else if (payload === 'no') {
    response = { text: 'Oops, try sending another imag2e.' }
  }
  // Send the message to acknowledge the postback
  callSendAPI(senderPsid, response)
}

// Sends response messages via the Send API
function callSendAPI(senderPsid, response) {
  // The page access token we have generated in your app settings
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid
    },
    message: response
  }

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: 'https://graph.facebook.com/v12.0/me/messages',
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: requestBody
    },
    (err, _res, _body) => {
      if (!err) {
        console.log('Message sent!')
      } else {
        console.error('Unable to send message:' + err)
      }
    }
  )
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
