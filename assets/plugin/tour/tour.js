/* ========================================================================
 * HireSpace: tour.js v1
 * http://hirespacedemos.azurewebsites.net/Tour
 * ========================================================================
 * Copyright 2014 Hire Space, Inc.
 * Licensed under MIT (https://github.com/hirespace/tour/blob/master/LICENSE.txt)
 * ======================================================================== */

(function ($) {

    $.fn.goTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top - 200 + 'px'
        }, 'fast');
        return this;
    };

    if (!$.fn.popover) throw new Error('Tour requires bootstrap popover.js');

    var Tour = function (element, options) {
        var self = this;
        this.options = options;
        this.$element = $(element);
        this.$start = this.$element.find('[data-start="tour"]');
        this.$quit = this.$element.find('[data-stop="tour"]');
        this.$hide = this.$element.find('[data-dismiss="tour"]');
        this.isActive = null;
        this.$backdrop = null;
        this.i = 0;

        this.$start.click(function () {
            self.start();
        });

        this.startText = this.$start.text();

    };

    Tour.DEFAULTS = {
        manual: true,
        delay: 2000
    };

    Tour.prototype.backdrop = function () {
        var self = this;
        var items = self.options.items;

        if (self.isActive) {
            self.$backdrop = $('<div class="tour-backdrop in" />')
                .appendTo( "body" );
        } else if (!self.isActive && self.$backdrop) {
            self.$backdrop.remove();
        }
    };


    Tour.prototype.stop = function () {
        var self = this;

        var items = this.options.items;

        if (!this.isActive) return;

        this.hideTourItem(items[self.i]);

        self.i = 0;

        self.$start.text(this.startText);

        self.$start.off();
        self.$start.on('click', function () {
            self.start();
        });

        this.isActive = false;
        this.backdrop();
        this.$element.removeClass('in');
        this.escape();

    };

    Tour.prototype.escape = function () {
        if (this.isActive) {
            this.$element.on('keyup.dismiss.tour', $.proxy(function (e) {
                e.which == 27 && this.stop();
            }, this));
        } else if (!this.isActive) {
            this.$element.off('keyup.dismiss.tour');
        }
    };


    Tour.prototype.hideTour = function () {
        this.stop();
        this.backdrop();
    };

    Tour.prototype.start = function () {
        var self = this;

        if (this.isActive) return;
        this.isActive = true;

        this.$element.addClass('in');

        this.escape();

        this.$element.on('click.stop.tour', '[data-stop="tour"]', $.proxy(this.stop, this));

        this.backdrop();

        var manual = this.options.manual;
        var items = this.options.items;
        var length = this.options.items.length;
        
        self.i = localStorage.getItem( this.$element.attr('id') );
        if( this.options.storage && isFinite(String(self.i)) && self.i < items.length-1 ){
            localStorage.setItem( this.$element.attr('id') , i );
        }else{
            self.i = 0;
            localStorage.setItem( this.$element.attr('id') , 0 );
        }

        this.showTourItem(items[self.i]);

        this.$start.text("Continue");

        this.$start.on('click', function () {

            self.hideTourItem(items[self.i]);
            self.i++;
            if (self.i < length ) {
                self.showTourItem(items[self.i]);
            } else {
                self.i = self.i - 1;
                self.stop();
            }
        });

        if (!manual) {
            self.continue();
        }

    };

    Tour.prototype.continue = function () {
        var self = this;

        var items = this.options.items;
        var length = this.options.items.length;
        var delay = this.options.delay;
        if (this.isActive ) {
            setTimeout(function () {
                self.hideTourItem(items[self.i]);
                self.i++;
                if (self.i < length && self.isActive ) {
                    self.showTourItem(items[self.i]);
                    self.continue();
                } else {
                    self.i = self.i - 1;
                    self.stop();
                }
            },
            delay);
        }
    };


    Tour.prototype.showTourItem = function (item) {
        var thisItem    = item;
        var self        = this;
        $(".popover").remove();
        if( thisItem.hasOwnProperty("onShow") ){
            thisItem.onShow();
        }
        
        setTimeout(function () {
            var thisEle     = $(thisItem.id);
            if( thisEle.length && thisEle.is(":visible") ){

                $(thisItem.id + ":first").popover({
                    html        : true,
                    title       : "<h6>"+thisItem.title+"</h6>",
                    container   : 'body',
                    trigger     : "manual",
                    placement   : thisItem.placement,
                    content     : thisItem.content
                });

                if( thisEle.css("position") == "static"){
                    thisEle.addClass("highlight-static");
                }
                
                if( $(thisItem.id).css("background-color") == "rgba(0, 0, 0, 0)" ){
                    $(thisItem.id).addClass("highlight-whiteBG");
                }

                $(thisItem.id).addClass("highlight").popover("show").goTo();

                localStorage.setItem( self.$element.attr('id') , self.i );

                if( thisItem.hasOwnProperty("onShown") ){ 
                    thisItem.onShown();
                }
            }else{
                if( self.options.skip ){
                    self.i++;
                    self.showTourItem( self.options.items[self.i] );
                }else{
                    if( thisItem.hasOwnProperty("onMiss") ){ 
                        thisItem.onMiss();
                    }
                }
            }
        }, (thisItem.delay || 0));
    };

    Tour.prototype.hideTourItem = function (item) {
        $(item.id).popover('destroy');
        $(".highlight, .highlight-static, .highlight-whiteBG")
            .removeClass("highlight")
            .removeClass("highlight-static")
            .removeClass("highlight-whiteBG");
    };

    var old = $.fn.tour;

    $.fn.tour = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('tour');
            var options = $.extend({}, Tour.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('tour', (data = new Tour(this, options)));
        });
    };

    $.fn.tour.Constructor = Tour;

    $.fn.tour.noConflict = function () {
        $.fn.tour = old;
        return this;
    };

})(jQuery);
