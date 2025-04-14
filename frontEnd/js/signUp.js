

async function signUp(event) {

    event.preventDefault();

    let username = document.getElementById('username').value

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let phone = document.getElementById('phone').value
    let confirm_password = document.getElementById('confirm_pass').value

    if(password!=confirm_password){
        
        alert("Passwords do not match")

        return
    }

    let data = {username,email,phone,password}


    console.log(data)

    let options = {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify(data)
    }

   try{

    const res = await fetch('/api/signUp',options)

    const data = res.json()

    if(res.status==201){
        alert("Data Added to Database")

        window.location.href="/"
    }
    else{
        alert("Please Fill all the fields")
    }
}

catch(err){
    console.log(err)
}

   }







