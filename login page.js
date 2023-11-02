
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
loginButton.addEventListener( "click" , (e)  =>{
    e.preventDefault();
    


    const username = loginForm.username.value;
    const password = loginForm.password.value;
if(username === "12345" && password === "12345")
{    
    alert('You have successfully logged in.');
    window.location.href ="page1.html"
}
else {
    loginErrorMsg.style.opacity = 1;
}
})