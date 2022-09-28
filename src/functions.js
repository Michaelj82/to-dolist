//expandable function

import { makeAllProjects } from "./dommanipulation";
import { project } from "./index";
import { toDo } from "./index";

import { content } from "./index";

export let projectList = [];


export function adjustFormElements(formList, container){

    let DOMList = []

    for (let i = 0; i < formList.length; i++){
        if (formList[i].nodeName === 'INPUT' || formList[i].nodeName ==='TEXTAREA'){
            DOMList.push(formList[i].value)

        }
    }

    let newProject = project(DOMList[0], DOMList[1], DOMList[2], true, [], DOMList[3])

    let copyList = [...DOMList]
    copyList.splice(0,4)
    
    
    console.log(copyList)
    console.log(copyList.length)
    if (copyList.length != 0){
        for(let i = 0; i < (copyList.length/3); i++){
            let newToDo = toDo(copyList[0], false, copyList[1], copyList[2])
            newProject.add(newToDo)
            copyList.splice(0, 3)
        }
    }

    projectList.push(newProject)

    makeAllProjects(projectList, container)

}


//create Project function
export function createSelf(project, container){


    projectList.push(project)
    makeAllProjects(projectList, container)

}

//delete project function
export function deleteSelf(project, list, container){
    projectList = list.filter(item => item !== project)
    makeAllProjects(projectList, container)
    
}


