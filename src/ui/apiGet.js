async function getAllFollowed(id, myInit){
    const responseJson = await fetch(`https://api.twitch.tv/helix/channels/followed?user_id=${id}`, myInit)
    const response = await responseJson.json()
    const data = await response.data;
    return ( data)
}

async function getIDUser(myInit){
    const responseJson = await fetch("https://api.twitch.tv/helix/users?", myInit)
    const response = await responseJson.json()
    const data = await response.data[0];
    return(data)
}

async function getImgUsers(login,myInit){
    const reponse = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, myInit)
    const data = await reponse.json();
    return (data)
}

async function getChannelLive(broadcaster_login,myInit) { 
    const response  = await fetch(`https://api.twitch.tv/helix/streams?user_login=${broadcaster_login}`, myInit)  
    return response.json();
    
}

export {getAllFollowed,getImgUsers,getIDUser,getChannelLive}