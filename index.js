/**
 * svgclickhandler Library
 * Handles click events on embedded SVGs inside <object> tags.
 */
const SvgClickHandler = (() => {
    /**
     * Initializes click handling for an SVG embedded in an <object>.
     * @param {HTMLObjectElement} svgObject - The <object> element containing the SVG.
     * @param {Function} callback - The callback function to handle click events.
     * The callback receives the `xlink:href` value (without the leading '#').
     */
    const initialize = (svgObject, callback) => {
        if (!svgObject) {
            console.error("SVG object reference is null or undefined.");
            return;
        }

        // Listen for when the SVG is loaded
        svgObject.addEventListener("load", () => {
            const svgDoc = svgObject.contentDocument; // Access the SVG document
            const svgElement = svgDoc?.querySelector("svg"); // Get the root <svg> element

            if (svgElement) {
                // Add a click event listener to the entire SVG
                svgElement.addEventListener("click", (event) => {
                    const clickedElement = event.target.closest('a'); // Get the clicked element
                    let option = null;

                    if (clickedElement) {
                        const href = clickedElement.getAttribute("xlink:href"); // Get the xlink:href attribute
                        if (href) {
                            option = href.startsWith("#") ? href.slice(1) : href; // Remove the leading '#'
                        }
                    }

                    if (option) {
                        callback(option); // Pass the cleaned href to the callback
                    }

                    // Prevent default behavior
                    event.preventDefault();
                });
            } else {
                console.error("SVG element not found.");
            }
        });
    };

    return { initialize };
})();

module.exports = SvgClickHandler;