import CreateTodo from "../components/CreateTodo";
import ListTodo from "../components/ListTodo";
import { useState } from "react";
import { Container, Typography } from "@mui/material";

const TodoListPage = () => {

  const [complete, setComplete] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);

  const categoryOptions = [
    {
        label: "work",
        options: [
            { value: "projects" },
            { value: "exercises" },
            { value: "team"}
        ],
    },
    {
        label: "personal",
        options: [
            { value: "house" },
            { value: "family" },
            { value: "dog" }
        ],
    },
]

console.log(categoryOptions.map(category => {
  return category.options
}))

//check who's label is this
console.log(categoryOptions.map(category => {
  return category.options.map(value => {
    if (Object.values(value).includes('projects')) {
      return true;
    }
  })
}))

//got first check
console.log(Object.values(categoryOptions[0]['options']).map(value => {
  if (value.value === 'projects') {
    let result = categoryOptions[0].label;
    return result
  }
}))
console.log(Object.values(categoryOptions[1]['options']).map(value => {
  if (value.value === 'dog') {
    let result = categoryOptions[1].label;
    return result;
  }
}))

  return (
    <Container maxWidth="sm" sx={{marginTop: 2}}>
      <div className="todolist-page">
        <Typography variant="h1"
          sx={{fontSize:"4rem", paddingTop:"0.5em" }}
        >To do list</Typography>
          <CreateTodo update={update} setUpdate={setUpdate} categoryOptions={categoryOptions} />
          <ListTodo 
            categoryOptions={categoryOptions}
            complete={complete} setComplete={setComplete}
            update={update} setUpdate={setUpdate} 
            tasks={tasks} setTasks={setTasks}
          />
      </div>
    </Container>
  );
}

export default TodoListPage;
