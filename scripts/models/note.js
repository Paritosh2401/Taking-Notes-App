export class Note {               //export es6--to communicate with controller.js;(can be written many times)
    constructor(noteObject) {
        for (let key in noteObject) {
            this[key] = noteObject[key];
        }

        this.isMarked = false;
    }
    toggleMark(){
        this.isMarked=!this.isMarked;
    }
}
//export default Note;   //it sends the original object.(write one time only in a file. )
