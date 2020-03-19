function addToDo(){
    //read the input
    //var text=document.getElementById('txt-task').value();
    //console.log(text);
    var text=$(`#txt-task`).val();
    var x=0;
    if(text!=""){
    //console.log(text);
    //clean the input
    //document.getElementById(`txt-task`).value"";
    $('#txt-task').val("");
    console.log(text);
    //create the string (HTML)
    var li=`<li id='${x}'>${text}
    <button onclick="deleteToDo('${x}');">-</button></li>`;
    //display the to do
    $('#pending-list').append(li);
    //set the focus to the input
    }
    $('#txt-task').focus();
}
function deleteToDo(){
    console.log("delete");
    $('#'+id).remove();
}
function init(){
    console.log("init the to do app");
    //sensing user actions/events
    $("#btn-add").click(addToDo);
}
//whe the browser finish rendering the HTML, execute init
window.onload=init;
//alert message when empty element