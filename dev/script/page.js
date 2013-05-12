var Q;

Q = ['AAA', 'BBB', 'CCC'];

Q.sort(function() {
  if (Math.random() > 0.5) {
    return true;
  } else {
    return false;
  }
});

$(function() {
  var body, inbar, keyin, report, todo, update, win;

  win = $(window);
  body = $('body');
  todo = $('todo');
  keyin = $('#keyin');
  report = $('#report td');
  inbar = $('#inbar');
  body.on('touchstart', function(e) {
    var dost, num;

    if ($(body).hasClass('report')) {
      $('.num', keyin).text('?');
      return $(body).removeClass('report');
    } else {
      num = Math.floor(Math.random() * 9) + 1;
      dost = Q.slice(num, num + 1)[0];
      Q.splice(num, 1);
      $(report).text(dost);
      if (!dost) {
        $(report).text('ERROR');
      }
      return $(body).addClass('report');
    }
  });
  inbar.on('keydown', function(e) {
    var dost, num;

    if (e.keyCode === 13) {
      $(body).toggleClass('report');
      num = parseInt($(this).val(), 10);
      if (num > 0 && num < 10) {
        dost = Q.slice(num, num + 1)[0];
        Q.splice(num, 1);
        $(report).text(dost);
        if (!dost) {
          $(report).text('ERROR');
        }
      }
      return $(this).val('_');
    } else {
      return $(this).val('');
    }
  });
  inbar.on('keyup', function() {
    return $('.num', keyin).text($(this).val());
  });
  update = function() {
    inbar.focus();
    return setTimeout((function() {
      return update();
    }), 1500);
  };
  return update();
});
