/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){

  window.addEventListener('load', function(){

    // obtain plugin
    var cc = initCookieConsent();

    // run plugin with your configuration
    cc.run({
      current_lang: 'en',
      autoclear_cookies: true,                   // default: false
      page_scripts: true,                        // default: false

      // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
      // delay: 0,                               // default: 0
      // auto_language: '',                      // default: null; could also be 'browser' or 'document'
      // autorun: true,                          // default: true
      // force_consent: false,                   // default: false
      // hide_from_bots: true,                   // default: true
      // remove_cookie_tables: false             // default: false
      // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
      // cookie_expiration: 182,                 // default: 182 (days)
      // cookie_necessary_only_expiration: 182   // default: disabled
      // cookie_domain: location.hostname,       // default: current domain
      // cookie_path: '/',                       // default: root
      // cookie_same_site: 'Lax',                // default: 'Lax'
      // use_rfc_cookie: false,                  // default: false
      // revision: 0,                            // default: 0

      onFirstAction: function(user_preferences, cookie){
        // callback triggered only once on the first accept/reject action
      },

      onAccept: function (cookie) {
        // callback triggered on the first accept/reject action, and after each page load
      },

      onChange: function (cookie, changed_categories) {
        // callback triggered when user changes preferences after consent has already been given
      },

      languages: {
        'en': {
          consent_modal: {
            title: 'We use cookies!',
            description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
            primary_btn: {
              text: 'Accept all',
              role: 'accept_all'              // 'accept_selected' or 'accept_all'
            },
            secondary_btn: {
              text: 'Reject all',
              role: 'accept_necessary'        // 'settings' or 'accept_necessary'
            }
          },
          settings_modal: {
            title: 'Cookie preferences',
            save_settings_btn: 'Save settings',
            accept_all_btn: 'Accept all',
            reject_all_btn: 'Reject all',
            close_btn_label: 'Close',
            // cookie_table_caption: 'Cookie list',
            cookie_table_headers: [
              {col1: 'Name'},
              {col2: 'Domain'},
              {col3: 'Expiration'},
              {col4: 'Description'}
            ],
            blocks: [
              {
                title: 'Cookie usage 📢',
                description: 'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc-link">privacy policy</a>.'
              }, {
                title: 'Strictly necessary cookies',
                description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
                toggle: {
                  value: 'necessary',
                  enabled: true,
                  readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                }
              }, {
                title: 'Performance and Analytics cookies',
                description: 'These cookies allow the website to remember the choices you have made in the past',
                toggle: {
                  value: 'analytics',     // your cookie category
                  enabled: false,
                  readonly: false
                },
                cookie_table: [             // list of all expected cookies
                  {
                    col1: '^_ga',       // match all cookies starting with "_ga"
                    col2: 'google.com',
                    col3: '2 years',
                    col4: 'description ...',
                    is_regex: true
                  },
                  {
                    col1: '_gid',
                    col2: 'google.com',
                    col3: '1 day',
                    col4: 'description ...',
                  }
                ]
              }, {
                title: 'Advertisement and Targeting cookies',
                description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
                toggle: {
                  value: 'targeting',
                  enabled: false,
                  readonly: false
                }
              }, {
                title: 'More information',
                description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#yourcontactpage">contact us</a>.',
              }
            ]
          }
        }
      }
    });
  });
   // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  // FitVids init
  $("#main").fitVids();

  // init sticky sidebar
  $(".sticky").Stickyfill();

  var stickySideBar = function(){
    var show = $(".author__urls-wrapper button").length === 0 ? $(window).width() > 1024 : !$(".author__urls-wrapper button").is(":visible");
    // console.log("has button: " + $(".author__urls-wrapper button").length === 0);
    // console.log("Window Width: " + windowWidth);
    // console.log("show: " + show);
    //old code was if($(window).width() > 1024)
    if (show) {
      // fix
      Stickyfill.rebuild();
      Stickyfill.init();
      $(".author__urls").show();
    } else {
      // unfix
      Stickyfill.stop();
      $(".author__urls").hide();
    }
  };

  stickySideBar();

  $(window).resize(function(){
    stickySideBar();
  });

  // Follow menu drop down

  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").fadeToggle("fast", function() {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // init smooth scroll
  $("a").smoothScroll({offset: -20});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

});
