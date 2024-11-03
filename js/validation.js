


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
                                field.element.nextElementSibling.textContent = 'Логин уже сущетвует!';

                                errors.push({type:'login'});
                                break;
                       

                            }
                        }

                        for(client of JSON.parse(localStorage.getItem('CLIENTS'))){

                            if(client.Login === field.element.value){


                                field.element.nextElementSibling.style.opacity = 1;
                                field.element.nextElementSibling.textContent = 'Логин уже сущетвует!';
                                errors.push({type:'login'});
                                break;
                            }
                        }

                        break;

                    

                    case 'phone':

                        const phonePattern = /^\d{11}$/;
                        if(field.element.value[0] === '+') { 
                            field.element.value = field.element.value.slice(1);
                        }
                        if (!phonePattern.test(field.element.value)) {
                            field.element.nextElementSibling.style.opacity = 1;
                            field.element.nextElementSibling.textContent = 'Логин уже сущетвует!';
                            errors.push({type:'phone'});
                            break;
                        }

                        field.element.value = '+' + field.element.value

                        

                        break;

                     

                    case 'email':

                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(field.element.value)) {
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


