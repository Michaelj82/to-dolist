import './style.css'
import { createSelf } from './functions';
import { deleteSelf } from './functions';
import { projectList } from './functions';
import { createPopUp } from './dommanipulation';


const header = document.createElement('div');
header.setAttribute('id', 'header');
document.body.appendChild(header)

const content = document.createElement('div');
content.setAttribute('id', 'content');
document.body.appendChild(content)



const newToDoButton = document.createElement('button');
newToDoButton.innerHTML = 'asdf'
newToDoButton.onclick = function(){
    createPopUp(content, newToDoButton)
    newToDoButton.disabled = true
}
header.appendChild(newToDoButton)



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

        //what it can do here



    )

}

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








let ProjectOne = project('Complete ToDolist Project', '9-20-2022', 'green', true, [], 'Here is the description');
ProjectOne.create(content)

let projectOne = toDo('start webpack', false, 'red', '9-24-2022')
ProjectOne.add(projectOne)

let projectTwo = toDo('make logic', false, 'yellow', '9-24-2022')
ProjectOne.add(projectTwo)






let ProjectTwo = project('Daily Goals', '9-20-2022', 'blue', true, [], 'Here is another description');
ProjectTwo.create(content)

let toDoOne = toDo('start coding', false, 'aqua', '9-24-2022')
ProjectTwo.add(toDoOne)

let toDoTwo = toDo('go to bed', false, 'orange', '9-24-2022')
ProjectTwo.add(toDoTwo)



