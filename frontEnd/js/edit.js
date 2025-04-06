document.addEventListener("DOMContentLoaded", () => {


//load the data initially
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
//alos store the movie id in databas
let movie_id_database = null

//banner and poster initial null
let poster1 = ""
let banner1 = ""


load_initial(movieId)
//call the api to get the current movie detials
async function load_initial(id){
    try{
        const res = await fetch(`/loadPreview/${id}`)
        const data = await res.json()

        //assign the movie_id_database
        movie_id_database = data._id
        
        //now give input field default values
        document.getElementById('name').value = data.name
        //to check the screens
        let s2k = document.getElementById('2k')
        let s4k = document.getElementById('4k')
        let imax = document.getElementById('imax')
        //store in array all fields
        let screen_arr = [s2k,s4k,imax]
        //data in server ,screens
        let screens = data.screens
        console.log(screens[0])
        //now check the values in screens array and tick the values
        for(i=0;i<3;i++){
            
            if(screens.includes(screen_arr[i].value)){
                screen_arr[i].checked = true
            }
        }

        //to check languages
        let malayalam = document.getElementById('malayalam')
        let english = document.getElementById('english')
        let tamil = document.getElementById('tamil')
        let hindi = document.getElementById('hindi')
        let telugu = document.getElementById('telugu')
        let kannada = document.getElementById('kannada')
        //store lanuges in an array
        let language_arr = [malayalam,english,tamil,hindi,telugu,kannada]
        //data languages from server
        let languages = data.languages

        //now check for the languages in data server and tick the values
        for(i=0;i<6;i++){
            if(languages.includes(language_arr[i].value)){
                language_arr[i].checked = true
            }
        }

        //now the duration
        document.getElementById('timePicker').value = data.duration

        //now check for the category
        let action = document.getElementById('action')
        let comedy = document.getElementById('comedy')
        let drama = document.getElementById('drama')
        let scifi = document.getElementById('sci-fi')
        let thriller = document.getElementById('thriller')

        //now store in array
        let category_arr = [action,comedy,drama,scifi,thriller]
        //data categories from the server
        let categories = data.categories

        //now check 
        for(i=0;i<5;i++){
            if(categories.includes(category_arr[i].value)){
                category_arr[i].checked = true
            }
        }

        //now certificate
        document.getElementById('certificate').value = data.certificate

        //now release data
        document.getElementById('releaseDate').value = data.releaseDate.split("T")[0]


        //now poster
        document.getElementById('posterPreview').innerHTML = `<img width="200px" height="200px" src=${data.poster}></img>`

        //now banner
        document.getElementById('bannerPreview').innerHTML = `<img width="200px" height="200px" src=${data.banner}></img>`

        //assign values to poster and banner
        poster = data.poster
        banner = data.banner
    }
    catch(error){
        console.log(error)
    }    
}



//convert poster to base64 and then display in the page

document.getElementById('poster').addEventListener('change',async(e)=>{
    const poster_img = e.target.files[0]
    poster = await convertBase64(poster_img)
    document.getElementById('posterPreview').innerHTML = `<img width="200px" height="200px" src=${poster}></img>`
    console.log("Hello")
})

//convert banner to base64 and then display in the page

document.getElementById('banner').addEventListener('change',async(e)=>{
    const banner_img = e.target.files[0]
    banner = await convertBase64(banner_img)
    document.getElementById('bannerPreview').innerHTML = `<img width="200px" height="200px" src=${banner}></img>`
})


//function to convert image to base64
function convertBase64(file){

    return new Promise((resolve,reject)=>{
        //create object of file reader class
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        //when reading is done
        fileReader.onload = ()=>{
            resolve(fileReader.result)
        }

        //if error then reject with error
        fileReader.onerror = ()=>{
            reject(fileReader.error)
        }
    })
}




//send movie details to database

document.getElementById('myForm').addEventListener('submit',async(e)=>{
    e.preventDefault()

    let name = document.getElementById("name").value
    console.log(name)
    
    // let screen = document.getElementById("screen").value
    // let language = document.getElementById("language").value
    let duration = document.getElementById("timePicker").value
    // let category = document.getElementById("category").value
    let certificate = document.getElementById("certificate").value
    let releaseDate = document.getElementById("releaseDate").value

    //languages section
    //check language and add to array
    let malayalam = document.getElementById('malayalam')
    let english = document.getElementById('english')
    let tamil = document.getElementById('tamil')
    let hindi = document.getElementById('hindi')
    let telugu = document.getElementById('telugu')
    let kannada = document.getElementById('kannada')

    let a = [malayalam,english,tamil,hindi,telugu,kannada]
    let languages = []

    for(i=0;i<a.length;i++){
        if(a[i].checked){
            languages.push(a[i].value)
        }
    }

    //check screen and add to array
    let s2k = document.getElementById('2k')
    let s4k = document.getElementById('4k')
    let smax = document.getElementById('imax')
    
    let b = [s2k,s4k,smax]
    let screens = []

    for(i=0;i<b.length;i++){
        if(b[i].checked){
            screens.push(b[i].value)
        }
    }
    
    
    //check category and add to array
    let action = document.getElementById('action')
    let comedy = document.getElementById('comedy')
    let drama = document.getElementById('drama')
    let scifi = document.getElementById('sci-fi')
    let thriller = document.getElementById('thriller')

    let c = [action,comedy,drama,scifi,thriller]
    let categories = []
    
    for(i=0;i<c.length;i++){
        if(c[i].checked){
            categories.push(c[i].value)
        }
    }
    
   

    var data = {name,screens,languages,duration,categories,certificate,releaseDate,poster,banner}

    console.log(data)



    try{

        //hit the api with post request along with the data
        let options = {
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(data)
        }
        const res = await fetch(`/editMovie/${movie_id_database}`,options)
        let content  = await res.json()
        console.log(content)
        if(res.status==201){
            alert("Movie Updated SuccessFully")
        }
        else{
            alert("Some Error updating movie")
            console.log(content.error)
        }
    }

    catch(error){
        console.log(error)
    }
})

})










