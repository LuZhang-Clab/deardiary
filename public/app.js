window.addEventListener('load', () => {
    document.getElementById('button-diary').addEventListener('click', () => {
        let diary = document.getElementById('one-thing').value;
        console.log(diary);

        //creating an obj
        let obj = { "thediary": diary };

        // stringify the obj
        let jsonData = JSON.stringify(obj);

        // fetch to route diary
        fetch('/diary', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData

        })
            .then(response => response.json())
            .then(data => { console.log(data) })

    })

    // 1. make a fetch request of type POST so that we can send the (diray) info to the server

})

document.getElementById('get-diary').addEventListener('click', () => {
    // get info of all the diaries
    fetch('/getDiary')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('diary-info').innerHTML = '';
            console.log(data.data)
            for (let i = 0; i < data.data.length; i++) {
                let string = data.data[i].thing;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('diary-info').appendChild(elt);
            }
        })
})
