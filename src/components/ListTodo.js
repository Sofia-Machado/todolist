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

    const [filterType, setFilterType] = useState('all');
    const [filterComplete, setFilterComplete] = useState(true);
    const [openDeleteNote, setOpenDeleteNote] = useState(false);
    const [message, setMessage] = useState('')

    const { get, loading } = useFetch("http://localhost:8000/");

   /*  const categoryOptionsArray = categoryOptions.map(category => {
        return category.options.map(item => item.value);
    })
      */
    let cleanCategory = tasks.map(task => task.category.split('-'));
  
    //Category arrays
    const tasksCategory = (tasks) => {
        return tasks.map(item => {
            let result = item.category.split('-');
            return result[1];
        })
    }
    const tasksCategoryAvailable = [ ...new Set(tasksCategory(tasks))]

    const tasksSubCategory = (tasks) => {
        return tasks.map(item => {
            let result = item.category.split('-');
            return result[0];
        })
    }
    const tasksSubCategoryAvailable = [ ...new Set(tasksSubCategory(tasks))]



    //define icon
    const subCategoryIcon = (value) => {
        let icon;
        if (value === 'pet') {
            icon = <PetsIcon />;
        }  if (value === 'family') {
            icon = <FamilyRestroomIcon />;
        }  if (value === 'house') {
            icon = <CottageIcon />;
        }  if (value === 'projects') {
            icon = <AccountTreeIcon />;
        }  if (value === 'exercises') {
            icon = <EngineeringIcon />;
        }  if (value === 'team') {
            icon = <Diversity3Icon />;
        }
        return icon
    };

    /*     
    console.log('category options ', categoryOptionsArray);
    console.log(tasks.map(item => {
        let result = item.category.split('-');
        return result[0];
    }));
 */
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

    //Filter list
    const [openFilter, setOpenFilter] = useState(true);

    const handleClickFilter = () => {
        setOpenFilter(!openFilter);
    };

    const filterList = (task) => {
        let subCategory = (task.category.split('-')[0]);
        return ( 
        <List>
            <ListItemButton onClick={handleClickFilter} key='{subcategory}'>
                    <ListItemIcon>
                        {subCategoryIcon(subCategory)}
                    </ListItemIcon>
                    <ListItemText primary={subCategory} />
                {openFilter ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openFilter} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <Task 
                    filterType={filterType}
                    task={task} key={task.id}
                    update={update} setUpdate={setUpdate}
                    handleClickDeleteNote={handleClickDeleteNote}
                    openDeleteNote={openDeleteNote}
                    action={action}
                />
                </List>
            </Collapse>
        </List>
        )
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
                            <>
                            {(filterType !== 'all') ? 
                            filterList(task)
                            :
                            (<Task 
                                filterType={filterType}
                                task={task} key={task.id}
                                update={update} setUpdate={setUpdate}
                                handleClickDeleteNote={handleClickDeleteNote}
                                openDeleteNote={openDeleteNote}
                                action={action}
                            />)
                            }
                            </>
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
