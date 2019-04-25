const mtg = require('mtgsdk')

const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cards = await mtg.card.all()
    res.json(cards)
  } catch (err) {
    next(err)
  }
})

/*
// Get all cards
mtg.card.all()
.on('data', function (card) {
  console.log(card.name)
});

// Filter Cards
mtg.card.all({ supertypes: 'legendary', types: 'creature', colors: 'red,white' })
.on('data', function (card) {
    console.log(card.name)
});

// Get cards on a specific page / pageSize
mtg.card.where({ page: 50, pageSize: 50})
.then(cards => {
    console.log(cards[0].name)
})

//Find by id
mtg.card.find(386616)
.then(result => {
    console.log(result.card.name)
})

// partial name match
mtg.card.where({name: '"Archangel Avacyn"'})
.then(results => {
    console.log(results)
})

// exact name match
mtg.card.where({name: '"Archangel Avacyn"'})
.then(results => {
    console.log(results)
})

*/
