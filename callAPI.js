const axios = require('axios')
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
module.exports = { getProducts, findProductBySKU }
