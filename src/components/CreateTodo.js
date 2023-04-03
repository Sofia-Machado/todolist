import { useEffect, useState } from "react";
import { Button, Fade, FormControl, FormGroup, IconButton, InputLabel, ListSubheader, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import { useAddTask } from "./hooks/useTasksData";

const CreateTodo = ({ userName, categoryOptions }) => {
    const [important, setImportant] = useState(false);       
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [categoryData, setCategoryData] = useState();

     //call the useQuery hook
     const { mutate } = useAddTask({userName})

    useEffect(() => {
        setCategoryData(categoryOptions);
    }, [categoryOptions]);
    
    //render categories in the Select element
    //had to do it this way because MenuItem wasn't a direct children of Select, therefore it couldn't reach e.target.value
    const renderCategories = (categories) => {
        const parameters = categories.options.map(category => {
            return (
                <MenuItem key={category.value} value={category.value + ':' + categories.label}>{category.value.charAt(0).toUpperCase() + category.value.slice(1)}</MenuItem>
            );
        });
        return [<ListSubheader key={categories.label}>{categories.label.toUpperCase()}</ListSubheader>, parameters]
    }

    //submit form
    function handleSubmit(e) {
        e.preventDefault();
        //define task values
        const task = { title, important, category, subCategory, newTask: true, complete: false };
        // sent new data to the database
        mutate(task);
        setCategory('');
        setSubCategory('');
        setImportant(false);
        setTitle('');
    }

    return ( 
        <>
        <Typography variant="h2" sx={{fontSize:"1.2rem", fontWeight: "500", marginTop: '1em', }}>Insert new task:</Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
                    <FormGroup 
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        marginTop: '0.5em'
                    }}>

                        {/* Task */}
                        <FormControl 
                            sx={{
                        }}>
                            <TextField
                                sx={{
                                    paddingRight: '0.5em',
                                    marginBottom: 2
                                }}
                                placeholder="Please enter a task"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                inputProps={{ maxLength: 18 }}
                                required
                            />
                        </FormControl>

                        {/* Category */}
                        <FormControl sx={{ minWidth: 115, marginBottom: 2 }} required>
                            <InputLabel id="category-selection" label="Category">Category</InputLabel>
                            <Select
                                labelId="selet-category"
                                id="select-category"
                                label="Category"
                                defaultValue=""
                                value={subCategory ? (subCategory + ':' + category) : ''}
                                onChange={(e) => {
                                    
                                    let value = e.target.value.split(':');
                                    console.log(value[0]);
                                    setSubCategory(value[0]);
                                    setCategory(value[1]);
                                }}
                            >
                                {categoryData?.map(category => renderCategories(category))}
                            </Select>
                        </FormControl>

                        {/* Importance */}
                        <FormControl>
                            <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}
                                title={!important ? 'Important' : "Not important"}
                                placement="bottom"
                                sx={{ marginBottom: 2 }}
                            >
                                <IconButton 
                                    name="important" 
                                    value={important}
                                    onClick={() => {
                                        setImportant(!important);
                                    }}
                                    size="large"
                                >
                                    <PriorityHigh
                                    className={important ? 'important' : ''} sx={{color:"#efe4e4",
                                    "&.important":{color:"darkred"}}} />
                                </IconButton>
                            </Tooltip>
                        </FormControl>

                        {/* Submit Button */}    
                        <Button type='submit'
                            variant="contained" 
                            size="small"
                            sx={{
                                marginBottom: 2,
                                color:'white',
                                backgroundColor:'#5397db',
                                '&:hover': {
                                    backgroundColor:'#1d79d5'
                                }
                            }}>
                            Add
                        </Button>

                    </FormGroup>
            </form>
        </>
     );
}
 
export default CreateTodo;
