//expandable function

import { makeAllProjects } from "./dommanipulation";

export let projectList = [];


export function expandableFunction(item){
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
export function createSelf(project, container){


    projectList.push(project)
    makeAllProjects(projectList, container)

}

//delete project function
export function deleteSelf(project, list){
    projectList = list.filter(item => item !== project)
    makeAllProjects(projectList, content)
    
}


