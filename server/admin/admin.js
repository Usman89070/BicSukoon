// Ask before deleting (kept in a file so the strict Content-Security-Policy allows it).
document.querySelectorAll('form.js-confirm').forEach((form) => {
  form.addEventListener('submit', (e) => {
    if (!window.confirm(form.dataset.confirm)) e.preventDefault()
  })
})
