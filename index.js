import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leadtracker-app-de2f6-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
console.log(database)
const referenceDB = ref(database, "leads")
// let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
// const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
// const tabBtn = document.getElementById("tab-btn")

// if (leadsFromLocalStorage) {
    // myLeads = leadsFromLocalStorage
    // render(myLeads)
// }
// 
// tabBtn.addEventListener("click", function(){    
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // myLeads.push(tabs[0].url)
        // localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        // render(myLeads)
    // })
// })

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}


onValue(referenceDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists()
   if(snapshotDoesExist) {
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
    console.log(leads)
   }
})
deleteBtn.addEventListener("dblclick", function() {
    // localStorage.clear()
    // myLeads = []
    remove(referenceDB)
    ulEl.innerHTML = ""
})
inputBtn.addEventListener("click", function() {
    push(referenceDB, inputEl.value)
    inputEl.value = ""
    // localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    // render(myLeads)
})