$("#login").submit(function (e) {
    e.preventDefault();

    const url = "/api/auth/login",
        data = $("#login").serialize();

    $.post(url, data).then((data) => {
        if (typeof data.redirect == 'string') {
            window.location.href = window.location.protocol + "//" + window.location.host + data.redirect;
        }
    }, err => {
        $(this).closest('form').find("input[type=text], input[type=password]").val("");
        Materialize.updateTextFields();
    })
});