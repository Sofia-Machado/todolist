import { useCallback, useEffect, useState } from "react";
import useFetch from "../useFetch";
import Task from "./Task";
import {  Checkbox, FormControl, FormControlLabel, InputLabel, List, MenuItem, Paper, Select } from "@mui/material";


const ListTodo = ({important, setImportant, update, setUpdate, tasks, setTasks, newTask, setNewTask}) => {
    const [task, setTask] = useState({});
    const [filterType, setFilterType] = useState('all');
    const [filterComplete, setFilterComplete] = useState(true);
    const [mount, setMount] = useState(false);
    
   // const [showTasks, setShowTasks] = useState(false);
    const { get, deleteItem, patch, put, loading } = useFetch("http://localhost:8000/");
    const badgeText = "NEW";


    //fetch tasks list
    useEffect(() => {
        get("tasks")
        .then(data => {
            setTasks(data);
            sortTasks(data);
        })
        .catch(error => console.log('could not fetch data', error))
    }, [update]);
    
    
    //sort tasks
    useEffect(() => {
        sortTasks();
    }, [important]) 

    
    const sortTasks = () => {
        let originalTasks = [...tasks];
        let importantTasks = originalTasks.filter(task => task.important === true);
        if (importantTasks) {
            let unimportantTasks = originalTasks.filter(task => !task.important)
            unimportantTasks = unimportantTasks.slice(0).reverse();
            let newListOfTasks = [...importantTasks, ...unimportantTasks];
            setTasks(newListOfTasks);
        } else {
            originalTasks = originalTasks.slice(0).reverse();
            setTasks(originalTasks)
        }
    }

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
                    }).map(task => {
                        return (
                            <Task 
                                task={task} key={task.id} 
                                important={important} setImportant={setImportant} 
                                update={update} setUpdate={setUpdate} 
                                newTask={newTask} setNewTask={setNewTask}
                            />
                        )
                    })}
                </List>
            </Paper>
            }
        </>
     );
}
 
export default ListTodo;
