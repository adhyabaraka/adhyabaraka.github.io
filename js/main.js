;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};

	var sliderMain = function() {
		
	  	$('#fh5co-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	});

	};

	var centerBlock = function() {
		$('.fh5co-section-with-image .fh5co-box').css('margin-top', -($('.fh5co-section-with-image .fh5co-box').outerHeight()/2));
	  	$(window).resize(function(){
	  		$('.fh5co-section-with-image .fh5co-box').css('margin-top', -($('.fh5co-section-with-image .fh5co-box').outerHeight()/2));
	  	});
	};

	var responseHeight = function() {
		setTimeout(function(){
			$('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
		}, 1);
		
		$(window).resize(function(){
			setTimeout(function(){
				$('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
			}, 1);
		})
	};


	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas-visible') ) {

    			$('body').removeClass('offcanvas-visible');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {
		$('body').prepend('<div id="fh5co-offcanvas" />');
		$('#fh5co-offcanvas').prepend('<ul id="fh5co-side-links">');
		$('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');
		$('#fh5co-offcanvas').append($('#fh5co-header nav').clone());
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);

			$('body').toggleClass('fh5co-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-fh5co-nav-toggle').removeClass('active');
		   }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-fh5co-nav-toggle').removeClass('active');
		   }
		});

	};


	var toggleBtnColor = function() {
		if ( $('#fh5co-hero').length > 0 ) {	
			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'down' ) {
					$('.fh5co-nav-toggle').addClass('dark');
				}
			} , { offset: - $('#fh5co-hero').height() } );

			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'up' ) {
					$('.fh5co-nav-toggle').removeClass('dark');
				}
			} , { 
				offset:  function() { return -$(this.element).height() + 0; }
			} );
		}
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};



	
	var stickyHeader = function() {
		var $h = $('#fh5co-header');
		var toggle = function() { $h.toggleClass('scrolled', $(window).scrollTop() > 40); };
		$(window).on('scroll', toggle);
		toggle();
	};

	var scrollExtras = function() {
		var $bar = $('<div id="scroll-bar" />').appendTo('body');
		var $top = $('<a href="#" class="to-top" aria-label="Back to top"><i class="icon-arrow-right"></i></a>').appendTo('body');
		var update = function() {
			var y = $(window).scrollTop(), max = $(document).height() - $(window).height();
			$bar.css('width', (max > 0 ? y / max * 100 : 0) + '%');
			$top.toggleClass('show', y > 600);
		};
		$top.on('click', function(e){ e.preventDefault(); $('html, body').animate({ scrollTop: 0 }, 600); });
		$(window).on('scroll', update);
		update();
	};

	// Apple-style reveal: items fade/rise in one by one as they enter the viewport
	var scrollReveal = function() {
		if (!('IntersectionObserver' in window)) return;   // old browsers: leave everything visible
		var $t = $('.fh5co-heading, .item-block, .fh5co-staff, .fh5co-box, .fh5co-about figure, .fh5co-about .col-md-8, .contact-card, #fh5co-grid-products .item-grid')
			.add($('.fh5co-entry').parent());   // blog card has its own hover transform, so animate its wrapper
		// replaces the old whole-section fade
		$('.animate-box').has($t).add($t.filter('.animate-box')).removeClass('animate-box');

		// items sitting side by side in one row fly in from left / centre / right
		var rows = {};
		$t.each(function(){
			var top = Math.round(this.getBoundingClientRect().top + window.pageYOffset);
			(rows[top] = rows[top] || []).push(this);
		});
		$.each(rows, function(_, row){
			if (row.length > 1) $.each(row, function(i, el){ el.style.setProperty('--x', row.length === 2 ? i * 2 - 1 : (i % 3) - 1); });
		});
		$t.addClass('reveal');

		var io = new IntersectionObserver(function(entries){
			var i = 0;   // entries that appear together get staggered
			entries.forEach(function(e){
				var el = e.target;
				if (!e.isIntersecting) {   // left the screen (either side): reset so it animates again when scrolled back
					el.style.transitionDelay = '';
					el.classList.remove('in');
					return;
				}
				el.style.transitionDelay = (i++ * 160) + 'ms';
				el.classList.add('in');
				setTimeout(function(){ el.style.transitionDelay = ''; }, 2000);
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
		$t.each(function(){ io.observe(this); });
	};

	$(function(){
		scrollReveal();
		scrollExtras();
		stickyHeader();
		fullHeight();
		sliderMain();
		centerBlock();
		responseHeight()
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		toggleBtnColor();
		contentWayPoint();
	});


}());