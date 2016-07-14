import $ from 'jquery'
import _ from 'underscore'
import router from '../router'
import sessionOrder from '../sessionOrder'

function renderOrderView() {
  let $orderView = $(`
      <h2>Your order</h2>
      <ul id="order-list">

      </ul>

      <p id="order-tax">Tax: ${sessionOrder.get('tax')}</p>
      <h4 id="order-total">Total: ${sessionOrder.get('total')}</h4>
      <button id="order-now-btn" type="button" name="button">Order Now</button>
  `)
  let $orderList = $orderView.filter('#order-list')
  let $orderNow = $orderView.filter('#order-now-btn')

  sessionOrder.get('items').forEach((item, i) => {
    let $orderItemLi = $(`
      <li class="order-item">
        <div>
          <p class="order-item-title">${item.item}</p>
          <p class="order-item-price">${item.price}</p>
          <button class="order-delete"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
        <div class="order-options hide-options">
					<input class="order-item-vegan" type="checkbox" name="name">
					<input class="order-item-spice-level" type="range" min="0" max="10" step="1" value="0"/>
					<input class="order-item-request" type="text" name="name" placeholder="Special Request">
        </div>
      </li>
    `)
    $orderItemLi.find('.order-delete').on('click', () => {
      sessionOrder.removeItem(item)
      sessionOrder.calcTax()
      sessionOrder.calcTotal()
    })


    // Toggle options
    $orderItemLi.on('click', () => {
      $orderItemLi.find('.order-options').toggleClass('hide-options')
      $orderItemLi.closest('li').siblings().find('.order-options').addClass('hide-options')
    })


    $orderList.append($orderItemLi)
  })

  $orderNow.on('click', () => {
    console.log('CLICKED ORDER NOW');
    sessionOrder.set('timeStamp', new Date())
    sessionOrder.save(null, {success: function(response) {
      console.log('SUCCEFULL ORDER!');
      router.navigate('order/' + sessionOrder.get('_id'), {trigger:true})
    }})
  })
  return $orderView
}

export default renderOrderView
