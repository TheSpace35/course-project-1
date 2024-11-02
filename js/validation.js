


function validate(formType, ...fields){



    fields.forEach(field => {
        switch (formType) {
           
            case 'addClient' || 'editClient':

                switch(field.type){
                    case 'company':
                        console.log(field.element);
                        break;

                    case 'login':

                        for(admin of JSON.parse(localStorage.getItem('ADMINS'))){

                            if(admin.Login === field.element.value){

                                console.log(field.element.nextElementSibling);
                                break;
                            }
                        }

                        for(client of JSON.parse(localStorage.getItem('CLIENTS'))){

                            if(client.Login === field.element.value){

                                console.log(field.element.nextElementSibling);
                                break;
                            }
                        }

                        break;

                }

                break;

            case 'addProject' || 'editProject':

                break;



        }
    });



}

