import jQuery from 'jquery'

function initialize (formSelector = '[data-ajax-form]') {
  jQuery(document).on('submit', formSelector, submit)
}

function submit (event) {
  event.preventDefault()

  const $form = jQuery(event.currentTarget)
  const $submitButton = $form.find('[type="submit"]')
  const action = $form.attr('action')
  const data = $form.serialize()
  const opts = {
    url: action,
    data: data,
    dataType: 'json'
  }

  $submitButton.button('loading')

  jQuery.post(opts)
    .done(onDone)
    .fail(onFail)
    .always(onAlways.bind(null, $submitButton))
}

function onDone () {
  const selector = '[data-ajax-form-message="success"]'

  jQuery(selector).removeClass('hidden')
}

function onFail () {
  const selector = '[data-ajax-form-message="failure"]'

  jQuery(selector).removeClass('hidden')
}

function onAlways ($submitButton) {
  $submitButton.button('reset')
}

export default initialize
