document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get("selectedText", function(result) {
      document.getElementById("selectedText").value = result.selectedText || "";
    });
    chrome.storage.local.get("currentUrl", function(result) {
      document.getElementById("currentUrl").value = result.currentUrl || "";
    });
  
    const notaForm = document.getElementById("notaForm");
  
    notaForm.addEventListener("submit", function (event) {
        event.preventDefault();
      
        const comment = document.getElementById("comment").value;
        const selectedText = document.getElementById("selectedText").value;
        const currentUrl = document.getElementById("currentUrl").value;
      
        const data = {
          text: selectedText,
          comment: comment,
          currenturl: currentUrl,
        };
        console.log("Selected Text:", selectedText);
console.log("Comment:", comment);
console.log("Data:", data);
      
        fetch("https://nota.lol/api/endpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log("Response:", response);
            // Optionally, perform any additional actions after receiving the response
            window.close();
          })
          .catch((error) => {
            console.error("Error:", error);
            // Optionally, handle the error or display an error message
          });
      
        // Close the popup after form submission
        // window.close();
      });
      
});