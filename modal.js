const modal = document.getElementById('js-modal');
const modalOverlay = document.getElementById('js-modal-overlay');
const exitButton = document.getElementById('js-exit-button');
const inputName = document.getElementById('js-input-name');
const submitButton = document.getElementById('js-submit-button');
const msg = document.getElementById('js-message');
let records;


function handleExitModal() {
    modal.classList.add('hidden');
}


function handleSubmit(e) {
    const record = document.getElementById('js-record').textContent;
    const name = inputName.value;
    console.log(name);
    if (name) {
        sendToDB(record, name, difficulty);
        document.getElementById('js-input-name').value = '';
        modal.classList.add('hidden');
    }
    else {
        const defaultMsg = msg.textContent;
        msg.textContent = 'Send your name to keep a record';
        msg.style.color = '#e74c3c';
        setTimeout(function () {
            msg.textContent = defaultMsg;
            msg.style.color = '#95a5a6';
        }, 2000)
    }
}

function sendToDB(record, name, difficulty) {
    console.log(record, name, difficulty)
    //local storage 이용
    const userObj = {
        id: Date.now().toString(),
        name,
        record,
        difficulty,
        date: new Date()
    }
    console.log(records);
    records.push(userObj);
    console.log(records);
    localStorage.setItem('records', JSON.stringify(records));
}

function init() {
    records = JSON.parse(localStorage.getItem('records')) || [];
    exitButton.addEventListener('click', handleExitModal);
    modalOverlay.addEventListener('click', handleExitModal);
    submitButton.addEventListener('click', handleSubmit);
}


init();