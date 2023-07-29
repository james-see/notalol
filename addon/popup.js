document.addEventListener("DOMContentLoaded", function() {
    // Get the current active tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentUrl = tabs[0].url;
    chrome.storage.local.get("selectedText", function(result) {
      document.getElementById("selectedText").value = result.selectedText || "";
    });
  
    const notaForm = document.getElementById("notaForm");
  
    notaForm.addEventListener("submit", function (event) {
        event.preventDefault();
      
        const comment = document.getElementById("comment").value;
        const selectedText = document.getElementById("selectedText").value;
      
        const data = {
          text: selectedText,
          comment: comment,
          currentUrl: currentUrl,
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
});