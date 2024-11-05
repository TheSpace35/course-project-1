InitLocalStorage();

let mode = 'clients';

const logOutBtn = document.querySelector('.logOutBtn');
const applications = document.querySelector('.applications');
const clients = document.querySelector('.clients');

const clientAddBtn = clients.querySelector('.clients__add_btn');
const clientAddPopup = clients.querySelector('.clientAdd-popup');
const clientAddPopupForm = clients.querySelector('.clientAdd-form');
const clientAddFormBtn = clientAddPopupForm.querySelector('.clientAdd-form__button');
const clientAddTable = clients.querySelector('.clients__table');

const applicationsTable = applications.querySelector('.applications__table');

const changeMode = document.querySelector('.changeMode');


//защита от входа без авторизации
if(!localStorage.getItem('session')){
    location.href = '/index.html';
}

else if(JSON.parse(localStorage.getItem('session')).role !== 'admin'){
    location.href = '/index.html';
}



changeMode.addEventListener('click', e=>{

    if(mode === 'clients'){
        e.target.textContent = 'КЛИЕНТЫ';
        document.querySelector('.adminTitle').textContent = 'ЗАЯВКИ';
        clients.style.display = 'none';
        applications.style.display = 'flex';
        initApplications();

        mode = 'applications';
    }
    else{
        e.target.textContent = 'ЗАЯВКИ';
        document.querySelector('.adminTitle').textContent = 'КЛИЕНТЫ';
        clients.style.display = 'flex';
        applications.style.display = 'none';
        initClients();

        mode = 'clients';
    }

    
});





function initClients(){

    clientAddTable.innerHTML = `
    <tr>

        <th>id</th>
        <th>Название компании</th>
        <th>Номер телефона</th>
        <th>Уведомления</th>
        <th>Изменение</th>
        <th>Удаление</th>
        <th>Проекты</th>

    </tr>
    
    `

    const clients = JSON.parse(localStorage.getItem('CLIENTS'));

    clients.forEach(el=>{
        let row = document.createElement('tr');
        row.innerHTML=
        `
            <td>${el.Id}</td>
            <td>${el.Company}</td>
            <td>${el.Phone}</td>
            <td>${el.Projects}</td>
            <td><img src="icons/edit.svg" alt="иконка изменения"></td>
            <td><img src="icons/remove.svg" alt="иконка удаления"></td>
            <td><img class="clients__table_projectsBtn" src="icons/arrow-down.svg" alt="иконка раскрытия"></td>
        
        `;

        let projectsRow = document.createElement('tr');
        projectsRow.classList.add('clients__table_projects');
        projectsRow.innerHTML = 
        `<td colspan="7">
            <table>
                ${JSON.parse(localStorage.getItem('PROJECTS')).filter(project => project.ClientID === el.Id).map(project => {
                    const statusAndNotice = JSON.parse(localStorage.getItem('STATUSES')).find(s => s.ProjectID === project.id) || {};
                    // console.log(project);
                 
                    return `
                    <tr class="clients__table_projects_project">
                        <td class='clients__table_projects_project_id'>${project.id}</td>
                        <td>${project.ProjectName}</td>
                        <td>${statusAndNotice.StatusName}</td>
                        <td>${statusAndNotice.ClientAccept}</td>
                </tr>`
                }).join('')}
                ${JSON.parse(localStorage.getItem('PROJECTS')).filter(project => project.ClientID === el.Id).length === 0 ? `<tr class="clients__table_placeholder"><td rowspan="7">Проектов нет</td></tr>` : ``}

                <tr>
                    <td><button class='clients__table_addProjectBtn btn button'>Добавить проект</button></td>
                </tr>
            </table>

        </td>
        `



        clientAddTable.append(row, projectsRow);

        projectsRow.querySelectorAll('.clients__table_projects_project').forEach(el=>{
            el.addEventListener('click',()=>{
                window.location.href = `./project.html?projectId=${el.querySelector('.clients__table_projects_project_id').textContent}`;
            });
        });
    });

    const clientProjectsBtn = clientAddTable.querySelectorAll('.clients__table_projectsBtn');

    clientProjectsBtn.forEach(el=>{

        el.addEventListener('click', e=>{
            document.querySelectorAll('.clients__table_projects').forEach(elem=>{
                elem.style.display = 'none';
            });
            
            e.target.closest('tr').nextElementSibling.style.display = 'flex';
        })
    
    });
    
};



