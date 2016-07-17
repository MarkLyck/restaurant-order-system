import Backbone from 'backbone'
import _ from 'underscore'
import orderCollection from '../collections/orderCollection'

const orderAPI = 'https://tiny-za-server.herokuapp.com/collections/mlyck-orders3/'
const taxPercent = 0.0825

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
  this.calcTax()
  this.calcTotal()
  this.trigger('updateOrderList')
}

Order.prototype.removeItem = function(item, i) {
  let newItems = this.get('items')
  newItems.splice(i, 1)
  this.set('items', newItems)

  this.calcTax()
  this.calcTotal()
  this.trigger('updateOrderList')
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

Order.prototype.setOption = function(optionName, optionValue, i) {
  let newItems = this.get('items')
  newItems[i].options[optionName] = optionValue
  this.set('items', newItems)

  // this.set('items'[i][optionName], value)
}

Order.prototype.removeOption = function(optionName, optionValue, i) {
  console.log('args: ', arguments);
  console.log('deleting option');

  let newItems = this.get('items')
  delete newItems[i].options[optionName]
  // _.omit(newItems[i].options,optionName)
  console.log(newItems);
  this.set('items', newItems)
}

export default Order
