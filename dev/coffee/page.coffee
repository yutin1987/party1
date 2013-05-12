Q = [
  'AAA',
  'BBB',
  'CCC'
]

Q.sort () ->
  if Math.random() > 0.5 then true else false

$ ->
  win = $(window)
  body = $('body')
  todo = $('todo')
  keyin = $('#keyin')
  report = $('#report td')
  inbar = $('#inbar')

  body.on 'touchstart', (e) ->
    if $(body).hasClass 'report'
      $('.num',keyin).text '?'
      $(body).removeClass 'report'
    else
      num = Math.floor(Math.random() * 9) + 1
      dost = Q.slice(num,num+1)[0]
      Q.splice(num,1)
      $(report).text(dost)
      $(report).text('ERROR') unless dost
      $(body).addClass 'report'

  inbar.on 'keydown', (e) ->
    if e.keyCode is 13
      $(body).toggleClass 'report'
      num = parseInt($(@).val(),10)
      if num > 0 and num < 10
        dost = Q.slice(num,num+1)[0]
        Q.splice(num,1)
        $(report).text(dost)
        $(report).text('ERROR') unless dost

      $(@).val '_'
    else
      $(@).val ''

  inbar.on 'keyup', () ->
    $('.num',keyin).text $(@).val()

  update = () ->

      inbar.focus()

      setTimeout (-> update()), 1500

  update()