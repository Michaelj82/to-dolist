//import functions
import { makeAllProjects } from "./dommanipulation";
import { project } from "./index";
import { toDo } from "./index";


//getting data from local storage
let dataList = NaN

if (localStorage.getItem('data') == null){
    dataList = [];
}else{
    dataList = JSON.parse(localStorage.getItem('data'))
}

//making the list that functions use equal to the local storage
export let projectList = dataList


//function for taking elements from the form that submits new projects and puts it on screen
export function adjustFormElements(formList, container){


    let DOMList = []
    
    //goes through elements and only takes ones that are inputs and textareas (ignores buttons and such)
    for (let i = 0; i < formList.length; i++){
        if (formList[i].nodeName === 'INPUT' || formList[i].nodeName ==='TEXTAREA'){
            //puts in separate list
            DOMList.push(formList[i].value)

        }
    }

    //project object 
    let newProject = project(DOMList[0], DOMList[1], DOMList[2], false, [], DOMList[3])

    //copy of list
    let copyList = [...DOMList]
    //take out first 4 (the header of the project)
    copyList.splice(0,4)
    
    //removes unnecessary end bit
    copyList.pop()


    let baseNum = copyList.length

    //makes all the to Dos within the project and adds them to the project object
    if (copyList.length > 1){
        for(let i = 0; i < (baseNum/3); i++){
            let newToDo = toDo(copyList[0], false, copyList[1], copyList[2])
            newProject.add(newToDo)
            copyList.splice(0, 3)
        }
    }

    //puts in list
    projectList.push(newProject)
    //saves in local storage
    storagePush(newProject)
    let storageData = useData()
    //creates objects on screen
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
    saveStorage(projectList)
    
}

//puts new item in the local storage
function storagePush(new_data){
    //if nothing in local storage set it to list
    if (localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }

    let old_data = JSON.parse(localStorage.getItem('data'))
    old_data.push(new_data)

    localStorage.setItem('data', JSON.stringify(old_data))


}


//basic saving local storage function (takes a list and puts it as local storage)
export function saveStorage(list){


    localStorage.setItem('data', JSON.stringify(list))



}


//gets local storage and allows it to be used
export function useData(){
    if (localStorage.getItem('data') != null){
        let newData = JSON.parse(localStorage.getItem('data'))
        return newData
    }

}




