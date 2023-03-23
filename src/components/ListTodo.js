import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Task from "./Task";
import {  Checkbox, FormControl, FormControlLabel, InputLabel, IconButton, List, MenuItem, Paper, Select, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ListTodo = ({ categoryOptions, update, setUpdate, tasks, setTasks }) => {

    const [filterType, setFilterType] = useState('all');
    const [filterComplete, setFilterComplete] = useState(true);
    const [openDeleteNote, setOpenDeleteNote] = useState(false);
    const [message, setMessage] = useState('')

    const { get, loading } = useFetch("http://localhost:8000/");
    
    //fetch tasks list
    useEffect(() => {
        get("tasks")
        .then(data => {
            let newListOfTasks = sortTasks(data);
            setTasks(newListOfTasks);
        })
        .catch(error => console.log('could not fetch data', error))
    }, [update]);
    

    
console.log(categoryOptions.map(category => {
    return category.options
  }))
  
 /*  //check who's label is this
  console.log(categoryOptions.map(category => {
    return category.options.map(value => {
      if (Object.values(value).includes('projects')) {
        return true;
      }
    })
  }))
  
  //got first check
  console.log(Object.values(categoryOptions[0]['options']).map(value => {
    if (value.value === 'projects') {
      let result = categoryOptions[0].label;
      return result
    }
  }))
  console.log(Object.values(categoryOptions[1]['options']).map(value => {
    if (value.value === 'dog') {
      let result = categoryOptions[1].label;
      return result;
    }
  })) */


    //sort tasks
    function sortTasks(tasks) {
        let importantTasks = tasks.filter(task => task.important === true);
        let unimportantTasks = tasks.filter(task => !task.important)
        unimportantTasks.reverse();
        return [...importantTasks, ...unimportantTasks];
    }

    //handle delete note
    const handleClickDeleteNote = (task) => {
        setMessage(task.title + " deleted");
        setOpenDeleteNote(true);
    };
    const handleCloseDeleteNote = () => {
        setOpenDeleteNote(false);
    };
    
        const action = (
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseDeleteNote}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
        );

    return (
        <>
            {loading && <p>Loading...</p>}
            {tasks &&
            <Paper elevation={3} sx={{MaxWidth: 300, marginBottom:"1em" }}>
                <List
                    sx={{ padding:"1em", display:"block"}}
                    aria-label="tasks"
                >
                    {/* Filters */}
                    <FormControl sx={{ minWidth: 80, marginBottom: "1em"}} size="small">
                        <InputLabel id="demo-select-small">Category</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Category"
                            defaultValue="filter"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="work">Work</MenuItem>
                            <MenuItem value="personal">Personal</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ marginLeft:"1em" }} size="small">
                        <FormControlLabel control={
                            <Checkbox checked={filterComplete} onChange={() => setFilterComplete(prevState => !prevState)} />} label="Complete" 
                        />
                    </FormControl>
                    
                    {/* Show tasks */}
                    {tasks.filter(task => {
                        if (!filterComplete) {
                            if (filterType !== 'all'){
                                return task.category === filterType && task.complete === false;
                            } else { 
                                return task.complete === false;
                            }
                        } else {
                            if (filterType !== 'all') {
                                return task.category === filterType;
                            } else { 
                                return task; 
                            }
                        } 
                    }).map(task => {
                        return (
                            <Task 
                                task={task} key={task.id}
                                update={update} setUpdate={setUpdate}
                                handleClickDeleteNote={handleClickDeleteNote}
                                openDeleteNote={openDeleteNote}
                                action={action}
                            />
                        )
                    })}
                </List>
                <Snackbar
                    open={openDeleteNote}
                    autoHideDuration={6000}
                    onClose={handleCloseDeleteNote}
                    message={message}
                    action={action}
                />
            </Paper>
            }
        </>
     );
}
 
export default ListTodo;
