
import {Button,Grid} from '@mui/material';
import {useState} from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Report(props){
  const [reportDate, setReportDate] = useState(null);
  //Getting the report the user asked based on the month and year.
  function getReport() {
    if(reportDate){
      const ref = props.reportItems.filter((item) => {
        return (reportDate.$M + 1) === (item.date.getMonth() + 1) && item.date.getFullYear() === reportDate.$y;}
      );
      return ref;
    }else{
      window.alert("Please select a date.");
      return null;
    }
  }
  
  //updating the state of report.
  function handleReport(event){
    //getting the report based on the date.
    const ref = getReport();
    if(ref && ref.length > 0){
      //updaing report.
      props.onReport(ref);
      //updating the close button for the report table.
      props.onOpen(true);
    }else{
      props.onOpen(false);
      if(ref){
        window.alert("No items for this specific month and year.");
      }     
    }
    setReportDate(null);
  }

  return(
    <>
      {/* -----------------CALENDAR----------- */}
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="Select month and year"
            onChange={(newVal) =>{ setReportDate(newVal)}} 
            slotProps={{ textField: { variant: 'outlined' } }} 
            value={reportDate}
            views={['month', 'year']}
            />
        </LocalizationProvider>         
      </Grid>
      {/* -------------REPORT-BUTTON--------------*/}
      <Grid item xs={12} sm={6}>
        <Button   
          type="submit" 
          variant="contained"
          onClick={handleReport}
          sx={{backgroundColor:'#d49c77'}}>
          REPORT
        </Button>
      </Grid>
    </>
  );
} 