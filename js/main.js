(function($) {

  // Announce to screenreaders
  window.announce = function(mes){
  	var ele = $('#announce_element');
  	if(ele.length===0){
  		ele = $('<span id="announce_element" aria-live="polite" aria-atomic="true" aria-relevant="all" class="sr-only"></span>');
  		jQuery("body").append(ele);
  	}
    setTimeout(function() {
  		ele.html(mes);
  	},0);
  	return true;
  }

	// Wrap centered images in a new figure element
	$('img.aligncenter').wrap('<figure class="centered-image"></figure>');

  // Add primary menu icons
	function addMenuIcon(listItemId,iconName) {
    $("#"+listItemId).find("a").prepend('<i class="far '+iconName+'"></i><br>');
	}
	addMenuIcon("menu-item-131","fa-info"); //about
	addMenuIcon("menu-item-134","fa-lightbulb"); //projects
	addMenuIcon("menu-item-132","fa-comments"); //contact
	addMenuIcon("menu-item-133","fa-alarm-clock"); //now

	// Open social share links in new windows
	$(".share-post").on("click","a.new-window",function() {
		window.open($(this).attr("href"),"share-post","width=600,height=300");
		return false;
	});

	// Highlight HTML/CSS/JS code blocks
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});

  // Allow theme switching (light/dark)
  $('#theme-switch').on("change",function() {
    var $html = $('html');
    var value = "light";
    if($html.hasClass("theme-dark")) {
      $html.removeClass("theme-dark").addClass("theme-light");
    }
    else {
      $html.removeClass("theme-light").addClass("theme-dark");
      value = "dark";
    }
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365);
    document.cookie = "theme=" + value + ";secure;expires=" + exdate.toUTCString();
  });
  if($('html').hasClass("theme-dark")) {
    $('#theme-switch').prop("checked",true);
  }

  //Allow copy to clipboard
  $('a[data-copy]').on("click",function() {
    var $a = $(this).html('<i class="far fa-clipboard" aria-hidden="true"></i><span class="sr-only">Copy link to clipboard</span>');
    var dc = $a.attr("data-copy");
    var el = document.createElement('textarea');
    el.value = dc;
    el.setAttribute('readonly','');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if(selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    setTimeout(function() {
      $a.addClass("copying"); //add class after <i> replaced with <svg>
    },0);
    setTimeout(function() {
      $a.html('<i class="far fa-clipboard-check" aria-hidden="true"></i><span class="sr-only">Copy link to clipboard</span>'); //update icon
    },800);
    setTimeout(function() {
      $a.removeClass("copying"); //remove class to reverse transform
    },1200);
    announce("Link copied to clipboard - "+dc);
    return false;
  });
})(jQuery);
