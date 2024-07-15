import { ID } from "appwrite";

const endpoint = "https://cloud.appwrite.io/v1";
const projectId  = '6663062d001595c7774c'
const apiKey = '1e92c74760e7a7487e295c44230b66acad5ef10f5a2743dc0518ebf7b900284020631d70f8e4213c4ffaf119f2f4ee24412b034d7ac9489d1829bb094a7e781b6d2ea10c8b55ffa2610ab317b18fedd30f6742c75fdc3e28fca347b1e1b7123d6dbf47c509e793b2251f0524c4268f5f18eb18693ad01a31722498b55ece836c'

export async function registerUser({email, password}){
    try{
        const response = await fetch(`${endpoint}/account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': projectId,
                'X-Appwrite-Key': apiKey,
            },
            body: JSON.stringify({
                userId: ID.unique(),
                email: email,
                password: password
            })
        });
    
        if(response){
            await loginUser({email: email, password: password});
        }

    }catch(err){
        console.error(err);
        throw err; // Rethrow or handle as needed
    }
}

export async function loginUser({email, password}){
    try{
        const response = await fetch(`${endpoint}/account/sessions/email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': projectId,
                'X-Appwrite-Key': apiKey
            },
            body: JSON.stringify({
                userId: ID.unique(),
                email: email,
                password: password
            })
        })
        console.log(response);
    }catch(err){
        console.error(err);
        throw err;
    }
}

export async function getUser(){
    try{
        const response = await fetch(`${endpoint}/account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': projectId,
                'X-Appwrite-Key': apiKey,
            }
        })

        var data = await response.json();

        return data;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export async function logoutUser(){
    try{
        await fetch(`${endpoint}/account/sessions`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': projectId,
                'X-Appwrite-Key': apiKey,
            }
        })
    }catch(err){
        console.error(err);
        throw err;
    }
}