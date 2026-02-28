frappe.ready(function () {

    // ---- REDIRECT LOGO TO PMS DASHBOARD ----
    function redirectLogo() {
        var $logo = $('a.navbar-brand.navbar-home');
        if ($logo.length) {
            $logo.attr('href', '/app/pms-dashboard');
            $logo.off('click.pms').on('click.pms', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = '/app/pms-dashboard';
            });
        }
    }

    // ---- HIDE HELP DROPDOWN ----
    function hideHelp() {
        $('li.dropdown-help').remove();
    }

    // Run immediately
    redirectLogo();
    hideHelp();

    // Run after delays — Frappe renders navbar dynamically
    setTimeout(function () { redirectLogo(); hideHelp(); }, 300);
    setTimeout(function () { redirectLogo(); hideHelp(); }, 800);
    setTimeout(function () { redirectLogo(); hideHelp(); }, 2000);

    // Re-run on every Frappe page navigation
    $(document).on('page-change', function () {
        redirectLogo();
        hideHelp();
    });

});