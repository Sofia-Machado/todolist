import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import {  Badge, Checkbox, Fade, FormControl, FormControlLabel, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, Tooltip } from "@mui/material";
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const ListTodo = ({important, setImportant, update, setUpdate, tasks, setTasks, newTask, setNewTask}) => {
    const [filterType, setFilterType] = useState('all');
    const [filterComplete, setFilterComplete] = useState(true);
    const [complete, setComplete] = useState(false);
    const { get, deleteItem, put, loading } = useFetch("http://localhost:8000/");
    const badgeText = "NEW";

    //fetch tasks list
    useEffect(() => {
        get("tasks")
        .then(data => {
            setTasks(data);
            setUpdate(false);
        })
        .catch(error => console.log('could not fetch data', error))
    }, [update]);
    
    //update task importance
    function handleImportantUpdate(e, task) {
        e.preventDefault();
        e.stopPropagation();
        setImportant(!important);
        put(`tasks/${task.id}`, {...task, important: important})
        .then(data => data)
        .catch(error => console.log('could not fetch data', error))
        setUpdate(true);
    }
     //update task completion
     function handleComplete(e, task) {
        e.preventDefault();
        e.stopPropagation();
        setComplete(!complete);
        put(`tasks/${task.id}`, {...task, complete: complete})
        .then(data => data)
        .catch(error => console.log('could not fetch data', error))
        setUpdate(true);
    }

       //update new task
       function handleNewTask(e, task) {
        e.preventDefault();
        e.stopPropagation();
        setNewTask(false); 
        put(`tasks/${task.id}`, {...task, newTask: newTask})
        .then(data => data)
        .catch(error => console.log('could not fetch data', error))
        setUpdate(true);
    }

    //delete task
    function handleDelete(id) {
        console.log(tasks);
        deleteItem('tasks/' + id);
        setUpdate(true);
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {tasks &&
            <Paper elevation={3} sx={{}}>
                <List
                    sx={{ padding:"1em" }}
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
                    
                    {/* Show list */}
                    {tasks.filter(task => {
                        if (!filterComplete) {
                            if (filterType !== 'all'){
                                return task.category === filterType && (task.complete === false || task.complete === undefined);
                            } else { 
                                return task.complete === false || task.complete === undefined;
                            }
                        } else {
                            if (filterType !== 'all') {
                                return task.category === filterType;
                            } else { 
                                return task; 
                            }
                        } 
                    }).slice(0).reverse().map(task => {
                        return (
                            <ListItem 
                                    disablePadding
                                    key={task.id}
                                    onClick={(e) => {handleNewTask(e, task)}}
                                >
                                <Badge badgeContent={badgeText} color="primary" invisible={!task.newTask ?? newTask}>
                                    <ListItemButton sx={{ display:"flex"}}>
                                        <ListItemIcon>
                                            <Tooltip
                                                TransitionComponent={Fade}
                                                TransitionProps={{ timeout: 600 }}
                                                title={task.important ? 'Important' : "Not important"}
                                                placement="left-start"
                                            >
                                                
                                                <IconButton onClick={(e) => handleImportantUpdate(e, task)}>
                                                    <PriorityHigh className={task.important ? 'important' : ''}
                                                        sx={{
                                                            color:"#efe4e4",
                                                            padding: "0.2em",
                                                            "&:hover": {
                                                                borderRadius: "20px",
                                                                margin: "0",
                                                                color:"#d7b6b6",
                                                            },
                                                            "&.important": {
                                                                color:"darkred",
                                                            }
                                                        }} 
                                                        />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={task.title.charAt(0).toUpperCase() + task.title.slice(1).toLowerCase()}
                                            secondary={task.category.charAt(0).toUpperCase() + task.category.slice(1).toLowerCase()} 
                                        />
                                        <IconButton
                                            value="check"
                                            selected={complete}
                                            onClick={(e) => handleComplete(e, task)}
                                            className={task.complete ? 'complete' : ''}
                                            sx={{color:"rgb(192 213 192 / 87%)", "&.complete":{color:"green"}}}
                                            >
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton 
                                            aria-label="delete" 
                                            size="small"
                                            onClick={() => handleDelete(task.id)}
                                            sx={{color:"#efe4e4", "&:hover":{color:"darkred"}}}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </ListItemButton>
                                </Badge>
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
            }
        </>
     );
}
 
export default ListTodo;
