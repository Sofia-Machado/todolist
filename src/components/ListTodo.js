import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ClearIcon from '@mui/icons-material/Clear';

const ListTodo = () => {
    
    const [tasks, setTasks] = useState([])
    const { data, loading } = useFetch("http://localhost:8000/tasks")

    useEffect(() => {
        setTasks(data);
    }, [data])

    function handleDelete(id) {
        console.log(tasks);
        let newTasks = tasks.filter(task => task.id === id)
        setTasks(newTasks);
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