function initApplications(){

    applicationsTable.innerHTML = `
    <tr>

        <th>id</th>
        <th>Имя</th>
        <th>Телефон</th>
        <th>Статус</th>
        <th>Действие</th>
        <th>Сообщение</th>

    </tr>
    
    `

    const applications = JSON.parse(localStorage.getItem('APPLICATIONS'));

    applications.forEach(el=>{
        let row = document.createElement('tr');
        
        row.innerHTML=
        `
            <td>${el.id}</td>
            <td>${el.Name}</td>
            <td>${el.Phone}</td>
            <td>${el.Status}</td>
            <td><img class="applications__table_${el.Status ==='Не обработано' ? 'CompleteBtn' : 'RemoveBtn'}" src="icons/${el.Status ==='Не обработано' ? 'complete' : 'remove'}.svg" alt="иконка ${el.Status ==='Не обработано' ? 'завершения' : 'удаление'}"></td>
            <td><img class="applications__table_MsgBtn" src="icons/arrow-down.svg" alt="иконка раскрытия"></td>
        
        `;

        let messageRow = document.createElement('tr');
        messageRow.classList.add('applications__table_message');

       // if((el.Message.trim()).length)
       console.log((el.Message.trim()).length);
        messageRow.innerHTML = 
        `
        <td colspan="6">
            <table>
                <tr class="applications__table_message_text"><td rowspan="6">${(el.Message.trim()).length === 0 ? "Дополнительного сообщеня нет" : el.Message}</td></tr>

            </table>

        </td>
        `

        applicationsTable.append(row, messageRow);
    });

    applicationsTable.querySelectorAll('.applications__table_MsgBtn').forEach(el=>{

        el.addEventListener('click', e=>{
            document.querySelectorAll('.applications__table_message').forEach(elem=>{
                elem.style.display = 'none';
            });
            
            e.target.closest('tr').nextElementSibling.style.display = 'flex';
        })
    
    });
    
};





logOutBtn.addEventListener('click', ()=>{
    console.log('logout');
    localStorage.removeItem('session');
});


if(localStorage.getItem('CLIENTS')){
    initClients();

}
else{
    InitLocalStorage();
    initClients();
};

/// Окно добавление клиентов ///

clientAddBtn.addEventListener('click', e=>{
    clientAddFormBtn.removeAttribute('disabled');
    
    document.querySelector('.clientAdd-form__message').style.opacity = 0;

    if (!(clientAddPopup.classList.contains('active'))){
        document.querySelector('.form-overlay').style.display = 'block';
        clientAddPopup.classList.add('active');

    }
});

document.addEventListener('click', e => {
    if (!clientAddPopup.contains(e.target) && !clientAddBtn.contains(e.target)) {
        clientAddPopup.classList.remove('active');
        document.querySelector('.form-overlay').style.display = 'none';
        
    }
});

///


clientAddFormBtn.addEventListener('click', e => {
    e.preventDefault();
    
    const form = clientAddFormBtn.closest('form');
    form.querySelectorAll('.clientAdd-form__label_error').forEach(e=> e.style.opacity = 0);
    if (form.checkValidity()) {
        
        if(!validate("addClient",{"type":"company","element":clientAddPopupForm.company},{"type":"phone","element":clientAddPopupForm.phone},{"type":"email","element":clientAddPopupForm.email},{'type':'login',"element":clientAddPopupForm.login}).length > 0){

            clientAddFormBtn.setAttribute('disabled', 'disabled');
            CreateClient();
            document.querySelector('.clientAdd-form__message').style.opacity = 1;
    
            setTimeout(()=>{
                clientAddPopup.classList.remove('active');
                document.querySelector('.form-overlay').style.display = 'none';
                form.reset();
    
            }, 2000)
            initClients();


        }
    } else {
        form.reportValidity();
    }
});


/// Обработка открытия подменю для заявок ///

const applicationMsgBtn = applications.querySelectorAll('.applications__table_MsgBtn');

applicationMsgBtn.forEach(el=>{

    el.addEventListener('click', e=>{
        document.querySelectorAll('.applications__table_message').forEach(elem=>{
            elem.style.display = 'none';
        });
        
        e.target.closest('tr').nextElementSibling.style.display = 'flex';
    })

});


///


