import axios from 'axios'
// import { firebaseDatabase } from '../App'
const URL = "https://react-note-be61d.firebaseio.com"

export const firebaseApi = {
    removeNote(propjectID, noteID) {
        return axios.delete(`${URL}/notes/${propjectID}/${noteID}.json`)
    },
    getNotes(projectID) {
        return axios.get(`${URL}/notes/${projectID}.json`)
    },
    addNotes(note, projectID) {
        return axios.post(`${URL}/notes/${projectID}.json`, note)
    },
    changeComplete(note, projectID) {
        return axios.patch(`${URL}/notes/${projectID}/${note.id}.json`, { ...note, completed: !note.completed })
    },
    getProjects() {
        return axios.get(`${URL}/projects.json`)
    },
    addProject(project) {
        return axios.post(`${URL}/projects.json`, project)
    },
    removeProject(projectID) {
        return axios.delete(`${URL}/projects/${projectID}.json`)
    },
    addUserToProject(project, userID) {
        return axios.patch(`${URL}/projects/${project.id}/.json`, { ...project, followingUsers: [...project.followingUsers, userID] })
    },
    changeSettings(project, payload) {
        return axios.patch(`${URL}/projects/${project.id}/.json`, { ...project, ...payload })
    },
}