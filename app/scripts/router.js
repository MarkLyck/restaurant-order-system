import $ from 'jquery'
import Backbone from 'backbone'

import MenuItem from './models/menuItem'
import renderMenuView from './views/menuView'
import renderConfirmation from './views/confirmationView'

let $container = $('.container')

const Router = Backbone.Router.extend({
  routes: {
    menu    : 'menuView',
    manage  : 'manageOrdersView',
    'order/:id' : 'confirmationView',
    '/*'    : 'menuView'
  },
  menuView: function() {
    console.log('RENDER MENU')
    // Pass in the menu object to render
    let $menu = renderMenuView()
    $container.empty().append($menu)
  },
  confirmationView: function() {
    console.log('CONFIRMATION VIEW!');
    let $confirmationView = renderConfirmation()
    $container.append($confirmationView)
  },
  manageOrdersView: function() {
    // $container.empty().append()
    console.log('MANAGE ORDERS!');
  }
})

const router = new Router()

export default router
