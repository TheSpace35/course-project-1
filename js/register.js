// система регистрации клиентов


function generatePass() {
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const symbolsArr = symbols.split('');
    let passSymbols = [];
    let nums = 0;
    let symbolsCount = 0;
    let iterations = 0;
  
    while (passSymbols.length < 8 && iterations < 100) {
      let rand = symbolsArr[Math.floor(Math.random() * symbolsArr.length)];
      if (!passSymbols.includes(rand)) {
        if (!isNaN(rand) && nums < 2) {
          nums++;
          passSymbols.push(rand);
        } else if (isNaN(rand) && symbolsCount < 1) {
          symbolsCount++;
          passSymbols.push(rand);
        } else {
          passSymbols.push(rand); 
        }
      }
      iterations++;
    }
  
    if (passSymbols.length < 8) {

      while (passSymbols.length < 8) {
        let rand = symbolsArr[Math.floor(Math.random() * symbolsArr.length)];
        passSymbols.push(rand);
      }
    }
  
    return passSymbols.join('');
  }



function CreateClient(){
    let client = {
                "Id":`${Math.max(...getData('CLIENTS','Id'))+1}`,
                "Company":`${clientAddPopupForm.company.value}`,
                "Login":`${clientAddPopupForm.login.value}`,
                "Password":generatePass(),
                "Projects": "0", //количество проектов клиента
                "Phone":`${clientAddPopupForm.phone.value}`,
                "Email":`${clientAddPopupForm.email.value}`,
                "AcceptCalls":"1"
            }
  
    let clients = JSON.parse(localStorage.getItem('CLIENTS'));
    clients.push(client);
    localStorage.setItem('CLIENTS',JSON.stringify(clients));
    /// ВРЕМЕННО
    console.log(`Логин: ${client.Login} Пароль: ${client.Password}`);
}

