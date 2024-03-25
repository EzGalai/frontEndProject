
import { Typography } from "@mui/material"

//Header function. Setting the header of our web application.
function Header(props){
    return <Typography
                variant="h2" 
                fontWeight={300} 
                color={"#000"}
                gutterBottom 
                fontFamily={'pacifico'}>
                    {props.text}
             </Typography>
}


export default Header;