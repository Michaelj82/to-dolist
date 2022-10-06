import { deleteSelf } from "./functions";
import { projectList } from "./functions";
import {adjustFormElements} from "./functions"
import {saveStorage} from './functions';
import { useData } from "./functions";

let storageData = useData()

export const header = document.getElementById('header');

export const sidebar =  document.getElementById('sidebar')

export const content = document.getElementById('content');


let leftsidetitle = document.createElement('div')
leftsidetitle.setAttribute('id', 'leftsidetitle');
let title = document.createElement('div');
title.setAttribute('class', 'title')
title.textContent = 'To-Do List Website'

let subtitle = document.createElement('div');
subtitle.setAttribute('class', 'subtitle');
subtitle.textContent = 'A website made for The Odin Project! Keep track of your To Dos or Projects here!'

leftsidetitle.appendChild(title)
leftsidetitle.appendChild(subtitle)

let rightsidetitle = document.createElement('div')
rightsidetitle.setAttribute('id', 'rightsidetitle')
rightsidetitle.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

header.appendChild(leftsidetitle)
header.appendChild(rightsidetitle)


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
sortBy.setAttribute('id', 'sortbysidebarUL')

let created = document.createElement('li');
created.setAttribute('class', 'sortList')
created.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>' + 'Created'
created.onclick = function(){
    makeAllProjects(storageData, content)
}
sortBy.appendChild(created)

let upcoming = document.createElement('li');
upcoming.setAttribute('class', 'sortList')
upcoming.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' + 'Upcoming'
upcoming.onclick = function(){
    let copied = [...projectList]
    copied.sort(function compare(a, b){
        let dateA = new Date(a.duedate)
        let dateB = new Date(b.duedate)
        return dateA - dateB
    })
    makeAllProjects(copied, content)
}
sortBy.appendChild(upcoming)

let alphabetical = document.createElement('li');
alphabetical.setAttribute('class', 'sortList')
alphabetical.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>' + 'Alphabet'
alphabetical.onclick = function(){
    let alphabetical = [...projectList]
    alphabetical.sort((a, b) => a.name.localeCompare(b.name))

    makeAllProjects(alphabetical, content)

}
sortBy.appendChild(alphabetical)

let allprojectsHeader = document.createElement('h3')
allprojectsHeader.setAttribute('class', 'ul-heading')
allprojectsHeader.textContent = 'All projects'

export let allProjects = document.createElement('ul');
allProjects.setAttribute('id', 'projectsidebarUL')




sidebar.appendChild(newToDoButton)

sidebar.appendChild(sortbyHeading)
sidebar.appendChild(sortBy)

sidebar.appendChild(allprojectsHeader)
sidebar.appendChild(allProjects)





//create from projectList
export function makeAllProjects(list, container){

    container.innerHTML = ''

    allProjects.innerHTML = ''

    let resetButton = document.createElement('li');
    resetButton.textContent = "Show All Projects"
    resetButton.onclick = function(){
        makeAllProjects(projectList, container)
    }
    allProjects.appendChild(resetButton)
    
    for (let i = 0 ; i < projectList.length ; i++){
        let project = projectList[i]
        let name = document.createElement('li');
        name.textContent = project.name
        name.onclick = function(){
            makeAllProjects([project], container)
        }
    
        allProjects.appendChild(name)
    
    }
    


    for (let i=0; i < list.length; i++){
        let project = list[i]

        let projectHTML = document.createElement('div');
        projectHTML.setAttribute('class', 'project');
        projectHTML.style.backgroundColor = project.color

        let expandButton = document.createElement('button');
        expandButton.innerHTML = 'Expand'

        let toDoHolder = document.createElement('div')

        
        if (project.expanded == true){
            for (let i=0; i < project.toDos.length; i++){
                let toDoHTML = document.createElement('div');
                let toDo = project.toDos[i];
                toDoHTML.setAttribute('class', 'toDo');
                
                let nameHTML = document.createElement('div');
                nameHTML.textContent = toDo.name;
                toDoHTML.appendChild(nameHTML)
                
                let dueDateHTML = document.createElement('div');
                dueDateHTML.textContent = toDo.duedate
                toDoHTML.appendChild(dueDateHTML)
    
                toDoHTML.style.backgroundColor = toDo.color
    
                let checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                if (toDo.completed == false){
                    nameHTML.innerHTML = toDo.name
                    checkbox.checked = false
                }else if (toDo.completed == true){
                    nameHTML.innerHTML = toDo.name.strike()
                    checkbox.checked = true
                }
    
                checkbox.onclick = function() {
                    if (toDo.completed == false){
                        nameHTML.innerHTML = toDo.name.strike()
                        toDoHTML.appendChild(checkbox)
                        toDo.completed = true
                        saveStorage(list)
                    }else if (toDo.completed == true){
                        nameHTML.innerHTML = toDo.name
                        toDoHTML.appendChild(checkbox)
                        toDo.completed = false

                        saveStorage(list)
    
    
                    }
                }
    
    
    
                toDoHTML.appendChild(checkbox)
                
                toDoHolder.appendChild(toDoHTML)


    
    
            }
            
            
        }else{

            toDoHolder.innerHTML = ''


        }



        expandButton.onclick = function () {
            if (project.toDos.length >= 1){
                if (project.expanded == false){
                    console.log('open')
                    for (let i=0; i < project.toDos.length; i++){
                        let toDoHTML = document.createElement('div');
                        let toDo = project.toDos[i];
                        toDoHTML.setAttribute('class', 'toDo');
                        
                        let nameHTML = document.createElement('div');
                        nameHTML.textContent = toDo.name;
                        toDoHTML.appendChild(nameHTML)
                        
                        let dueDateHTML = document.createElement('div');
                        dueDateHTML.textContent = toDo.duedate
                        toDoHTML.appendChild(dueDateHTML)
            
                        toDoHTML.style.backgroundColor = toDo.color
            
                        let checkbox = document.createElement('input');
                        checkbox.setAttribute('type', 'checkbox');
                        if (toDo.completed == false){
                            nameHTML.innerHTML = toDo.name
                            checkbox.checked = false
                        }else if (toDo.completed == true){
                            nameHTML.innerHTML = toDo.name.strike()
                            checkbox.checked = true
                        }
            
                        checkbox.onclick = function() {
                            if (toDo.completed == false){
                                nameHTML.innerHTML = toDo.name.strike()
                                toDoHTML.appendChild(checkbox)
                                toDo.completed = true
                                saveStorage(list)
                            }else if (toDo.completed == true){
                                nameHTML.innerHTML = toDo.name
                                toDoHTML.appendChild(checkbox)
                                toDo.completed = false
    
                                saveStorage(list)
            
            
                            }
                        }
            
            
            
                        toDoHTML.appendChild(checkbox)
                        
                        toDoHolder.appendChild(toDoHTML)
            
            
                        project.expanded = true
                        saveStorage(list)

                    }
                    
                    
                }else{
    
                    toDoHolder.innerHTML = ''
    
                    
                    project.expanded = false
                    saveStorage(list)

    
                }
            }else{
                console.log('none')
            }

        saveStorage(list)
        }



        let dueDate = document.createElement('div');
        dueDate.textContent = 'Date due: ' + project.duedate;

        let description = document.createElement('div');
        description.textContent = project.description

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete'
        deleteButton.onclick = function () {
            deleteSelf(i, projectList, container)
        }


        projectHTML.textContent = project.name
        projectHTML.appendChild(deleteButton)

        projectHTML.appendChild(description)
        projectHTML.appendChild(dueDate)
        projectHTML.appendChild(expandButton)

        projectHTML.appendChild(toDoHolder)
        
    
        container.appendChild(projectHTML)

        



    }
    

}

