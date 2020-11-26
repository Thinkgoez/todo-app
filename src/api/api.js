//@flow
import axios from 'axios'
const URL: string = "https://react-note-be61d.firebaseio.com";
// can realize method replaceFrom('from)
export const firebaseApi = {
    removeNote(id: string): Promise<any> {
        return axios.delete(`${URL}/notes/${id}.json`)
    },
    getNotes(): Promise<any> {
        return axios.get(`${URL}/notes.json`)
    },
    addNotes(note: string): Promise<any> {
        return axios.post(`${URL}/notes.json`, note)
    },
    changeComplete(note: Object): Promise<any> {
        return axios.patch(`${URL}/notes.json`, { [note.id]: {...note, completed: !note.completed }, })
    }
}