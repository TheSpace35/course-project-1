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


/// Получение данных из localStorage
function getData(tableName, field){
    let data = [];
    const table = JSON.parse(localStorage.getItem(tableName));
    table.forEach(element => {
        console.log(typeof parseInt(element[field]));
        data.push(parseInt(element[field]));
    });

    console.log(data);

    return data;
};

/// 


/// Получение таблицы из localStorage
function getTable(tableName){
    const table = JSON.parse(localStorage.getItem(tableName));
    return table;
};

/// 


/// Перезапись таблицы из localStorage
function updateTable(tableName, newData){
    localStorage.setItem(tableName, JSON.stringify(newData));
};

/// 

/// Обновление таблицы

function UpdateFromForm(tableName, id, form){

    const table = getTable(tableName);

    console.log(table);



    let updateElementIndex = 0;
    if(form.name === 'projectEdit'){
        updateElementIndex = table.findIndex(element => element.id === id);
        console.log(updateElementIndex);

    }

    else{
        updateElementIndex = table.findIndex(element => element.Id === id);
    }

    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
        if(key === 'passReset' && form.name === 'clientEdit'){
            if (value === 'on') {
                table[updateElementIndex]['Password'] = generatePass();
            }
        }
        else{
            table[updateElementIndex][key] = value;
            console.log(table[updateElementIndex][key]);
            console.log(key);
        }
    }

    console.log(table);

    updateTable(tableName, table);

}

///






