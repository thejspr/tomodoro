"use strict";

var hoodie  = new Hoodie();

// Pomodoros Collection/View
function Pomodoros($element) {
  var collection = [];
  var $el = $element;
  var $current = $('#current-wrapper');
  var counter = undefined;

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

    collection.sort(function(a, b) { return ( a.createdAt > b.createdAt ) ? 1 : -1; });

    for (var i = 0, len = collection.length; i<len; i++) {
      $el.append(
        '<li data-id="' + collection[i].id + '" class="' + (collection[i].completed ? '' : 'completed') + '">' +
          '<label>' + collection[i].title + '</label>' +
        '</li>'
      );
    }
  }

  this.paintCurrent = function(current) {
    $current.find('.current').html('');

    $current.find('.title').text(current.title);

    var date = new Date();
    date.setMinutes(date.getMinutes() + 25);

    counter = $current.find('.current').countdown({ until: date, format: 'MS' });
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

  // this.setCurrent = function(pomodoro) {
  //   hoodie.store.findOrAdd('current', 'current', { pomodoroId: pomodoro.id })
  //     .done(this.showCurrent)
  //     .fail(function(x) {console.log(x)});
  // };

  // this.getCurrent = function(callback) {
  //   hoodie.store.find('current', 'current')
  //     .done(function(c) {
  //       hoodie.store.find('pomodoro', c.pomodoroId).done(callback);
  //     })
  //     .fail(function(x) { console.log(x, 'No current is set') });
  // },

  // this.showCurrent = function() {
  //   console.log('showCurrent')
  //   this.getCurrent(this.paintCurrent);
  // }

  // this.clearCurrent = function() {
  //   hoodie.store.remove('current', 'current');
  //   $current.html('Blank')
  //   counter.countdown('destroy')
  // }

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

// pomodoros.showCurrent();

// when a pomodoro changes, update the UI.
hoodie.store.on('add:pomodoro', pomodoros.add);
// hoodie.store.on('add:pomodoro', pomodoros.setCurrent);
// hoodie.store.on('current:change', pomodoros.showCurrent);
// hoodie.store.on('update:pomodoro', pomodoros.update);
// hoodie.store.on('remove:pomodoro', pomodoros.remove);

// clear pomodoros when user logs out,
hoodie.account.on('signout', pomodoros.clear);

// handle creating a new pomodoro
$('#pomodoroform').on('submit', function(e) {
  var $input = $('#pomodoroinput');

  if (!$input.val().length) return;

  hoodie.store.add('pomodoro', { title: $input.val(), duration: 25 });
  $input.val('');
});

$('#stop').on('click', function(){
  pomodoros.clearCurrent();
})
