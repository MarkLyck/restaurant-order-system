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
      <div id="order-container" class="fixme"></div>
    </div>
    `)

    // var fixmeTop = $('.fixme').offset().top;



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
              <div class="top-wrapper">
                <h3 class="menu-item-title">${item.item}</h3>
              </div>
              <div class="wrapper">
                <h4 class="menu-item-price">$${item.price}.00</h4>
                <button class="add-to-order"><i class="fa fa-plus" aria-hidden="true"></i></button>
              </div>
            </div>
            <div class="bottom hidden">
              <p class="menu-item-desc">${item.description}</p>
              <ul class="menu-item-warnings"></ul>
            </div>
          </li>
          `)
        // console.log(item);
        if (item.spicy !== 0) {
          let $spicyImage = $(`<img class="menu-icon" src="assets/images/Spicy2.svg" alt="spicy"/>`)
          $menuLi.find('.menu-item-title').after($spicyImage)
        }
        if (item.vegan !== 0) {
          let $veganImage = $(`<img class="menu-icon" src="assets/images/vegan.svg" alt="vegan"/>`)
          $menuLi.find('.menu-item-title').after($veganImage)
        }
        if (item.favorite !== 0) {
          let $favoriteImage = $(`<img class="menu-icon" src="assets/images/favorite.svg" alt="spicy"/>`)
          $menuLi.find('.menu-item-title').after($favoriteImage)
        }
        $catLi.find('.menu-items-container').append($menuLi)

        $menuLi.find('.add-to-order').on('click', () => {
          item.options = {}
          sessionOrder.addItem(item)
          sessionOrder.calcTax()
          sessionOrder.calcTotal()
        })

        $menuLi.on('click', (e) => {
          if ($(e.target)[0] === $menuLi.find('.top')[0] || $(e.target)[0] === $menuLi.find('.bottom')[0] || $(e.target)[0] === $menuLi.find('.menu-item-title')[0]) {
            $menuLi.find('.bottom').toggleClass('hidden')
          }
        })
      })
    })
  })
  let $orderView = renderOrderView(sessionOrder)
  $menu.find('#order-container').empty().append($orderView)
  sessionOrder.on('updateOrderList', function() {
    let $orderView = renderOrderView(sessionOrder)
    $menu.find('#order-container').empty().append($orderView)
  })
  return $menu
}


export default renderMenuView
