function InitLocalStorage(){


    fetch('js/ClientsInteraction.json')
    .then(response => response.json())
    .then(data => {
        for(elem of data){
            if(elem.type==='table'){

                switch (elem.name){
                    case 'Admins':
                        localStorage.setItem('ADMINS', JSON.stringify(elem.data));
                        break;

                    case 'Clients':
                        localStorage.setItem('CLIENTS', JSON.stringify(elem.data));
                        break;

                    case 'Projects':
                        localStorage.setItem('PROJECTS', JSON.stringify(elem.data));
                        break;

                    case 'Applications':
                        localStorage.setItem('APPLICATIONS', JSON.stringify(elem.data));
                        break;

                    case 'Statuses':
                        localStorage.setItem('STATUSES', JSON.stringify(elem.data));
                        break;

                }
                
            }
        }
    })
    .catch(err => console.error(err));

}

function UpdateJSONdb() {
    const data = [];

    const tables = ['ADMINS', 'CLIENTS', 'PROJECTS', 'APPLICATIONS', 'STATUSES'];

    tables.forEach(table => {
        const tableData = localStorage.getItem(table);
        if (tableData) {
            data.push({
                type: 'table',
                name: table.toLowerCase(),
                data: JSON.parse(tableData)
            });
        }
    });

    return data;
}
