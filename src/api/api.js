//@flow
import axios from 'axios'
const URL: string = "https://react-note-be61d.firebaseio.com";

export const firebaseApi = {
    removeNote(id: number): Promise<any> {
        return axios.delete(`${URL}/notes/${id}.json`)
    },
    getNotes(): Promise<any> {
        return axios.get(`${URL}/notes.json`)
    },
    addNotes(note: string): Promise<any> {
        return axios.post(`${URL}/notes.json`, note)
    }

}