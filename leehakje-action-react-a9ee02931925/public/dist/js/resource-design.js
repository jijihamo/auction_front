( function( $ ) {
	$(document).ready(function() {
		rdTab();
		rdAccordion();
		rdModal();
		restrictShowHide();
		sendTo();
		inputDateFormat();

		$('.rd-select').each(function() {
			$(this).mpSelect();
		});

        rdResponsiveSlideTable();
	});

	function rdTab() {
		var $tab = $('.rd-tab.function');
		var $tabMenu = $('.tab-menu > li > a');
		var $tabBody = $('.tab-body');
		var $tabCont = $('.tab-cont');
		//var $btnClose = $tab.find('.btn-close');

		$tab.find($tabMenu).on('click focus', function(e) {
			e.preventDefault();
			var tabIndex = $(this).attr('data-tab-index');
			var $tgTab = $(this).closest('.rd-tab');
			var $tgTabBody = $tgTab.find($tabBody);
			// remove 'active'
			$tgTab.find($tabMenu).removeClass('active');
			$tgTab.find($tabCont).removeClass('active');
			// add 'active'
			$(this).addClass('active');
			$tgTab.find('[data-tab-index="'+ tabIndex +'"]').addClass('active');
			if(!$tgTabBody.hasClass('active')) {
				$tgTabBody.addClass('active');
			}
		});
		/*
		$btnClose.on('click focus', function() {
			var $tgTab = $(this).closest('.rd-tab');
			$(this).removeClass('active');
			$tabBody.removeClass('active');
		});
		*/
	}

	function restrictShowHide() {
		var $searchResult = $('.search-result');
		if(!$searchResult.hasClass('no-restrict')) {
			$('.action-toggle-restrict > button').on('click', function() {
				var id = $(this).attr('id').split('-')[1];
				if(id == 'hide') {
					$searchResult.addClass('expand');
				} else if(id == 'show') {
					$searchResult.removeClass('expand');
				}
			});
		}
		$('.restrict-area .btn-close').on('click', function() {
			$searchResult.addClass('expand');
		});
	}

	function rdAccordion() {
		var $accordion = $('.rd-accordion');
		var $tg = $accordion.find('.panel-head');
		var $btnOpen = $accordion.find('.open-all');
		var $btnClose = $accordion.find('.close-all');
		var speed = 200;

		$accordion.find('.panel.active .panel-body').slideDown(0);

		$(document).on('click', '.rd-accordion .panel-head' , function(e){
			e.preventDefault();
			var $tgAccordion = $(this).closest('.rd-accordion');
			var $tgPanel = $(this).closest('.panel');

			if($tgAccordion.hasClass('only-one')) {
				if(!$tgPanel.hasClass('active')) {
					$tgAccordion.find('.panel').removeClass('active').find('.panel-body').slideUp(speed);
					$tgPanel.addClass('active').find('.panel-body').slideDown(speed);
				}
			} else {
				$tgPanel.toggleClass('active').find('.panel-body').slideToggle(speed);
			}
		});

		$btnOpen.on('click', function(e){
			e.preventDefault();
			var $tgAccordion = $(this).closest('.rd-accordion');
			$tgAccordion.find('.panel').addClass('active').find('.panel-body').slideDown(speed);
		});

		$btnClose.on('click', function(e){
			e.preventDefault();
			var $tgAccordion = $(this).closest('.rd-accordion');
			$tgAccordion.find('.panel').removeClass('active').find('.panel-body').slideUp(speed);
		});
	}

	function rdModal() {
		$(document).on('click','.rd-modal',function() {
			var id = $(this).attr('data-modal');
			$('#'+ id + '').addClass('active');
			$('body').addClass('mask');
		});

		$(document).on('click','.modal-mask, .rd-modal-dialog .modal-box .btn-close',function() {
			$('.rd-modal-dialog').removeClass('active');
			$('body').removeClass('mask');
		});
	}

	function sendTo() {
		$('.rd-utility-bar-detail .btn-export').on('click', function() {
			$('.send-to-area').slideToggle(300);
		});
	}

	function inputDateFormat(){
        $(".format-date").keyup(function() {
            if( this.value.length > 10){
                this.value = this.value.substr(0, 10);
            }
            var val         = this.value.replace(/\D/g, '');
            var original    = this.value.replace(/\D/g, '').length;
            var conversion  = '';
            for( var i=0; i<2; i++){
                if (val.length > 4 && i===0) {
                    conversion += val.substr(0, 4) + '-';
                    val         = val.substr(4);
                }
                else if(original>6 && val.length > 2 && i===1){
                    conversion += val.substr(0, 2) + '-';
                    val         = val.substr(2);
                }
            }
            conversion += val;
            this.value = conversion;
        });
	}

	$.fn.mpSelect = function(method) {

		// Methods
		if (typeof method == 'string') {
			if (method == 'update') {
				this.each(function() {
					var $select = $(this);
					var $dropdown = $(this).next('.rd-select');
					var open = $dropdown.hasClass('open');

					if ($dropdown.length) {
						$dropdown.remove();
						create_nice_select($select);

						if (open) {
							$select.next().trigger('click');
						}
					}
				});
			} else if (method == 'destroy') {
				this.each(function() {
					var $select = $(this);
					var $dropdown = $(this).next('.rd-select');

					if ($dropdown.length) {
						$dropdown.remove();
						$select.css('display', '');
					}
				});
				if ($('.rd-select').length == 0) {
					$(document).off('.nice_select');
				}
			} else {
				console.log('Method "' + method + '" does not exist.')
			}
			return this;
		}

		// Hide native select
		this.hide();

		// Create custom markup
		this.each(function() {
			var $select = $(this);

			if (!$select.next().hasClass('rd-select')) {
				create_nice_select($select);
			}
		});

		function create_nice_select($select) {
			$select.after($('<div></div>')
				.addClass('rd-select')
				.addClass($select.attr('class') || '')
				.addClass($select.attr('disabled') ? 'disabled' : '')
				.attr('tabindex', $select.attr('disabled') ? null : '0')
				// .css('width', $select.css('width')) // Add
                .css('width', $select.hasClass('width-no') ? '' : $select.css('width')) // width-no이면 무력화
				.html('<span class="current"></span><ul class="list"></ul>')
			);

			var $dropdown = $select.next();
			var $options = $select.find('option');
			var $selected = $select.find('option:selected');

			$dropdown.find('.current').html($selected.data('display') || $selected.text());

			$options.each(function(i) {
				var $option = $(this);
				var display = $option.data('display');

				$dropdown.find('ul').append($('<li></li>')
					.attr('data-value', $option.val())
					.attr('data-display', (display || null))
					.addClass('option' +
						($option.is(':selected') ? ' selected' : '') +
						($option.is(':disabled') ? ' disabled' : ''))
					.html($option.text())
				);
			});
		}

		/* Event listeners */

		// Unbind existing events in case that the plugin has been initialized before
		$(document).off('.nice_select');

		// Open/close
		$(document).on('click.nice_select', '.rd-select', function(event) {
			var $dropdown = $(this);

			$('.rd-select').not($dropdown).removeClass('open');
			$dropdown.toggleClass('open');

			if ($dropdown.hasClass('open')) {
				$dropdown.find('.option');
				$dropdown.find('.focus').removeClass('focus');
				$dropdown.find('.selected').addClass('focus');
			} else {
				$dropdown.focus();
			}
		});

		// Close when clicking outside
		$(document).on('click.nice_select', function(event) {
			if ($(event.target).closest('.rd-select').length === 0) {
				$('.rd-select').removeClass('open').find('.option');
			}
		});

		// Option click
		$(document).on('click.nice_select', '.rd-select .option:not(.disabled)', function(event) {
			var $option = $(this);
			var $dropdown = $option.closest('.rd-select');

			$dropdown.find('.selected').removeClass('selected');
			$option.addClass('selected');

			var text = $option.data('display') || $option.text();
			$dropdown.find('.current').text(text);

			$dropdown.prev('select').val($option.data('value')).trigger('change');
		});

		// Keyboard events
		$(document).on('keydown.nice_select', '.rd-select', function(event) {
			var $dropdown = $(this);
			var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

			// Space or Enter
			if (event.keyCode == 32 || event.keyCode == 13) {
				if ($dropdown.hasClass('open')) {
					$focused_option.trigger('click');
				} else {
					$dropdown.trigger('click');
				}
				return false;
				// Down
			} else if (event.keyCode == 40) {
				if (!$dropdown.hasClass('open')) {
					$dropdown.trigger('click');
				} else {
					var $next = $focused_option.nextAll('.option:not(.disabled)').first();
					if ($next.length > 0) {
						$dropdown.find('.focus').removeClass('focus');
						$next.addClass('focus');
					}
				}
				return false;
				// Up
			} else if (event.keyCode == 38) {
				if (!$dropdown.hasClass('open')) {
					$dropdown.trigger('click');
				} else {
					var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
					if ($prev.length > 0) {
						$dropdown.find('.focus').removeClass('focus');
						$prev.addClass('focus');
					}
				}
				return false;
				// Esc
			} else if (event.keyCode == 27) {
				if ($dropdown.hasClass('open')) {
					$dropdown.trigger('click');
				}
				// Tab
			} else if (event.keyCode == 9) {
				if ($dropdown.hasClass('open')) {
					return false;
				}
			}
		});

		// Detect CSS pointer-events support, for IE <= 10. From Modernizr.
		var style = document.createElement('a').style;
		style.cssText = 'pointer-events:auto';
		if (style.pointerEvents !== 'auto') {
			$('html').addClass('no-csspointerevents');
		}

		return this;

	};

    /**
	 * 슬라이드 반응형 테이블
     */
	function rdResponsiveSlideTable() {
        var status		= [];

        function responsive_table() {
            $("table.responsive-slide").each(function(idx) {
                if(!status[idx]){
                    status[idx] = new Object();
                    status[idx].switched = false;
				}
                updateTables($(this), $(this).hasClass("pinned"), idx);
            });
		}

		function updateTables(object, is_pinned, idx) {
            if (($(window).width() <= 767) && !status[idx].switched) {
                status[idx].switched = true;
                splitTable(object, is_pinned);
                return true;
            } else if (status[idx].switched && ($(window).width() > 767)) {
                status[idx].switched = false;
                unsplitTable(object);
            }
		}
        responsive_table();
        $(window).bind("resize", responsive_table);

        function splitTable(original, is_pinned) {
        	if( original.attr("id") ){
                original.wrap("<div id='table-"+original.attr("id")+"' class='table-wrapper' />");
			} else {
                original.wrap("<div class='table-wrapper' />");
			}

			var copy = original.clone();
			copy.removeClass("responsive-slide");
			if(!is_pinned){
			} else {
                copy.find("td:not(:first-child), th:not(:first-child)").addClass("hide");
                original.removeClass("pinned");
                original.addClass("fixed");
                original.closest(".table-wrapper").append(copy);
                copy.wrap("<div class='pinned' />");
			}
			original.wrap("<div class='scrollable' />");
		}

		function unsplitTable(original) {
			$("div.pinned").remove();
			original.unwrap();
			original.unwrap();
			if(original.hasClass("fixed")){
                original.removeClass("fixed");
                original.addClass("pinned");
			}
		}
    }
} )( jQuery );
