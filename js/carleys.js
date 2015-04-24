/* twitter js */
!function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, 'script', 'twitter-wjs');
/* form validation plugin */
$.fn.goValidate = function () {
    var $form = this,
        $inputs = $form.find('input:text');

    var validators = {
        name: {
            regex: /^[A-Za-z]{3,}$/
        },
        pass: {
            regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
        },
        email: {
            regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
        }
    };
    var validate = function (klass, value) {
        var isValid = true,
            error = '';

        if (!value && /required/.test(klass)) {
            error = 'This field is required';
            isValid = false;
        }

        if (isValid == true) {
            klass = klass.split(/\s/);
            console.log(klass);
            $.each(klass, function (i, k) {
                console.log(i);
                console.log(k);
                if (validators[k]) {
                    if (value && !validators[k].regex.test(value)) {
                        isValid = false;
                        error = validators[k].error;
                    }
                }
            });
        }
        return {
            isValid: isValid,
            error: error
        }
    };
    var showError = function ($input) {
        var klass = $input.attr('class'),
            value = $input.val(),
            test = validate(klass, value);
        $input.removeClass('invalid');
        $('#form-error').addClass('hide');

        if (!test.isValid) {
            $input.addClass('invalid');

            if (typeof $input.data("shown") == "undefined" || $input.data("shown") == false) {
                $input.popover('show');
            }

        } else {
            $input.popover('hide');
        }
    };

    $inputs.on('blur', function () {
        showError($(this));
    });

    $inputs.on('shown.bs.popover', function () {
        $(this).data("shown", true);
    });

    $inputs.on('hidden.bs.popover', function () {
        $(this).data("shown", false);
    });

    $form.submit(function (e) {

        $inputs.each(function () { /* test each input */
            if ($(this).is('.required') || $(this).hasClass('invalid')) {
                showError($(this));
            }
        });
        if ($form.find('input.invalid').length) { /* form is not valid */
            e.preventDefault();
            $('#form-error').toggleClass('hide');
        }
    });
    return this;
};
$('form').goValidate();