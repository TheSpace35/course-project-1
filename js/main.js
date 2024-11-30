InitLocalStorage();



const loginMenuBtn = document.querySelector('.logInBtn');
const loginPopup = document.querySelector('.login-popup');
const loginBtn = loginPopup.querySelector('.login-form__button') || '';

const applicationMenuBtn = document.querySelectorAll('.call-backBtn');
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
            form.reset();
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
        document.querySelectorAll('.application-form__label_error').forEach(e=> e.style.opacity = 0)

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

function createApplication(){
    const form = applicationBtn.closest('form');
    const application = {
        "id":(Math.max(...getData('APPLICATIONS','id')))+1,
        "Name":`${form.name.value}`,
        "Phone":`${form.phone.value}`,
        "Message":`${form.message.value}`,
        "Status":"Не обработано"};
    let applications = JSON.parse(localStorage.getItem('APPLICATIONS'));
    applications.push(application);
    localStorage.setItem('APPLICATIONS',JSON.stringify(applications));

}

/// Обработка кнопки отправки заявки ///

applicationBtn.addEventListener('click', e => {
    e.preventDefault();
    const form = applicationBtn.closest('form');
    form.querySelectorAll('.application-form__label_error').forEach(e=> e.style.opacity = 0);
    if (form.checkValidity()) {
        const validCheck = validate('application',{'type':'name','element':form.name},{'type':'phone','element':form.phone});
        if(!validCheck.length > 0){
            applicationBtn.setAttribute('disabled', 'disabled');
            createApplication();
  
            document.querySelector('.application-form__message').style.opacity = 1;
    
            setTimeout(()=>{
                applicationPopup.classList.remove('active');
                document.querySelector('.form-overlay').style.display = 'none';
                form.reset();
    
            }, 2000)
        }

        else{

            console.log(validCheck);

            validCheck.forEach(el => {

                form.querySelectorAll('.application-form__input').forEach(e => {
                    console.log(e.nextElementSibling);
   
                    if(e.name === el.type){
                        e.nextElementSibling.style.opacity = 1;

                    }
                });
               
            });


        }


    } else {
        form.reportValidity();
    }
});

///





