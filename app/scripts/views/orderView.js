import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'

import router from '../router'
import orderCollection from '../collections/orderCollection'
import store from '../sessionOrder'


function renderOrderView() {
  console.log('RENDDERING ORDER VIEW');
  console.log(store.sessionOrder);
  let $orderView = $(`
      <h2>Your order</h2>
      <ul id="order-list">

      </ul>

      <p id="order-tax">Tax: $${store.sessionOrder.get('tax').toFixed(2)}</p>
      <h4 id="order-total">Total: $${store.sessionOrder.get('total').toFixed(2)}</h4>
      <button id="order-now-btn" type="button" name="button">Order Now</button>
  `)
  let $orderList = $orderView.filter('#order-list')
  let $orderNow = $orderView.filter('#order-now-btn')

  store.sessionOrder.get('items').forEach((item, i) => {
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
					<label class="order-item-vegan">Vegan                    <input class="vegan-checkbox" type="checkbox" name="name"> <div class="fake-checkbox"></div> </label>
					<label class="order-item-spice-level">Spice Level        <input class="spice-range" type="range" min="0" max="10" step="1" value="0"/></label>
					<label class="order-item-request"><p>Special Request</p> <input class="special-request" type="text" name="name" placeholder="Special Request"></label>
        </div>
      </li>
    `)

    let optionVegan = false
    let spiceLevel = 0
    let specialRequest = ''

    // $orderItemLi.off()
    $orderItemLi.find('.order-delete').on('click', () => {
      // console.log(item);
      // console.log(sessionOrder);

      store.sessionOrder.removeItem(item, i)
    })

    // Toggle options
    $orderItemLi.children('.wrapper').on('click', () => {
      $orderItemLi.toggleClass('hide-options')
      $orderItemLi.closest('li').siblings().addClass('hide-options')
    })

    // VEGAN OPTION
    $orderItemLi.find('.order-item-vegan').on('click', (e) => {
      e.preventDefault()
      if (optionVegan === false) {
        optionVegan = true
        store.sessionOrder.setOption('vegan', optionVegan, i)
      } else {
        optionVegan = false
        store.sessionOrder.removeOption('vegan', optionVegan, i)
      }
      $orderItemLi.find('.fake-checkbox').toggleClass('selected')
    })

    // SPICE LEVEL
    $orderItemLi.find('.spice-range').on('input', () => {
      spiceLevel = $orderItemLi.find('.spice-range').val()
      store.sessionOrder.setOption('spiceLevel', spiceLevel, i)
    })

    // SPECIAL REQUEST
    $orderItemLi.find('.special-request').on('keyup', () => {
      specialRequest = $orderItemLi.find('.special-request').val()
      store.sessionOrder.setOption('specialRequest', specialRequest, i)
    })

    $orderList.append($orderItemLi)
  })

  $orderNow.on('click', () => {
    if (store.sessionOrder.get('items').length > 0) {
      store.sessionOrder.set('timeStamp', new Date())
      orderCollection.add(store.sessionOrder)
      store.sessionOrder.save(null, {success: function(response) {
        console.log('SUCCEFULL ORDER!');
        router.navigate('order/' + store.sessionOrder.get('_id'), {trigger:true})
      }})
    } else {
      console.log('YOU HAVE NOTHING IN YOUR ORDER.');
    }
  })
  return $orderView
}

export default renderOrderView
