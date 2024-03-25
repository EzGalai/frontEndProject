
import React, {useState, useEffect} from 'react';
import Header from "./Header";
import AddCalorie from './AddCalorie.js';
import idb from '../idb.js';
import Report from './Report.js';
import {Button, Divider, Paper} from '@mui/material';
import Grid from '@mui/material/Grid';
import TableData from './TableData';

function App() {
  const [items, setItems] = useState([]);
  const [isReport, setReport] = useState(false);
  const [reportData, SetReportData] = useState([]);

  //When problem with uploading the database or the items
  //inside the base occures then error messege will be 
  //presented to the developer.
  function DatabaseException(msg){
    console.error(msg);
  }

  //Each time the all page renders then we do whats inside the useEffect.
  useEffect(() => {   
    //Initialize the data base given a name and a version.
    const loadData = async (databaseName, version)=> {
      // async () => {
      const request = await window.idb.openCaloriesDB(databaseName, version);
      const tx = request.db.transaction([databaseName], "readonly");
      const store = tx.objectStore(databaseName);
      //getting all the items in the database.
      const storeItem = await store.getAll();
      storeItem.onsuccess = e => {
        //if successed then update items.
        setItems(e.target.result);
      }
      storeItem.onerror = e => {
        //if failed send messege.
        throw new DatabaseException(`Problem with the database Items. ${e}`);
      }
    }

    loadData("caloriesdb", 1).then(() => {
      //if database open successfully.
      console.log("uploaded Data");
    }).catch((err) => {
      throw new DatabaseException(`Problem with uploading the database. ${err}`);
    });
  
  }, []);

  //updaing the items.
  function addItem(newItem){
    setItems(preVal=>{
      return [...preVal,newItem];
    })
  }
  
  //handling the report close button.
  function handleReportClose(val){
    setReport(val);
  }

  //updaing the report that needs to be shown.
  function handleReportData(newData){
    SetReportData(newData);
  }

  return (
  <div className="container">
    <div className="header">
      <Header text="Calorie Management"/>
    </div>
    <Grid container columnGap={3} rowGap={3} padding={2} >
      <Paper sx={{ width: 2/5, minWidth: 300}} elevation={5}>
        <Grid item container columns={1} spacing={2} padding={2} >
          <AddCalorie onAdd={addItem}/>
          <Divider
           variant='middle'
           sx={{width:'90%', marginTop:2, marginBottom:2}} />
          <Report 
            reportItems={items}
            onReport={handleReportData}
            onOpen={handleReportClose} />
        </Grid>
      </Paper>    
      {isReport&&
        <Grid item xs={12} sm={6}>
          <TableData rows={reportData} />
          <Grid item>
          {/* if clicked setting the isReport value to false 
          and closing the table that presents the report. */}
          <Button 
            onClick={()=>{setReport(false) }}
            variant="contained"
            sx={{backgroundColor:'#d49c77'}}>
              Close
            </Button>
          </Grid>          
        </Grid>
        }          
    </Grid>
  </div>
  );
}

export default App;
