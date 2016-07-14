import $ from 'jquery'
import sessionOrder from '../sessionOrder'
import moment from 'moment'

function renderConfirmation() {
  let $confirmationView = $(`
    <div class="modal-container">
      <div class="confirmation-modal">
        <h3>Success</h3>
        <p id="order-number">${sessionOrder.get('_id')}</p>
        <p id="order-time">${sessionOrder.get('timeStamp')}</p>
        <p>Your order is being prepared!</p>
      </div>
    </div>
  `)

  return $confirmationView
}

export default renderConfirmation
