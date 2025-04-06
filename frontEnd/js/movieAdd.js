


//convert poster to base64 and then display in the page
let poster = ""
document.getElementById('poster').addEventListener('change',async(e)=>{
    const poster_img = e.target.files[0]
    poster = await convertBase64(poster_img)
    document.getElementById('posterPreview').innerHTML = `<img width="200px" height="200px" src=${poster}></img>`
})

//convert banner to base64 and then display in the page
let banner = ""
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



    try{

        //hit the api with post request along with the data
        let options = {
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(data)
        }
        const res = await fetch("/addMovie",options)
        let content  = await res.json()
        console.log(res)
        if(res.status==201){
            alert("Data Added Successfully")
            window.location.href = "/"
        }
        else{
            alert("Some Error")
            console.log(content.error)
        }
    }

    catch(error){
        console.log(error)
    }
})










