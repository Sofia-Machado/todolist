import { useState } from "react";
import {  Alert, Badge, Button, Collapse, Fade, ToggleButton, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import useFetch from "../useFetch";

function Task({ task, complete, setComplete, newTask, setNewTask, setUpdate}) {
    const [selectedIndex, setSelectedIndex] = useState("");
    const [open, setOpen] = useState(false);
    const badgeText = "NEW";
    const { deleteItem, patch } = useFetch("http://localhost:8000/");

 
    //handle delete alert
    const handleClick = id => {
    setOpen(true);
    if (selectedIndex === id) {
        setSelectedIndex("")
    } else {
        setSelectedIndex(id)
    }
    }

    //update task importance
    function handleImportant(e, task) {
    e.stopPropagation();
    //setImportant(prevState => !prevState)
    let importantNew = !task.important;
    console.log('new value important ', importantNew)

        patch(`tasks/${task.id}`, {important: importantNew})
        .then(data => {
            console.log(data)
            setUpdate(true)
        })
        .catch(error => console.log('could not fetch data', error)) 
    }

    //update task completion
    function handleComplete(e, task) {
        e.stopPropagation();
        let newCompleteValue = !task.complete;
        patch(`tasks/${task.id}`, {complete: newCompleteValue})
        .then(data => {
            console.log(data)
            setUpdate(prevState => !prevState);
        })
        .catch(error => console.log('could not fetch data', error))
    }

    //update new task
       function handleNewTask(e, task) {
           if(task.newTask) {
            e.stopPropagation();
            e.preventDefault();
            setNewTask(false); 
            patch(`tasks/${task.id}`, {newTask: false})
            .then(data => {
                console.log(data)
                setUpdate(prevState => !prevState);
            })
            .catch(error => console.log('could not fetch data', error));
        }
    } 

    //delete task
    function handleDelete(id) {
        deleteItem(`tasks/${id}`);
        setUpdate(prevState => !prevState);
    }


    return ( 
            <Badge badgeContent={badgeText} color="primary" invisible={!task.newTask ?? newTask}>
                <ListItem sx={{ display:"flex", paddingLeft: 0}}
                onClick={(e) => {handleNewTask(e, task)}}>
                    <ListItemIcon>
                        <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            title={task.important ? 'Important' : "Not important"}
                            placement="left-start"
                        >
                            <ToggleButton 
                                value={task.important}
                                onClick={(e) =>{handleImportant(e, task)}}>
                                <PriorityHigh className={task.important ? 'important' : ''}
                                    sx={{
                                        color:"#efe4e4",
                                        padding: "0.2em",
                                        "&:hover": {
                                            borderRadius: "20px",
                                            marginLeft: "0",
                                            color:"#d7b6b6",
                                        },
                                        "&.important": {
                                            color:"darkred",
                                        }
                                    }} 
                                    />
                            </ToggleButton>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                    sx={{maxWidth: 200, minWidth: 180}} 
                        primary={task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                        secondary={task.category.charAt(0).toUpperCase() + task.category.slice(1)} 
                    />
                    <IconButton
                        value="check"
                        onClick={(e) => handleComplete(e, task)}
                        className={task.complete ? 'complete' : ''}
                        sx={{color:"rgb(192 213 192 / 87%)", "&.complete":{color:"green"}}}
                        >
                        <CheckIcon />
                    </IconButton>
                    {!open && <IconButton 
                        aria-label="delete" 
                        size="small"
                        onClick={() => handleClick(task.id)}
                        sx={{color:"#efe4e4", "&:hover":{color:"darkred"}}}
                    >
                        <ClearIcon />
                    </IconButton>}
                    <Collapse in={task.id === selectedIndex} unmountOnExit={true}>
                    <Alert severity="warning" >Are you sure you want to delete this task?
                        <Button color="inherit" size="small" onClick={() => {setSelectedIndex(''); setOpen(false)}}>
                        No
                        </Button>
                        <Button color="inherit" size="small" onClick={() => {setOpen(true); handleDelete(task.id); setOpen(false)}}>
                        Yes
                        </Button>
                    </Alert>
                    </Collapse>
                </ListItem>
            </Badge>
     );
}

export default Task;