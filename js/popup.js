const toggleButton = document.getElementById('toggleButton')
const statusElement = document.getElementById('status')
const closeButton = document.getElementById('closeButton')
let isExtensionEnabled = true

const closePopup = () => {
	window.close()
}

const updateWindowContent = (state) => {
	toggleButton.textContent = state ? 'Disable' : 'Enable'
	statusElement.textContent = state ? 'enabled' : 'disabled'
}

const setExtensionState = (state) => {
	chrome.storage.local.set({'isChatGPTAvatarRemoverEnabled': state }, () => {
		console.log(`Extension state is set to ${state}`)
		isExtensionEnabled = state
	})
}

// Retrieve the current extension state from storage.
chrome.storage.local.get('isChatGPTAvatarRemoverEnabled', (data) => {
	if (data.isChatGPTAvatarRemoverEnabled === undefined) {
		setExtensionState(true)
		updateWindowContent(true)
	} else {
		updateWindowContent(data.isChatGPTAvatarRemoverEnabled)
		isExtensionEnabled = data.isChatGPTAvatarRemoverEnabled
	}
})

toggleButton.addEventListener('click', () => {
	setExtensionState(!isExtensionEnabled)
	updateWindowContent(!isExtensionEnabled)

	// Send a message to the content script to inform it of the state change.
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs) {
			const tab = tabs[0]
			if (tab) {
				const tabId = tab.id
				const message = { action: 'toggleExtension', isExtensionEnabled: !isExtensionEnabled }
				chrome.tabs.sendMessage(tabId, message)
			}
		}
	})
})

closeButton.addEventListener('click', closePopup)