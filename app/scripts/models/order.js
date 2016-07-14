import Backbone from 'backbone'
import _ from 'underscore'
import orderCollection from '../collections/orderCollection'

const orderAPI = 'https://tiny-za-server.herokuapp.com/collections/mlyck-orders2/'

const Order = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    items: [],
    total: 0,
    tax: 0.08
  },
  urlRoot: orderAPI,
})

Order.prototype.addItem = function(item) {
  let currItems = this.get('items')
  let newArr = currItems.concat(item)
  this.set('items', newArr)
}

Order.prototype.removeItem = function(item) {
  let newItems = _.without(this.get('items'), item)
  this.set('items', newItems)
}

export default Order
