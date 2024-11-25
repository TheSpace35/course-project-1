
//защита от входа без авторизации


if(!localStorage.getItem('session')){
    location.href = '/index.html';
}

else if(JSON.parse(localStorage.getItem('session')).role !== 'client'){
    location.href = '/index.html';
}

InitLocalStorage();

document.querySelector('.logOutBtn').addEventListener('click', ()=>{
    console.log('logout');
    localStorage.removeItem('session');
    location.href = '/index.html';
});

const settingsBtn = document.querySelector('.settingsBtn');

const clientSettings = document.querySelector('.clientSettings');

const projects = document.querySelector('.projects');

let clientMode = 'projects';


settingsBtn.addEventListener('click', e=>{


    if(clientMode !== 'settings'){

        cProjectName = document.querySelector('.clientCompanyTitle').textContent;
        
        document.querySelector('.clientCompanyTitle').textContent = 'НАСТРОЙКИ';
        projects.style.display = 'none';
        clientSettings.style.display = 'flex';
    
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
    const projectIdList = clientProjects.map(project => project.id);
    document.querySelector('.clientCompanyTitle').textContent = `${clientProjects[0].ProjectName}`;

    let menuItems = document.querySelector('.projectLinks');

    menuItems.innerHTML = '';
    clientProjects.forEach(project => {
        let menuItem = document.createElement('li');
        console.log(projectIdList);
        menuItem.classList.add(`projectLink`);
        menuItem.classList.add(`${parseInt(projectIdList[0])}`);
        projectIdList.slice(1);
        menuItem.textContent = project.ProjectName;
        menuItems.append(menuItem);
    });



    LoadProject(clientProjects[0].id);

    

}


function LoadProject(projectId){

    
    const project = getTable('PROJECTS').find(el => el.id == projectId);

    const statusHistory = JSON.parse(localStorage.getItem('STATUSES')).filter(el => el.ProjectID == projectId);

   
 

   console.log(project.ProjectName);
   // document.querySelector('.projectTitle').textContent = `${project.ProjectName}`;
    document.querySelector('.companyName').textContent = `${JSON.parse(localStorage.getItem('CLIENTS')).find(el => el.Id == project.ClientID).Company}`;
    document.querySelector('.projectDescription').textContent = `${project.ProjectDescription}`;
    document.querySelector('.projectStatus').textContent = `${statusHistory[statusHistory.length-1].StatusName}`;

    statusHistory.forEach(el=>{
        let status = document.createElement('tr');
        if(statusHistory.indexOf(el) === 0){
            status.innerHTML = `
            <td>${el.StatusName}</td>
            <td>${el.Comment}</td>
            <td><img src="/icons/complete.svg" alt="подтвердить"></td>
            <td><img src="/icons/cancel.svg" alt="отклонить"></td>
            `;
        }
        else{

            status.innerHTML = `
            <td>${el.StatusName}</td>
            <td>${el.Comment}</td>
            `;

        }
        document.querySelector('.projectStatusHistory__table').appendChild(status);
        });

}

displayClientProjects(clientId);




