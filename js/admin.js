const logOutBtn = document.querySelector('.logOutBtn');
const applications = document.querySelector('.applications');
const clients = document.querySelector('.clients');

const clientAddBtn = clients.querySelector('.clients__add_btn');
const clientAddPopup = clients.querySelector('.clientAdd-popup');
const clientAddPopupForm = clients.querySelector('.clientAdd-form');
const clientAddFormBtn = clientAddPopupForm.querySelector('.clientAdd-form__button');
const clientProjectsTable = clients.querySelector('.clients__table_projects');
const clientProjectsBtn = clients.querySelectorAll('.clients__table_projectsBtn');

//защита от входа без авторизации
if(!localStorage.getItem('session')){
    location.href = '/index.html';
}

else if(JSON.parse(localStorage.getItem('session')).role !== 'admin'){
    location.href = '/index.html';
}




logOutBtn.addEventListener('click', ()=>{
    console.log('logout');
    localStorage.removeItem('session');
});

clientProjectsBtn.forEach(el=>{

    el.addEventListener('click', e=>{
        clients.querySelectorAll('.clients__table_projects').forEach(elem=>{
            elem.style.display = 'none';
        });
        
        e.target.closest('tr').nextElementSibling.style.display = 'flex';
    })

});

clientAddBtn.addEventListener('click', e=>{

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

clientAddFormBtn.addEventListener('click', e => {
    e.preventDefault();
    const form = clientAddFormBtn.closest('form');
    if (form.checkValidity()) {
        validate("addClient",{"type":"company","element":clientAddPopupForm.company},{'type':'login',"element":clientAddPopupForm.login});
    } else {
        form.reportValidity();
    }
});



