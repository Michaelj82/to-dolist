import { deleteSelf } from "./functions";
import { projectList } from "./functions";
import {adjustFormElements} from "./functions"

//create from projectList
export function makeAllProjects(list, container){

    container.innerHTML = ''


    for (let i=0; i < list.length; i++){
        let project = list[i]

        let projectHTML = document.createElement('div');
        projectHTML.setAttribute('class', 'project');
        projectHTML.style.backgroundColor = project.color

        let expandButton = document.createElement('button');
        expandButton.innerHTML = 'Expand'
        expandButton.onclick = function () {
            if (project.expanded == true){



                for (let i=0; i < project.toDos.length; i++){
                    let toDo = project.toDos[i];
                    let toDoHTML = document.createElement('div');
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
                        }else if (toDo.completed == true){
                            nameHTML.innerHTML = toDo.name
                            toDoHTML.appendChild(checkbox)
                            toDo.completed = false
    
    
                        }
                    }
    
    
    
                    toDoHTML.appendChild(checkbox)
    
    
                    projectHTML.appendChild(toDoHTML)

                    project.expanded = false
    
    
                }
            }else{

                //MICHAEL CURRENTLY THE LAST ISSUE BEFORE STYLING!!

                if (project.toDos.length > 0){
                    for (let i = 0; i < project.toDos.length; i++){
                        projectHTML.removeChild(projectHTML.lastElementChild)
                    }
                }
                
                project.expanded = true

            }

        };

        // if (project.expanded == true){
            
        // }


        let dueDate = document.createElement('div');
        dueDate.textContent = 'Date due: ' + project.duedate;

        let description = document.createElement('div');
        description.textContent = project.description

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete'
        deleteButton.onclick = function () {
            deleteSelf(project, projectList, container)
        }


        projectHTML.textContent = project.name
        projectHTML.appendChild(deleteButton)

        projectHTML.appendChild(description)
        projectHTML.appendChild(dueDate)
        projectHTML.appendChild(expandButton)

        
    
    
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

