


function validate(formType, ...fields){

    let errors = [];

    

    fields.forEach(field => {
        switch (formType) {
           
            case 'addClient' || 'editClient':

                switch(field.type){
                    
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
                            field.element.nextElementSibling.textContent = 'Номер телефона должен соответствовать формату +XXXXXXXXXXX';
                            errors.push({type:'phone'});
                            break;
                        }

                        field.element.value = '+' + field.element.value;

                        

                        break;

                     

                    case 'email':

                        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        if (!emailPattern.test(field.element.value)) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Электронная почта должна соотвествовать nae@email.domain';
                            errors.push({type:'email'});
                            break;
                        }

                        break;
                    

                }

                break;

            case 'addProject' || 'editProject':

                switch(field.type){

                    case 'ProjectName':
                        const projectName = field.element.value;
                        const existProject = getTable('PROJECTS').find(project => project.ProjectName === projectName);
                        if (existProject) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Проект с таким названием существует';
                            errors.push({type:'projectName'});
                            break;
                        }

                };

                break;

            case 'ChangeAdminData' || 'ChangeClientData':

                switch(field.type){

                    case 'login':

                    console.log(field.element.value);

                        if((!field.element.value.trim()) || field.element.value.includes(' ') || field.element.value === field.element.getAttribute('data-value')){

                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Новое значение не указано, информация не будет изменена';
                            errors.push({type:'emptyField'});
                            break;
                        }

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

                    case 'email':

                        if(!field.element.value.trim() || field.element.value.includes(' ')){

                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Новое значение не указано, информация не будет изменена';
                            errors.push({type:'emptyField'});
                            break;
                        }

                        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        if (!emailPattern.test(field.element.value)) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Электронная почта должна соотвествовать nae@email.domain';
                            errors.push({type:'email'});
                            break;
                        }



                        break;

                    case 'phone':

                        if(!field.element.value.trim() || field.element.value.includes(' ')){

                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Новое значение не указано, информация не будет изменена';
                            errors.push({type:'emptyField'});
                            break;
                        }


                        const phonePattern = /^\d{11}$/;
                        if(field.element.value[0] === '+') { 
                            field.element.value = field.element.value.slice(1);
                        }
                        if (!phonePattern.test(field.element.value)) {

                            errors.push({type:'phone'});
                            break;
                        }

                        field.element.value = '+' + field.element.value;

                        break;

                    case 'password':

                        const passwordPattern = /^(?=.*\d.*\d)[A-Za-z\d]{8,}$/;
                        if (!passwordPattern.test(field.element.value)) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Пароль должен состоять из как минимум 8 символов и двух цифр';
                            errors.push({type: 'password'});
                            break;
                        }

                        if(!field.element.value.trim() || field.element.value.includes(' ')){

                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Новое значение не указано, информация не будет изменена';
                            errors.push({type:'emptyField'});
                            break;
                        }

                        

                        break;

                    case 'passwordConfirm':

                        console.log(field.element);

                        if(!field.element.value.trim() || field.element.value.includes(' ')){

                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Пароль не совпадает';
                            errors.push({type:'emptyField'});
                            break;
                        }

                        break;

                }
                break;

            case 'application':

                switch(field.type){


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

                    case 'name':
                        const namePattern = /^[A-Za-z\u0400-\u04FF]*(\s[A-Za-z\u0400-\u04FF]*)*$/;
                        if (!namePattern.test(field.element.value)) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Имя не должно содержать цифр или спец.символов';
                            errors.push({type: 'nameFormat'});
                            break;
                        }

                        break;


                };



            


                break;



        }
    });

    return errors;



}


