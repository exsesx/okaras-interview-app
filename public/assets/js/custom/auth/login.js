$("#login").submit(function (e) {

    var url = "/api/auth/login"; // the script where you handle the form input.

    $.ajax({
        type: "POST",
        url: url,
        data: $("#login").serialize(), // serializes the form's elements.
        success: (data, textStatus, jqXHR) => {
            if (typeof data.redirect == 'string')
                window.location.href = window.location.protocol + "//" + window.location.host + data.redirect;
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});