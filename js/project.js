/// Добавлене проекта ///



function AddStatus(projectId, statusName='Начат', comment='Начата работа над проектом', statusColor = "#FF4500"){
    let statuses = JSON.parse(localStorage.getItem('STATUSES'));

    let status = {
        "id":Math.max(...getData('STATUSES','id'))+1,
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
        "id":id,
        "ProjectName":`${projectAddForm.name.value}`,
        "ClientID":clientId,
        "StatusHistory":AddStatus(id)
    }

    let projects = JSON.parse(localStorage.getItem('PROJECTS'));

    projects.push(project);

    localStorage.setItem('PROJECTS',JSON.stringify(projects));
}



///