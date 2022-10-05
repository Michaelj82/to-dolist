//expandable function

import { makeAllProjects } from "./dommanipulation";
import { project } from "./index";
import { toDo } from "./index";


let dataList = NaN

if (localStorage.getItem('data') == null){
    dataList = [];
}else{
    dataList = JSON.parse(localStorage.getItem('data'))
}

export let projectList = dataList

export function adjustFormElements(formList, container){

    let DOMList = []

    for (let i = 0; i < formList.length; i++){
        if (formList[i].nodeName === 'INPUT' || formList[i].nodeName ==='TEXTAREA'){
            DOMList.push(formList[i].value)

        }
    }

    let newProject = project(DOMList[0], DOMList[1], DOMList[2], false, [], DOMList[3])

    let copyList = [...DOMList]
    copyList.splice(0,4)
    
    
    console.log(copyList)
    console.log(copyList.length)
    if (copyList.length > 1){
        for(let i = 0; i < (copyList.length/3); i++){
            let newToDo = toDo(copyList[0], false, copyList[1], copyList[2])
            newProject.add(newToDo)
            copyList.splice(0, 3)
        }
    }

    projectList.push(newProject)
    console.log(newProject)
    storagePush(newProject)
    let storageData = useData()

    makeAllProjects(storageData, container)

}


//create Project function
export function createSelf(project, container){


    projectList.push(project)
    storagePush(project)
    let storageData = useData()
    makeAllProjects(storageData, container)

}

//delete project function
export function deleteSelf(num, list, container){
    list.splice(num, 1)
    console.log(projectList)
    saveStorage(projectList)
    let storageData = useData()

    makeAllProjects(storageData, container)
    
}


function storagePush(new_data){

    if (localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }

    let old_data = JSON.parse(localStorage.getItem('data'))
    old_data.push(new_data)

    localStorage.setItem('data', JSON.stringify(old_data))


}

export function saveStorage(list){

    console.log(localStorage.getItem('data'))

    localStorage.setItem('data', JSON.stringify(list))

    console.log(localStorage.getItem('data'))


}



export function useData(){
    if (localStorage.getItem('data') != null){
        let newData = JSON.parse(localStorage.getItem('data'))
        return newData
    }

}


