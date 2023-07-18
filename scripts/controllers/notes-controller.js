// controller (i/o)+events +talk to service

import { noteOperations } from '../services/note-service.js';
window.addEventListener('load', init);
function init() {
    showCounts();
    bindEvents();
    disableButton();



}
const enableButton = () => {
    document.querySelector('#delete').disabled = false;
}
const disableButton = () => {
    document.querySelector('#delete').disabled = true;
}
function bindEvents() {
    document.querySelector('#add').addEventListener('click', addNote);
    document.querySelector('#delete').addEventListener('click', deleteMarked);
}
function deleteMarked(){
    
    noteOperations.remove();
    printNotes(noteOperations.getNotes());

}
function showCounts() {
    noteOperations.markTotal() > 0 ? enableButton() : disableButton();
    document.querySelector('#total').innerText = noteOperations.total();
    document.querySelector('#markTotal').innerText = noteOperations.markTotal();
    document.querySelector('#unMarkTotal').innerText = noteOperations.unMarkTotal();
}
function addNote() {
    //read id ,tittle,desc,date of completion,
    // const id = document.querySelector('#id').ariaValueMax;
    //const tittle = document.querySelector('#title').value
    const fields = ['id', 'title', 'desc', 'cd', 'imp'];
    const noteObject = {}; //object literal
    for (let field of fields) {
        //console.log(fields[field])
        noteObject[field] = document.querySelector(`#${field}`).value.trim();
    }
    printNote(noteObject);
    noteOperations.add(noteObject);
    
    showCounts();
}
function printIcon(myClassName = 'trash', fn, id) {
    //<i class="fa-regular fa-trash-can"></i>
    //<i class="fa-regular fa-pen-to-square"></i>
    const iTag = document.createElement('i'); //<i>
    iTag.className = `fa-regular fa-${myClassName} me-5 hand`;
    iTag.addEventListener('click', fn);
    iTag.setAttribute('note-id', id);

    return iTag;
}
function toggleMark() {
    // console.log('Toggle Mark...', this);
    const icon = this;
    const id = this.getAttribute('note-id');
    noteOperations.toggleMark(id);
    // console.log(icon);
    const tr = icon.parentNode.parentNode;
    //tr.className='table-danger';
    tr.classList.toggle('table-danger');
    showCounts();
}
function edit() {
    console.log('edit..');
}
function printNotes(notes){
    const tbody=document.querySelector('#notes');
    tbody.innerHTML='';
    notes.forEach(note =>printNote(note));
    showCounts();
}
function printNote(noteObject) {
    const tbody = document.querySelector('#notes');
    const row = tbody.insertRow(); //<tr>
    for (let key in noteObject) {
        if(key=='isMarked'){
            continue;
        }
        const td = row.insertCell();//<td>
        td.innerText = noteObject[key];
    }

    const td = row.insertCell();
    td.appendChild(printIcon('trash-can', toggleMark, noteObject.id));
    td.appendChild(printIcon('pen-to-square', edit, noteObject.id));

}   
