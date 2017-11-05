// todo refactor this.closest('form'), etc

$("#register").submit(function (e) {
    e.preventDefault();

    const url = "/api/auth/register",
        data = $("#register").serialize();

    $.post(url, data).then((data) => {
        if (typeof data.redirect == 'string') {
            window.location.href = window.location.protocol + "//" + window.location.host + data.redirect;
        }
        $(this).closest('form').find("input[type=text], input[type=password], input[type=email]").val("");
        Materialize.updateTextFields();
    }, err => {
        $(this).closest('form').find("input[type=text], input[type=password], input[type=email]").val("");
        Materialize.updateTextFields();;
        console.error(err);
    })
});


//todo validation