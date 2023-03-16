import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ClearIcon from '@mui/icons-material/Clear';

const ListTodo = ({important, onImportant}) => {
  const [tasks, setTasks] = useState([])
    
    const { get, deleteItem, loading } = useFetch("http://localhost:8000/")

    //fetch tasks list
    useEffect(() => {
        get("tasks")
        .then(data => {
            setTasks(data);
        })
        .catch(error => console.log('could not fetch data', error))
    }, [important])

    //delete task
    function handleDelete(id) {
        console.log(tasks);
        let newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks);
        deleteItem('tasks/' + id);
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
                                    {task.important &&
                                    <IconButton onClick={() => {onImportant(false, task.id); console.log(important)}}>
                                        <PriorityHighRoundedIcon 
                                            sx={{
                                                fill:"darkred",
                                                padding: "0.2em",
                                                "&:hover": {
                                                    backgroundColor: "rgb(240 227 227)",
                                                    borderRadius: "20px",
                                                    padding: "0.2em",
                                                    margin: "0"
                                                }
                                                /* tried to change focus css */
                                            }} 
                                        />
                                    </IconButton>
                                    }
                                    </ListItemIcon>
                                <ListItemText primary={task.title} secondary={task.category.charAt(0).toUpperCase() + task.category.slice(1).toLowerCase()} />
                                </ListItemButton>
                                <IconButton 
                                    aria-label="delete" 
                                    size="small"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            }
        </>
     );
}
 
export default ListTodo;