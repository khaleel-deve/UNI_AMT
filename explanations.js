// Main function to update 'fromPage' and 'docTitle' fields automatically.
function updateFormFields() {
    // Collect all rows in the form. Each row contains input fields for 'fromPage', 'toPage', a dropdown for document type, and 'docTitle'.
    const rows = Array.from(document.querySelectorAll('.form-group.row'));

    let previousToPage = null;      // Variable to store the last 'toPage' value for reference.
    let lastUpdatedRow = null;      // Tracks the last row where the 'fromPage' was auto-filled.

    // Loop through each row in the form to handle updates.
    rows.forEach((row, index) => {
        const fromPageInput = row.querySelector('#fromPage');       // Input field for 'fromPage'.
        const toPageInput = row.querySelector('#toPage');           // Input field for 'toPage'.
        const selectElement = row.querySelector('select');          // Dropdown field for document type.
        const docTitleInput = row.querySelector('#docTitle');       // Input field for document title.

        // Update 'fromPage' field based on previous row's 'toPage' value
        if (toPageInput && fromPageInput) {
            // Convert 'toPage' value to an integer, if it exists.
            const currentToPage = parseInt(toPageInput.value, 10);

            // Check if there was a previous 'toPage' value and the 'fromPage' field is empty.
            // This condition is met only when this is the next row (ensures only one row gets updated at a time).
            if (previousToPage !== null && !fromPageInput.value && index === (lastUpdatedRow + 1)) {
                fromPageInput.value = previousToPage + 1;  // Set 'fromPage' to the previous 'toPage' + 1.

                // Trigger events so that the form acknowledges the 'fromPage' value has changed.
                fromPageInput.dispatchEvent(new Event('input', { bubbles: true }));
                fromPageInput.dispatchEvent(new Event('change', { bubbles: true }));
                fromPageInput.dispatchEvent(new Event('blur', { bubbles: true }));
            }

            // Update tracking variables if the current 'toPage' field has a value.
            if (currentToPage) {
                previousToPage = currentToPage;
                lastUpdatedRow = index;
            }
        }

        // Update 'docTitle' field based on the selected option in the dropdown
        if (selectElement && docTitleInput) {
            // Function to set 'docTitle' based on selected dropdown option
            const updateDocTitle = () => {
                // Get the text of the selected option and set it as the value of 'docTitle'
                const selectedText = selectElement.options[selectElement.selectedIndex].text;
                docTitleInput.value = selectedText;

                // Trigger events so that the form acknowledges the 'docTitle' value has changed.
                docTitleInput.dispatchEvent(new Event('input', { bubbles: true }));
                docTitleInput.dispatchEvent(new Event('change', { bubbles: true }));
                docTitleInput.dispatchEvent(new Event('blur', { bubbles: true }));
            };

            // Initial update to ensure 'docTitle' matches the selected option when the page loads.
            updateDocTitle();
            
            // Add an event listener on the dropdown to update 'docTitle' whenever the selection changes.
            selectElement.addEventListener('change', updateDocTitle);
        }
    });
}

// Attach the function to the change event of 'toPage' inputs.
// This ensures that whenever a 'toPage' input changes, it triggers an update of 'fromPage' in the following row.
document.querySelectorAll('#toPage').forEach(input => {
    input.addEventListener('change', updateFormFields);
});

// Initial call to handle any pre-filled values when the page loads.
// This ensures that if there are pre-existing values in 'toPage' or dropdown, 'fromPage' and 'docTitle' fields are set accordingly.
updateFormFields();
