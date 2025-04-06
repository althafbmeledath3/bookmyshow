//get the id
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

//get the poster div
let poster = document.getElementById('poster')
let banner = document.getElementById('preview-section')
//get the button div
let btn = document.getElementById('btn')


//call the api
async function load_preview(){
   

    try{
        const res = await fetch(`/loadPreview/${movieId}`);
        const data = await res.json();
        console.log(data);
        poster.innerHTML = `<img src="${data.poster}" alt="Movie Poster"><p>In cinemas</p>`
        //banner image
        banner.style.background = `
        linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), 
        url('${data.banner}')`;
        banner.style.backgroundSize = 'cover';
        banner.style.backgroundPosition = 'center';
        //add the edit and delete button
        btn.innerHTML = `
    <a href="edit.html?id=${data._id}"><button class="book-btn">Edit</button></a>
    <button class="book-btn" onClick="deleteMovie('${data._id}')">Delete</button>`

        
    }
    catch(error){
        console.log(error)
    }
}


//function to delete movie
window.deleteMovie = async function(id) {
    if (id == "") {
        alert("Error deleting movie")
        return
    }
    try {
        const res = await fetch(`/delete/${id}`);
        if (res.status == 200) {
            alert("Movie Deleted Successfully");
            window.location.href = "/";
        }
    } catch (error) {
        alert("Error deleting movie");
        console.log(error);
    }
}





load_preview()
