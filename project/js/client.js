
//защита от входа без авторизации


if(!localStorage.getItem('session')){
    location.href = '/';
}

else if(JSON.parse(localStorage.getItem('session')).role !== 'client'){
    location.href = '/';
}

InitLocalStorage();

document.querySelector('.logOutBtn').addEventListener('click', ()=>{
    localStorage.removeItem('session');
    location.href = '/index.html';
});




document.querySelector('.logOutBtn').addEventListener('click', ()=>{
    localStorage.removeItem('session');
    location.href = '/';
});

const settingsBtn = document.querySelector('.settingsBtn');

const clientSettings = document.querySelector('.clientSettings');
clientSettings.style.display = 'none';

const projects = document.querySelector('.projects');

let clientMode = 'projects';




settingsBtn.addEventListener('click', e=>{


    if(clientMode !== 'settings'){

        cProjectName = document.querySelector('.clientCompanyTitle').textContent;
        
        document.querySelector('.clientCompanyTitle').textContent = 'НАСТРОЙКИ';
        projects.style.display = 'none';
        clientSettings.style.display = 'flex';

        const clientData = getTable('CLIENTS').find(client => client.Id === JSON.parse(localStorage.getItem('session')).id);


        const form = document.querySelector('.settings__layout__form');
        form.login.value = clientData.Login;
        form.email.value = clientData.Email;
        form.phone.value = clientData.Phone;

        /// Изменение данных клиента ///

        document.querySelector('.settings__layout__form_saveBtn_client').addEventListener('click', e=>{
            e.preventDefault();

            const form = document.querySelector('.settings__layout__form');

            const formData = {};
            for (const pair of new FormData(form)) {
                formData[pair[0]] = pair[1];
            }


            
            console.log(validate('ChangeClientData', { "type": "login", "element": form.login },{ "type": "email", "element": form.email },{ "type": "phone", "element": form.password }, { "type": "passwordConfirm", "element": form.passwordConfirm}));


            ChangeUserData('client', JSON.parse(localStorage.getItem('session')).id, {"Login":`${form.login.value}`,"Password":`${form.password.value}`, "Email":`${form.email.value}`, "Phone":`${form.phone.value}`});
            
        });

        ///

    
        clientMode = 'settings';

    }

    else{
        document.querySelector('.clientCompanyTitle').textContent = cProjectName;
        clientSettings.style.display = 'none';
        projects.style.display = 'flex';
    
        clientMode = 'projects';

    }

})




const clientId = window.location.search.split('=')[1];

function displayClientProjects(clientId) {
    
    const projects = JSON.parse(localStorage.getItem('PROJECTS'));
    const clientProjects = projects.filter(project => project.ClientID === clientId);
    let projectIdList = clientProjects.map(project => project.id);
    document.querySelector('.clientCompanyTitle').textContent = `${clientProjects[0].ProjectName}`;

    let menuItems = document.querySelector('.projectLinks');

    menuItems.innerHTML = '';
    clientProjects.forEach(project => {
        let menuItem = document.createElement('li');
        console.log(projectIdList);
        menuItem.classList.add(`projectLink`);
        menuItem.classList.add(`${parseInt(projectIdList[0])}`);
        projectIdList = projectIdList.slice(1);
        console.log(projectIdList);
        menuItem.textContent = project.ProjectName;
        menuItems.append(menuItem);



        menuItem.addEventListener('click', e=>{
            LoadProject(project.id);
            document.querySelectorAll('.projectLink').forEach(el=> {if(el.classList.contains('active')){el.classList.remove('active')}})
            menuItem.classList.add('active');
        });
    });

    const projectLinks = document.querySelectorAll('.projectLink');
    if (projectLinks.length > 0) {
        projectLinks[projectLinks.length - 1].classList.add('active');
    }

    LoadProject(clientProjects[clientProjects.length-1].id);
}


