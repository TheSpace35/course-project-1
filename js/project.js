//защита от входа без авторизации
if(!localStorage.getItem('session')){
    location.href = '/index.html';
}

else if(JSON.parse(localStorage.getItem('session')).role === 'admin'){
    if(location.pathname === '/project.html' && parseInt(location.search.split('=')[1])>0){
        LoadInfo('admin', location.search);
    }

}

else if(JSON.parse(localStorage.getItem('session')).role === 'client') {


    if(location.pathname === '/project.html' && parseInt(location.search.split('=')[1])>0){
        LoadInfo('client', location.search);
    }
    

}

document.querySelector('.BackBtn').addEventListener('click', e => {
    e.preventDefault();
    location.href = '/admin.html';
});





/// Добавлене проекта ///

function AddStatus(projectId, statusName='Начат', comment='Начата работа над проектом', statusColor = "#FF4500"){
    let statuses = JSON.parse(localStorage.getItem('STATUSES'));

    let status = {
        "id":`${Math.max(...getData('STATUSES','id'))+1}`,
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

    const id = Math.max(...getData('STATUSES','id'))+1;

    let project = {
        "id":`${id}`,
        "ProjectName":`${projectAddForm.name.value}`,
        "ClientID":`${clientId}`,
        "ProjectDescription":`${projectAddForm.description.value}`,
        "StatusHistory":AddStatus(id)
    }

    let projects = JSON.parse(localStorage.getItem('PROJECTS'));

    projects.push(project);

    localStorage.setItem('PROJECTS',JSON.stringify(projects));
}



///


function LoadInfo(role, projectId){
    projectId = projectId.split('=')[1];
    let project = JSON.parse(localStorage.getItem('PROJECTS'));
    project = project.find(el => el.id == projectId);


    const statusHistory = JSON.parse(localStorage.getItem('STATUSES')).filter(el => el.ProjectID == projectId);

   
 

    console.log(project);
    document.querySelector('.projectTitle').textContent = `${project.ProjectName}`;
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