$(() => {
  const $btn = $("button[type='submit']");
  $("input[type='search']").on("keyup", function () {
    $btn.attr("disabled", $(this).val().length > 0 ? false : true);
  });

  $("form").on("submit", getData);

  function getData(e) {
    e.preventDefault();
    $(
      ".error, .city, .country-code, .weather2, .coor, .temp, .press, .hum"
    ).empty();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/",
      //timeout: 2000,
      beforeSend: function () {
        $(".loader-container").append("<div class='loading'></div>");
      },
      data: {
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        city: $("input[type='search']").val(),
      },
      success: function (response) {
        if (response.success === true) {
          console.log("successfully got the response");
          $(".city").html();
          $(".country-code").html(`Country code : ${response.country_code}`);
          $(".weather2").html(
            `Weather : ${response.weather}, <i>${response.description}</i>`
          );
          $(".coor").html(`Coordinate : ${response.coordinate}`);
          $(".temp").html(`Temp : ${response.temp}`);
          $(".press").html(`Pressure : ${response.pressure}`);
          $(".hum").html(`Humidity : ${response.humidity}`);
        } else {
          console.log("error");
          $(".error").html("The requested city does not exist");
        }
      },
      complete: function () {
        $(".loading").remove();
      },
    });
  }
});
