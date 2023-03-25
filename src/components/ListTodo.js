import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Task from "./Task";
import {  Checkbox, Collapse, FormControl, FormControlLabel, InputLabel, IconButton, List, ListItemButton, ListItemText, ListItemIcon, MenuItem, Paper, Select, Snackbar } from "@mui/material";
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
    
    const [openFilter, setOpenFilter] = useState(true);
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
    
    //filter complete tasks
    const filterCompleteTasks = (tasks) => {
        return tasks.filter(task => {
            if (!filterComplete) {
                return !task.complete;
            } else {
                return true;
            }  
        })
    } 
    
    //Filter list
    
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
    
    const handleClickFilter = () => {
        setOpenFilter(!openFilter);
    };

    const tasksSubCategory = (tasks) => {
        return tasks.map(item => {
            return item.subCategory;
        })
    }
    
    //define icon
    const subCategoryIcon = (value) => {
        if (value === 'pet') {
            return <PetsIcon />;
        }  if (value === 'family') {
            return <FamilyRestroomIcon />;
        }  if (value === 'house') {
            return <CottageIcon />;
        }  if (value === 'projects') {
            return <AccountTreeIcon />;
        }  if (value === 'exercises') {
            return <EngineeringIcon />;
        }  if (value === 'team') {
            return <Diversity3Icon />;
        } 
    }

    //show subcategories
    const filterList = (tasks, category) => {
        const tasksToShow = tasks.filter(task => task.category === category);
        const tasksSubCategoryAvailable = [ ...new Set(tasksSubCategory(tasksToShow))];
        return tasksSubCategoryAvailable.map((subCategory, i) => {
            return (
                <List key={`subCategory-${i}`}>
                    <ListItemButton onClick={handleClickFilter}>
                        <>
                            <ListItemIcon>{subCategoryIcon(subCategory)}</ListItemIcon>
                            <ListItemText primary={subCategory.toUpperCase()} />
                        </>
                        {openFilter ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openFilter} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {
                                tasksToShow.filter(task => task.subCategory === subCategory).map(task => {
                                    return (<Task 
                                        task={task} key={task.id}
                                        update={update} setUpdate={setUpdate}
                                        handleClickDeleteNote={handleClickDeleteNote}
                                        openDeleteNote={openDeleteNote}
                                        action={action}
                                    />);
                                })
                            }
                        </List>
                    </Collapse>
                </List>
            )
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
                    {
                        (filterType === 'all')
                        ? filterCompleteTasks(tasks).map(task => {
                            return <Task 
                                filterType={filterType}
                                task={task} key={task.id}
                                update={update} setUpdate={setUpdate}
                                handleClickDeleteNote={handleClickDeleteNote}
                                openDeleteNote={openDeleteNote}
                                action={action}
                            />
                        })
                        : filterList(filterCompleteTasks(tasks), filterType)
                    }
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