export function createPopUp(container, createbutton){

    let popup = document.createElement('div');
    popup.setAttribute('id', 'popup')

    let removeButton = document.createElement('button')
    removeButton.setAttribute('type', 'button')
    removeButton.setAttribute('id', 'removebutton')
    removeButton.textContent = 'Exit'
    removeButton.onclick = function(){
        container.removeChild(popup)
        createbutton.disabled = false

    }


    let form = document.createElement('form')

    function handleForm(event){event.preventDefault();}

    form.addEventListener('submit', handleForm);

    form.onsubmit = function(){
        container.removeChild(popup)
        createbutton.disabled=false
        console.log(form.elements)
        adjustFormElements(form.elements, container)
        

    }


    let nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('placeholder', 'Name of project')
    nameInput.required = true

    let dateInput = document.createElement('input')
    dateInput.setAttribute('type', 'date')
    dateInput.setAttribute('placeholder', 'Due Date of Project')
    dateInput.required = true

    let colorInput = document.createElement('input')
    colorInput.setAttribute('type', 'color')
    colorInput.setAttribute('placeholder', 'Color')
    colorInput.required = true

    let descriptionInput = document.createElement('textarea')
    descriptionInput.setAttribute('placeholder', 'Description')
    descriptionInput.required = true

    
    let submitButton = document.createElement('input')
    submitButton.setAttribute('type', 'submit')
    submitButton.textContent = 'Submit Here'


    let toDoButton = document.createElement('button')
    toDoButton.setAttribute('type', 'button')
    toDoButton.textContent = 'New To Do'
    toDoButton.onclick = function(){

        let toDoName = document.createElement('input')
        toDoName.setAttribute('type', 'text');
        toDoName.setAttribute('placeholder', 'to do name')
        toDoName.required = true

        let toDoColor = document.createElement('input')
        toDoColor.setAttribute('type', 'color');
        toDoColor.setAttribute('placeholder', 'Color')
        toDoColor.required = true

        let toDoDate = document.createElement('input')
        toDoDate.setAttribute('type', 'date');
        toDoDate.setAttribute('placeholder', 'Date')
        toDoDate.required = true


        let toDoRemove = document.createElement('button')
        toDoRemove.setAttribute('type', 'button')
        toDoRemove.textContent = 'Remove'
        toDoRemove.onclick = function(){
            form.removeChild(toDoName)
            form.removeChild(toDoColor)
            form.removeChild(toDoDate)
            form.removeChild(toDoRemove)
        }

        form.removeChild(submitButton)
        form.appendChild(toDoName)
        form.appendChild(toDoColor)
        form.appendChild(toDoDate)
        form.appendChild(toDoRemove)
        form.appendChild(submitButton)

    }


    
    

    


    form.appendChild(nameInput)
    form.appendChild(dateInput)
    form.appendChild(colorInput)
    form.appendChild(descriptionInput)
    form.appendChild(toDoButton)

    form.appendChild(submitButton)

    popup.appendChild(removeButton)
    popup.appendChild(form)
    container.appendChild(popup)
}

