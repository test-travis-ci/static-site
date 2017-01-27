import jQuery from 'jquery'

const $menu = jQuery('#off-canvas-menu')
const $overlay = jQuery('[data-off-canvas-overlay]')
const $closeElements = jQuery('[data-dismiss="off-canvas"]')

function initialize () {
  jQuery(document)
    .on('show.bs.offcanvas', showOverlay)
    .on('hide.bs.offcanvas', hideOverlay)

  $closeElements.on('click', hideMenu)
}

function showOverlay () {
  $overlay.removeClass('hidden')
}

function hideOverlay () {
  $overlay.addClass('hidden')
}

function hideMenu () {
  $menu.offcanvas('hide')
}

export default initialize
