import $ from 'jquery'
import store from '../sessionOrder'
import Order from '../models/order'
import moment from 'moment'
import router from '../router'

function renderConfirmation() {
  let orderNumber = store.sessionOrder.get('_id')
  let time = store.sessionOrder.get('timeStamp')
  let $confirmationView = $(`
    <div class="modal-container">
      <div class="confirmation-modal modal">
        <h3 class="success-header">Success</h3>
        <div class="wrapper">
          <p id="order-number">Order number: ${orderNumber.substring(0,6)}</p>
          <p id="order-time">${moment(time).format('HH:MM MMM DD')}</p>
        </div>
        <ul class="ordered-items">

        </ul>
        <div id="extra-info">
          <p id="order-tax">Tax: $${store.sessionOrder.get('tax').toFixed(2)}</p>
          <p id="order-total">Total: $${store.sessionOrder.get('total').toFixed(2)}</p>
        </div>
        <button id="return-to-menu">Return to menu</button>
      </div>
    </div>
  `)
  $confirmationView.filter('.modal-container').on('click', (e) => {
    if ($(e.target)[0] === $confirmationView.filter('.modal-container')[0]) {
      store.sessionOrder = new Order()
      router.navigate('menu', {trigger: true})
    }
  })

  store.sessionOrder.get('items').forEach(item => {
    let $li = $(`
      <li>
        <h3>${item.item}</h3>
        <p>$${item.price}</p>
      </li>
      `)
    $confirmationView.find('.ordered-items').append($li)
  })


  $confirmationView.find('#return-to-menu').on('click', () => {
    store.sessionOrder = new Order()
    router.navigate('menu',{trigger: true})
  })

  return $confirmationView
}

export default renderConfirmation
