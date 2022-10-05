import './style.css'
import { createSelf } from './functions';
import { deleteSelf } from './functions';
import { projectList } from './functions';
import { createPopUp } from './dommanipulation';
import { makeAllProjects } from './dommanipulation';
import {useData} from './functions'


const header = document.getElementById('header');

export const sidebar =  document.getElementById('sidebar')

const content = document.getElementById('content');


let title = document.createElement('div');
title.setAttribute('id', 'sitetitle');
title.textContent = 'To-Do List Website'

header.appendChild(title)


const newToDoButton = document.createElement('button');
newToDoButton.setAttribute('id', 'createnew')
newToDoButton.innerHTML = 'Make New Project'
newToDoButton.onclick = function(){
    createPopUp(content, newToDoButton)
    newToDoButton.disabled = true
}

let sortbyHeading = document.createElement('h3');
sortbyHeading.setAttribute('class', 'ul-heading')
sortbyHeading.innerHTML = 'Sort by:'

let sortBy = document.createElement('ul');
sortBy.setAttribute('id', 'sidebarUL')

let created = document.createElement('li');
created.setAttribute('class', 'sortList')
created.textContent = 'Created'
created.onclick = function(){
    alert('bruh')
    //make new sorted list, makeall projects w/ it
}
sortBy.appendChild(created)

let upcoming = document.createElement('li');
upcoming.setAttribute('class', 'sortList')
upcoming.textContent = 'Upcoming'
upcoming.onclick = function(){
    //make new sorted list, makeall projects w/ it
}
sortBy.appendChild(upcoming)

let alphabetical = document.createElement('li');
alphabetical.setAttribute('class', 'sortList')
alphabetical.textContent = 'Alphabet'
alphabetical.onclick = function(){
    //make new sorted list, makeall projects w/ it
}
sortBy.appendChild(alphabetical)

let allprojectsHeader = document.createElement('h3')
allprojectsHeader.setAttribute('class', 'ul-heading')
allprojectsHeader.textContent = 'All projects'

export let allProjects = document.createElement('ul');
allProjects.setAttribute('id', 'sidebarUL')




sidebar.appendChild(newToDoButton)

sidebar.appendChild(sortbyHeading)
sidebar.appendChild(sortBy)

sidebar.appendChild(allprojectsHeader)
sidebar.appendChild(allProjects)


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

let storageData = useData()
makeAllProjects(storageData, content)

