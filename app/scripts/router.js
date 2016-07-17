import $ from 'jquery'
import Backbone from 'backbone'

import renderHeader from './views/headerView'
import MenuItem from './models/menuItem'
import renderMenuView from './views/menuView'
import renderConfirmation from './views/confirmationView'
import renderLogin from './views/loginView'
import renderManager from './views/manageView'
import stickyOrder from './views/stickyOrder'

let $container = $('.container')

const Router = Backbone.Router.extend({
  routes: {
    menu    : 'menuView',
    login   : 'loginView',
    manage  : 'manageOrdersView',
    'order/:id' : 'confirmationView',
    '/*'    : 'menuView'
  },
  menuView: function() {
    let $header = renderHeader('login')

    let $menu = renderMenuView()
    let $hero = $(`<div id="hero"></div>`)
    let $footer = $(`
      <footer>
        <p>Copyright 2016 FLAMMEN</p>
      </footer>`)

    $header.append($hero)
    $container.empty().append($header).append($menu).append($footer)





    stickyOrder()
    // // This has to be on this page, after the $menu is appended
    // let fixmeTop = $('#order-container').offset().top;
    // $(window).scroll(function() {
    //     let currentScroll = $(window).scrollTop();
    //     if (currentScroll >= fixmeTop - 75 - 80) {
    //         $('#order-container').css({
    //             position: 'fixed',
    //             top: '80px',
    //             right: '40px',
    //             width: 'calc(25% - 20px)'
    //         });
    //     } else {
    //         $('#order-container').css({
    //             position: 'static',
    //             width: 'calc(25%)'
    //         });
    //     }
    // });





  },
  confirmationView: function() {
    let $confirmationView = renderConfirmation()
    $container.append($confirmationView)
  },
  loginView: function() {
    let $login = renderLogin()
    $container.append($login)
  },
  manageOrdersView: function() {
    let $header = renderHeader('logout')
    let $manager = renderManager()
    $container.empty().append($header).append($manager)
  }
})

const router = new Router()

export default router
