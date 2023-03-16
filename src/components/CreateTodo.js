import { useState } from "react";
import useFetch from "../useFetch";
import { ClickAwayListener, Fade, FormGroup, InputLabel, Select, Button, MenuItem, TextField, Checkbox, FormControl, Tooltip } from "@mui/material";
import PriorityHigh from '@mui/icons-material/PriorityHigh';


const InputTodo = ({important, setImportant, setUpdate}) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [open, setOpen] = useState(false);
    const { post } = useFetch("http://localhost:8000/")


    //submit form
    function handleSubmit(e) {
        e.preventDefault();
        //define task values
        const task = { title, important, category };
        // sent new data to the database
        post("tasks", task)
        .then(() => {
            console.log(task);
        })
        setUpdate(true);
    }

    //tooltip functions
    function handleTooltipClose() {
        setOpen(false);
    }
    function handleTooltipOpen() {
        setOpen(true);
    }

    return ( 
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                    <FormGroup 
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '2em',
                    }}>

                        {/* Task */}
                        <FormControl>
                            <TextField
                                sx={{
                                    paddingRight: '0.5em',
                                }}
                                placeholder="Please enter a task"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </FormControl>

                        {/* Category */}
                        <FormControl sx={{ minWidth: 100 }}>
                            <InputLabel id="demo-select-small">Type</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="Type"
                                defaultValue="type"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value="work">Work</MenuItem>
                                <MenuItem value="personal">Personal</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Importance */}
                        <FormControl>
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}
                                title={!important ? 'Important' : "Not important"}
                                placement="bottom"
                            >
                                <Checkbox 
                                    size="medium"
                                    name="important" 
                                    value={important}
                                    onChange={() => {
                                        setImportant(!important)
                                    }}
                                    icon={<PriorityHigh sx={{color:"darkred"}} />}
                                    checkedIcon={<PriorityHigh sx={{color:"#efe4e4"}} />} 
                                />
                            </Tooltip>
                        </ClickAwayListener>
                        </FormControl>

                        {/* Submit Button */}    
                        <Button type='submit'
                            variant="contained" 
                            size="small"
                            sx={{
                                color:'white',
                                backgroundColor:'#5397db',
                                '&:hover': {
                                    backgroundColor:'#1d79d5'
                                }
                            }}>
                            Add
                        </Button>

                    </FormGroup>
            </form>
        </>
     );
}
 
export default InputTodo;