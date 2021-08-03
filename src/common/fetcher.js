import React from 'react'

const baseUrl = 'http://67.205.186.119:8080';

export const fetchSinToken = async ( endpoint, data, method = 'GET' ) => {

    console.log("fetched");
    const url = `${ baseUrl }/${ endpoint }/`;

    if ( method === 'GET' ) {
        return await fetch( url );
    } else {
        const fetched = await fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
        console.log("fetched2");
        console.log(fetched);
        console.log("fetched3");

        return fetched;
    }
}


export const fetchSinTokenDoc = async ( endpoint, data, method = 'GET' ) => {

    console.log("fetched");
    const url = `${ baseUrl }/${ endpoint }/`;

    if ( method === 'GET' ) {
        return await fetch( url );
    } else {
        const fetched = await fetch( url, {
            method,
            headers: {
                // 'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
                'Accept': '*/*',
            },
            body: data
        });
        console.log("fetched2");
        console.log(fetched);
        console.log("fetched3");

        return fetched;
    }
}
