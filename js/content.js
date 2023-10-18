let isExtensionEnabled = false

// This is weak code because it's subject to change from modifications made by developers
const hideOrShowAvatars = () => {
  const avatars = document.querySelectorAll("div.flex-shrink-0.flex.flex-col.relative.items-end")
  avatars.forEach((specificElement) => {
    specificElement.style.visibility = isExtensionEnabled ? "hidden" : "visible"
  })
}

// Retrieve the current extension state from storage.
chrome.storage.local.get('isChatGPTAvatarRemoverEnabled', (data) => {
  if (data.isChatGPTAvatarRemoverEnabled === undefined) {
    isExtensionEnabled = true
  } else {
    isExtensionEnabled = data.isChatGPTAvatarRemoverEnabled
  }
  hideOrShowAvatars()
})

// Apply removal as the DOM changes
const targetElement = document.body
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") { hideOrShowAvatars() }
  }
})
const config = { childList: true, subtree: true }
observer.observe(targetElement, config)

// Listen for messages from the popup or background script.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleExtension') {
    console.log(message.isExtensionEnabled)
    isExtensionEnabled = message.isExtensionEnabled
    hideOrShowAvatars()
  }
})