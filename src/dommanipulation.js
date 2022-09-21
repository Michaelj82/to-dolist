import { expandableFunction } from "./functions";
import { deleteSelf } from "./functions";
import { projectList } from "./functions";

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
            expandableFunction(project)
        };


        let dueDate = document.createElement('div');
        dueDate.textContent = 'Date due: ' + project.duedate;

        let description = document.createElement('div');
        description.textContent = project.description

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete'
        deleteButton.onclick = function () {
            deleteSelf(project, projectList)
        }


        projectHTML.textContent = project.name
        projectHTML.appendChild(deleteButton)

        projectHTML.appendChild(description)
        projectHTML.appendChild(dueDate)
        projectHTML.appendChild(expandButton)

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


            }
        }
    
    
        container.appendChild(projectHTML)

    }

}

export function createPopUp(container, createbutton){

    let popup = document.createElement('div');
    popup.setAttribute('id', 'popup')

    let removeButton = document.createElement('button')
    removeButton.setAttribute('id', 'removebutton')
    removeButton.textContent = 'Exit'
    removeButton.onclick = function(){
        container.removeChild(popup)
        createbutton.disabled = false

    }


    let form = document.createElement('form')

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

    

    let toDoForm = document.createElement('form')
    let toDoButton = document.createElement('button')
    toDoButton.setAttribute('type', 'button')
    toDoButton.textContent = 'New To Do'
    toDoButton.onclick = function(){
        let toDo = document.createElement('input')
        toDo.setAttribute('type', 'text');
        toDo.setAttribute('placeholder', 'to do name')
        toDoForm.appendChild(toDo)

    }


    
    toDoForm.appendChild(toDoButton)

    


    form.appendChild(nameInput)
    form.appendChild(dateInput)
    form.appendChild(colorInput)
    form.appendChild(toDoForm)

    popup.appendChild(removeButton)
    popup.appendChild(form)
    container.appendChild(popup)
}

function turnIntoList(){
    document.g

}