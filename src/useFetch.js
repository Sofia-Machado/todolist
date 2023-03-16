import { useState } from "react";

export default function useFetch(baseUrl) {

    const [loading, setLoading] = useState(true);

    function get(url) {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url)
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    setLoading(false);
                    return reject(data);
                }   
                setLoading(false);
                resolve(data);
            })
            .catch(error => {
                setLoading(false);
                reject(error);
            })
        })
    }

    function post(url, body) {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch(error => {
                setLoading(false);
                reject(error);
            })
        })
    }

    function updateItem(url, body) {
        return new Promise ((resolve, reject) => {
            fetch(baseUrl + url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    setLoading(false);
                    return reject(data)
                }
                setLoading(false);
                resolve(data);
            })
            .catch(error => {
                setLoading(false);
                reject(error);
            })
        })
    }

    function deleteItem(url) {
        return new Promise ((resolve, reject) => {
            fetch(baseUrl + url, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return resolve(data);
            })
            .catch(error => {
                reject(error);
                console.log(error)
            })
        })
    }

    return { get, post, deleteItem, updateItem, loading };
}