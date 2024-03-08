const container = document.getElementById("form-container")

const signInHTML = `
<div class="sign-in-container">
    <h2 class="sign-in-title">Sign Into Your Account</h2>
    <p class="sign-in-text">Your account stores all your reindeer roundup information</p>
    <form id="signInForm">
        <input class="form-input" type="text" id="sign-in-email" name="sign-in-email" placeholder="Enter your email"><br>
        <input class="form-input" type="password" id="sign-in-password" name="sign-in-password" placeholder="Enter your password"><br>
        <button class="bg-gn btn-sign-in" type="button" onclick="signInButton(event)">Sign In</button>
    </form>
    <div class="btn-block">
        <button class="btn-as-text" onclick="forgotPassword()">Forgot your password?</button>
        <button class="btn-as-text" onclick="createAccount()">Create an account</button>
    </div>
</div>
`

const createAccountHTML = `
<div class="sign-in-container">
    <h2 class="sign-in-title">Create an Account</h2>
    <p class="sign-in-text">Create an account to store all your reindeer roundup information</p>
    <form id="createAccountForm">
        <input class="form-input" type="text" id="create-email" name="create-email" placeholder="Enter your email"><br>
        <input class="form-input" type="password" id="create-password" name="create-password" placeholder="Enter your password"><br>
        <input class="form-input" type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password"><br>
        <button class="bg-gn btn-sign-in" type="button" onclick="createAccountButton(event)">Create your Account</button>
    </form>
</div>
`

const forgotPasswordHTML = `
<div class="sign-in-container">
    <h2 class="sign-in-title">Forgot your Password?</h2>
    <p class="sign-in-text">Enter your email and we will send you a new temporary password</p>
    <form id="forgotPasswordForm">
        <input class="form-input" type="text" id="forgot-email" name="forgot-email" placeholder="Enter your email"><br>
        <button class="bg-gn btn-sign-in" type="submit" onclick="forgotPasswordButton(event)">Send Email</button>
    </form>
</div>
`

function display(type) {
    container.innerHTML = ''
    switch (type) {
        case 'signIn':
            container.innerHTML = signInHTML
            break
        case 'forgotPass':
            container.innerHTML = forgotPasswordHTML
            break
        case 'createAcc':
            container.innerHTML = createAccountHTML
            break
        default:
            break
    }
}

function signIn() {
    display('signIn')
}

function forgotPassword() {
    display('forgotPass')
}

function createAccount() {
    display('createAcc')
}

function validateEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailPattern.test(email)
}

function signInButton(e) {
    e.preventDefault();

    var email = document.getElementById('sign-in-email').value;
    var password = document.getElementById('sign-in-password').value;

    console.log(email, password);
}

function createAccountButton(e) {
    e.preventDefault();

    var email = document.getElementById('create-email').value;
    var password = document.getElementById('create-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        console.log('Invalid password')
    }

    console.log(email, password, confirmPassword)
}

function forgotPasswordButton(e) {
    e.preventDefault();

    var email = document.getElementById('forgot-email').value;

    console.log(validateEmail(email))
}

function signInRedirect() {
    // change to user panel when implemented
    window.location.href = 'index.html'
}

function isUserSignedIn() {
    return false
}

function initSignInPage() {
    if(isUserSignedIn()) {
        signInRedirect()
    } else {{
        signIn()
    }}
}

initSignInPage()