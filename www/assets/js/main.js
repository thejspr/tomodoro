"use strict";
// initialize Hoodie
var hoodie  = new Hoodie();

// Pomodoros Collection/View
function Pomodoros($element) {
  var collection = [];
  var $el = $element;

  // Handle marking pomodoro as "done"
  $el.on('click', 'input[type=checkbox]', function() {
    hoodie.store.remove('pomodoro', $(this).parent().data('id'));
    return false;
  });

  // Handle "inline editing" of a pomodoro.
  $el.on('click', 'label', function() {
    $(this).parent().parent().find('.editing').removeClass('editing');
    $(this).parent().addClass('editing');
    return false;
  });

  // Handle updating of an "inline edited" pomodoro.
  $el.on('keypress', 'input[type=text]', function(event) {
    if (event.keyCode === 13) {
      hoodie.store.update('pomodoro', $(this).parent().data('id'), {title: event.target.value});
    }
  });

  // Find index/position of a pomodoro in collection.
  function getPomodoroItemIndexById(id) {
    for (var i = 0, len = collection.length; i < len; i++) {
      if (collection[i].id === id) {
        return i;
      }
    }
    return null;
  }

  function paint() {
    $el.html('');
    collection.sort(function(a, b) {
      return ( a.createdAt > b.createdAt ) ? 1 : -1;
    });
    for (var i = 0, len = collection.length; i<len; i++) {
      $el.append(
        '<li data-id="' + collection[i].id + '">' +
          '<input type="checkbox"> <label>' + collection[i].title + '</label>' +
          '<input type="text" value="' + collection[i].title + '"/>' +
        '</li>'
      );
    }
  }

  this.add = function(pomodoro) {
    collection.push(pomodoro);
    paint();
  };

  this.update = function(pomodoro) {
    collection[getPomodoroItemIndexById(pomodoro.id)] = pomodoro;
    paint();
  };

  this.remove = function(pomodoro) {
    collection.splice(getPomodoroItemIndexById(pomodoro.id), 1);
    paint();
  };

  this.clear = function() {
    collection = [];
    paint();
  };
}

// Instantiate Pomodoros collection & view.
var pomodoros = new Pomodoros($('#pomodorolist'));

// initial load of all pomodoro items from the store
hoodie.store.findAll('pomodoro').then(function(allPomodoros) {
  allPomodoros.forEach(pomodoros.add);
});

// when a pomodoro changes, update the UI.
hoodie.store.on('add:pomodoro', pomodoros.add);
hoodie.store.on('update:pomodoro', pomodoros.update);
hoodie.store.on('remove:pomodoro', pomodoros.remove);
// clear pomodoros when user logs out,
hoodie.account.on('signout', pomodoros.clear);


// handle creating a new task
$('#pomodoroinput').on('keypress', function(event) {
  // ENTER & non-empty.
  if (event.keyCode === 13 && event.target.value.length) {
    hoodie.store.add('pomodoro', {title: event.target.value});
    event.target.value = '';
  }
});
