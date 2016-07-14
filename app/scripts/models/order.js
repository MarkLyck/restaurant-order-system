import Backbone from 'backbone'
import _ from 'underscore'
import orderCollection from '../collections/orderCollection'

const orderAPI = 'https://tiny-za-server.herokuapp.com/collections/mlyck-orders2/'
const taxPercent = 0.08

const Order = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    items: [],
    total: 0,
    tax: 0,
    state: 'incomplete'
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

Order.prototype.calcTax = function() {
  let newTax = 0;
  this.get('items').forEach(item => newTax += item.price * taxPercent)
  this.set('tax', newTax)
}

Order.prototype.calcTotal = function() {
  let newTotal = 0;
  this.get('items').forEach(item => newTotal += item.price)
  this.set('total', newTotal + this.get('tax'))
}

export default Order
