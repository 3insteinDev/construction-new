/*jshint jquery:true */

$(document).ready(function($) {

	

		
	"use strict";

	/* global google: false */
	/*jshint -W018 */

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
		// Needed variables
		var $container=$('.iso-call');
		var $filter=$('.filter');

		try{
			$container.imagesLoaded( function(){
				$container.trigger('resize');
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});

				setTimeout(Resize, 1500);
			});
		} catch(err) {
		}

		winDow.on('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});
		
		// Isotope Filter 
		$filter.find('a').on('click', function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


	var filterItemA	= $('.filter li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});

	/*-------------------------------------------------*/
	/* =  preloader function
	/*-------------------------------------------------*/
	
	$('body').ready(function(){
		var mainDiv = $('#container'),
			preloader = $('.preloader');

		// Exemplo de uso da nova função de loading
		// showLoading();
		preloader.fadeOut(400, function(){
			mainDiv.delay(400).addClass('active');
		});
	});

	/*-------------------------------------------------*/
	/* =  nav animate
	/*-------------------------------------------------*/

	var ToogleMenu = $('a.open-close-menu');

	ToogleMenu.on('click', function(event) {
		event.preventDefault();

		var MainMenu = $('.navbar-nav'),
			$this = $(this);
		if ( !$this.hasClass('opened') ) {
			$this.addClass('opened');
			MainMenu.addClass('active');
		} else {
			$this.removeClass('opened');
			MainMenu.removeClass('active');
		}
	});

	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	// Example with multiple objects
	function callMagnificpopup() {
		$('.zoom').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	}
	
	callMagnificpopup();

	// Example with multiple objects
	$('.video-link').magnificPopup({
		type: 'iframe'
	});

	/*-------------------------------------------------*/
	/* = skills animate
	/*-------------------------------------------------*/

	var skillBar = $('.skills-box');
	skillBar.appear(function() {

		var animateElement = $(".meter > p");
		animateElement.each(function() {
			$(this)
				.data("origWidth", $(this).width())
				.width(0)
				.animate({
					width: $(this).data("origWidth")
				}, 1200);
		});

	});

	/*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/

	$('.statistic-post').appear(function() {
		$('.timer').countTo({
			speed: 4000,
			refreshInterval: 60,
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			}
		});
	});
	
	/*-------------------------------------------------*/
	/* =  OWL carousell
	/*-------------------------------------------------*/

	var owlWrap = $('.owl-wrapper');

	if (owlWrap.length > 0) {

		if (jQuery().owlCarousel) {
			owlWrap.each(function(){

				var carousel= $(this).find('.owl-carousel'),
					dataNum = $(this).find('.owl-carousel').attr('data-num'),
					dataNum2,
					dataNum3;

				if ( dataNum == 1 ) {
					dataNum2 = 1;
					dataNum3 = 1;
				} else if ( dataNum == 2 ) {
					dataNum2 = 2;
					dataNum3 = dataNum - 1;
				} else {
					dataNum2 = dataNum - 1;
					dataNum3 = dataNum - 2;
				}

				carousel.owlCarousel({
					autoPlay: 10000,
					navigation : true,
					items : dataNum,
					itemsDesktop : [1199,dataNum2],
					itemsDesktopSmall : [991,dataNum3],
					itemsTablet : [768, dataNum3],
				});

			});
		}
	}
	
	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
	  try {
		  // Coordenadas de Lo Barnechea, Santiago, Chile (obtidas do link Google Maps)
		  var barnechea = [-33.351889, -70.504278];
		  var markerPosition = [-33.351889, -70.504278];
		  $('#map').gmap3({
				  center: barnechea,
				  zoom: 15,
				  scrollwheel: false,
				  mapTypeId : google.maps.MapTypeId.ROADMAP
			  })
			  .marker({
				  position: markerPosition,
				  icon: 'images/marker.png'
		  });
	  } catch(error) {
	  }
	/*-------------------------------------------------*/
	/* =  scrolltop funciont
	/*-------------------------------------------------*/

	var scrollBtn = $('a.go-top');

	scrollBtn.on( 'click' , function() {
		$('html, body').animate({scrollTop:0}, 'slow');
	});

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	// Remover AJAX e deixar apenas o envio para WhatsApp
	// Lógica para enviar formulário por WhatsApp com validação
	$('#contact-form').on('submit', function(e) {
		e.preventDefault();
		var name = $('#name').val().trim();
		var email = $('#mail').val().trim();
		var phone = $('#tel-number').val().trim();
		var message = $('#comment').val().trim();
		var whatsappNumber = '56923863228'; // sem o +
		var text = '';
		if (!name && !email && !phone && !message) {
			text = 'Vi el sitio web y quiero más información sobre los productos.';
		} else {
			text =
				'Hola, me gustaría ponerme en contacto.\n' +
				'*Nombre:* ' + name + '\n' +
				'*Email:* ' + email + '\n' +
				'*Teléfono:* ' + phone + '\n' +
				'*Mensaje:* ' + message;
		}
		var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(text);
		window.open(url, '_blank');
	});
	/* ---------------------------------------------------------------------- */
	/*	Header animate after scroll
	/* ---------------------------------------------------------------------- */

	(function() {

		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 10;
			document.querySelector( 'header' );
		function init() {
			window.addEventListener( 'scroll', function() {
				if( !didScroll ) {
					didScroll = true;
					scrollPage();
				}
			}, false );
		}
		
		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				$( 'header' ).addClass('active');
			}
			else {
				$( 'header' ).removeClass('active');
			}
			didScroll = false;
		}
		
		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		init();
		
	})();

});

function Resize() {
	$(window).trigger('resize');
}
