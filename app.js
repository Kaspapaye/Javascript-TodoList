$(document).ready(function () {

  //add a task from the input and place in localstorage
  var taskList = [];
  $("#button").click(function () {
    var text = $("#myInput").val();
    if (text !== "") {
      taskList.push(text);
      $("#myUL").append($("<li>").html(text));
      text = "";
      localStorage.setItem("mylist", JSON.stringify(taskList));
    } else alert("veuillez entrer un projet à faire");
  });

  //validate an input with the enter key
  $("#myInput").keyup(function (event) {
    if (event.keyCode == 13) {
      $("#button").click();
    }
  });

  //erase input content on click
  $("input:text").focus(function () {
    $(this).val("");
  });

  //bar and unbar
  $(document).on("click", "li", function () {
    if ($(this).css("text-decoration-line") == "none")
      $(this).css("text-decoration-line", "line-through");
    else $(this).css("text-decoration-line", "none");
  });

  //choose the order of priority of tasks (todo : make it persistent)
  $("#myUL").sortable();

  //On startup, retrieves and displays the stored tasks
  let saved = localStorage.getItem("mylist");
  if (saved) {
    taskList = JSON.parse(localStorage.getItem("mylist"));    
    taskList.forEach((task) => $("#myUL").append($("<li>").html(task)));
    /*equivalent to :
    for (var task in taskList) {
      $("#myUL").append($("<li>").html(task));
    }*/
  }

  //Clear completed tasks
  $(document).on("dblclick", "li", function () {
    $(this).toggleClass("strike").fadeOut("slow")
    var content = this.textContent;
    var indexContent = taskList.indexOf(content);
    console.log(indexContent);
    taskList.splice(indexContent, 1); 
    console.log(taskList);
    localStorage.setItem("mylist", JSON.stringify(taskList));
  });
});
