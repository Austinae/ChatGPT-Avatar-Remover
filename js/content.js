function initialCheck() {
  const specificElements = document.querySelectorAll("div.flex-shrink-0.flex.flex-col.relative.items-end");
  if (specificElements.length > 0) {
  
    specificElements.forEach((specificElement) => {
      specificElement.style.visibility = "hidden";
    });
  }
}
initialCheck();
const targetElement = document.body;
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
    
      const specificElements = document.body.querySelectorAll("div.flex-shrink-0.flex.flex-col.relative.items-end");
      if (specificElements.length > 0) {
      
        specificElements.forEach((specificElement) => {
          specificElement.style.visibility = "hidden";
        });
      }
    }
  }
});
const config = { childList: true, subtree: true };
observer.observe(targetElement, config);