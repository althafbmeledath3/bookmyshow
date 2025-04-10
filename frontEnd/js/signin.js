

async function signIn(event) {

    event.preventDefault();

    let name = document.getElementById('username').value

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let phone = document.getElementById('phone').value
    let confirm_password = document.getElementById('confirm_pass').value

    if(password!=confirm_password){
        
        alert("Passwords do not match")

        return
    }

    let data = {name,email,phone,password}

    let options = {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify(data)
    }

   try{

    const res = await fetch('/api/signin',options)

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



