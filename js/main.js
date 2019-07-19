/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
( function( $ ) {

	// Wrap centered images in a new figure element
	$( 'img.aligncenter' ).wrap( '<figure class="centered-image"></figure>');

  // Add primary menu icons - todo: current should be solid
	function addMenuIcon(listItemId,iconName) {
		var fa = "far";
		var li = $("#"+listItemId);
		if(li.hasClass("current-menu-item") || li.hasClass("current-menu-ancestor") || li.hasClass("current_page_item") || li.hasClass("current_page_ancestor")) {
			fa = "fas";
		}
    li.find("a").prepend('<i class="'+fa+' '+iconName+'"></i><br>');
	}
	addMenuIcon("menu-item-131","fa-info"); //about
	addMenuIcon("menu-item-134","fa-lightbulb"); //projects
	addMenuIcon("menu-item-132","fa-comments"); //contact
	addMenuIcon("menu-item-133","fa-alarm-clock"); //now

	// Open social share links in new windows
	$(".share-post").on("click","a",function() {
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

} )( jQuery );
