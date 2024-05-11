'Use strict';
const welcome=document.querySelector('.Welcome');
const logoImg = document.querySelector('.logo');
const loginUser = document.querySelector('.login__input--user');
const loginPswd = document.querySelector('.login__input--pin');
const loginBtn = document.querySelector('.login__btn');
const containerApp = document.querySelector('.app');
const blnceLabel= document.querySelector('.balance__label');
const blncDate = document.querySelector('.balance__date');
const dateOf = document.querySelector('.date');
const blnceValue = document.querySelector('.balance__value');
const movementsOf = document.querySelector('.movements')
const movementsRow = document.querySelector('.movements__row');
const movementsDeposit = document.querySelector('.movements__type--deposit');
const movementsWithdrawal = document.querySelector('.movements__type--withdrawal');
const movementsDate = document.querySelector('.movements__date');
const movementsValue = document.querySelector('.movements__value');
const summaryLabel = document.querySelector('.Summary__label');
const summaryValueIn = document.querySelector('.Summary__value--in');
const summaryValueOut = document.querySelector('.Summary__value--out');
const summaryValueInterest = document.querySelector('.Summary__value--interest');
const btnSort = document.querySelector('.btn--sort');
const inputTo = document.querySelector('.form__input--to');
const inputAmount = document.querySelector('.form__input--amount');
const btnTransfer = document.querySelector('.form__btn--transfer');
const loanAmount = document.querySelector('.form__input--loan-amount');
const btnLoan = document.querySelector('.form__btn--loan');
const labelLoan = document.querySelector('.form__label--loan');
const cUser = document.querySelector('.form__input--cuser');
const cPin = document.querySelector('.form__input--cpin');
const btnClose = document.querySelector('.form__btn--closing');
const logoutTimer = document.querySelector('.logout-timer');
const account1 ={
    owner: "Yamini Duvva",
    movements : [100, 200,-150, 1200, -600,-200,400],
    interest: 1.2,
    pin: 1111,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
    ],
    locale : 'en-IN',
};
const account2 = {
    owner: "Vinay Kumar Duvva",
    movements : [500, 1000, -300, 600,-800, 2300, -1600, -180],
    interest: 1,
    pin : 1506,
    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2020-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
      ],
      locale: 'en-IN',
};
const accounts= [account1, account2];

const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  
    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);
  
    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;
  
    return new Intl.DateTimeFormat(locale).format(date);
  };
  

//-------------displaying movements-------------
const displayMovements = function(acc,sort= false){
    movementsOf.innerHTML='';
    const movs = sort? acc.movements.slice().sort((a,b)=>a-b):acc.movements;
    movs.forEach(function(mov, i){
       const type = mov>0? 'deposit': 'withdrawal';
       const date = new Date(acc.movementsDates[i]);
       const displayDate = formatMovementDate(date, acc.locale);
    //    const formattedMov = formatCur(mov, acc.locale, acc.currency);

       const html= `
       <div class="movements__row">
       <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
       <div class="movements__date">${displayDate}</div>
       <div class="movements__value">₹${Math.abs(mov)}</div>
       </div>`
       movementsOf.insertAdjacentHTML('afterbegin', html);
    });
};


//---------------calculating total balance------------/

 const calculatingTotalBalance = function(acc){
     acc.balance = acc.movements.reduce((acc, mov) => acc+mov,0);
    blnceValue.textContent=`₹${acc.balance}`;

 };

 //----------summary balance------------------
 const calculatingSummaryBalance = function (acc){
    const inBalance = acc.movements
        .filter(mov => mov >0)
        .reduce((acc, mov) => acc + mov, 0);
   summaryValueIn.textContent =`₹${inBalance}`;

   const outBalance = acc.movements
        .filter(mov => mov <0)
        .reduce((acc, mov) => acc + mov, 0);
   summaryValueOut.textContent =`₹${Math.abs(outBalance)}`;

   const interest = acc.movements
   .filter(mov => mov>0)
   .map(deposit => deposit*acc.interest/100)
   .filter((int, i, arr) => {
        return int >=1;
   })
   .reduce((acc, int)=>acc+int,0);
   summaryValueInterest.textContent = `₹${interest}`;
   
};


//-------------creating username -------------
const createUsername = function(accs){
    accs.forEach(function(acc) {
        acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map((name) => name[0])
        .join('');
    });
};
createUsername(accounts);
//-------------Login Credentials------------
const displayingUI= function(acc){
    //displaying movements
    displayMovements(acc);
    //displaying balance
    calculatingTotalBalance(acc);
    //displaying summary
    calculatingSummaryBalance(acc);
}
//--------------timer----------------------
const startLogOutTimer = function () {
    const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);
  
      // In each call, print the remaining time to UI
      logoutTimer.textContent = `You will be logged out ${min}:${sec}`;
  
      // When 0 seconds, stop timer and log out user
      if (time === 0) {
        clearInterval(timer);
        welcome.textContent = "Log in to get started";
        containerApp.style.opacity = 0;
      }
  
      // Decrease 1s
      time--;
    };
  
    // Set time to 5 minutes
    let time = 300;
  
    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);
  
    return timer;
  };
  

//----------------login------------------
let currentAccount, timer;
loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    currentAccount=accounts.find(
        (acc) => acc.username===loginUser.value);
    // console.log(currentAccount);
    if (currentAccount?.pin===Number(loginPswd.value)) {
        //displaying UI and message
        welcome.textContent= 
        `Welcome back ,${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;
        const now = new Date();
        const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: 'long',
    };

    blncDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
        loginUser.value=loginPswd.value='';
        loginPswd.blur();
        if (timer) clearInterval(timer);
       timer = startLogOutTimer();

        displayingUI(currentAccount);
    }
});

//-------------------Transfer Amount------------------
btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    const amountTrans = +inputAmount.value;
    const recieverAccount = accounts.find((acc) => acc.username === inputTo.value);
    inputAmount.value=inputTo.value='';
    if(amountTrans>0 && recieverAccount &&
    currentAccount.balance>=amountTrans && 
    recieverAccount?.username!== currentAccount.username){
    currentAccount.movements.push(-amountTrans);
    recieverAccount.movements.push(amountTrans);
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAccount.movementsDates.push(new Date().toISOString());
    displayingUI(currentAccount);
    clearInterval(timer);
    timer = startLogOutTimer();
    } 
});
//----------------------Loan----------------------------
btnLoan.addEventListener('click', function (e){
    e.preventDefault();
    const amount= Math.floor(loanAmount.value);
    if(amount> 0 && currentAccount.movements.some((mov) =>mov>= mov*0.1)){
        setTimeout(function () {
        currentAccount.movements.push(amount);
        currentAccount.movementsDates.push(new Date().toISOString());
        displayingUI(currentAccount);
        clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
    loanAmount.value = '';
});
//------------------close account----------------
btnClose.addEventListener('click', function(e){
    e.preventDefault();
    if(cUser.value===currentAccount.username &&Number(cPin.value)===currentAccount.pin){
        const index= accounts.findIndex(
        acc => acc.username===currentAccount.username);
        console.log(index);
        accounts.splice(index, 1);
        containerApp.style.opacity = 0;
        // containerApp.innerText = `Thanks you! for visting :)`;
        welcome.textContent= `Account closed successfully`;

    }
    cUser.value=cPin.value='';
});
//-----------------button sort--------------------
let sorted = false;
btnSort.addEventListener('click', function(e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted=!sorted;
});

