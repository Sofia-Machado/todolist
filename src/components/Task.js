import { useState } from "react";
import {  Alert, Badge, Button, Collapse, Fade, IconButton, ListItem, ListItemIcon, ListItemText, Popover, Tooltip } from "@mui/material";
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import useFetch from "../useFetch";


function Task({  handleClickDeleteNote, task, setUpdate }) {
    
    const [newTask, setNewTask] = useState(true);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const { deleteItem, patch } = useFetch("http://localhost:8000/");
    const badgeText = "NEW";

    
    //update task importance
    function handleImportant(e, task) {
        e.stopPropagation();

        let importantNew = !task.important;
        console.log('new value important ', importantNew)
        
        patch(`tasks/${task.id}`, {important: importantNew})
        .then(data => {
            console.log(data);
            setUpdate(prevState => !prevState);
        })
    }

    //update task completion
    function handleComplete(e, task) {
        e.stopPropagation();
        patch(`tasks/${task.id}`, { complete: !task.complete })
        .then(data => {
            console.log(data);
            setUpdate(prevState => !prevState);
        })
        .catch(error => console.log('could not fetch data', error));
    }    
    
    //update new task
    function handleNewTask(e, task) {
        if(task.newTask) {
            e.stopPropagation();
            e.preventDefault();
            setNewTask(false); 
            patch(`tasks/${task.id}`, {newTask: false})
            .then(data => {
                console.log(data);
                setUpdate(prevState => !prevState);
            })
            .catch(error => console.log('could not fetch data', error));
        }
    } 
    
    //delete task
    function handleDelete(id) {
        setOpenDeleteAlert(false);
        deleteItem(`tasks/${id}`);
        setUpdate(prevState => !prevState);
    }
    
    //handle delete alert
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

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
                            <IconButton 
                                value={task.important}
                                color={task.important ? 'error' : ''}
                                onClick={(e) =>{handleImportant(e, task)}}>
                                <PriorityHigh /* className={task.important ? 'important' : ''}
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
                                    }}  */
                                    />
                            </IconButton>
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
                    
                    {/* Delete Button */}
                    {!openDeleteAlert && <IconButton 
                        aria-label="delete" 
                        size="small"
                        onClick={handleClick}
                        sx={{color:"#efe4e4", "&:hover":{color:"darkred"}}}
                    >
                        <ClearIcon />
                    </IconButton>}
                    <Popover 
                    id={task.id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                    }}
                    >
                        <Alert severity="warning" >Delete task?
                            <Button sx={{minWidth: '35px', fontWeight:'bold'}} color="inherit" size="small" 
                            onClick={() => {
                                handleClose()
                            }}>
                            No
                            </Button>
                            <Button color="error" sx={{minWidth: '35px', padding: 0, fontWeight:'bold'}} 
                            onClick={() => {
                                handleDelete(task.id)
                                handleClickDeleteNote(task);
                            }}>
                            Yes
                            </Button>
                        </Alert>
                    </Popover>
                   
                </ListItem>
            </Badge>
     );
}

export default Task;