InitLocalStorage();

UpdateJSONdb();


const loginMenuBtn = document.querySelector('.loginBtn');
const loginPopup = document.querySelector('.login-popup');
const loginBtn = loginPopup.querySelector('.login-form__button');




loginMenuBtn.addEventListener('click', e=>{

    LoginCheck();

    document.querySelector('.login-form__message').style.opacity = 0;

    if (!(loginPopup.classList.contains('active'))){
        document.querySelector('.form-overlay').style.display = 'block';
        loginPopup.classList.add('active');

    }
});

document.addEventListener('click', e => {
    if (!loginPopup.contains(e.target) && !loginMenuBtn.contains(e.target)) {
        loginPopup.classList.remove('active');
        document.querySelector('.form-overlay').style.display = 'none';
        
    }
});

loginBtn.addEventListener('click', e => {
    e.preventDefault();
    const form = loginBtn.closest('form');
    if (form.checkValidity()) {
        Login();
    } else {
        form.reportValidity();
    }
});





