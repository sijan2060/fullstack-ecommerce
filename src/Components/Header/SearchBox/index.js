import Button from '@mui/material/Button';
import { IoSearchSharp } from "react-icons/io5";
const SearchBox=()=>{
    return (
        <div className ='headerSearch ml-3 mr-3'>
                                <input type='text' placeholder='Search for product....'/>
                                <Button><IoSearchSharp/></Button>
                            </div>
    )
}

export default SearchBox;
