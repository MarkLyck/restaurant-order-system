import $ from 'jquery'
import store from '../sessionOrder'

function stickyOrder() {
  let fixmeTop = $('#order-container').offset().top;
  $(window).scroll(function() {
      let currentScroll = $(window).scrollTop();
      if (currentScroll >= fixmeTop - 75 - 80 && store.sessionOrder.get('items').length <= 6) {
          $('#order-container').css({
              position: 'fixed',
              top: '80px',
              right: '40px',
              width: 'calc(25% - 20px)'
          });
      } else {
          $('#order-container').css({
              position: 'static',
              width: '25%'
          });
      }
  });
}

export default stickyOrder
