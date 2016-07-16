import Backbone from 'backbone'
import Order from '../models/order'

const orderAPI = 'https://tiny-za-server.herokuapp.com/collections/mlyck-orders3/'

var Orders = Backbone.Collection.extend({
  url: orderAPI,
  model: Order
});

let orderCollection = new Orders()

export default orderCollection
