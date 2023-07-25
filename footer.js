function emailValidation(input) {
    var valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(input.match(valid)) {
        return true;
    } else {
        alert("The email address you entered is not valid.");
        return false;
    }
}

function nameValidation(input) {
    var valid = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
    if(valid.test(input)) {
        alert("The name provided contains special chracter. Please remove any special characters.");
        return false;
    } else {
        return true;
    }
}

function newsletterSubmit() {
    var userName = document.getElementById("user_name").value;
    var userEmail = document.getElementById("user_email").value;

    if (emailValidation(userEmail) == true && nameValidation(userName) == true) {
        let xhr = new XMLHttpRequest;
        xhr.open("POST", "https://aimeeungersma.com/cgi-bin/newsletter_add.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var json = '{"userName":"' + userName + '","userEmail":"' + userEmail + '"}';
        xhr.send(json);

        alert("Subscription request has been sent.");
    }
    return false;
}

let newsletterForm = document.getElementById("newsletter_form");
newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    newsletterSubmit();
})