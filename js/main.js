function rmvLife(id) {
    var life = parseInt(document.getElementById("life"+id).innerHTML)
    displayLife(id, life)
    document.getElementById("life1").innerText = life - 1

}

function addLife(id) {
    var life = parseInt(document.getElementById("life"+id).innerHTML)
    displayLife(id, life)
    document.getElementById("life"+id).innerText = life + 1

}

function displayLife(id, lp) {
    document.getElementById("lifedisplay"+id).innerText = "_".repeat(lp) 
    document.getElementById("lifedisplay"+id).style.color = "green"
    document.getElementById("lifedisplay"+id).style.backgroundColor = "green"
}