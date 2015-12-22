$(document).ready(function() {
	var parent = $('.infinity');
	var max = parent[0].scrollHeight - parent[0].offsetHeight - 20;

	var height = $('body').height();

	function debounce(fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this, args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	}

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

	parent.on('scroll', function(event) {
	    var s = $(this).scrollTop(),
	        f = $('>:first', parent),l = $('>:last', parent);
	    if(s > max) {f.appendTo(parent); parent.scrollTop(s - f.height())}
	    if(s < 5) {l.prependTo(parent);parent.scrollTop(s + l.height()) }
	}).scrollTop(5);

	parent.on('scroll', function() {

		$('.item').each(function(index, el) {
			var $this = $(this);
			var offset = $this.offset().top * 100 / height * 40;
			$this.css('background-position', '50% ' + offset + '%');
		});

	});

	parent.on('scroll', function() {
		position = parent.scrollTop();
		parent.not(this).scrollTop(position);
	});
});