import './style.css'

const content = document.createElement('div');
content.setAttribute('id', 'content');
document.body.appendChild(content)



let projectList = [];
console.log('bruh')


//create from projectList
function makeAllProjects(list, container){
    container.innerHTML = ''

    for (let i=0; i < list.length; i++){
        let project = list[i]

        let projectHTML = document.createElement('div');
        projectHTML.setAttribute('class', 'project');
        projectHTML.style.backgroundColor = project.color
        projectHTML.textContent = project.name

        if (project.expanded == true){


            for (let i=0; i < project.toDos.length; i++){
                let toDo = project.toDos[i];
                let toDoHTML = document.createElement('div');
                toDoHTML.setAttribute('class', 'toDo');
                toDoHTML.textContent = toDo.name
                projectHTML.appendChild(toDoHTML)


            }



            console.log(project.toDos)

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

const project = (name, duedate, color, expanded, toDos) => {
    let state = {
        toDos: toDos,

        name: name,
        duedate: duedate,
        color: color,
        expanded: expanded,


    }


    return Object.assign(
        {name, duedate, color, content, expanded, toDos},
        createable(state),
        addable(state),
        expandable(state),
        // deleteable(state),

        //what it can do here



    )

}

const toDo = (name, completed, color, expanded, information) =>{

    let state = {
        information: information,

        name: name,
        color: color,
        completed: completed,
        expanded: expanded,


    }

    return Object.assign(
        {name, completed, color, expanded, content, information},
        createable(state),
        expandable(state),
        // deleteable(state),
    )

}








let ProjectOne = project('Complete ToDolist Project', '9-20-2022', 'green', false, []);
ProjectOne.create(content)

let projectOne = toDo('start webpack', false, 'red', false, '')
projectOne.information = 'bruh'
ProjectOne.add(projectOne)

let projectTwo = toDo('make logic', false, 'yellow', false, '')
projectTwo.information = 'asdf'
ProjectOne.add(projectTwo)






let ProjectTwo = project('Daily Goals', '9-20-2022', 'blue', false, []);
ProjectTwo.create(content)

let toDoOne = toDo('start coding', false, 'blue', false, '')
toDoOne.information = 'bruh'
ProjectTwo.add(toDoOne)

let toDoTwo = toDo('go to bed', false, 'green', false, '')
toDoTwo.information = 'asdf'
ProjectTwo.add(toDoTwo)


ProjectOne.expand()

ProjectTwo.expand()










