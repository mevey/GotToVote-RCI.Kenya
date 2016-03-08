---
---

// Get #nimeregister Tweets

function getTweets() {
  var screenWidth = window.innerWidth;
  var tweets_url = '';
  var count = 0;
  var page_no = 0;
  var img_width = '';
  
  var theTweets = new Array();
  
  if (screenWidth > 767) {
    count = 48;
    tweets_url = 'http://search.twitter.com/search.json?q=nimeregister&rpp=48&include_entities=true&with_twitter_user_id=true&result_type=mixed';
    img_width = '6.25%';
  } else {
    count = 20;
    tweets_url = 'http://search.twitter.com/search.json?q=nimeregister&rpp=20&include_entities=true&with_twitter_user_id=true&result_type=mixed';
    img_width = '10%';
  }
  
  $.ajax({
  
      url : tweets_url,
      dataType : 'jsonp',
      success : function(data)
      
      {
        if (data['results'].length < count){
          count = data['results'].length;
        }
        
          var to_tweetsid = '';
          for (var i = 0; i < count; i++) {
            var img_url = data['results'][i]['profile_image_url'].replace("_normal","_bigger");
            var tweet_txt = data['results'][i]['text'].replace("\"","&quot;");
            to_tweetsid += '<img src="' + img_url + '" style="width:' + img_width + ';" ';
            to_tweetsid += 'rel="tooltip" data-placement="bottom" data-original-title="'+ tweet_txt +'"/>';
          }
          $('#tweets').html(to_tweetsid);
          $("[rel=tooltip]").tooltip();
      },
      error : function()
      {
          alert("Something seems to have gone wrong loading the tweets.");
      },
  
  });
}

// getTweets();
// $("[rel=tooltip]").tooltip();


// Badge Watermark

$('#badgeCarousel').carousel({
   interval: false
});

var src_img = "/img/nimeregister/portraits/ex1.png";

function wm_top_left() {
  document.getElementById("wm_image").src = src_img;
  $('#wm-tl').addClass('disabled');
  $('#wm-tr').removeClass('disabled');
  $('#wm-br').removeClass('disabled');
  $('#wm-bl').removeClass('disabled');
  wmark.init({
    /* config goes here */
    "position": "top-left", // default "bottom-right"
    "opacity": 100, // default 50
    "className": "img-polaroid watermark", // default "watermark"
    "path": "/img/nimeregister/badge-wm3.png"
  });
}
function wm_top_right() {
  document.getElementById("wm_image").src = src_img;
  $('#wm-tl').removeClass('disabled');
  $('#wm-tr').addClass('disabled');
  $('#wm-br').removeClass('disabled');
  $('#wm-bl').removeClass('disabled');
  wmark.init({
    /* config goes here */
    "position": "top-right", // default "bottom-right"
    "opacity": 100, // default 50
    "className": "img-polaroid watermark", // default "watermark"
    "path": "/img/nimeregister/badge-wm3.png"
  });
}
function wm_bottom_right() {
  document.getElementById("wm_image").src = src_img;
  $('#wm-tl').removeClass('disabled');
  $('#wm-tr').removeClass('disabled');
  $('#wm-br').addClass('disabled');
  $('#wm-bl').removeClass('disabled');
  wmark.init({
    /* config goes here */
    "position": "bottom-right", // default "bottom-right"
    "opacity": 100, // default 50
    "className": "img-polaroid watermark", // default "watermark"
    "path": "/img/nimeregister/badge-wm3.png"
  });
}
function wm_bottom_left() {
  document.getElementById("wm_image").src = src_img;
  $('#wm-tl').removeClass('disabled');
  $('#wm-tr').removeClass('disabled');
  $('#wm-br').removeClass('disabled');
  $('#wm-bl').addClass('disabled');
  wmark.init({
    /* config goes here */
    "position": "bottom-left", // default "bottom-right"
    "opacity": 100, // default 50
    "className": "img-polaroid watermark", // default "watermark"
    "path": "/img/nimeregister/badge-wm3.png"
  });
}

wm_top_right();

// Social grab.

function get_twitter() {
  document.getElementById("src_image").src = "/img/nimeregister/ajax-100.gif";
  var screen_name = $('.form-control.tw_uname').val();
  var api_url = '{{ site.nimeregister_api }}/api/1/get_profile_picture?'+'source=twitter&username='+screen_name;
  
  $.ajax({
      url : api_url,
      success : function(data)
      {
          src_img = data;
          document.getElementById("src_image").src = src_img;
          wm_top_right();
      },
      error : function()
      {
          src_img = "/img/nimeregister/portraits/ex1.png";
          document.getElementById("src_image").src = src_img;
          wm_top_right();
          alert("Something seems to have gone wrong. Please check that the username is correct and try again.");
      }
  
  });
}

function get_facebook() {
  document.getElementById("src_image").src = "/img/nimeregister/ajax-100.gif";
  var screen_name = $('.form-control.fb_uname').val();
  //src_img = "http://nimeregister.appspot.com/imgconv?img_url="+api_url_1 + screen_name + api_url_2;
  src_img = "http://nimeregister.on.co.ke/imgconv.php?username=" + screen_name;
  
  $.ajax({
  
      url : src_img,
      success : function(data)
      {
          src_img = "data:image/jpg;base64,"+data;
          document.getElementById("src_image").src = src_img;
          wm_top_right();
      },
      error : function()
      {
        src_img = "/img/nimeregister/portraits/ex1.png";
        document.getElementById("src_image").src = src_img;
        wm_top_right();
          alert("Something seems to have gone wrong. Please check that the username is correct and try again.");
      },
  
  });
}

function get_gravatar() {
  document.getElementById("src_image").src = "img/nimeregister/ajax-100.gif";
  var screen_name = $('.form-control.gr_uname').val();
  src_img = "http://nimeregister.on.co.ke/imgconvg.php?email_add=" + screen_name;
  
  $.ajax({
  
      url : src_img,
      success : function(data)
      {
          src_img = "data:image/jpg;base64,"+data;
          document.getElementById("src_image").src = src_img;
          wm_top_left();
      },
      error : function()
      {
        src_img = "/img/nimeregister/portraits/ex1.png";
        document.getElementById("src_image").src = src_img;
        wm_top_right();
          alert("Something seems to have gone wrong. Please check that the username is correct and try again.");
      },
  
  });
}

function loadProfPic(img_url) {
  $.ajax({
  
      url : img_url,
      success : function(data)
      {
        src_img = "data:image/jpg;base64,"+data;
          document.getElementById("src_image").src = src_img;
          wm_top_right();
      },
      error : function()
      {
          alert("Failure!");
      },
  
  });
  
}

function downloadProfilePic() {
  $('#new_window_parameter_1').val(document.getElementById("wm_image").src);
  $('#invisible_form').submit();
}

wm_top_right();

window.onload=function(){
  wm_top_right();
  $("[rel=tooltip]").tooltip();
};
  

function myFunk(data) {
  document.getElementById("src_image").src = "data:image/jpg;base64,"+data;
}


// Nice scrolling page

function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
}

$("#badgelink").click(function(e) { 
      // Prevent a page reload when a link is pressed
    e.preventDefault(); 
      // Call the scroll function
    goToByScroll($(this).attr("id"));           
});
