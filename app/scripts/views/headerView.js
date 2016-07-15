import $ from 'jquery'
import router from '../router'

function renderHeader(buttonType) {
  let $header = $(`
    <header>
      <nav>
        <a href="#menu"><h2 id="logo">FLAMMEN</h2></a>
        <button id="${buttonType}-btn" type="button" name="button">${buttonType}</button>
      </nav>
    </header>`)
  $header.find('#login-btn').on('click', () => {
    router.navigate('login', {trigger:true})
  })
  $header.find('#logout-btn').on('click', () => {
    router.navigate('menu', {trigger:true})
  })
  return $header
}

export default renderHeader
