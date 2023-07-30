document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get(["selectedText", "apiKey"], function(result) {
      document.getElementById("selectedText").value = result.selectedText || "";
      
      if (result.apiKey) {
        // If API key is already in local storage, show the read-only section
        document.getElementById("apiKeyReadonly").value = result.apiKey;
        document.getElementById("apiKeyReadonlySection").style.display = "block";
        document.getElementById("apiKeySection").style.display = "none";
      } else {
        // If API key is not in local storage, show the input field
        document.getElementById("apiKeySection").style.display = "block";
      }
    });
    chrome.storage.local.get("currentUrl", function(result) {
      document.getElementById("currentUrl").value = result.currentUrl || "";
    });
  
    const notaForm = document.getElementById("notaForm");
  
    notaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (document.getElementById("apiKeySection").style.display === "block") {
          const apiKeyInput = document.getElementById("apiKey") || "";
          const apiKey = apiKeyInput.value.trim();
      
          if (apiKey !== "") {
            // Store the API key in local storage
            chrome.storage.local.set({ apiKey: apiKey }, function() {
              // Hide the input field and show the read-only section with the API key
              apiKeyInput.value = "";
            });
          }
        }
        //let apikey = "";
        // chrome.storage.local.get("apiKey", function(result) {
        //   apikey = result.apiKey;
        // });
        const apikey = document.getElementById("apiKeyReadonly").value;
        const comment = document.getElementById("comment").value;
        const selectedText = document.getElementById("selectedText").value;
        const currentUrl = document.getElementById("currentUrl").value;
      
        const data = {
          apikey: apikey,
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
      document.getElementById("clearApiKeyButton").addEventListener("click", function() {
        // Send a message to the background script to clear the apiKey
        chrome.storage.local.remove("apiKey");
      });
});

