import $ from 'jquery'
import Backbone from 'backbone'

import MenuItem from './models/menuItem'
import renderMenuView from './views/menuView'
import renderConfirmation from './views/confirmationView'
import renderLogin from './views/loginView'

let $container = $('.container')

let $header = $(`
  <header>
    <nav>
      <a href="#menu"><h2 id="logo">FLAMMEN</h2></a>
      <button id="login-btn" type="button" name="button">Login</button>
    </nav>
  </header>`)
let $hero = $(`<div id="hero"></div>`)
let $footer = $(`
  <footer>
    <p>Copyright 2016 FLAMMEN</p>
  </footer>`)

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
    // Pass in the menu object to render
    let $menu = renderMenuView()

    $('header').append($hero)
    $container.empty().append($header).append($menu).append($footer)
    $header.append($hero)
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
    $container.empty()
    console.log('MANAGE ORDERS!');
  }
})

const router = new Router()

export default router
