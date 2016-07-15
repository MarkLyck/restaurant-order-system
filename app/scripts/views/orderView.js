import $ from 'jquery'
import _ from 'underscore'
import router from '../router'
import sessionOrder from '../sessionOrder'

function renderOrderView() {
  let $orderView = $(`
      <h2>Your order</h2>
      <ul id="order-list">

      </ul>

      <p id="order-tax">Tax: $${sessionOrder.get('tax').toFixed(2)}</p>
      <h4 id="order-total">Total: $${sessionOrder.get('total').toFixed(2)}</h4>
      <button id="order-now-btn" type="button" name="button">Order Now</button>
  `)
  let $orderList = $orderView.filter('#order-list')
  let $orderNow = $orderView.filter('#order-now-btn')

  sessionOrder.get('items').forEach((item, i) => {
    let $orderItemLi = $(`
      <li class="order-item hide-options">
        <div class="wrapper">
          <p class="order-item-title">${item.item}</p>
          <div>
            <p class="order-item-price">$${item.price}</p>
            <button class="order-delete"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </div>
        </div>
        <div class="order-options">
					<label class="order-item-vegan">Vegan                    <input type="checkbox" name="name"> <div class="fake-checkbox"></div> </label>
					<label class="order-item-spice-level">Spice Level        <input type="range" min="0" max="10" step="1" value="0"/></label>
					<label class="order-item-request"><p>Special Request</p> <input type="text" name="name" placeholder="Special Request"></label>
        </div>
      </li>
    `)
    // $orderItemLi.off()
    $orderItemLi.find('.order-delete').on('click', () => {
      sessionOrder.removeItem(item)
      sessionOrder.calcTax()
      sessionOrder.calcTotal()
    })


    // Toggle options
    $orderItemLi.children('.wrapper').on('click', () => {
      $orderItemLi.toggleClass('hide-options')
      $orderItemLi.closest('li').siblings().addClass('hide-options')
    })

    // $orderItemLi.find('.order-item-vegan').off()




    // HELP!, this code runs twice for no apparent reason
    $orderItemLi.find('.order-item-vegan').on('click', (e) => {
      e.preventDefault()
      console.log('I like to log myself twice for no reason...');
      $orderItemLi.find('.fake-checkbox').toggleClass('selected')
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
