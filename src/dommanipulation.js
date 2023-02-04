import { toDo } from ".";
import { deleteSelf } from "./functions";
import { projectList } from "./functions";
import {adjustFormElements} from "./functions"
import {saveStorage} from './functions';

//boxes from index.html
export const header = document.getElementById('header');

export const sidebar =  document.getElementById('sidebar')

export const content = document.getElementById('content');

//login box 
let loginMaker = document.createElement('div');
let signIn = document.createElement('button')
//test
//test
//create left side of header
let leftsidetitle = document.createElement('div')
leftsidetitle.setAttribute('id', 'leftsidetitle');
let title = document.createElement('div');
title.setAttribute('class', 'title')
title.textContent = 'To-Do List Website'

//subtitle beneath title
let subtitle = document.createElement('div');
subtitle.setAttribute('class', 'subtitle');
subtitle.textContent = 'A website made for The Odin Project! Keep track of your To Dos or Projects here!'

leftsidetitle.appendChild(title)
leftsidetitle.appendChild(subtitle)

//right side of header
let rightsidetitle = document.createElement('div')
rightsidetitle.setAttribute('id', 'rightsidetitle')
rightsidetitle.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

//append left and right to header
header.appendChild(leftsidetitle)
header.appendChild(rightsidetitle)

//new Project Button in sidebar
const newToDoButton = document.createElement('button');
newToDoButton.setAttribute('id', 'createnew')
newToDoButton.innerHTML = 'Make New Project'
newToDoButton.onclick = function(){
    createPopUp(content, newToDoButton)
    newToDoButton.disabled = true
}

//text heading within sidebar
let sortbyHeading = document.createElement('h3');
sortbyHeading.setAttribute('class', 'ul-heading')
sortbyHeading.innerHTML = 'Sort by:'

//list of ways to sort within sidebar
let sortBy = document.createElement('ul');
sortBy.setAttribute('id', 'sortbysidebarUL')

//function to sort the projects and make them appear in order of when they were created
let created = document.createElement('li');
created.setAttribute('class', 'sortList')
created.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>' + 'Created'
created.onclick = function(){
    makeAllProjects(projectList, content)
}
sortBy.appendChild(created)

//function to sort the projects and make them appear in order of closest due to latest due
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

//functino to sort the projects and make them appear in alphabetical order
let alphabetical = document.createElement('li');
alphabetical.setAttribute('class', 'sortList')
alphabetical.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>' + 'Alphabet'
alphabetical.onclick = function(){
    let alphabetical = [...projectList]
    alphabetical.sort((a, b) => a.name.localeCompare(b.name))

    makeAllProjects(alphabetical, content)

}
sortBy.appendChild(alphabetical)

//create header to show all projects on left sidebar
let allprojectsHeader = document.createElement('h3')
allprojectsHeader.setAttribute('class', 'ul-heading')
allprojectsHeader.textContent = 'All projects'

//allProjects ul used within functions.js that is updated whenever maekAllProjects is called
export let allProjects = document.createElement('ul');
allProjects.setAttribute('id', 'projectsidebarUL')



//append all elements
sidebar.appendChild(newToDoButton)

sidebar.appendChild(sortbyHeading)
sidebar.appendChild(sortBy)

sidebar.appendChild(allprojectsHeader)
sidebar.appendChild(allProjects)





