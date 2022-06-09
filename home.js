function search () {
    var location = document.getElementById("location_input").value
   
    localStorage.setItem('location',location)
    window.location.assign('redirect.html')
}
$("input").on("keydown",function search(e) {
    if(e.keyCode == 13) {
        // alert($(this).val());
        localStorage.setItem('location',$(this).val())
        window.location.assign('redirect.html')
    }
});
    
   
