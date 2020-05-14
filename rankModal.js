const rankModalExitButton = document.getElementById('js-rank-modal-exit-button');
const rankModalDifficulty = document.querySelectorAll('.rank-modal-difficulty');
const rankTable = document.getElementById('js-rank-table');
const selectedRank = document.querySelector('.rank-selected');

function handleExitModal() {
    rankModal.classList.add('hidden');
}

function getUsers(difficulty) {
    //get raw list
    const recordsStr = localStorage.getItem('records');
    const rawRecords = JSON.parse(recordsStr) || [];
    //filter and sort
    const newRecords = rawRecords.filter(record => record.difficulty === difficulty)
        .sort((a, b) => Number(a.record) - Number(b.record));
    return newRecords;
}


function paintTableHead() {
    const fragment = new DocumentFragment();
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = 'RANK';
    const td2 = document.createElement('td');
    td2.textContent = 'NAME';
    const td3 = document.createElement('td');
    td3.textContent = 'RECORD';
    const td4 = document.createElement('td');
    td4.textContent = 'DATE';
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    fragment.append(tr);
    return fragment;
}


function paintTable(processedRecords) {
    const fragment = new DocumentFragment();
    let rank = 1;
    rankTable.innerHTML = ''; //table 초기화
    const tableHead = paintTableHead();
    rankTable.append(tableHead);
    processedRecords.forEach(record => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = rank;
        tr.append(td1);
        const td2 = document.createElement('td');
        td2.textContent = record.name;
        tr.append(td2);
        const td3 = document.createElement('td');
        td3.textContent = record.record;
        tr.append(td3);
        const td4 = document.createElement('td');
        td4.textContent = record.date.slice(0, 10);
        tr.append(td4);
        fragment.append(tr);
        rank++;
    });
    rankTable.append(fragment);
}

function handleShowTable(e) {
    const target = e.target;
    const selectedDifficulty = target.textContent;
    rankModalDifficulty.forEach(ele => ele.classList.remove('rank-selected'));
    target.classList.add('rank-selected');
    const processedRecords = getUsers(selectedDifficulty);
    paintTable(processedRecords);
}

function init() {
    rankModalExitButton.addEventListener('click', handleExitModal);
    rankModalDifficulty.forEach(ele => ele.addEventListener('click', handleShowTable));
}


init();