//create from projectList
export function makeAllProjects(list, container){
    //sets container empty
    container.innerHTML = ''
    //sets sidebar all projects empty
    allProjects.innerHTML = ''

    //button that resets if you click on an individual project and makes them all appear
    let resetButton = document.createElement('li');
    resetButton.textContent = "Show All Projects"
    resetButton.onclick = function(){
        makeAllProjects(projectList, container)
    }
    allProjects.appendChild(resetButton)
    
    //puts in the all projects section an li that show their respective project
    for (let i = 0 ; i < projectList.length ; i++){
        let project = projectList[i]
        let name = document.createElement('li');
        name.textContent = project.name
        name.onclick = function(){
            makeAllProjects([project], container)
        }
    
        allProjects.appendChild(name)
    
    }
    

    //creates the project
    for (let i=0; i < list.length; i++){
        let project = list[i]

        //project div
        let projectHTML = document.createElement('div');
        projectHTML.setAttribute('class', 'project');
        projectHTML.style.backgroundColor = project.color

        //expand button div
        let expandButton = document.createElement('button');
        expandButton.setAttribute('class', 'expand')
        expandButton.innerHTML = 'Expand'

        //div within project div
        let toDoHolder = document.createElement('div')
        toDoHolder.setAttribute('class', 'toDoHolder')

        //making it so if the status of the object expanded is true it will expand on initial creation
        if (project.expanded == true){
            for (let i=0; i < project.toDos.length; i++){
                //all elements
                let toDoHTML = document.createElement('div');
                let toDo = project.toDos[i];
                toDoHTML.setAttribute('class', 'toDo');
                
                let nameHTML = document.createElement('div');
                nameHTML.setAttribute('class', 'toDoName')
                nameHTML.textContent = toDo.name;
                toDoHTML.appendChild(nameHTML)
                
                let dueDateHTML = document.createElement('div');
                dueDateHTML.setAttribute('class', 'toDoDueDate')
                dueDateHTML.textContent = toDo.duedate
                toDoHTML.appendChild(dueDateHTML)
    
                toDoHTML.style.backgroundColor = toDo.color
    
                //checkbox element that crosses out todo name if checked
                let checkbox = document.createElement('input');
                checkbox.setAttribute('class', 'toDoCheckbox')
                checkbox.setAttribute('type', 'checkbox');

                //makes it so its checked on itital creation
                if (toDo.completed == false){
                    nameHTML.innerHTML = toDo.name
                    checkbox.checked = false
                }else if (toDo.completed == true){
                    nameHTML.innerHTML = toDo.name.strike()
                    checkbox.checked = true
                }
                
                //check on click
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


        //expand button that creates To Dos when clicked
        expandButton.onclick = function () {
            if (project.toDos.length >= 1){
                if (project.expanded == false){
                    //creates to Dos
                    for (let i=0; i < project.toDos.length; i++){
                        //containers created
                        let toDoHTML = document.createElement('div');
                        let toDo = project.toDos[i];
                        toDoHTML.setAttribute('class', 'toDo');
                        
                        let nameHTML = document.createElement('div');
                        nameHTML.setAttribute('class', 'toDoName');

                        nameHTML.textContent = toDo.name;
                        toDoHTML.appendChild(nameHTML)
                        
                        let dueDateHTML = document.createElement('div');
                        dueDateHTML.setAttribute('class', 'toDoDueDate');
                        dueDateHTML.textContent = toDo.duedate
                        toDoHTML.appendChild(dueDateHTML)
            
                        toDoHTML.style.backgroundColor = toDo.color
                        
                        //checkbox that crosses out name
                        let checkbox = document.createElement('input');
                        checkbox.setAttribute('class', 'toDoCheckbox')
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
            
            
                        saveStorage(list)

                    }
                    project.expanded = true
                    saveStorage(list)
                    
                    
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

        //project details created 
        let projectName = document.createElement('div');
        projectName.setAttribute('class', 'projectName');
        projectName.textContent = project.name

        let dueDate = document.createElement('div');
        dueDate.setAttribute('class', 'projectDueDate')
        dueDate.textContent = 'Date due: ' + project.duedate;

        let description = document.createElement('div');
        description.setAttribute('class', 'projectDescription')
        description.textContent = project.description

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'projectDelete')
        deleteButton.textContent = 'Delete'
        //deletes self from the screen and list
        deleteButton.onclick = function () {
            deleteSelf(i, projectList, container)
        }


        let projectinfoHolder = document.createElement('div')
        projectinfoHolder.setAttribute('class', 'projectInfoHolder')

        //appending to site
        projectHTML.appendChild(deleteButton)

        projectinfoHolder.appendChild(projectName)

        projectinfoHolder.appendChild(description)
        projectinfoHolder.appendChild(dueDate)
        projectinfoHolder.appendChild(expandButton)
        projectinfoHolder.appendChild(toDoHolder)


        projectHTML.appendChild(projectinfoHolder)


    
        container.appendChild(projectHTML)

        



    }
    

}


//creates Popup that has ability to create new projects
export function createPopUp(container, createbutton){
    //initial div
    let popup = document.createElement('div');
    popup.setAttribute('id', 'popup')

    //button that exits the div and goes back to screen
    let removeButton = document.createElement('button')
    removeButton.setAttribute('type', 'button')
    removeButton.setAttribute('id', 'removeButton')
    removeButton.textContent = 'Exit'
    removeButton.onclick = function(){
        container.removeChild(popup)
        createbutton.disabled = false

    }

    //form for validation
    let form = document.createElement('form')
    form.setAttribute('id', 'projectForm')

    //stops refreshing when submitted
    function handleForm(event){event.preventDefault();}

    form.addEventListener('submit', handleForm);

    form.onsubmit = function(){
        //on submit, gets rid of the popup and creates new project based off input
        container.removeChild(popup)
        createbutton.disabled=false
        adjustFormElements(form.elements, container)
        

    }

    //input for the project name
    let nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('placeholder', 'Name of project')
    nameInput.setAttribute('id', 'newProjectName')
    nameInput.setAttribute('class', 'projectInfo')


    nameInput.required = true

    //input for due date of project
    let dateInput = document.createElement('input')
    dateInput.setAttribute('type', 'date')
    dateInput.setAttribute('placeholder', 'Due Date of Project')
    dateInput.setAttribute('id', 'newProjectDate')
    dateInput.setAttribute('class', 'projectInfo')
    dateInput.required = true

    //color of project div
    let colorInput = document.createElement('input')
    colorInput.setAttribute('type', 'color')
    colorInput.setAttribute('placeholder', 'Color')
    colorInput.setAttribute('id', 'newProjectColor')
    colorInput.setAttribute('class', 'projectInfo')


    colorInput.required = true

    //description of project
    let descriptionInput = document.createElement('textarea')
    descriptionInput.setAttribute('placeholder', 'Description')
    descriptionInput.setAttribute('id', 'newProjectDescription')
    descriptionInput.setAttribute('class', 'projectInfo')

    descriptionInput.required = true

    //button to submit form
    let submitButton = document.createElement('input')
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('id', 'newProjectSubmit')
    submitButton.textContent = 'Submit Here'

    //button to add new To Dos to the submission
    let toDoButton = document.createElement('button')
    toDoButton.setAttribute('type', 'button')
    toDoButton.setAttribute('id', 'newProjectToDo')
    toDoButton.textContent = 'New To Do'
    //onclick, add more elements to the form
    toDoButton.onclick = function(){
        //name
        let toDoName = document.createElement('input')
        toDoName.setAttribute('type', 'text');
        toDoName.setAttribute('class', 'toDoName');
        toDoName.setAttribute('class', 'projectInfo');
        toDoName.setAttribute('placeholder', 'To Do name')
        toDoName.required = true

        //color
        let toDoColor = document.createElement('input')
        toDoColor.setAttribute('type', 'color');
        toDoColor.setAttribute('placeholder', 'Color')
        toDoColor.setAttribute('class', 'toDoColor')
        toDoColor.setAttribute('class', 'projectInfo')

        toDoColor.required = true

        //duedate
        let toDoDate = document.createElement('input')
        toDoDate.setAttribute('type', 'date');
        toDoDate.setAttribute('placeholder', 'Date')
        toDoDate.setAttribute('class', 'toDoDate')
        toDoDate.setAttribute('class', 'projectInfo')

        toDoDate.required = true

        //button that has function to remove the elements created from the form
        let toDoRemove = document.createElement('button')
        toDoRemove.setAttribute('type', 'button')
        toDoRemove.setAttribute('class', 'toDoRemove')
        toDoRemove.setAttribute('class', 'projectInfo')

        toDoRemove.textContent = 'Remove'
        toDoRemove.onclick = function(){
            form.removeChild(toDoName)
            form.removeChild(toDoColor)
            form.removeChild(toDoDate)
            form.removeChild(toDoRemove)
        }

        //add elements and put submit button on bottom
        form.removeChild(submitButton)
        form.appendChild(toDoName)
        form.appendChild(toDoColor)
        form.appendChild(toDoDate)
        form.appendChild(toDoRemove)
        form.appendChild(submitButton)

    }


    
    

    //append to form


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