function LoadProject(projectId){

    
    const project = getTable('PROJECTS').find(el => el.id == projectId);

    const statusHistory = JSON.parse(localStorage.getItem('STATUSES')).filter(el => el.ProjectID == projectId);

    console.log(statusHistory);
    


    document.querySelector('.clientCompanyTitle').textContent = `${project.ProjectName}`;
    document.querySelector('.companyName').textContent = `${JSON.parse(localStorage.getItem('CLIENTS')).find(el => el.Id == project.ClientID).Company}`;
    document.querySelector('.projectDescription').textContent = `${project.ProjectDescription}`;
    document.querySelector('.projectStatus').textContent = `${statusHistory[statusHistory.length-1].StatusName}`;
    const statusTable = document.querySelector('.projectStatusHistory__table');
    
    statusTable.innerHTML = '';
    statusHistory.reverse().forEach(el=>{
        if(statusHistory.indexOf(el) > 0 ){



            let status = document.createElement('tr');
            if(statusHistory.indexOf(el) === 1){

                status.innerHTML = `
                <td class="statusName">${el.StatusName}</td>
                <td>${el.Comment}</td>
                ${el.ClientAccept === 0 ? `<td class = 'projectStatusHistory__table__status_acceptBtn_td'><img class="projectStatusHistory__table__status_acceptBtn" src="/icons/complete.svg" alt="подтвердить"></td>
                    <td class = 'projectStatusHistory__table__status_restoreBtn_td'><img class="projectStatusHistory__table__status_restoreBtn" src="/icons/restore.svg" alt="отменить выбор"></td>
                    <td class = 'projectStatusHistory__table__status_denyBtn_td'><img class="projectStatusHistory__table__status_denyBtn"  src="/icons/cancel.svg" alt="отклонить"></td>`

                : `
                <td style="display: none" class = 'projectStatusHistory__table__status_acceptBtn_td'><img class="projectStatusHistory__table__status_acceptBtn" src="/icons/complete.svg" alt="подтвердить"></td> 
                <td style="display: flex" class = 'projectStatusHistory__table__status_restoreBtn_td'><img class="projectStatusHistory__table__status_restoreBtn" src="/icons/restore.svg" alt="отменить выбор"></td>
                <td style="display: none" class = 'projectStatusHistory__table__status_denyBtn_td'><img class="projectStatusHistory__table__status_denyBtn"  src="/icons/cancel.svg" alt="отклонить"></td>
                ` 
                
                }
                `;

                status.querySelector('.statusName').style.color = el.StatusColor;


                /// принятие завешения этапа ///

                status.querySelector('.projectStatusHistory__table__status_acceptBtn').addEventListener('click', elem =>{
                    console.log(status);
                    status.querySelector('.projectStatusHistory__table__status_acceptBtn_td').style.display = 'none';
                    status.querySelector('.projectStatusHistory__table__status_denyBtn_td').style.display = 'none';
                    status.querySelector('.projectStatusHistory__table__status_restoreBtn_td').style.display = 'flex';

                    UpdateFromValue('STATUSES', el.Id, 'ClientAccept', 2);

                });

                ///


                /// Отклонение завершения этапа ///

                status.querySelector('.projectStatusHistory__table__status_denyBtn').addEventListener('click', elem =>{
                    status.querySelector('.projectStatusHistory__table__status_acceptBtn_td').style.display = 'none';
                    status.querySelector('.projectStatusHistory__table__status_denyBtn_td').style.display = 'none';
                    status.querySelector('.projectStatusHistory__table__status_restoreBtn_td').style.display = 'flex';

                    UpdateFromValue('STATUSES', el.Id, 'ClientAccept', 1);
                });

                ///


                /// Отмена выбора ///

                status.querySelector('.projectStatusHistory__table__status_restoreBtn').addEventListener('click', elem =>{
                    status.querySelector('.projectStatusHistory__table__status_restoreBtn_td').style.display = 'none';
                    status.querySelector('.projectStatusHistory__table__status_acceptBtn_td').style.display = 'flex';
                    status.querySelector('.projectStatusHistory__table__status_denyBtn_td').style.display = 'flex';


                    UpdateFromValue('STATUSES', el.Id, 'ClientAccept', 0);
                });



                ///
            }
            else{
                status.innerHTML = `
                <td class="statusName">${el.StatusName}</td>
                <td colspan="2">${el.Comment}</td>
                `;

                status.querySelector('.statusName').style.color = el.StatusColor;
            }

            document.querySelector('.projectStatusHistory__table').appendChild(status);
            
        }

        else if(statusHistory.length === 1){
            let status = document.createElement('tr');
            status.innerHTML = `
            <td colspan="3">История статусов пуста</td>
            `;
      
            document.querySelector('.projectStatusHistory__table').appendChild(status);

        
        }
        
    })


}

displayClientProjects(clientId);


