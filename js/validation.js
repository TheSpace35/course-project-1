


function validate(formType, ...fields){

    let errors = [];

    





    fields.forEach(field => {
        console.log(formType, field.element);
        switch (formType) {
           
            case 'addClient' || 'editClient':

                switch(field.type){
                    case 'company':
                        break;
                    

                    case 'login':

                        for(admin of JSON.parse(localStorage.getItem('ADMINS'))){

                            if(admin.Login === field.element.value){
                                field.element.nextElementSibling.style.opacity = 1;
                                field.element.nextElementSibling.textContent = 'Логин уже сущетвует';

                                errors.push({type:'login'});
                                break;
                       

                            }
                        }

                        for(client of JSON.parse(localStorage.getItem('CLIENTS'))){

                            if(client.Login === field.element.value){


                                field.element.nextElementSibling.style.opacity = 1;
                                field.element.nextElementSibling.textContent = 'Логин уже сущетвует';
                                errors.push({type:'login'});
                                break;
                            }
                        }

                        if (field.element.value.length < 5 || field.element.value.length > 20) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Логин должен содержать от 5 до 20 символов';
                            errors.push({type: 'loginLength'});
                            break;
                        }

                        const enLettersPattern = /^[a-zA-Z0-9]+$/;
                        if(!enLettersPattern.test(field.element.value)){
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Логин должен содержать только английские буквы';
                            errors.push({type: 'loginLang'});
                            break;
                        }

                        break;

                    

                    case 'phone':

                        const phonePattern = /^\d{11}$/;
                        if(field.element.value[0] === '+') { 
                            field.element.value = field.element.value.slice(1);
                        }
                        if (!phonePattern.test(field.element.value)) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Неверный формат номера телефона';
                            errors.push({type:'phone'});
                            break;
                        }

                        field.element.value = '+' + field.element.value;

                        

                        break;

                     

                    case 'email':

                        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        if (!emailPattern.test(field.element.value)) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Неверный формат электронной почты';
                            errors.push({type:'email'});
                            break;
                        }

                        break;
                    

                }

                break;

            case 'addProject' || 'editProject':

                break;



        }
    });

    return errors;



}


