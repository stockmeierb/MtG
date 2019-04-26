const axios = require('axios')
const router = require('express').Router()
module.exports = router

router.get('/:q', async (req, res, next) => {
  try {
    let where = buildWhere(req.params.q)
    const {data} = await axios.get('/', where)
    cards = destructure(juson)
    res.send(cards)
  } catch (err) {
    next(err)
  }
})

/*
'https://api.scryfall.com/cards/search?q='

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
*/

//helper function - takes req.body, returns axios params
// axios.get('/user', {
//   params: {
//     ID: 12345
//   }
// })
function buildParams(query) {
  return (ret = {params: {unique: 'art', include_extras: true, q: query}})
}

function destructure(json) {
  let newCards = []
  let newCard = {}
  json.data.forEach(card => {
    if (card.hasOwnProperty('flavor_text')) {
      newCard.flavor_text = card.flavor_text
    }
    newCard.art_crop = card.image_uris.art_crop

    newCards.push(newCard)
  })
  return newCards
}

/*
'https://api.scryfall.com/cards/search?q='

// Make a request for a user with a given ID
axios.get('/user?ID=12345')

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })


*/
