$(document).ready(function () {
    // ==========================
    // Remember Me Checkbox
    // ==========================
    let rememberMeChecked = true; // Default checked as per design

    const $rememberCheckbox = $('#rememberCheckbox');
    const $rememberCheckboxFilled = $rememberCheckbox.find('.checkbox-filled');

    $rememberCheckbox.on('click', function () {
        rememberMeChecked = !rememberMeChecked;
        updateRememberCheckbox();
    });

    function updateRememberCheckbox() {
        if (rememberMeChecked) {
            $rememberCheckboxFilled.removeClass('unchecked');
        } else {
            $rememberCheckboxFilled.addClass('unchecked');
        }
    }

    // ==========================
    // Robot Checkbox
    // ==========================
    let robotChecked = true;

    const $robotCheckbox = $('#robotCheckbox');
    const $robotCheckboxCheck = $robotCheckbox.find('.checkbox-check');

    $robotCheckbox.on('click', function () {
        robotChecked = !robotChecked;
        updateRobotCheckbox();
    });

    function updateRobotCheckbox() {
        if (robotChecked) {
            $robotCheckboxCheck.css('display', 'flex');
        } else {
            $robotCheckboxCheck.css('display', 'flex');
        }
    }

    // ==========================
    // Form Submission
    // ==========================
    const $signinForm = $('#signinForm');
    const $signinButton = $('#signinButton');

    // Handle both button click and form submit
    $signinButton.on('click', function (e) {
        e.preventDefault();
        handleSignIn();
    });

    $signinForm.on('submit', function (e) {
        e.preventDefault();
        handleSignIn();
    });

    function handleSignIn() {
        const email = $('#email').val();
        const password = $('#password').val();

        // Basic field validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!robotChecked) {
            alert('Please verify that you are not a robot');
            return;
        }

        // Simulate sign-in process
        $signinButton.text('Signing In...').prop('disabled', true);

        setTimeout(function () {
            alert('Sign in successful!');
            $signinButton.text('Sign In').prop('disabled', false);
        }, 2000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ==========================
    // Google Sign-In Button
    // ==========================
    $('.google-button').on('click', function () {
        alert('Google Sign In clicked - integrate with Google OAuth');
    });

    // ==========================
    // Forgot Password Button
    // ==========================
    $('.forgot-password').on('click', function () {
        alert('Forgot password clicked - redirect to password reset page');
    });

    // ==========================
    // Create Account Link
    // ==========================
    $('.create-account-link').on('click', function () {
        alert('Create account clicked - redirect to sign up page');
    });


    // ==========================
    // Input Field Focus Effects
    // ==========================
    $('.input-field input').on('focus', function () {
        $(this).parent().css({
            'border-color': '#A855F7',
            'box-shadow': '0 0 0 3px rgba(168, 85, 247, 0.1)'
        });
    });

    $('.input-field input').on('blur', function () {
        $(this).parent().css({
            'border-color': '#D4D4D8',
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        });
    });

    // ==========================
    // Initialize States
    // ==========================
    updateRememberCheckbox();
    updateRobotCheckbox();
});
