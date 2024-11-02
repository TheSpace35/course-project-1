// система регистрации клиентов

function gettData(tableName, field){
    let data = [];
    const table = JSON.parse(localStorage.getItem(tableName));
    table.forEach(element => {
        data.push(parseInt(element[field]));
    });

    return data;
};

function generatePass(){

    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const symbolsArr = symbols.split('');
    let passSymbols = [];
    let nums = 0;
    let symbolsCount = 0;

    while(passSymbols.length < 8){
        let rand = symbolsArr[Math.floor(Math.random() * symbolsArr.length)];
        if(!passSymbols.includes(rand)){
            if(!isNaN(rand) && nums < 2){
                nums++;
                passSymbols.push(rand);
            }
            else if(isNaN(rand) && symbolsCount < 1){
                symbolsCount++;
                passSymbols.push(rand);
            }
        }
    }
    return passSymbols.join('');
}








function CreateClient(){
    let client = {"Id":Math.max(gettData('CLIENTS','Id'))+1,
                "Company":`${clientAddPopupForm.company}`,
                "Login":`${clientAddPopupForm.login}`,
                "Password":generatePass(),
                "Projects":'0', //количество проектов клиента
                "Phone":`${clientAddPopupForm.phone}`,
                "Email":`${clientAddPopupForm.emaily}`,
                "AcceptCalls":"1"
            }

    let clients = JSON.parse(localStorage.getItem('CLIENTS'));
    clients.push(client);
    localStorage.setItem('CLIENTS',JSON.stringify(clients));
}

