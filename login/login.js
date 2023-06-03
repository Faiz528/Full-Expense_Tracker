var name=document.getElementById('name')
async function save(event)
{
    event.preventDefault()
    var email = event.target.email.value
    var pass = event.target.password.value
    var object={
        email,
        pass
    }
    //console.log(object)
    try {
        const response = await axios.post('http://localhost:3000/login', object);
        console.log(response.data);
    
      
        alert("Login Succesfully")
      }
    catch(err){
      alert( err.response.data);
    }
}
