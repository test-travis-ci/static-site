// Attach smooth scrolling to elements that match the `[data-scroll="smooth"]`
// selector. Will only scroll if a valid target is present.

import jQuery from 'jquery'

const SMALL_SCREEN_BREAKPOINT = 768

function initialize (scrollSelector = '[data-scroll="smooth"]') {
  jQuery(document).on('click', scrollSelector, scroll)
}

function scroll (event) {
  const $target = jQuery(this.hash)

  if (!$target.length) return

  event.preventDefault()

  const speed = 500 // 500ms
  const targetOffset = $target.offset().top
  const offset = getOffset(targetOffset)

  jQuery('html, body').animate({ scrollTop: offset }, speed)
}

function getOffset (targetOffset) {
  const viewportWidth = window.outerWidth

  if (viewportWidth < SMALL_SCREEN_BREAKPOINT) return targetOffset

  const $navbar = jQuery('.navbar-header')
  const navbarHeight = $navbar.length ? $navbar.outerHeight() : 0

  return targetOffset - navbarHeight
}

export default initialize
