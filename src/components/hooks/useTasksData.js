//customizable hook
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

//fetcher function
const fetchTasks = (username) => {
    return axios.get(`http://localhost:8000/${username}/`);
}


//mutation function
const addTask = (task) => {
    return axios.post(`http://localhost:8000/OneTwoThree/`, task)
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
        select: (data) => {
            const importantTasks = data.data.tasks.filter(task => task.important === true);
            const unimportantTasks = data.data.tasks.filter(task => !task.important);
            unimportantTasks.reverse();
            return [...importantTasks, ...unimportantTasks];
        }
    })
}

export const useAddTask = ({userName}) => {
    const queryClient = useQueryClient();
    return useMutation(addTask, {
        
        onSuccess: (data) => {
            //this funciton updates the query cache
            queryClient.setQueryData(['task', userName], (oldQueryData) => {
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