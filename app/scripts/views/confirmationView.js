import $ from 'jquery'
import sessionOrder from '../sessionOrder'
import moment from 'moment'
import router from '../router'

function renderConfirmation() {
  console.log(sessionOrder);
  let $confirmationView = $(`
    <div class="modal-container">
      <div class="confirmation-modal modal">
        <h3>Success</h3>
        <p id="order-number">Order number: ${sessionOrder.get('_id')}</p>
        <p id="order-time">${sessionOrder.get('timeStamp')}</p>
        <p>Your order is being prepared!</p>
        <button id="return-to-menu">Return to menu</button>
      </div>
    </div>
  `)
  $confirmationView.find('#return-to-menu').on('click', () => {
    router.navigate('menu',{trigger: true})
  })

  return $confirmationView
}

export default renderConfirmation
