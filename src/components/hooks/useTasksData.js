//customizable hook
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

//fetcher function
const fetchTasks = (username) => {
    return axios.get(`http://localhost:8000/${username}/`);
}


//mutation function
const addTaskToUser = (username) => {
    // generate a function that receives only the task, to give to useMutation
    return (task) => {
        return axios.post(`http://localhost:8000/${username}/`, task)
    }
}

export const useTasksData = (onSuccess, onError, {userName}) => {
    //call the useQuery hook, it requires at least two arguments
    //1st - queries have an unique key
    //2nd - function that returns a promise
    return useQuery(['tasks', userName], () => fetchTasks(userName), {
        onSuccess,
        onError,
        enabled: !!userName,
        //sorted tasks during fetch
        select: (response) => {
            const tasks = response.data.tasks;
            const importantTasks = tasks.filter(task => task.important === true);
            const unimportantTasks = tasks.filter(task => !task.important);
            unimportantTasks.reverse();
            return [...importantTasks, ...unimportantTasks];
        }
    })
}

export const useAddTask = (username) => {
    const queryClient = useQueryClient();
    const addTask = addTaskToUser(username);
    return useMutation(addTask, {
        onSuccess: (data) => {
            //this funciton updates the query cache
            queryClient.setQueryData(['task', username], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data.tasks, data.data.tasks],
                }
            })
            //this is to save network connection and avoid an unnecessary get request
            //queryClient.invalidateQueries('tasks')
        }
    })
}
/* export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation(addTask, {
        onSuccess: (data) => {
            //this funciton updates the query cache
            queryClient.setQueryData('tasks', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data],
                }
            })
            //this is to save network connection and avoid an unnecessary get request
            //queryClient.invalidateQueries('tasks')
        }
    })
} */
