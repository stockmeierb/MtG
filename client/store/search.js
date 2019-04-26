const axios = require('axios')

const initialState = []

//Action Types
const SET_RESULTS = 'SET_RESULTS'

//Action Creators
export const setResults = results => {
  return {
    type: SET_RESULTS,
    results
  }
}

//Helper Functions
const buildParams = query => ({
  params: {unique: 'art', include_extras: true, q: query}
})

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

//THUNK
export const fetchCards = query => async dispatch => {
  try {
    let where = buildParams(query)
    const {data} = await axios.get(
      //not sure if axios will work with this address
      'https://api.scryfall.com/cards/search',
      where
    )
    const cards = destructure(data)
    dispatch(setResults(cards))
  } catch (error) {
    console.log(error)
  }
}

//Reducer
const handlers = {
  [SET_RESULTS]: (state, action) => action.items
}

export const queryReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action)
  }
  return state
}
