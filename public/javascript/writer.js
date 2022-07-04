document.getElementById("submitButton").onclick = () => {
  event.preventDefault();
  
  let previewContent = document.getElementById("previewArea").innerHTML;
  document.getElementById("bottom").innerHTML = previewContent;
  document.getElementById("loading").style.display = "block";
  
  setTimeout(() => {
    document.getElementById("loading").style.display = "none"
  }, 1000);
  document.getElementById("theForm").submit();
}

setTimeout(function() {
    document.getElementById("previewArea").focus();
}, 0);

document.getElementById("jsTester").innerHTML = "<h2>If you're seeing this, then Javascript is probably working</h2>"