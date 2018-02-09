/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
( function( $ ) {
	var container, button, menu, links, subMenus;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );
	subMenus = menu.getElementsByTagName( 'ul' );

	// Set menu items with submenus to aria-haspopup="true".
	for ( var i = 0, len = subMenus.length; i < len; i++ ) {
		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
	}

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	function initMainNavigation( container ) {
		// Add dropdown toggle that display child menu items.
		container.find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">' + screenReaderText.expand + '</button>' );

		container.find( '.dropdown-toggle' ).click( function( e ) {
			var _this = $( this );
			e.preventDefault();
			_this.toggleClass( 'toggle-on' );
			_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );
			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			_this.html( _this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );
		} );
	}
	initMainNavigation( $( '.main-navigation' ) );

	// Re-initialize the main navigation when it is updated, persisting any existing submenu expanded states.
	$( document ).on( 'customize-preview-menu-refreshed', function( e, params ) {
		if ( 'primary' === params.wpNavMenuArgs.theme_location ) {
			initMainNavigation( params.newContainer );

			// Re-sync expanded states from oldContainer.
			params.oldContainer.find( '.dropdown-toggle.toggle-on' ).each(function() {
				var containerId = $( this ).parent().prop( 'id' );
				$( params.newContainer ).find( '#' + containerId + ' > .dropdown-toggle' ).triggerHandler( 'click' );
			});
		}
	});

	// Hide/show toggle button on scroll

	var position, direction, previous;

	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		if(scrollTop>10) {
			$("html").addClass("scrolled");
		}
		else{
			$("html").removeClass("scrolled");
		}
		if( scrollTop >= position ){
			direction = 'down';
			if(direction !== previous){
				$('.menu-toggle').addClass('hide');
				previous = direction;
			}
		}
		else {
			direction = 'up';
			if(direction !== previous){
				$('.menu-toggle').removeClass('hide');
				previous = direction;
			}
		}
		position = scrollTop;
	});

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
	addMenuIcon("menu-item-108","fa-info"); //about
	addMenuIcon("menu-item-118","fa-lightbulb"); //projects
	addMenuIcon("menu-item-109","fa-comments"); //contact
	addMenuIcon("menu-item-110","fa-alarm-clock"); //now

	// Open social share links in new windows
	$(".share-post").on("click","a",function() {
		window.open($(this).attr("href"),"share-post","width=600,height=300");
		return false;
	});

	// Highlight HTML/CSS/JS code blocks
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});

} )( jQuery );
