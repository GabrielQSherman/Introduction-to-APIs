
window.onload = () => {

    let picturesSubmit = document.getElementById('picPostBtn');

    picturesSubmit.onclick = postPictureRequest;

    console.log(document.getElementById('picPostBtn'));

    document.getElementById('picPostBtn').addEventListener('onclick', postPictureRequest);

    function postPictureRequest() {
        console.log('test');
        
    }

}
