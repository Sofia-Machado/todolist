import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Task from "./Task";
import {  Checkbox, FormControl, FormControlLabel, InputLabel, IconButton, List, MenuItem, Paper, Select, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CottageIcon from '@mui/icons-material/Cottage';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PetsIcon from '@mui/icons-material/Pets';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ListTodo = ({ categoryOptions, update, setUpdate, tasks, setTasks }) => {

    const [filterType, setFilterType] = useState('all');
    const [filterComplete, setFilterComplete] = useState(true);
    const [openDeleteNote, setOpenDeleteNote] = useState(false);
    const [message, setMessage] = useState('')

    const { get, loading } = useFetch("http://localhost:8000/");
   /*  
    let subCategoryIcon;

    if (cleanCategory[0] === 'pet') {
        subCategoryIcon = <PetsIcon />;
    }  if (cleanCategory[0] === 'family') {
        subCategoryIcon = <FamilyRestroomIcon />;
    }  if (cleanCategory[0] === 'house') {
        subCategoryIcon = <CottageIcon />;
    }  if (cleanCategory[0] === 'projects') {
        subCategoryIcon = <AccountTreeIcon />;
    }  if (cleanCategory[0] === 'exercises') {
        subCategoryIcon = <EngineeringIcon />;
    }  if (cleanCategory[0] === 'team') {
        subCategoryIcon = <Diversity3Icon />;
    } */
    

    //fetch tasks list
    useEffect(() => {
        get("tasks")
        .then(data => {
            let newListOfTasks = sortTasks(data);
            setTasks(newListOfTasks);
        })
        .catch(error => console.log('could not fetch data', error))
    }, [update]);

    
console.log(categoryOptions[0].options);
  

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
        <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseDeleteNote}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    );

    //filter tasks
    const tasksFilter = (tasks) => {
        return tasks.filter(task => {
            if (!filterComplete) {
                if (filterType !== 'all'){
                    return task.category.includes(filterType) && task.complete === false;
                } else { 
                    return task.complete === false;
                }
            } else {
                if (filterType !== 'all') {
                    return task.category.includes(filterType);
                } else { 
                    return task; 
                }
            } 
        })
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
                    
                    {/* Show tasks */}
                    {tasksFilter(tasks).map(task => {
                        return (
                            //console.log(categoryOptions[0].options);
                            /*  {(filterType !== 'all') ? 
                                (<List>
                                <ListItemButton onClick={handleClickFilter}>
                                    <ListItemIcon>
                                        {subCategoryIcon}
                                    </ListItemIcon>
                                    <ListItemText primary={cleanCategory[0].toUpperCase()} />
                                    {openFilter ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openFilter} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemText primary={task.title.charAt(0).toUpperCase() + task.title.slice(1)} />
                                    </List>
                                </Collapse>
                                </List>
                                )
                                : */
                                <Task 
                                    filterType={filterType}
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
