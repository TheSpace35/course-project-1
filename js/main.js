InitLocalStorage();

const loginMenuBtn = document.querySelector('.loginBtn');
const loginPopup = document.querySelector('.login-popup');
const loginBtn = loginPopup.querySelector('.login-form__button');

const applicationMenuBtn = document.querySelectorAll('.applicationBtn');
const applicationPopup = document.querySelector('.application-popup');
const applicationBtn = applicationPopup.querySelector('.application-form__button');

/// Окно авторизации ///

loginMenuBtn.addEventListener('click', e=>{

    LoginCheck();

    document.querySelector('.login-form__message').style.opacity = 0;

    if (!(loginPopup.classList.contains('active'))){
        loginBtn.removeAttribute('disabled');
        document.querySelector('.form-overlay').style.display = 'block';
        loginPopup.classList.add('active');

    }
});

document.querySelector('.form-overlay').addEventListener('click', e => {
    if (!loginPopup.contains(e.target) && !loginMenuBtn.contains(e.target)) {
        loginPopup.classList.remove('active');
        document.querySelector('.form-overlay').style.display = 'none';
        
    }
});

///

/// Обработка кнопки входа ///

loginBtn.addEventListener('click', e => {
    e.preventDefault();
    const form = loginBtn.closest('form');
    if (form.checkValidity()) {
        Login();
        if(Login() === 1){
            loginPopup.classList.remove('active');
            document.querySelector('.form-overlay').style.display = 'none';
        }

    } else {
        form.reportValidity();
    }
});

///

/// Окно заявки на обратную связь ///
applicationMenuBtn.forEach(el => {
    el.addEventListener('click', e => {
        document.querySelector('.application-form__message').style.opacity = 0;

        if (!applicationPopup.classList.contains('active')) {
            applicationBtn.removeAttribute('disabled');
            document.querySelector('.form-overlay').style.display = 'block';
            applicationPopup.classList.add('active');
        }
    });
});

document.querySelector('.form-overlay').addEventListener('click', e => {
    if (!applicationPopup.contains(e.target) && ![...applicationMenuBtn].some(el => el.contains(e.target))) {
        applicationPopup.classList.remove('active');
        document.querySelector('.form-overlay').style.display = 'none';
    }
});

///

/// Обработка кнопки отправки заявки ///

applicationBtn.addEventListener('click', e => {
    e.preventDefault();
    const form = applicationBtn.closest('form');
    if (form.checkValidity()) {

    } else {
        form.reportValidity();
    }
});

///





