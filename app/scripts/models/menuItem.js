import Backbone from 'backbone'

const restaurantAPI = 'https://tiy-austin-front-end-engineering.github.io/restaurantApi/fancy.json'

const MenuItem = Backbone.Model.extend({
  urlRoot: restaurantAPI,
})

export default MenuItem
