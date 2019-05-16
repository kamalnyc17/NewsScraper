// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p class='heading' data-id='" + data[i]._id + "'>" + data[i].title + "</p>");
    $("#articles").append("<p class='summary' data-id='" + data[i]._id + "'>" + data[i].summary + "</p>");
    $("#articles").append("<a class='link-icons' title = 'Delete Document' id='delete' data-id='" + data[i]._id + "'>" + "<i class='trash icon'></i>" + "<a>");
    $("#articles").append("<a class='link-icons' title = 'Add Comment' id='open' data-id='" + data[i]._id + "' href=/articles/"+ data[i]._id + ">" + "<i class='folder open icon'></i>" + "<a>");
    $("#articles").append("<a class='link-icons' title = 'Open Link'id='url' data-id='" + data[i]._id + "' data-url='https://www.nhl.com/" + data[i].link + "'>" + "<i class='linkify icon'></i>" + "<a>");
    $("#articles").append("<hr>")
  }
});

// Whenever someone clicks a link to open the page
$(document).on("click", "#url", function() {
  // Save the id from the p tag
  var thisURL = $(this).attr("data-url");
  window.open(thisURL, "_blank");
});

// deleting an article
$(document).on("click", "#delete", function() {
  // Save the id from the p tag
  var thisID = $(this).attr("data-id");
  
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/delete/" + thisID
  })
    // With that done, add the note information to the page
    .then(function(data) {
      location.reload();
    });
});

// saving a comment
$("#create_comment").on("click", function () {
  // Save an empty comment object
  var comment = {};
  comment.threadid  = $("#comment-id").text();
  comment.name = $("[name=fname]").val();
  comment.body = $("[name=comment]").val();
  
  $.post("/api/comment", comment, function () {
    location.reload(true);
  });
});
// // load old comments once the page is loaded
$(document).ready(function() {
  // Save an empty comment object
  var comment = $("#comment-id").text();
  // Grab the comments as a json
  $.get("/api/comment/" + comment, function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#comments").append("<p class='name heading'>" + data[i].name + "</p>");
      $("#comments").append("<p class='body summary'>" + data[i].body + "</p>");
      $("#comments").append("<a class='link-icons' title = 'Delete Document' id='delete-comment' data-id='" + data[i]._id + "'>" + "<i class='trash icon'></i>" + "<a>");
      $("#comments").append("<hr>")
    }
  });

})

// deleting a comment
$(document).on("click", "#delete-comment", function() {
  // Save the id from the p tag
  var thisID = $(this).attr("data-id");
  
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/delete-comment/" + thisID
  })
    // With that done, add the note information to the page
    .then(function(data) {
      location.reload();
    });
});

/* another option for loading old comments
$("#old_comment").on("click", function () {
  // Save an empty comment object
  var comment = $("#comment-id").text();
  // Grab the comments as a json
  $.get("/api/comment/" + comment, function(data) {
    // For each one
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#comments").append("<p class='name heading'>" + data[i].name + "</p>");
      $("#comments").append("<p class='body summary'>" + data[i].body + "</p>");
      $("#comments").append("<a class='link-icons' title = 'Delete Document' id='delete-comment' data-id='" + data[i]._id + "'>" + "<i class='trash icon'></i>" + "<a>");
      $("#comments").append("<hr>")
    }
  });
});

*/