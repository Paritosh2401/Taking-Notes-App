//To perform CRUD operations...
import { Note } from '../models/note.js'
export const noteOperations = {
    notes: [],
    add(noteObject) {
        const note = new Note(noteObject);
        this.notes.push(note);
    },
    searchById(id) {
        return this.notes.find(note => note.id==id);
    },
    toggleMark(id) {
        
       // const noteObject = this.searchById(id);
        //noteObject.isMarked = !noteObject.isMarked;
        this.searchById(id).toggleMark();
    },
    total() {
        return this.notes.length;

    },
    markTotal() {
        return this.notes.filter(note=>note.isMarked).length;
    },
    unMarkTotal() {
        return this.total() - this.markTotal();
    },
    getNotes(){
        return this.notes;
    },
    remove(){
      this.notes= this.notes.filter(note=>!note.isMarked);
    },

}
//For Delete Operation
// 1.Icon must be clickable
//2.add click event(this) -Icon ->parent->TD -> parent-> TR ,TR color set  Red.
//3.Every Object has a key Marked = false
//4.Icon has Id ,so Fetch the id and search it in Array e.g find, U get an object, object is marked=true.
//5.Count mark - count those object in an array whose is marked =true , Opposite UnMark
//total-Count Mark
//Delete button by default disable
//When Count mark>0 then only delete button enable.
//when Delete button click so it will delete those records
//whose is  marked =true
//Hint : filter