// система авторизации для клиентов и админов
const loginForm = document.querySelector('.login-form');

function LoginCheck(){

    if (localStorage.getItem('session') != null) {
        let session = JSON.parse(localStorage.getItem('session'));
        if (session.save === true && session.role === 'admin') {
            window.location.href = 'admin.html';
        } else if (session.save === true && session.role === 'client') {
            window.location.href = 'client.html';
        }
    }
    else{
        return Login();
    }

}






function Login(){

    localStorage.removeItem('session');

    let isAuth = 0;

    loginForm.querySelector('.login-form__message').classList.remove('login-form__message_error');

    const dataLogin = loginForm.login.value;
    const dataPassword = loginForm.password.value;
    const dataSave = loginForm.remember.checked;
    console.log(dataSave);


    for(admin of JSON.parse(localStorage.getItem('ADMINS'))){
        if(dataLogin === admin.Login && dataPassword === admin.Password){

            let msg = loginForm.querySelector('.login-form__message');
            msg.classList.remove('login-form__message_error');
            msg.classList.add('login-form__message_notice');
            msg.textContent = "Успешный вход в роли Администратора!";
            msg.style.opacity = 1;

            setTimeout(() => {
                if(dataSave){
                    localStorage.setItem('session', JSON.stringify({'role':"admin",'save':true})); 
                }
                else{
                    localStorage.setItem('session', JSON.stringify({'role':"admin"})); 
                }
                
                location.href = "./admin.html";
                msg.classList.remove('login-form__message_notice');
                msg.style.opacity = 0;
                }, 2000);
            isAuth = 1;
            break;


        }
 
    }

    for(client of JSON.parse(localStorage.getItem('CLIENTS'))){
        if(dataLogin === client.Login && dataPassword === client.Password){

            let msg = loginForm.querySelector('.login-form__message');
            msg.classList.add('login-form__message_notice');
            msg.textContent = "Успешный вход в роли Клиента!";
            msg.style.opacity = 1;
            isAuth = 1;

            setTimeout(() => { 
                console.log(dataSave);
                if(dataSave){
                    localStorage.setItem('session', JSON.stringify({'role':"client",'save':true})); 
                }

                else{
                    localStorage.setItem('session', JSON.stringify({'role':"client"})); 
                }
                location.href = "./client.html";
                msg.classList.remove('login-form__message_notice');
                msg.style.opacity = 0;
                }, 2000);
            break;


        }
 
    }

    if(isAuth === 0){
        let msg = loginForm.querySelector('.login-form__message');
        msg.classList.add('login-form__message_error');
        msg.textContent = "Данные не верны!";
        msg.style.opacity = 1;
    };

};