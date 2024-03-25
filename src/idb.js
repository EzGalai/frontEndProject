/*
Ezra Galya: 3083772324
Avraham Ababa: 204419030
*/
const idb = {};

//When doesn't support IndexedDB this exception occurs. 
function BrowserSupportException(msg){
    console.error(msg);
}

//request to open database with a given name and version and Initializing it. 
idb.openCaloriesDB = (dataBaseName,version) => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
        window.msIndexedDB;
    if (!indexedDB){
        throw new BrowserSupportException("The browser doesn't support IndexedDB");
    }else{
        console.log("The browser support IndexedDB");
        
        return new Promise((resolve, reject) => {
            const idbOpenRequest = indexedDB.open(dataBaseName, version);
            idbOpenRequest.onerror = (event) => {
                reject(event);
            };
            
            // if succesded then update db.
            idbOpenRequest.onsuccess = (event) => {
                idb.db = idbOpenRequest.result;
                resolve(idb);

            };
            //if upgrade nedded (version changed etc...).
            idbOpenRequest.onupgradeneeded =  (event) => {
                // Save the IDBDatabase interface
                idb.db = event.target.result;
                // Create an objectStore for this database
                idb.db.createObjectStore(dataBaseName, {autoIncrement: true})
            }

        });
    }
    

}

//adding item to the store.
idb.addCalories = (caloriesObject) => {
    return new Promise((resolve, reject) => {
        //request for adding transaction.
        const request = idb.db.transaction(["caloriesdb"], "readwrite")
            .objectStore("caloriesdb").add({...caloriesObject, date:new Date()});
        //if premission granted.
        request.onsuccess = function(event) {
            resolve(event.target.result);

        };
        request.onerror = (event) => {
            reject(event);
        }

    });

}

//returning a store data object. 
function createData(calories, category, description, date) {
    return {calories:calories, category:category, description:description, date:date};
  }


idb.readAllItems = (name) => {
    // const openRequest = await window.idb.openCaloriesDB(name,version);
    return new Promise((resolve,reject) =>{
        if(!idb.db){
            reject("Data base not open.");
        }
        var objectStore = idb.db.transaction(name).objectStore(name);
        idb.data = [];
        //updating data to get all the store items.
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                idb.data.push(createData(cursor.value.calorie, cursor.value.category, cursor.value.description,
                    cursor.value.date));
                //async process that move the to next value in the database
                cursor.continue();
            }else {
                resolve(idb);
            }
        };
    });
}


window.idb = idb;




