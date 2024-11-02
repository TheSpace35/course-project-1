const DB = "js/ClientsInteraction.json";


function InitLocalStorage(){


    fetch(DB)
    .then(response => response.json())
    .then(data => {
        for(elem of data){
            if(elem.type==='table'){

                switch (elem.name){
                    case 'Admins':
                        if(!localStorage.getItem('ADMINS')){
                            localStorage.setItem('ADMINS', JSON.stringify(elem.data));
                        }
                        
                        break;

                    case 'Clients':
                        if(!localStorage.getItem('CLIENTS')){
                            localStorage.setItem('CLIENTS', JSON.stringify(elem.data));
                        }
                        break;

                    case 'Projects':
                        if(!localStorage.getItem('PROJECTS')){
                            localStorage.setItem('PROJECTS', JSON.stringify(elem.data));
                        }
                        break;

                    case 'Applications':
                        if(!localStorage.getItem('APPLICATIONS')){
                            localStorage.setItem('APPLICATIONS', JSON.stringify(elem.data));
                        }
                        break;

                    case 'Statuses':
                        if(!localStorage.getItem('STATUSES')){
                            localStorage.setItem('STATUSES', JSON.stringify(elem.data));
                        }
                        break;

                }
                
            }
        }
    })
    .catch(err => console.error(err));

}






