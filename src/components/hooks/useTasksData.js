//customizable hook
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

//fetcher function
const fetchTasks = (username) => {
    return axios.get(`http://localhost:8000/accounts/${username}`);
}


//mutation function
const addTask = (task) => {
    return axios.post('http://localhost:8000/tasks', task)
}

export const useTasksData = (onSuccess, onError, {username}) => {
    //call the useQuery hook, it requires at least two arguments
    //1st - queries have an unique key
    //2nd - function that returns a promise
    return useQuery(['tasks', username], () => fetchTasks(username), {
        onSuccess,
        onError,
        enabled: !!username,
        //sorted tasks during fetch
        select: (data) => {
            const importantTasks = data.filter(task => task.important === true);
            const unimportantTasks = data.filter(task => !task.important);
            unimportantTasks.reverse();
            return [...importantTasks, ...unimportantTasks];
        }
    })
}

export const useAddTask = () => {
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
}