import $ from 'jquery'
import Backbone from 'backbone'

import renderHeader from './views/headerView'
import MenuItem from './models/menuItem'
import renderMenuView from './views/menuView'
import renderConfirmation from './views/confirmationView'
import renderLogin from './views/loginView'
import renderManager from './views/manageView'

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
    console.log('RENDER MENU')

    let $header = renderHeader('login')

    // Pass in the menu object to render
    let $menu = renderMenuView()

    let $hero = $(`<div id="hero"></div>`)
    let $footer = $(`
      <footer>
        <p>Copyright 2016 FLAMMEN</p>
      </footer>`)

    $header.append($hero)
    $container.empty().append($header).append($menu).append($footer)
  },
  confirmationView: function() {
    console.log('CONFIRMATION VIEW!');
    let $confirmationView = renderConfirmation()
    $container.append($confirmationView)
  },
  loginView: function() {
    console.log('RENDER LOGIN');
    let $login = renderLogin()
    $container.append($login)
  },
  manageOrdersView: function() {
    console.log('MANAGE ORDERS!');
    let $header = renderHeader('logout')
    let $manager = renderManager()
    $container.empty().append($header).append($manager)
  }
})

const router = new Router()

export default router
