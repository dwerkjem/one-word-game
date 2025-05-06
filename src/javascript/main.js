import { supabase } from './supabaseClient.js'

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.signin-btn')
  btn?.addEventListener('click', showSignInModal)
})

function showSignInModal() {
  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'
  const modal = document.createElement('div')
  modal.className = 'modal'
  modal.innerHTML = `
    <h2>Sign In</h2>
    <form id="signin-form">
      <label>
        Email
        <input type="email" name="email" required>
      </label>
      <label>
        Password
        <input type="password" name="password" required>
      </label>
      <div class="modal-actions">
        <button type="submit" class="btn">Submit</button>
        <button type="button" id="cancel" class="btn">Cancel</button>
      </div>
      <p id="error-msg" style="color:red;margin-top:.5rem"></p>
    </form>
  `
  overlay.append(modal)
  document.body.append(overlay)

  document.getElementById('cancel')
    ?.addEventListener('click', () => overlay.remove())

  document.getElementById('signin-form')
    ?.addEventListener('submit', async e => {
      e.preventDefault()
      const form = e.target
      const { email, password } = Object.fromEntries(new FormData(form))
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        form.querySelector('#error-msg').textContent = error.message
      } else {
        alert(`Welcome back, ${data.user.email}!`)
        overlay.remove()
      }
    })
}