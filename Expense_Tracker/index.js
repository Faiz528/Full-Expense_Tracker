var name=document.getElementById('name')
async function save(event)
{
    event.preventDefault()
    var name = event.target.name.value
    var pass = event.target.password.value
    var object={
        name,
        pass
    }
    console.log(object)
    try{
        const response = await axios.post('http://localhost:3000/login',object)
    }
    catch(err){
       console.log(err)
    }
}