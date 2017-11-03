$("#register").submit(function (e) {
    var url = "/api/auth/register"; // the script where you handle the form input.

    $.ajax({
        type: "POST",
        url: url,
        data: $("#register").serialize(), // serializes the form's elements.
        success: function (data) {
            alert(data); // show response from the php script.
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});