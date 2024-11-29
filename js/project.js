//защита от входа без авторизации
if(!localStorage.getItem('session')){
    location.href = '/index.html';
}

else if(JSON.parse(localStorage.getItem('session')).role === 'admin'){
    if(location.pathname === '/project.html' && parseInt(location.search.split('=')[1])>0){
        document.querySelector('.BackBtn').addEventListener('click', e => {
            e.preventDefault();
            location.href = '/admin.html';
        });
        LoadInfo(location.search);
    }

}



/// Добавлене проекта ///

function AddStatus(projectId, statusName='Начат', comment='Начата работа над проектом', statusColor = "#FF4500"){
    let statuses = JSON.parse(localStorage.getItem('STATUSES'));

    let status = {
        "id":`${getTable('STATUSES').length === 0 ? 0 : Math.max(...getData('STATUSES','id'))+1}`,
        "StatusName":`${statusName}`,
        "Comment":`${comment}`,
        "ClientAccept":"0",
        "StatusColor":`${statusColor}`,
        "ProjectID":`${projectId}`
    };

    statuses.push(status);

    localStorage.setItem('STATUSES',JSON.stringify(statuses));
    return(projectId);

}

function AddProject(clientId){

    console.log();

    const id = getTable('PROJECTS').length === 0 ? 1 : (Math.max(...getData('PROJECTS','id'))+1);

    console.log(id);

    let project = {
        "id":`${id}`,
        "ProjectName":`${projectAddForm.name.value}`,
        "ClientID":`${clientId}`,
        "ProjectDescription":`${projectAddForm.description.value}`,
        "StatusHistory":AddStatus(id)
    };

    
    let clients = getTable('CLIENTS');
    clients.forEach(client => {
        if (client.Id == clientId) {
            console.log(project);
            client.Projects = (parseInt(client.Projects) + 1).toString();
        }
    });
    localStorage.setItem('CLIENTS', JSON.stringify(clients));

    let projects = getTable("PROJECTS");

    projects.push(project);

    localStorage.setItem('PROJECTS',JSON.stringify(projects));
    console.log(getTable('PROJECTS'));
}



///


function LoadInfo(projectId){
    projectId = projectId.split('=')[1];
    let project = JSON.parse(localStorage.getItem('PROJECTS'));
    project = project.find(el => el.id == projectId);


    const statusHistory = JSON.parse(localStorage.getItem('STATUSES')).filter(el => el.ProjectID == projectId);


    document.querySelector('.projectTitle').textContent = `${project.ProjectName}`;
    document.querySelector('.companyName').textContent = `${JSON.parse(localStorage.getItem('CLIENTS')).find(el => el.Id == project.ClientID).Company}`;
    document.querySelector('.projectDescription').textContent = `${project.ProjectDescription}`;
    document.querySelector('.projectStatus').textContent = `${statusHistory[statusHistory.length-1].StatusName}`;

    statusHistory.forEach(el=>{
        let status = document.createElement('tr');
        if(statusHistory.indexOf(el) === 0){
            console.log(el.ClientAccept);
            status.innerHTML = `
            <td>${el.StatusName}</td>
            <td>${el.Comment}</td>
            <td rowspan="2">${el.ClientAccept === 0 ? 'Не оценено' : el.ClientAccept === 1 ? 'Отклонено' : 'Подтверждено'}</td>
            `;
        }
        else{
            status.innerHTML = `
            <td>${el.StatusName}</td>
            <td>${el.Comment}</td>
            <td>Закрыт</td>
            `;

        }
        document.querySelector('.projectStatusHistory__table').appendChild(status);
        });

};



