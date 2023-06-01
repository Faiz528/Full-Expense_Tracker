var name=document.getElementById('name')
async function save(event)
{
    event.preventDefault()
    var name = event.target.name.value
    var email = event.target.email.value
    var pass = event.target.password.value
    var object={
        name,
        email,
        pass
    }
    try{
        const response = await axios.post('http://localhost:3000/login',object)
        console.log(response)
    }
    catch(err){
       console.log(err)
    }
}