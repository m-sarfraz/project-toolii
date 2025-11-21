var colorThemes = {
    violet: {
        primary: "#a855f7",
        primaryLight: "#cda3fb",   // lighter fade
        primaryBg: "#eedcff",      // very soft fade
        primaryShadow: "#d9b8ff"   // mid fade
    },
    emerald: {
        primary: "#059669",
        primaryLight: "#42cfa3",   // lighter fade
        primaryBg: "#d9fff2",      // very soft fade
        primaryShadow: "#b9ffe4"   // mid fade
    },
    blue: {
        primary: "#2563eb",
        primaryLight: "#6c92ff",   // lighter fade
        primaryBg: "#e3ecff",      // very soft fade
        primaryShadow: "#c5d4ff"   // mid fade
    }
};


$(document).ready(function () {
    // ==========================
    // Remember Me Checkbox
    // ==========================
    let rememberMeChecked = true; // Default checked as per design

    const $rememberCheckbox = $("#rememberCheckbox");
    const $rememberCheckboxFilled = $rememberCheckbox.find(".checkbox-filled");

    $rememberCheckbox.on("click", function () {
        rememberMeChecked = !rememberMeChecked;
        updateRememberCheckbox();
    });

    function updateRememberCheckbox() {
        if (rememberMeChecked) {
            $rememberCheckboxFilled.removeClass("unchecked");
        } else {
            $rememberCheckboxFilled.addClass("unchecked");
        }
    }

    // ==========================
    // Robot Checkbox
    // ==========================
    let robotChecked = true;

    const $robotCheckbox = $("#robotCheckbox");
    const $robotCheckboxCheck = $robotCheckbox.find(".checkbox-check");

    $robotCheckbox.on("click", function () {
        robotChecked = !robotChecked;
        updateRobotCheckbox();
    });

    function updateRobotCheckbox() {
        if (robotChecked) {
            $robotCheckboxCheck.css("display", "flex");
        } else {
            $robotCheckboxCheck.css("display", "flex");
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ==========================
    // Google Sign-In Button
    // ==========================
    $(".google-button").on("click", function () {
        alert("Google Sign In clicked - integrate with Google OAuth");
    });

    // ==========================
    // Forgot Password Button
    // ==========================
    $(".forgot-password").on("click", function () {
        alert("Forgot password clicked - redirect to password reset page");
    });

    // ==========================
    // Create Account Link
    // ==========================
    // $('.create-account-link').on('click', function () {
    //     alert('Create account clicked - redirect to sign up page');
    // });

    // ==========================
    // Input Field Focus Effects
    // ==========================
    $(".input-field input").on("focus", function () {
        $(this).parent().css({
            "border-color": "#A855F7",
            "box-shadow": "0 0 0 3px rgba(168, 85, 247, 0.1)",
        });
    });

    $(".input-field input").on("blur", function () {
        $(this).parent().css({
            "border-color": "#D4D4D8",
            "box-shadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        });
    });

    // ==========================
    // Initialize States
    // ==========================
    updateRememberCheckbox();
    updateRobotCheckbox();

    // check empty inputs oin form submit
    // ==========================
    // Form Submission
    // ==========================
    const $signupForm = $("#signupForm");
    const $signUpButton = $("#signUpButton");

    $signupForm.on("submit", function (e) {
        e.preventDefault();
        handleSignUp(e);
    });

    $signUpButton.on("click", function (e) {
        e.preventDefault();
        handleSignUp(e);
    });
    const handleSignUp = (e) => {
        e.preventDefault(); // stop page reload

        let hasError = false;
        // Simulate sign-in process
        $signUpButton.text("Signing Up...").prop("disabled", true);

        setTimeout(function () {
            $signUpButton.text("Sign Up").prop("disabled", false);
        }, 2000);
        // Clear old errors
        $(".signUp-error-message").text("");

        $(this)
            .find("input")
            .each(function () {
                let value = $(this).val().trim();
                let errorSpan = $(this).parent().siblings(".signUp-error-message");
                console.log(errorSpan);

                if (value === "") {
                    hasError = true;
                    let fieldName = $(this).attr("placeholder") || $(this).attr("name");
                    errorSpan.text(fieldName + " is required");
                }
            });

        if (!hasError) {
            console.log("Form valid, submit now.");
        }
    };

    const $signInForm = $("#signinForm");
    const $signInButton = $("#signinButton");

    $signInForm.on("submit", function (e) {
        console.log("1");

        e.preventDefault();
        handleSignIn(e);
    });

    $signInButton.on("click", function (e) {
        console.log("2");
        e.preventDefault();
        handleSignIn(e);
    });
    const handleSignIn = (e) => {
        e.preventDefault(); // stop page reload
        let hasError = false;
        // Simulate sign-in process
        $signInButton.text("Signing In...").prop("disabled", true);
        setTimeout(function () {
            $signInButton.text("Sign In").prop("disabled", false);
        }, 2000);
        // Clear old errors
        $(".signIn-error-message").text("");
        $(this)
            .find("input")
            .each(function () {
                console.log("111111");

                let value = $(this).val().trim();
                let errorSpan = $(this)
                    .closest(".input-field")
                    .next(".signIn-error-message");

                if (value === "") {
                    hasError = true;
                    let fieldName = $(this).attr("placeholder") || $(this).attr("name");
                    console.log(fieldName);
                    errorSpan.text(fieldName + " is required");
                }
            });

        if (!hasError) {
            console.log("Form valid, submit now.");
        }
    };
    $(document).ready(function () {
        // Initialize sidebar state based on screen size
        const $sidebar = $(".sidebar");
        const $toggleButton = $(".toggle-sidebar");

        function initializeSidebar() {
            const isMobile = window.innerWidth <= 992;

            if (isMobile) {
                // On mobile: sidebar should be closed by default
                if (!$sidebar.hasClass("active") && !$sidebar.hasClass("closed")) {
                    $sidebar.addClass("closed");
                    $toggleButton.addClass("sidebar-closed");
                }
            } else {
                // On desktop: sidebar should be visible by default
                $sidebar.removeClass("closed");
                $sidebar.addClass("active");
                $toggleButton.removeClass("sidebar-closed");
            }
        }

        // Initialize on page load
        initializeSidebar();

        // Re-initialize on window resize
        $(window).on("resize", function () {
            initializeSidebar();
        });

        $(".toggle-sidebar").on("click", function (e) {
            e.preventDefault();
            const $sidebar = $(".sidebar");
            const $toggleButton = $(this);

            // Toggle sidebar: if closed, open it; if active/open, close it
            if ($sidebar.hasClass("closed")) {
                // Open sidebar - remove closed class and add active
                $sidebar.removeClass("closed");
                $sidebar.addClass("active");
                $toggleButton.removeClass("sidebar-closed");
            } else {
                // Close sidebar - remove active class and add closed
                $sidebar.removeClass("active");
                $sidebar.addClass("closed");
                $toggleButton.addClass("sidebar-closed");
            }
        });
    });
});
