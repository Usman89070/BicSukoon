// Ask before deleting (kept in a file so the strict Content-Security-Policy allows it).
document.querySelectorAll('form.js-confirm').forEach((form) => {
  form.addEventListener('submit', (e) => {
    if (!window.confirm(form.dataset.confirm)) e.preventDefault()
  })
})

// Gallery form: show the video fields only for a video, and name the picture field to match.
document.querySelectorAll('form.form').forEach((form) => {
  const kinds = form.querySelectorAll('input[name="kind"]')
  const video = form.querySelector('.video-fields')
  const label = form.querySelector('.js-photo-label')
  if (!kinds.length || !video) return
  const sync = () => {
    const isVideo = form.querySelector('input[name="kind"]:checked')?.value === 'video'
    video.hidden = !isVideo
    if (label) label.textContent = isVideo ? 'Cover picture (optional)' : 'Photo'
  }
  kinds.forEach((k) => k.addEventListener('change', sync))
  sync()
})
