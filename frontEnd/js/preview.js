//get the id
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

//get the poster div
let poster = document.getElementById('poster')
let banner = document.getElementById('preview-section')
//get the button div
let btn = document.getElementById('btn')
//get movie info div
let movie_info = document.getElementById('movie-info')
console.log(movie_info)

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


    movie_info.innerHTML = ` <h1>${data.name}</h1>
          <div class="rating">
            <span>⭐ 8.1/10 (103K Votes)</span>
            <button class="rate-btn">Rate now</button>
          </div>
          <div class="tags">
            <h1 >${data.screens}</h1>
            <h1>${data.languages}</h1>
            <span>Duration : ${data.duration.split(':')[0]}hr ${data.duration.split(":")[1]}m Categories: ${data.categories} ,Cerificates: ${data.certificate} ,Release Date ${data.releaseDate.split("T")[0]}</span>
          </div>
          <a href="edit.html?id=${data._id}"><button class="book-btn">Edit</button></a>
    <button class="book-btn" onClick="deleteMovie('${data._id}')">Delete</button>`


        
    }
    catch(error){
        console.log(error)
    }
}


//function to delete movie
window.deleteMovie = async function(id) {
    if (!id) {
        alert("Error deleting movie");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) {
        return; // Don't proceed if user cancels
    }

    try {
        const res = await fetch(`/delete/${id}`);
        if (res.status === 200) {
            alert("Movie Deleted Successfully");
            window.location.href = "/";
        } else {
            alert("Failed to delete movie");
        }
    } catch (error) {
        alert("Error deleting movie");
        console.log(error);
    }
}





load_preview()
