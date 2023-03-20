import { useState } from "react";

export default function useFetch(baseUrl) {

    const [loading, setLoading] = useState(true);

    function get(url) {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url)
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    reject(data);
                    setLoading(false);
                }   
                resolve(data);
                setLoading(false);
            })
            .catch(error => {
                reject(error);
                setLoading(false);
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
                    reject(data);
                    setLoading(false);
                }
                resolve(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                reject(error);
            })
        })
    }

    function put(url, body) {
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
                    reject(data)
                    setLoading(false);
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

    function patch(url, body) {
        return new Promise ((resolve, reject) => {
            fetch(baseUrl + url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    reject(data)
                    setLoading(false);
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
            fetch(baseUrl + url, {
                method: 'DELETE',
            })
    }

    return { get, post, deleteItem, patch, put, loading };
}