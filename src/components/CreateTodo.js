import { useState } from "react";
import { FormGroup, Select, Button, MenuItem, TextField, Checkbox, FormControl } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorIcon from '@mui/icons-material/Error';

const InputTodo = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [important, setImportant] = useState(false);
    const [category, setCategory] = useState('work');
    const styleWrapper = {
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',
    };

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        //define task values
        const task = { title, important, category };

        // sent new data to the database
        fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(task)
        })
        .then(() => {
            console.log(task);
            setLoading(false);
        })
    }

    return ( 
        <>
        {loading && <p>Loading...</p>}

            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormGroup sx={styleWrapper}>

                        {/* Task */}
                        <TextField
                            sx={{
                                paddingRight: '0.5em',
                            }}
                            placeholder="Please enter a task"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* Category */}
                        <Select
                        sx={{
                            width: "7em",
                            fontSize: "0.8em"
                        }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value="work">Work</MenuItem>
                            <MenuItem value="personal">Personal</MenuItem>
                        </Select>

                        {/* Importance */}
                        <Checkbox 
                            name="important" 
                            value={important}
                            onChange={() => {
                                setImportant(prevState => !prevState);
                                console.log(important);
                            }}
                            icon={<ErrorOutlineIcon />}
                            checkedIcon={<ErrorIcon />} 
                        />
                            
                        <Button type='submit' sx={{
                            color:'white',
                            backgroundColor:'blue',
                            margin: '0.2em',
                            '&:hover': {
                                backgroundColor:'lightblue'
                            }
                        }}>Add</Button>

                    </FormGroup>
                </FormControl>
            </form>
        </>
     );
}
 
export default InputTodo;