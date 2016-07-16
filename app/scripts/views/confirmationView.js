import $ from 'jquery'
import sessionOrder from '../sessionOrder'
import Order from '../models/order'
import moment from 'moment'
import router from '../router'

function renderConfirmation() {
  // console.log(sessionOrder);
  let orderNumber = sessionOrder.get('_id')
  let time = sessionOrder.get('timeStamp')
  let $confirmationView = $(`
    <div class="modal-container">
      <div class="confirmation-modal modal">
        <h3 class="success-header">Success</h3>
        <div class="wrapper">
          <p id="order-number">Order number: ${orderNumber.substring(0,10)}</p>
          <p id="order-time">Ordered on: ${moment(time).format('HH:MM MMM DD YYYY')}</p>
        </div>
        <ul class="ordered-items">

        </ul>
        <button id="return-to-menu">Return to menu</button>
      </div>
    </div>
  `)
  $confirmationView.filter('.modal-container').on('click', (e) => {
    if ($(e.target)[0] === $confirmationView.filter('.modal-container')[0]) {
      router.navigate('menu', {trigger: true})
      // sessionOrder = new Order()
    }
  })

  sessionOrder.get('items').forEach(item => {
    let $li = $(`
      <li>
        <h3>${item.item}</h3>
        <p>$${item.price}</p>
      </li>
      `)
    $confirmationView.find('.ordered-items').append($li)
  })


  $confirmationView.find('#return-to-menu').on('click', () => {
    router.navigate('menu',{trigger: true})
  })

  return $confirmationView
}

export default renderConfirmation
