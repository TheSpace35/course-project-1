//защита от входа без авторизации
if(!localStorage.getItem('session')){
    location.href = '/index.html';
}

else if(JSON.parse(localStorage.getItem('session')).role === 'admin'){
    LoadInfo('admin', location.search);
}

else{

    LoadInfo('client', location.search);

}


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

    console.log(project);
    document.querySelector('.projectTitle').textContent = `${project.ProjectName}`;
    



}