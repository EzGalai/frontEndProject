
import {useState} from 'react';
import idb from '../idb.js';
import {Button,TextField,InputLabel,Select,MenuItem} from '@mui/material';
import Grid from '@mui/material/Grid';

//Categories for the select tag.
const CATEGORIES = [
    {name:"Select Category", value:""}, {name:"Breakfast", value:"BREAKFAST"},
    {name:"Lunch",value:"LUNCH"}, {name:"Dinner", value:"DINNER"}, {name:"Other",value:"OTHER"}];

function AddCalorie(props){
  const [calorie, setCalorie] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
    
//handling the events of adding an item to the database.
  //updating the calorie state.
  function handleCalorie(event) {
    const calorieNum = event.target.value;
    setCalorie(calorieNum);
  }
  
  //updating the category state.
  function handleCategory(event) {
    const categoryItem = event.target.value;
    setCategory(categoryItem);
  }
  
  //updating the description state.
  function handleDescription(event) {
    const DescriptionText = event.target.value;
    setDescription(DescriptionText);
  }

  //Exception occures when item didnt added to the database.
  function AddingException(msg){
    window.alert(msg);
  }

  //updaing the state of items and adding item to the database.
  function handleAddItems() {     
    //creating an item withe the field that the user filled.
    const item = {
      calorie: calorie,
      category: category,
      description: description,
      date:new Date()
    };
    if (description !== "" && category !== "" && calorie >= 0){        
      //updaing items.
      props.onAdd(item);
      //addin=g item to the database.
      window.idb.addCalories(item).then(()=>{
        window.alert("Item added");         
      }).catch((error) => {
        throw new AddingException(`Problem with item adding. ${error}`);
      });       
    }else{
      window.alert("Please Fill all the fields");
    }
    //Initializing the fields.
    setCalorie(0);
    setDescription("");
    setCategory("");    
  }

  return(
    <>
      <Grid item xs={12} sm={6}>
        {/* ----------------CALORIEINPUT--------------- */}
        <TextField
          id={"outlined-basic"}
          size={"small"}
          label={"Calories"}
          variant={"outlined"}
          name={"calorie"}
          value={calorie}
          type={"number"}
          onChange={handleCalorie}
          />
      </Grid>

      {/* ----------------------CATEGORY------------------ */}
      <Grid item xs={12} sm={6}>
        <InputLabel id={"demo-simple-select-standard"}>{"category"}</InputLabel>
        <Select
          id={"demo-simple-select-standard"}
          labelId={"demo-simple-select-standard-label"}
          label={"category"}
          value={category}
          onChange={handleCategory}>
          {CATEGORIES.map((item, index) =>{
              const{name,value} = item;
              return <MenuItem key={index} value={value}> {name}</MenuItem>
          })}

        </Select>
      </Grid>
      {/* ------------------Description---------------------- */}

      <Grid item xs={12} sm={6}>
        <TextField
          id={"outlined-multiline-flexible"}
          size={"small"}
          label={"Description"}
          variant={"outlined"}
          name={'description'}
          type={"text"}
          value={description}
          onChange={handleDescription}
          multiline={true}
          maxRows={4}/>

      </Grid>
      <Grid item xs={12} sm={6}>
      {/* ----------------ADD-BUTTON---------------------------*/}
        <Button
          variant="contained" 
          onClick={handleAddItems}
          sx={{backgroundColor:'#d49c77'}}>
          Add
        </Button>
      </Grid>
    </>
  );
}

export default AddCalorie;