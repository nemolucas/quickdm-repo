let textElement = document.querySelector('textarea');
let text = localStorage.getItem("text");
let buttonSave = document.querySelector('#save');
let firestorage = null;

initFirestorage();

bindValueToFields();


buttonSave.addEventListener('click', event =>{
    
    text = textElement.value.trim()

    localStorage.setItem("text",text)
    
    if(!text){
        alert("Must have text to save.")
        return
      }

      uploadFile(text, title+'.txt', "text/plain;charset=utf-8");

})

function uploadFile(data, filename, type) {

    return
  
    //Cria um novo arquivo
    let file = new Blob([data], {type: type});
  
    /*
     * Após ter criado a conta no firebase é só
     * fazer o upload do arquivo como no exemplo da documentação
     * https://firebase.google.com/docs/storage/web/upload-files?hl=pt-br
     */
    let storageRef = firestorage.ref();
    let ref        = storageRef.child(filename);
    ref.put(file).then(function(snapshot) {
      //O arquivo foi salvo com sucesso
    }).catch(function(err){
      //Ocorreu um erro
    });
  
  }
  
  //Inicializa o Firestorage com as informações da sua conta
  function initFirestorage(){
  
      // Set the configuration for your app
    // TODO: Replace with your project's config object
    var config = {
      apiKey: '<your-api-key>',
      authDomain: '<your-auth-domain>',
      databaseURL: '<your-database-url>',
      storageBucket: '<your-storage-bucket>'
    };
    firebase.initializeApp(config);
  
    // Get a reference to the storage service, which is used to create references in your storage bucket
    firestorage = firebase.storage();
  
  }
  
  //Recupera os valores anteriores que estão recuperados no localStorage
  function bindValueToFields(){
  
    titleElement.value = title
    textElement.value = text
  
  }
  
  /*
   * Função responsável por fazer o download do arquivo
   * para baixar um arquivo basta digitar o nome do arquivo
   * sem a extensão, no campo título.
   * Exemplo de como baixar o arquivo na documentação:
   * https://firebase.google.com/docs/storage/web/download-files?hl=pt-br
   */
  function downloadFile(){
  
    let storageRef = firestorage.ref();
  
    storageRef.child(title).getDownloadURL().then(function(url) {
  
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          download(xhr.response, title+".text", "text/plain;charset=utf-8")
        };
        xhr.open('GET', url);
        xhr.send();
  
    })
  
  }
  
  //Faz o download do arquivo
  function download(data, filename, type) {
      var file = new Blob([data], {type: type});
      if (window.navigator.msSaveOrOpenBlob) // IE10+
          window.navigator.msSaveOrOpenBlob(file, filename);
      else { // Others
          var a = document.createElement("a"),
                  url = URL.createObjectURL(file);
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);  
          }, 0); 
      }
  }