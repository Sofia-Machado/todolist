//customizable hook
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

//fetcher function
const fetchTask = ({ queryKey }) => {
    const taskId = queryKey[1];
    return axios.get(`http://localhost:8000/tasks/${taskId}`)
}

//delete function
const deleteTask = (id) => {
    return axios.delete(`http://localhost:8000/tasks/${id}`)
}

export const useTaskData = (taskId) => {
    return useQuery(['task', taskId], fetchTask)
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteTask, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        }
    })
}