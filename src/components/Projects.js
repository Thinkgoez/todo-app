import *as React from 'react'
import { NavLink } from 'react-router-dom'

const Projects = ({setCurrentProject, ...props}) => {
    // console.log(props);
    return (
        <>
            { props.projects.length !== 0 ?
                <ul className="list-group">
                    {props.projects.map(project => (
                        <Project key={project.id} project={project} onRemove={props.removeProject} setProject={setCurrentProject} />
                    ))}

                </ul>
                : <div>Здесь пока нету проектов...</div>
            }
        </>
    )
}
const Project = ({ project, setProject, ...props }) => {
    return (
        <div key={project.id} className={'project'} timeout={800}>
            <NavLink to={`/projects/${project.title}`} onClick={()=> setProject(project.id)}>
                <li className={`d-flex list-group-item note`}>
                    <div className='d-flex align-items-center'>
                        <strong>{project.title}</strong>
                        <small>{new Date(project.date).toLocaleString()}</small>
                        <small>{project.description}</small>x
                </div>
                    <div>
                        {/* <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => props.onRemove(project.id)}
                        >
                            &times;  {/* Крестик 
                        </button> */}
                    </div>
                </li>
            </NavLink>
        </div>
    )
}
// <Notes notes={notes} onRemove={(id) => removeNote(id, userID)} onCompleteNote={onChangeCompleteNote} />

export default Projects