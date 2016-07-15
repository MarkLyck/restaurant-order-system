import $ from 'jquery'
import Backbone from 'backbone'
import router from './router'

const orderAPI = 'https://tiny-za-server.herokuapp.com/collections/mlyck-orders2/'

Backbone.history.start()

// clearAPI()
function clearAPI() {
  $.ajax(orderAPI).then(response => {
    response.forEach(item => {
      $.ajax({
        url: orderAPI + item._id,
        type: 'DELETE'
      }).then(() => {
        console.log('Deleted ' + item._id);
      });
    })
  })
}
