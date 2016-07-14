import $ from 'jquery'
import _ from 'underscore'
import renderOrderView from './orderView'
// import OrderCollection from '../collections/orderCollection'
// import order from '../models/order'
import sessionOrder from '../sessionOrder'

const restaurantAPI = 'https://tiy-austin-front-end-engineering.github.io/restaurantApi/fancy.json'

function renderMenuView() {
  let $menu = $(`
    <div id="menu-view-container">
      <div id="menu-container">
        <h1 id="our-menu">Our Menu</h1>
        <ul id="menu-list">

        </ul>
      </div>
      <div id="order-container"></div>
    </div>
    `)
  let $menuList = $menu.find('#menu-list')
  $.ajax(restaurantAPI).then(response => {
    _.keys(response).forEach(category => {
      let $catLi = $(`
        <li class="menu-cat">
          <h2 class="menu-cat-title">${category}</h2>
          <ul class="menu-items-container">

          </ul>
        </li>
        `)
      $menuList.append($catLi)
      response[category].forEach(item => {
        let $menuLi = $(`
          <li class="menu-item">
            <div class="top">
              <h3 class="menu-item-title">${item.item}</h3>
              <h4 class="menu-item-price">${item.price}</h4>
            </div>
            <div class="bottom">
              <p class="menu-item-desc">${item.description}</p>
              <ul class="menu-item-warnings"></ul>
            </div>
          </li>
          `)
        $catLi.find('.menu-items-container').append($menuLi)
        $menuLi.on('click', () => {
          sessionOrder.addItem(item)
        })
      })
    })
  })
  let $orderView = renderOrderView(sessionOrder)
  $menu.find('#order-container').empty().append($orderView)
  sessionOrder.on('change', function() {
    let $orderView = renderOrderView(sessionOrder)
    $menu.find('#order-container').empty().append($orderView)
  })
  return $menu
}


export default renderMenuView
