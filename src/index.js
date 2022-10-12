import './style.css'
import { createSelf } from './functions';
import { deleteSelf } from './functions';
import { projectList } from './functions';
import { createPopUp } from './dommanipulation';
import { makeAllProjects } from './dommanipulation';
import {useData} from './functions'







//composition and its functions below
const createable = (state) => ({
    create: (container) => createSelf(state, container)


})

const addable = (state) => ({
    add: (object) => state.toDos.push(object)
})



const deleteable = (state) => ({
    delete: () => deleteSelf(state, projectList, content)
})


//factory function for creating containers

//project object
export const project = (name, duedate, color, expanded, toDos, description) => {
    let state = {
        toDos: toDos,
        description: description,
        name: name,
        duedate: duedate,
        color: color,
        expanded: expanded,


    }


    return Object.assign(
        {name, duedate, color, content, expanded, toDos, description},
        createable(state),
        addable(state),
        deleteable(state),



    )

}

// to do object
export const toDo = (name, completed, color, duedate) =>{

    let state = {
        name: name,
        color: color,
        completed: completed,
        duedate: duedate,


    }

    return Object.assign(
        {name, completed, color, duedate},
        createable(state),
    )

}

//making projects appear on screen
let storageData = useData()
makeAllProjects(storageData, content)

