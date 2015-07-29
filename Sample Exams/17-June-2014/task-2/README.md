#Task 2: Gallery

* Given the HTML (`index.html`), CSS (`styles.css`), JavaScript (`scripts.js` and `jquery.min.js`) and images build a jQuery plugin for a simple gallery control
* The gallery must:
  * Show all available images in a tabular view with rows and columns
  * Columns per row are optional and should be passed as parameter to the plugin
  * If no columns are given to the plugin, the default is 4
  * When the user clicks on an image, the clicked image as well as its previous and next images from the DOM are shown enlarged and fixed at the center of screen
  * When the gallery shows an enlarged image, the background should be blurred and not clickable or usable at all
  * When the user clicks on the already enlarged image, the gallery should return to the initial state and show all available images (allowing the user to click on them again)
  * When the user clicks on the image on the right of the enlarged image, the gallery should enlarge the next image in the DOM
  * If no next image is available, the gallery should show the first image as next
  * When the user clicks on the image on the left of the enlarged image, the gallery should enlarge the previous image in the DOM
  * If no previous image is available, the gallery should show the last image as previous
  * _HINT_
    * Take a closer look at the provided CSS styles.
* To get a better understanding of the gallery, you are provided with visual examples in the result folder
  
  
* Constaints:
  * You must alter only the scripts (JavaScript) and do not touch the HTML structure or the CSS styles
  * You must use jQuery to alter the DOM and build the plugin. You are not allowed to use the native document API
  * You are allowed only to edit the contents of the file "scripts.js"
  * You are NOT allowed to edit the contents of the HTML and/or the CSS files
  
  
* _Examples:_
  * Initial:
    * Three columns:
      * <img src="result/1.1. initial-three-columns.png" width="450" />
    * Five columns:    
      * <img src="result/1.2. initial-five-columns.png" width="450" />
    * Four columns:
      * <img src="result/1.3. initial-four-columns.png" width="450" />    
  * Clicked image:  
    * <img src="result/2. clicked-picture.png" width="450" />
  * Next Image:
    * <img src="result/3. next-picture.png" width="450" />
  * Previous Image:
    * <img src="result/4. previous-picture.png" width="450" />
  