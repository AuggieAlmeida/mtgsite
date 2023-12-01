function rmvLife(id) {
    var life = parseInt(document.getElementById("life"+id).innerHTML)
    document.getElementById("life"+id).innerText = life - 1

}

function addLife(id) {
    var life = parseInt(document.getElementById("life"+id).innerHTML)
    document.getElementById("life"+id).innerText = life + 1

}
