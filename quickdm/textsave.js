function saveAndDownload() {
    // Get the textarea content
    var text = document.getElementById("textbox").value;
  
    //  Blob with the textarea content
    var blob = new Blob([text], {type: "text/plain"});
  
  
    var url = URL.createObjectURL(blob);
  
    // download link 
    var a = document.createElement("a");
    a.href = url;
    a.download = "saveNotes.txt";
    a.click();
  
    URL.revokeObjectURL(url);
  }