// Combined function to update 'fromPage' and 'docTitle'         ALL IN ONE CODE TO AUTOMATE HALF WORK
function updateFormFields() {
    const rows = Array.from(document.querySelectorAll('.form-group.row'));

    let previousToPage = null;
    let lastUpdatedRow = null;

    rows.forEach((row, index) => {
        const fromPageInput = row.querySelector('#fromPage');
        const toPageInput = row.querySelector('#toPage');
        const selectElement = row.querySelector('select');
        const docTitleInput = row.querySelector('#docTitle');

        // Update 'fromPage' field based on previous row's 'toPage' value
        if (toPageInput && fromPageInput) {
            const currentToPage = parseInt(toPageInput.value, 10);

            if (previousToPage !== null && !fromPageInput.value && index === (lastUpdatedRow + 1)) {
                fromPageInput.value = previousToPage + 1;

                // Trigger events to ensure the form recognizes the change
                fromPageInput.dispatchEvent(new Event('input', { bubbles: true }));
                fromPageInput.dispatchEvent(new Event('change', { bubbles: true }));
                fromPageInput.dispatchEvent(new Event('blur', { bubbles: true }));
            }

            if (currentToPage) {
                previousToPage = currentToPage;
                lastUpdatedRow = index;
            }
        }

        // Update 'docTitle' field based on the selected option
        if (selectElement && docTitleInput) {
            const updateDocTitle = () => {
                const selectedText = selectElement.options[selectElement.selectedIndex].text;
                docTitleInput.value = selectedText;

                // Trigger events to ensure the form recognizes the change
                docTitleInput.dispatchEvent(new Event('input', { bubbles: true }));
                docTitleInput.dispatchEvent(new Event('change', { bubbles: true }));
                docTitleInput.dispatchEvent(new Event('blur', { bubbles: true }));
            };

            // Initial update and update on dropdown change
            updateDocTitle();
            selectElement.addEventListener('change', updateDocTitle);
        }
    });
}

// Attach the function to the change event of 'toPage' inputs
document.querySelectorAll('#toPage').forEach(input => {
    input.addEventListener('change', updateFormFields);
});

// Initial call to handle any pre-filled values
updateFormFields();
