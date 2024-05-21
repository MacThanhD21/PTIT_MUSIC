$(".radio-btn[name=payment1]").on("change", function (e) {
  var value = $(".radio-btn[name=payment1]:checked").val();
  console.log(value);
  if (value == "paypal") {
    var hasclass = $(".paypal-form").hasClass("fadein");
    //  alert("paypal fadein: "+hasclass);
    if (hasclass) {
      console.log("paypal: inside");
      $(".card-form").removeClass("fadeout");
      $(".paypal-form").removeClass("fadein");
      $(".card-form").addClass("fadein");
      $(".paypal-form").addClass("fadeout");
    } else {
      $(".card-form").addClass("fadein");
      $(".paypal-form").addClass("fadeout");
    }
  } else if (value == "mastercard") {
    var hasclass = $(".card-form").hasClass("fadein");
    console.log("master: " + hasclass);
    //  alert("master fadein: "+hasclass);
    if (hasclass) {
      console.log("master: inside");
      $(".card-form").removeClass("fadein");
      $(".paypal-form").removeClass("fadeout");
      $(".paypal-form").addClass("fadein");
      $(".card-form").addClass("fadeout");
    } else {
      $(".paypal-form").addClass("fadein");
      $(".card-form").addClass("fadeout");
    }
  }
});
