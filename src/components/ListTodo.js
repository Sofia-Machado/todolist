import { useState } from "react";
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
import { useTasksData } from "./hooks/useTasksData";


const ListTodo = ({ update, setUpdate, tasks, userName }) => {
    const [openFilter, setOpenFilter] = useState({});
    const [filterType, setFilterType] = useState('all');
    const [filterComplete, setFilterComplete] = useState(true);
    const [openDeleteNote, setOpenDeleteNote] = useState(false);
    const [message, setMessage] = useState('')

    //Success and error functions
    const onSuccess = (data) => {
        //can I insert sort tasks here?
        console.log('Preform side effect after data fetching', data)
    }
    const onError = (error) => {
        console.log('Preform side effect after encountering error', error)
    }

     //call the useQuery hook
    const { isLoading, isError, error, data } = useTasksData(onSuccess, onError, {userName})

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
    
    //filter list
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
    
    const handleClickFilter = (i) => {
        setOpenFilter({...openFilter,
            [i]: !openFilter[i]});
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
                    <ListItemButton onClick={() => handleClickFilter(i)}>
                        <>
                            <ListItemIcon>{subCategoryIcon(subCategory)}</ListItemIcon>
                            <ListItemText primary={subCategory.toUpperCase()} />
                        </>
                        {openFilter[i] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openFilter[i]} timeout="auto" unmountOnExit>
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

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            {data &&
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
                        ? filterCompleteTasks(data).map(task => {
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
