import $ from 'jquery'
import Backbone from 'backbone'

import renderHeader from './views/headerView'
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
    console.log('rendering menu');
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
