import axios from 'axios'
const URL: string = "https://react-note-be61d.firebaseio.com";

export const firebaseApi = {
    deleteNote(id){
        return axios.delete(`${URL}/notes/${id}.json`)
    },
    getNotes(){
        return axios.get(`${URL}/notes.json`)
    }

}