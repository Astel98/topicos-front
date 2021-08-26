import React from 'react'
import { useSelector } from 'react-redux';

const baseUrl = 'http://67.205.186.119:8080';



export const fetchSinToken = async (endpoint, data, method = 'GET') => {

    console.log("fetched");
    const url = `${baseUrl}/${endpoint}/`;

    if (method === 'GET') {
        return await fetch(url);
    } else {
        const fetched = await fetch(url, {
            method,
            headers: {
            },
            body: JSON.stringify(data)
        });
        console.log("fetched2");
        console.log(fetched);
        console.log("fetched3");

        return fetched;
    }
}

export const fetchSinTokenJSON = async (endpoint, data, method = 'GET') => {

    console.log("fetched");
    const url = `${baseUrl}/${endpoint}/`;

    if (method === 'GET') {
        return await fetch(url);
    } else {
        const fetched = await fetch(url, {
            method,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: data
        });
        console.log("fetched2");
        console.log(fetched);
        console.log("fetched3");

        return fetched;
    }
}


export const fetchSinTokenDoc = async (endpoint, data, method = 'GET') => {

    console.log("fetched");
    const url = `${baseUrl}/${endpoint}/`;

    if (method === 'GET') {
        return await fetch(url);
    } else {
        const fetched = await fetch(url, {
            method,
            headers: {
                // 'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
                'Accept': '*/*',
            },
            body: JSON.stringify(data)
        });
        console.log("fetched2");
        console.log(fetched);
        console.log("fetched3");

        return fetched;
    }
}


export const fetchConToken = (endpoint, access, data, method = 'GET') => {


    const url = `${baseUrl}/${endpoint}/`;
    const token = localStorage.getItem('access-token');
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJwZXJzb25hX2lkIjoxLCJncnVwb19pZCI6Mn0.I81Y7O0llcA_hvAlK_Fizxy6Xhhj98fEAqHDpSNHYks'

    console.log(token)

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'Authorization': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
    }
}