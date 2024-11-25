InitLocalStorage();

let mode = 'clients';

const logOutBtn = document.querySelector('.logOutBtn');
const applications = document.querySelector('.applications');
const clients = document.querySelector('.clients');

const clientAddBtn = clients.querySelector('.clients__add_btn');
const clientAddPopup = clients.querySelector('.clientAdd-popup');
const clientAddPopupForm = clients.querySelector('.clientAdd-form');
const clientAddFormBtn = clientAddPopupForm.querySelector('.clientAdd-form__button');


const clientEditPopup = document.querySelector('.clientEdit-popup');
const clientEditPopupForm = clientEditPopup.querySelector('.clientEdit-form');
const clientEditFormBtn = clientEditPopupForm.querySelector('.clientEdit-form__button');

const projectEditPopup = document.querySelector('.projectEdit-popup');
const projectEditPopupForm = projectEditPopup.querySelector('.projectEdit-form');
const projectEditFormBtn = projectEditPopupForm.querySelector('.projectEdit-form__button');

const clientAddTable = clients.querySelector('.clients__table');

const projectAddPopup = clients.querySelector('.projectAdd-popup');
const projectAddForm = projectAddPopup.querySelector('.projectAdd-form');
const projectAddFormBtn = projectAddForm.querySelector('.projectAdd-form__button');

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

    console.log();

    clientAddTable.innerHTML = `
    <tr>

        <th>id</th>
        <th>Название компании</th>
        <th>Номер телефона</th>
        <th>Проекты</th>
        <th>Изменение</th>
        <th>Удаление</th>
        <th>Проекты</th>

    </tr>
    
    `

    const clients = JSON.parse(localStorage.getItem('CLIENTS')) || [];

    clients.forEach(el=>{
        let row = document.createElement('tr');
        row.innerHTML=
        `
            <td class='clients__table_id'>${el.Id}</td>
            <td>${el.Company}</td>
            <td>${el.Phone}</td>
            <td>${el.Projects}</td>
            <td><img class='clients__table_edit' src="icons/edit.svg" alt="иконка изменения"></td>
            <td><img class='clients__table_remove' src="icons/remove.svg" alt="иконка удаления"></td>
            <td><img class="clients__table_projectsBtn" src="icons/arrow-down.svg" alt="иконка раскрытия"></td>
        
        `;

        let projectsRow = document.createElement('tr');
        projectsRow.classList.add('clients__table_projects');
        projectsRow.innerHTML = 
        `<td colspan="7">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Статус</th>
                    <th>Уведомления</th>
                    <th>Редактирование</th>
                </tr>
                ${getTable('PROJECTS').filter(project => project.ClientID === el.Id).map(project => {
                    const statusAndNotice = (getTable('STATUSES').find(s => s.ProjectID === project.id) || {});
                 
                    return `
                    <tr class="clients__table_projects_project">
                        <td class='clients__table_projects_project_id'>${project.id}</td>
                        <td class="clients__table_projects_project_name">${project.ProjectName}</td>
                        <td>${statusAndNotice.StatusName}</td>
                        <td>${statusAndNotice.ClientAccept}</td>
                        <td><img src="icons/edit.svg" class="clients__table_projects_project_edit" alt="иконка изменения"></td>
                        
                </tr>`
                }).join('')}
                ${getTable('PROJECTS').filter(project => project.ClientID === el.Id).length === 0 ? `<tr class="clients__table_placeholder"><td rowspan="7">Проектов нет</td></tr>` : ``}

                <tr>
                    <td><button class='clients__table_addProjectBtn btn button'>Добавить проект</button></td>
                </tr>
            </table>

        </td>
        `



        clientAddTable.append(row, projectsRow);

        projectsRow.querySelectorAll('.clients__table_projects_project_id').forEach(el=>{
            el.addEventListener('click',()=>{
                window.location.href = `./project.html?projectId=${el.closest('tr').querySelector('.clients__table_projects_project_id').textContent}`;
            });
        });

        projectsRow.querySelectorAll('.clients__table_projects_project_name').forEach(el=>{
            el.addEventListener('click',()=>{
                window.location.href = `./project.html?projectId=${el.closest('tr').querySelector('.clients__table_projects_project_id').textContent}`;
            });
        });
    });

    const clientProjectsBtn = clientAddTable.querySelectorAll('.clients__table_projectsBtn');

    clientProjectsBtn.forEach(el=>{

        el.addEventListener('click', e=>{
            document.querySelectorAll('.clients__table_projects').forEach(elem=>{
                elem.style.display = 'none';
            });

            clientProjectsBtn.forEach(m => {
                m.style.transform = '';
            })

            e.target.style = `
                transform: rotate(180deg);
            `;
            
            e.target.closest('tr').nextElementSibling.style.display = 'flex';
        })
    
    });

    /// Окно добавление проекта ///
    let clientId = 0;

    document.querySelectorAll('.projectAdd-form__label_error').forEach(e=> e.style.opacity = 0);

    const projectAddBtn = document.querySelectorAll('.clients__table_addProjectBtn');
    projectAddBtn.forEach(btn=>{btn.addEventListener('click', e=>{
        clientId = e.target.closest('tr').closest('td').closest('tr').previousElementSibling.querySelector('.clients__table_id').textContent;
        projectAddFormBtn.removeAttribute('disabled');
        
        document.querySelector('.projectAdd-form__message').style.opacity = 0;

        if (!projectAddPopup.classList.contains('active')){
            document.querySelector('.form-overlay').style.display = 'block';
            projectAddPopup.classList.add('active');
            projectsTable = e.target.closest('.clients__table_projects');
   

        }
    })});

    document.querySelector('.form-overlay').addEventListener('click', e => {
        
        if (!projectAddPopup.contains(e.target) && ![...projectAddBtn].some(el => el.contains(e.target))) {
            projectAddPopup.classList.remove('active');
            clientId = 0;
            document.querySelector('.form-overlay').style.display = 'none';
            
        }
    });

    ///

    /// Обработка кнрпки добавления проекта ///

    projectAddFormBtn.addEventListener('click', e => {
        e.preventDefault();
        const form = e.target.closest('form');
        form.querySelectorAll('.projectAdd-form__label_error').forEach(e=> e.style.opacity = 0);
        if (form.checkValidity()) {
            if(!validate('addProject',{'type':'name','element':form.name}).length > 0){
                e.target.setAttribute('disabled', 'disabled');
                
                document.querySelector('.projectAdd-form__message').style.opacity = 1;
                AddProject(clientId);
        
                setTimeout(()=>{
                    projectAddPopup.classList.remove('active');
                    document.querySelector('.form-overlay').style.display = 'none';
                    initClients();
                    form.reset();
        
                }, 2000)
            }
    
    
        } else {
            form.reportValidity();
        }
    });

    ///

    /// Редактирование клиента ///
    clientAddTable.querySelectorAll('.clients__table_edit').forEach(el => {

        el.addEventListener('click', e => {

            let clients = getTable('CLIENTS');
            const currentClient = clients.find(c => c.Id === el.closest('tr').querySelector('.clients__table_id').textContent);
            if (currentClient) {
                clientEditFormBtn.removeAttribute('disabled');

                document.querySelector('.clientEdit-form__message').style.opacity = 0;

                clientEditPopup.querySelector('.clientEdit-form').Company.value = currentClient.Company;
                clientEditPopup.querySelector('.clientEdit-form').Phone.value = currentClient.Phone;
                clientEditPopup.querySelector('.clientEdit-form').Login.value = currentClient.Login;
                clientEditPopup.querySelector('.clientEdit-form').Email.value = currentClient.Email;

                if (!(clientEditPopup.classList.contains('active'))) {
                    document.querySelector('.form-overlay').style.display = 'block';
                    clientEditPopup.classList.add('active');

                }

                document.querySelector('.form-overlay').addEventListener('click', e => {
                    if (!clientEditPopup.contains(e.target)) {
                        clientEditPopup.classList.remove('active');
                        document.querySelector('.form-overlay').style.display = 'none';

                    }
                });

                clientEditFormBtn.addEventListener('click', e => {
                    e.preventDefault();

                    const form = clientEditFormBtn.closest('form');
                    form.querySelectorAll('.clientEdit-form__label_error').forEach(e => e.style.opacity = 0);
                    if (form.checkValidity()) {

                        if (!validate("editClient", { "type": "company", "element": form.company }, { "type": "phone", "element": form.phone }, { "type": "email", "element": form.email }, { "type": "login", "element": form.login }).length > 0) {

                            clientEditFormBtn.setAttribute('disabled', 'disabled');
                            UpdateFromForm('CLIENTS',currentClient.Id, form);
                            document.querySelector('.clientEdit-form__message').style.opacity = 1;

                            setTimeout(() => {
                                clientEditPopup.classList.remove('active');
                                document.querySelector('.form-overlay').style.display = 'none';
                                form.reset();
                            }, 1000);
                            initClients();

                        }
                    } else {
                        form.reportValidity();
                    }
                });
            }
        });
    });


    ///
    


    /// Удаление клиента //

    clientAddTable.querySelectorAll('.clients__table_remove').forEach(el=>{

        el.addEventListener('click', e=>{
            let projects = getTable('PROJECTS');
            let clients = getTable('CLIENTS');
            projects.forEach(p=>{
                if(p.ClientID === el.closest('tr').querySelector('.clients__table_id').textContent){
                    projects = projects.filter(p => p.id !== el.closest('tr').querySelector('.clients__table_id').textContent);
                    localStorage.setItem('PROJECTS', JSON.stringify(projects));
                }
            });

            clients.forEach(c=>{
                if(c.Id === el.closest('tr').querySelector('.clients__table_id').textContent){
                    clients = clients.filter(c => c.Id !== el.closest('tr').querySelector('.clients__table_id').textContent);
                    localStorage.setItem('CLIENTS', JSON.stringify(clients));
                }
            })
            e.target.closest('tr').nextElementSibling.remove();
            e.target.closest('tr').remove();
            
        });


    });

    ///



    /// Редактирование проекта ///
    clientAddTable.querySelectorAll('.clients__table_projects_project_edit').forEach(el => {

        el.addEventListener('click', e => {

            let projects = getTable('PROJECTS');
            const currentProject = projects.find(p => p.id === el.closest('tr').querySelector('.clients__table_projects_project_id').textContent);
            if (currentProject) {
                projectEditFormBtn.removeAttribute('disabled');

                document.querySelector('.projectEdit-form__message').style.opacity = 0;

                projectEditPopup.querySelector('.projectEdit-form').ProjectName.value = currentProject.ProjectName;
                projectEditPopup.querySelector('.projectEdit-form').ProjectDescription.value = currentProject.ProjectDescription;

                if (!(projectEditPopup.classList.contains('active'))) {
                    document.querySelector('.form-overlay').style.display = 'block';
                    projectEditPopup.classList.add('active');
                }

                document.querySelector('.form-overlay').addEventListener('click', e => {
                    if (!projectEditPopup.contains(e.target)) {
                        projectEditPopup.classList.remove('active');
                        document.querySelector('.form-overlay').style.display = 'none';
                    }
                });

                projectEditFormBtn.addEventListener('click', e => {
                    e.preventDefault();

                    const form = projectEditFormBtn.closest('form');
                    form.querySelectorAll('.projectEdit-form__label_error').forEach(e => e.style.opacity = 0);
                    if (form.checkValidity()) {

                        if (!validate("editProject", { "type": "name", "element": form.name }, { "type": "description", "element": form.description }).length > 0) {

                            projectEditFormBtn.setAttribute('disabled', 'disabled');
                            UpdateFromForm('PROJECTS', currentProject.id, form);
                            document.querySelector('.projectEdit-form__message').style.opacity = 1;

                            setTimeout(() => {
                                projectEditPopup.classList.remove('active');
                                document.querySelector('.form-overlay').style.display = 'none';
                                form.reset();
                            }, 1000);
                            initClients();

                        }
                    } else {
                        form.reportValidity();
                    }
                });
            }
        });
    });


    ///
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
            <td class='applications__table_id'>${el.id}</td>
            <td>${el.Name}</td>
            <td>${el.Phone}</td>
            <td class='applications__table_status'>${el.Status}</td>
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
            applicationsTable.querySelectorAll('.applications__table_message').forEach(elem=>{
                elem.style.display = 'none';
                
            });

            applicationsTable.querySelectorAll('.applications__table_MsgBtn').forEach(m => {
                m.style.transform = '';
            })

            e.target.style = `
                transform: rotate(180deg);
            `;
            
            e.target.closest('tr').nextElementSibling.style.display = 'flex';
        })


    
    });


    /// Закрытие заявки //
    applicationsTable.querySelectorAll('.applications__table_CompleteBtn').forEach(el=>{

        el.addEventListener('click', e=>{
            let applications = getTable('APPLICATIONS');
            applications.forEach(app=>{
                if(app.id === el.closest('tr').querySelector('.applications__table_id').textContent){
                    app.Status = 'Обработано';
                    localStorage.setItem('APPLICATIONS', JSON.stringify(applications));

                }
            });

            e.target.classList.remove('applications__table_CompleteBtn');
            e.target.classList.add('applications__table_RemoveBtn');
            e.target.src = 'icons/remove.svg';
            e.target.closest('tr').querySelector('.applications__table_status').textContent = 'Обработано';
            
            
        });


    });

    ///

    /// Удаление заявки //
    applicationsTable.querySelectorAll('.applications__table_RemoveBtn').forEach(el=>{

        el.addEventListener('click', e=>{
            let applications = getTable('APPLICATIONS');
            applications.forEach(app=>{
                if(app.id === el.closest('tr').querySelector('.applications__table_id').textContent){
                    applications = applications.filter(app => app.id !== el.closest('tr').querySelector('.applications__table_id').textContent);
                    localStorage.setItem('APPLICATIONS', JSON.stringify(applications));

                }
            })
            console.log(e.target.closest('tr'));
            e.target.closest('tr').nextElementSibling.remove();
            e.target.closest('tr').remove();
            
        });


    });

    ///



    
};


logOutBtn.addEventListener('click', ()=>{
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

document.querySelector('.form-overlay').addEventListener('click', e => {
    if (!clientAddPopup.contains(e.target) && !clientAddBtn.contains(e.target)) {
        clientAddPopup.classList.remove('active');
        document.querySelector('.form-overlay').style.display = 'none';
        
    }
});

///

/// Обработка добавления клиента ///
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
///








