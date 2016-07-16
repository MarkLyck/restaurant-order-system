import $ from 'jquery'
import Backbone from 'backbone'
import orderCollection from '../collections/orderCollection'

function renderManager() {
  let $manageView = $(`
    <div id="manage-orders-container">
			<ul class="grid manage-all-orders-list">

			</ul>
		</div>
    `)

  orderCollection.forEach(renderSingleOrder)
  orderCollection.on('add', renderSingleOrder)
  orderCollection.fetch()

  function renderSingleOrder(order) {
    let $li = $(`
      <li class="grid-item full-order">
        <div>
          <div class="wrapper">
            <h2 class="manage-order-title">order</h2>
            <button class="delete-order"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </div>
          <ul class="order-items-list">

          </ul>
        </div>
        <div>
          <h4 class="order-tax">Tax: $${order.get('tax').toFixed(2)}</h4>
          <h4 class="order-total">Total: $${order.get('total').toFixed(2)}</h4>
        </div>
      </li>
      `)
    order.get('items').forEach(item => {
      let $itemLi = $(`
        <li class="single-order-item">
          <h3 class="order-item-title">${item.item}</h3>
        </li>
        `)
      $li.find('.order-items-list').append($itemLi)
      if (Object.keys(item.options).length > 0) {
        let $specials = $(`
          <div class="specials-container">
          </div>
          `)
        Object.keys(item.options).forEach(function(specialType, i) {
          let $specialRequest;
          if (specialType === 'vegan') {
            $specialRequest = $(`<p class="special-request">Vegan</p>`)
          } else if (specialType === 'spiceLevel') {
            if (item.options[specialType] === 0) {
              $specialRequest = $(`<p class="special-request">Not spicy</p>`)
            } else if (item.options[specialType] <= 3) {
              $specialRequest = $(`<p class="special-request">Mildly spicy</p>`)
            } else if (item.options[specialType] <= 6) {
              $specialRequest = $(`<p class="special-request">Spicy</p>`)
            } else if (item.options[specialType] <= 9) {
              $specialRequest = $(`<p class="special-request">Very spicy</p>`)
            } else {
              $specialRequest = $(`<p class="special-request">Extremely spicy</p>`)
            }
          } else if (specialType === 'specialRequest') {
            $specialRequest = $(`<p class="special-request">${item.options[specialType]}</p>`)
          }
          $specials.filter('.specials-container').append($specialRequest)
        })
        $itemLi.filter('.single-order-item').append($specials)
      }
    })

    if (order.get('state') === 'complete') {
      $li.filter('.full-order').addClass('completed')
    }

    $li.find('.delete-order').on('click', () => {
      console.log('DELETING ORDER: ', order);
      $li.remove()
      order.destroy()
    })

    $li.find('.manage-order-title').on('click', () => {
      if (order.get('state') === 'incomplete') {
        order.set('state', 'complete')
        $li.filter('.full-order').addClass('completed')
      } else {
        order.set('state', 'incomplete')
        $li.filter('.full-order').removeClass('completed')
      }
      order.save()
    })



    $manageView.find('.manage-all-orders-list').prepend($li)
  }
  return $manageView
}

export default renderManager
