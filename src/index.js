document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const url = 'http://localhost:3000/dogs';
    const dogForm = document.getElementById('dog-form');

    fetch(url)
    .then( res => res.json)
    .then( dogs => dogs.forEach(getDog))

    function getDog(dog){
        tableBody.innerHTML += `
        <tr data-id=${dog.id}>
             <td>${dog.name}</td>
             <td>${dog.breed}</td>
             <td>${dog.sex}td>
             <td><button id='edit-btn' data-id=${dog.id}>Edit</button></td>
        </tr>
        `
    }

    document.addEventListener( 'click', handleEvents);

    function handleEvents(event){
        event.preventDefault();
        if(event.target.id === 'edit-btn'){
            editDog(event.target.dataset.id)
        }
        else if(event.target.id === 'dog-form'){
            editedDog(event)
        }
    }

    function editDog(id){
        fetch(`${url}/${id}`)
        .then(res => res.json)
        .then( dog => {
            dogForm.name.value = dog.name,
            dogForm.sex.value = dog.sex,
            dogForm.breed.value = dog.breed,
            dogForm.dataset.id = dog.id
        })
    }

    function editedDog(event){
        let dog ={
            name: event.target.parentElement.name.value,
            sex: event.target.parentElement.sex.value,
            breed: event.target.parentElement.breed.value
        }

    fetch(`${url}/${event.target.parentElement.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            accepts: 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then( res => res.json)
    .then( dog => {
        let foundDog = document.querySelector(`tr[data-id= "${dog.id}"]`)
        foundDog.children[0].innnerText = dog.name
        foundDog.children[1].innnerText = dog.breed
        foundDog.children[2].innnerText = dog.sex
    })
    }

})