import { Component, OnInit, ElementRef, ApplicationRef } from '@angular/core';
import '../rxjs-operators';
import { Router } from '@angular/router';
declare var $: any;
declare var Prism: any; 

@Component({
    selector: 'amster-main',
    templateUrl: './app/components/app.component.html'
})

export class AppComponent implements OnInit{

    uploadClass = "";
    logFilesClass = "active";

    uploadClick() {
        this.logFilesClass = "";
        this.uploadClass = "active";
        this.router.navigateByUrl('/upload');
    }

    logFilesClick() {
        this.logFilesClass = "active";
        this.uploadClass = "";
        this.router.navigateByUrl('/logfiles');
    }

    responsiveView() {
        //console.log('here');
        var wSize = $(window).width();
        if (wSize <= 768) {
            $('#container').addClass('sidebar-close');
            $('#sidebar > ul').hide();
        }

        if (wSize > 768) {
            $('#container').removeClass('sidebar-close');
            $('#sidebar > ul').show();
        }
    }

    constructor(private _elRef: ElementRef, private _ref: ApplicationRef, private router:Router) {

    }


    ngOnInit() {
        //This is all plugin stuff from Flatlab template

        $(this._elRef.nativeElement).find('#nav-accordion').dcAccordion({
            eventType: 'click',
            autoClose: true,
            saveState: true,
            disableLink: true,
            speed: 'slow',
            showCount: false,
            autoExpand: true,
            //        cookie: 'dcjq-accordion-1',
            classExpand: 'dcjq-current-parent'
        });


        //This makes the right menu bar work
        $.slidebars();



        $(this._elRef.nativeElement).find('#sidebar .sub-menu > a').click(function () {
            var o = ($(this).offset());
            var diff = 250 - o.top;
            if (diff > 0)
                $(this._elRef.nativeElement).find("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
            else
                $(this._elRef.nativeElement).find("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
        });

        window.onload = this.responsiveView;
        window.resizeTo = this.responsiveView;

        $(this._elRef.nativeElement).find('.fa-bars').click(function () {

            if ($('#sidebar > ul').is(":visible") === true) {
                $('#main-content').css({
                    'margin-left': '0px'
                });
                $('#sidebar').css({
                    'margin-left': '-210px'
                });
                $('#sidebar > ul').hide();
                $("#container").addClass("sidebar-closed");
            } else {
                $('#main-content').css({
                    'margin-left': '210px'
                });
                $('#sidebar > ul').show();
                $('#sidebar').css({
                    'margin-left': '0'
                });
                $("#container").removeClass("sidebar-closed");
            }
            var owl = $("#owl-demo").data("owlCarousel");
            owl.reinit();
        });


        $(this._elRef.nativeElement).find("#sidebar").niceScroll({ styler: "fb", cursorcolor: "#e8403f", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', spacebarenabled: false, cursorborder: '', scrollspeed: 60 });
        $(this._elRef.nativeElement).find(".table-responsive").niceScroll({ styler: "fb", cursorcolor: "#e8403f", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled: false, cursorborder: '', zindex: '1000', horizrailenabled: true });

        $(this._elRef.nativeElement).find('.panel .tools .fa-chevron-down').click(function () {
            var el = $(this).parents(".panel").children(".panel-body");
            if ($(this).hasClass("fa-chevron-down")) {
                $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
                el.slideUp(200);
            } else {
                $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
                el.slideDown(200);
            }
        });

        $(this._elRef.nativeElement).find('.panel .tools .fa-times').click(function () {
            $(this).parents(".panel").parent().remove();
        });

        $(this._elRef.nativeElement).find('.tooltips').tooltip();

        //    popovers

        $(this._elRef.nativeElement).find('.popovers').popover();



        // custom bar chart

        if ($(this._elRef.nativeElement).find(".custom-bar-chart")) {
            $(".bar").each(function () {
                var i = $(this).find(".value").html();
                $(this).find(".value").html("");
                $(this).find(".value").animate({
                    height: i
                }, 2000)
            })
        }

        //End of template stuff
    }

    prism() {

        Prism.highlightAll();
    }

}