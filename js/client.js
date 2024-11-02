const logOutBtn = document.querySelector('.logOutBtn');

logOutBtn.addEventListener('click', ()=>{
    console.log('logout');
    localStorage.removeItem('session');
});
//защита от входа без авторизации


if(!localStorage.getItem('session')){
    location.href = '/index.html';
}

else if(JSON.parse(localStorage.getItem('session')).role !== 'client'){
    location.href = '/index.html';
}