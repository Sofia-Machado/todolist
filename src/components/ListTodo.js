import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import {  Fade, FormControl, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Tooltip } from "@mui/material";
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const ListTodo = ({important, setImportant, update, setUpdate}) => {
    const [tasks, setTasks] = useState([])
    const [complete, setComplete] = useState(false);
    const [filter, setFilter] = useState('all');
    const { get, deleteItem, put, loading } = useFetch("http://localhost:8000/")

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
    function handleImportantUpdate(task) {
        setImportant(!important);
        put(`tasks/${task.id}`, {...task, important: important})
        .then(data => data)
        .catch(error => console.log('could not fetch data', error))
        setUpdate(true);
    }
     //update task completion
     function handleComplete(task) {
        setComplete(!complete);
        put(`tasks/${task.id}`, {...task, complete: complete})
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
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: "2em" }}
                    aria-label="tasks"
                >
                    {/* Filters */}
                    <FormControl sx={{ minWidth: 100 }} size="small">
                            <InputLabel id="demo-select-small">Filter</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="Type"
                                defaultValue="filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >~
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="work">Work</MenuItem>
                                <MenuItem value="personal">Personal</MenuItem>
                            </Select>
                        </FormControl>
                    
                    {/* Show list */}
                    {tasks.filter(task => {
                        if (filter !== 'all'){
                        return task.category === filter;
                    } else { 
                        return task;
                    }
                    }).map(task => {
                        return (
                            <ListItem 
                                disablePadding
                                key={task.id}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Tooltip
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 600 }}
                                            title={task.important ? 'Important' : "Not important"}
                                            placement="left-start"
                                        >
                                            
                                            <IconButton onClick={() => handleImportantUpdate(task)}>
                                                <PriorityHigh className={task.important ? 'important' : ''}
                                                    sx={{
                                                        color:"#efe4e4",
                                                        padding: "0.2em",
                                                        "&:hover": {
                                                            borderRadius: "20px",
                                                            padding: "0.2em",
                                                            margin: "0"
                                                        },
                                                        "&.important": {
                                                            fill:"darkred",
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
                                    onClick={() => handleComplete(task)}
                                    className={task.complete ? 'complete' : ''}
                                    sx={{"&.complete":{color:"green"}}}
                                    >
                                    <CheckIcon />
                                </IconButton>
                                <IconButton 
                                    aria-label="delete" 
                                    size="small"
                                    onClick={() => handleDelete(task.id)}
                                    sx={{"&:hover":{color:"darkred"}}}
                                >
                                    <ClearIcon />
                                </IconButton>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            }
        </>
     );
}
 
export default ListTodo;