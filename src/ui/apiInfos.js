import { getAllFollowed,getImgUsers,getIDUser } from "./apiGet.js";

// recupera o token de acesso que foi guardado local storage;

const acess_token_user = localStorage.getItem('Id_user');
const acess_token = JSON.parse( acess_token_user);

var myInit = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${acess_token}`,
        'Client-Id': 'b1cjxtyr3w1e2u9t7t6mkq10el3rct',
    },
    mode: "cors",
    cache: "default",
};

// função que crias os cards de cada canal assinado

function createElm(text,link,imgURL,classOnline){

    const container = document.querySelector('#container');
    
    let Li = document.createElement('li')
    let buttons = document.createElement('a')
    let bannerOnline = document.createElement('div')
    let imgProfile = document.createElement('img')
    let description = document.createElement('span')
    description.textContent+= `${text}`;
    imgProfile.src = `${imgURL}`;
    bannerOnline.className = `${classOnline}`;
    bannerOnline.appendChild(imgProfile);
    buttons.appendChild(bannerOnline);
    buttons.appendChild(description);
    buttons.href = `${link}`;
    
    
    Li.appendChild(buttons)

    container.appendChild(Li);

}




// buscar id do usuario logado com conta twitch

getIDUser(myInit)
    .then( data =>{

        const idUser = data.id;
        const imgProfile = document.querySelector('#imgProfile')
        imgProfile.src = `${data.profile_image_url}`

        //ira verificar todos os canais que o usuario assinou
        
        getAllFollowed( idUser, myInit ).then( (data) => {

            data.map((data, index)=>{

                if(index < 20){

                    const nameLogin = data.broadcaster_login;
                    
                    //busca as imagem de todos os canais que o usuario assinou

                    const prmisseImg = getImgUsers( nameLogin, myInit);

                    prmisseImg.then((dataProfile)=>{
                        
                        fetch(`https://api.twitch.tv/helix/streams?user_login=${nameLogin}`, myInit).then((respota)=>{
                            respota.json().then( (data) =>{
                                if(data.data[0] == undefined){
                                    console.log('ta indo 1')
                                    createElm(nameLogin, `https://www.twitch.tv/${nameLogin}`, dataProfile.data[0].profile_image_url, 'none')
                                }else{

                                    console.log('ta indo 2')
                                    createElm(nameLogin, `https://www.twitch.tv/${nameLogin}`, dataProfile.data[0].profile_image_url, 'online')
                                }
                            })
                        })


                        
                    })

                    
                }

            })
        })
}

)



 

