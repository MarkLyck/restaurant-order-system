import $ from 'jquery'
// import $ from 'jquery-ui'
import router from '../router'

let adminUserName = 'admin'
let adminPassword = 'password'

function renderLogin() {
  let $login = $(`
    <div class="modal-container">
      <div class="login-modal">
        <h3>Login</h3>
        <input id="username-input" type="text" name="name" placeholder="Username">
        <input id="password-input" type="password" name="name" placeholder="Password">
        <button id="login-submit-btn" type="button" name="button">Login</button>
      </div>
    </div>
    `)
  let $userInput = $login.find('#username-input')
  let $passwordInput = $login.find('#password-input')
  let $loginBtn = $login.find('#login-submit-btn')

  $login.filter('.modal-container').on('click', (e) => {
    if ($(e.target)[0] === $login.filter('.modal-container')[0]) {
      router.navigate('menu', {trigger: true})
    }
  })

  $loginBtn.on('click', () => {
    if ($userInput.val() !== '' && $passwordInput.val() !== '') {
      // check login credentials
      if ($userInput.val().toLowerCase() === adminUserName && $passwordInput.val().toLowerCase() === adminPassword) {
        router.navigate('manage',{trigger:true})
      } else {
        $login.find('.login-modal').effect('shake')
        console.log('INVALID CREDENTIALS');
      }
    }
  })



  return $login
}

export default renderLogin
