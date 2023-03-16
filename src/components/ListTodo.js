import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ClearIcon from '@mui/icons-material/Clear';

const ListTodo = ({important, setImportant, update, setUpdate}) => {
    const [tasks, setTasks] = useState([])
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
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                aria-label="tasks"
              >
                    {tasks.map(task => {
                        return (
                            <ListItem 
                                disablePadding
                                key={task.id}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                    
                                    <IconButton onClick={() => handleImportantUpdate(task)}>
                                        <PriorityHighRoundedIcon className={task.important ? 'important' : ''}
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
                                    </ListItemIcon>
                                <ListItemText primary={task.title} secondary={task.category.charAt(0).toUpperCase() + task.category.slice(1).toLowerCase()} />
                                <IconButton 
                                    aria-label="delete" 
                                    size="small"
                                    onClick={() => {handleDelete(task.id)}}
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