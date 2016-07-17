import $ from 'jquery'

function stickyOrder() {
  // This has to be on this page, after the $menu is appended
  let fixmeTop = $('#order-container').offset().top;
  $(window).scroll(function() {
      let currentScroll = $(window).scrollTop();
      if (currentScroll >= fixmeTop - 75 - 80) {
          $('#order-container').css({
              position: 'fixed',
              top: '80px',
              right: '40px',
              width: 'calc(25% - 20px)'
          });
      } else {
          $('#order-container').css({
              position: 'static',
              width: 'calc(25%)'
          });
      }
  });
}

export default stickyOrder
