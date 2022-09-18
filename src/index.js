import './style.css'

const header = document.createElement('div');
header.setAttribute('id', 'header');
document.body.appendChild(header)

const content = document.createElement('div');
content.setAttribute('id', 'content');
document.body.appendChild(content)



const newToDoButton = document.createElement('button');
newToDoButton.innerHTML = 'asdf'
newToDoButton.onclick = function(){
    alert('bruh')
}
header.appendChild(newToDoButton)


let projectList = [];


//create from projectList
function makeAllProjects(list, container){

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


        projectHTML.textContent = project.name
        projectHTML.appendChild(description)
        projectHTML.appendChild(dueDate)
        projectHTML.appendChild(expandButton)

        if (project.expanded == true){


            for (let i=0; i < project.toDos.length; i++){
                let toDo = project.toDos[i];
                let toDoHTML = document.createElement('div');
                toDoHTML.setAttribute('class', 'toDo');
                toDoHTML.textContent = toDo.name
                toDoHTML.style.backgroundColor = toDo.color

                let checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                if (toDo.completed == false){
                    toDoHTML.innerHTML = toDo.name
                    checkbox.checked = false
                }else if (toDo.completed == true){
                    toDoHTML.innerHTML = toDo.name.strike()
                    checkbox.checked = true
                }

                checkbox.onclick = function() {
                    if (toDo.completed == false){
                        toDoHTML.innerHTML = toDo.name.strike()
                        toDoHTML.appendChild(checkbox)
                        toDo.completed = true
                    }else if (toDo.completed == true){
                        toDoHTML.innerHTML = toDo.name
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


//expandable function
function expandableFunction(item){
    if (item.expanded == false){
        for (let i=0; i < projectList.length; i++){
            if (projectList[i] == item){
                item.expanded = true;
                projectList[i].expanded = true;
            }
        }
        makeAllProjects(projectList, content)
    }else if (item.expanded == true){
        for (let i=0; i < projectList.length; i++){
            if (projectList[i] == item){
                item.expanded = false;
                projectList[i].expanded = false;
            }
        }
        makeAllProjects(projectList, content)
    }
}


//create Project function
function createSelf(project, container){


    projectList.push(project)
    makeAllProjects(projectList, container)

}



//composition and its functions below
const createable = (state) => ({
    create: (container) => createSelf(state, container)


})

const addable = (state) => ({
    add: (object) => state.toDos.push(object)
})

const expandable = (state) => ({
    expand : () => expandableFunction(state)

})

const deleteable = (state) => ({
    //do html once avilable
    // delete : () =>
})

//factory function for creating containers

const project = (name, duedate, color, expanded, toDos, description) => {
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
        expandable(state),
        // deleteable(state),

        //what it can do here



    )

}

const toDo = (name, completed, color) =>{

    let state = {
        name: name,
        color: color,
        completed: completed,


    }

    return Object.assign(
        {name, completed, color},
        createable(state),
        // deleteable(state),
    )

}








let ProjectOne = project('Complete ToDolist Project', '9-20-2022', 'green', false, [], 'Here is the description');
ProjectOne.create(content)

let projectOne = toDo('start webpack', false, 'red')
ProjectOne.add(projectOne)

let projectTwo = toDo('make logic', false, 'yellow')
ProjectOne.add(projectTwo)






let ProjectTwo = project('Daily Goals', '9-20-2022', 'blue', false, [], 'Here is another description');
ProjectTwo.create(content)

let toDoOne = toDo('start coding', false, 'aqua')
ProjectTwo.add(toDoOne)

let toDoTwo = toDo('go to bed', false, 'orange')
ProjectTwo.add(toDoTwo)


ProjectOne.expand()

ProjectTwo.expand()










