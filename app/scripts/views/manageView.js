import $ from 'jquery'
import masonry from 'masonry'
import orderCollection from '../collections/orderCollection'

function renderManager() {
  let $manageView = (`
    <div id="manage-orders-container">
			<ul class="grid manage-all-orders-list">

			</ul>
		</div>
    `)

  orderCollection.on('add', renderSingleOrder)
  orderCollection.fetch()

  function renderSingleOrder(order) {
    // console.log(order);
    let $li = $(`
      <li class="grid-item full-order">
        <ul class="order-items-list">

        </ul>
        <h4 class="order-tax">${order.get('tax').toFixed(2)}</h4>
        <h4 class="order-total">${order.get('total').toFixed(2)}</h4>
      </li>
      `)
    order.get('items').forEach(item => {
      let $itemLi = $(`
        <li class="single-order-item">
          <h3 class="order-item-title">${item.item}</h3>
        </li>
        `)
      $li.find('.order-items-list').append($itemLi)
    })
    $('#manage-all-orders-list').append($li)
  }

  return $manageView
}

export default renderManager
