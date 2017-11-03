function logout() {
    return $.get('/api/auth/logout')
        .then((data) => {
            if (typeof data.redirect == 'string') {
                window.location.href = window.location.protocol + "//" + window.location.host + data.redirect;
            }
        });
}