(function() {

  // SELECTIZE
  //---------------------------------------------------------------
  $('form select').selectize({
  });

  // OWL CAROUSEL
  //---------------------------------------------------------------
  $('.brands-carousel').owlCarousel({
    loop:true,
    margin: 30,
    responsiveClass:true,
    nav: true,
    navText: ["<img class='svg-img' src='img/icon/prev.svg'>","<img class='svg-img' src='img/icon/next.svg'>"],
    responsive:{
        0:{
            items:1
        },
        580:{
            items:2
        },
        992:{
            items:3
        },
        1200:{
            items:4
        }
    }
  });

  $('.equipment-carousel').owlCarousel({
    loop:true,
    // margin:15,
    responsiveClass:true,
    dots: true,
    responsive:{
        0:{
            items:1
        },
        540:{
            items:2
        },
        992:{
            items:3
        },
        1200:{
            items:4
        }
    }
  });


  // EQUAL-HEIGHTS
  //---------------------------------------------------------------
  function heightBlock() {
    $('.equipment-item p').height('auto').equalHeights();
    $('.testimonial-item .testimonial-descr').height('auto').equalHeights();
    $('.testimonial-item .testimonial-title').height('auto').equalHeights();
  }

  $(window).resize(function () {
    heightBlock();
  });

  heightBlock();


  /*
   * Replace all SVG images with inline SVG
   */
  $('img.svg-img').each(function() {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });


  // Применяем Waypoints для цыфр
  //---------------------------------------------------------------

  $('.advanced').waypoint(function() {

    $({
      blurRadius: 5
    }).animate({
      blurRadius: 0
    }, {
      duration: 1200,
      easing: 'swing',
      step: function() {
        $(".advanced-item h3 span").css({
          "-webkit-filter": "blur(" + this.blurRadius + "px)",
          "filter": "blur(" + this.blurRadius + "px)"
        });
      }
    });
    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
    $(".advanced-item h3 span").each(function() {
      var tcount = $(this).data("count");
      $(this).animateNumber({
          number: tcount,
          easing: 'easeInQuad',
          "font-size": "2em",
          numberStep: comma_separator_number_step
        },
        1200);
    });
    this.destroy();

  }, {
    offset: '70%'
  });


  // magnific-popup для PORTFOLIO
  //---------------------------------------------------------------
  // $('.portfolio-item').each(function(indx) {
  //
  //   var th = $(this);
  //       // portfolioImg = this.find('.portfolio-img')
  //
  //   th.attr('href', '#portfolio-img-' + indx)
  //     .find('.portfolio-popup')
  //       .attr('id', 'portfolio-img-' + indx);
  // });

  $('.portfolio-item').magnificPopup({
    type: 'inline',
    mainClass: 'my-mfp-zoom-in',
    removalDelay: 300,
  });

  // magnific-popup и прелоадер
  //---------------------------------------------------------------
  $('.mfp-gallery').each(function() {
    $(this).magnificPopup({
      delegate: 'a',
      mainClass: 'mfp-zoom-in',
      type: 'image',
      tLoading: '',
      gallery: {
        enabled: true,
      },
      removalDelay: 300,
      callbacks: {
        beforeChange: function() {
          this.items[0].src = this.items[0].src + '?=' + Math.random();
        },
        open: function() {
          $.magnificPopup.instance.next = function() {
            var self = this;
            self.wrap.removeClass('mfp-image-loaded');
            setTimeout(function() {
              $.magnificPopup.proto.next.call(self);
            }, 120);
          }
          $.magnificPopup.instance.prev = function() {
            var self = this;
            self.wrap.removeClass('mfp-image-loaded');
            setTimeout(function() {
              $.magnificPopup.proto.prev.call(self);
            }, 120);
          }
        },
        imageLoadComplete: function() {
          var self = this;
          setTimeout(function() {
            self.wrap.addClass('mfp-image-loaded');
          }, 16);
        }
      }
    });
  });


  // Скролл иконки
  //---------------------------------------------------------------
  $('.mouse-icon').click(function() {
    $('html, body').animate({
      scrollTop: $('.advanced').offset().top
    }, 600);
  });


  // Показывать/убирать меню
  //---------------------------------------------------------------
  $(".toggle-mnu").click(function() {
    $(this).toggleClass("on");
    $(".menu").slideToggle();
    return false;
  });


  //E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

})();
