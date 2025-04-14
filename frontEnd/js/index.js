// movie card
let card = document.getElementById('cards')
let str1 = ""




async function loadData(){
    
    try{

        const res = await fetch("/api/loadData")
        const data = await res.json()
        data.forEach(element => {

            str1+=`
            <a href="movie_preview.html?id=${element._id}"><div class="card">
            <img src=${element.poster}></img><p>${element.name}</p>
            <span >${element.categories.join("/")}</span></div></a>
            `
            
        });

        card.innerHTML = str1

        //welcome messege
        const username = localStorage.getItem('username')
       
       

        if(username){

            //now split the email
            const ac_username = username.split("@")[0]

            //welome 
            const welcome_span = document.getElementById('welcome')
            welcome_span.textContent = `Welcome back ${ac_username}`

            const logIn = document.getElementById('logIn')
            const signUp =  document.getElementById('signUp')

            //now hide the login and sigup button
            logIn.style.display = "none"
            signUp.style.display = "none"
        }

        localStorage.removeItem('username')

        
    }
    catch(error){
        // alert("error loading data")
        console.log(data.error)
    }
}


loadData()


// movieBar



