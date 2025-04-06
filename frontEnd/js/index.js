//movie card
let card = document.getElementById('cards')
let str1 = ""

async function loadData(){
    
    try{

        const res = await fetch("/loadData")
        const data = await res.json()
        data.forEach(element => {

            str1+=`
            <a href="movie_preview.html?id=${element._id}"><div class="card">
            <img src=${element.poster}></img><p>${element.name}</p>
            <span >${element.categories.join("/")}</span></div></a>
            `
            
        });

        card.innerHTML = str1
        
    }
    catch(error){
        console.log(error)
    }
}


loadData()


//movieBar



