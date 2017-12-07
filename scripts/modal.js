(function() {
  // Define our constructor: object prototype;
  	this.popUp = function() {

  		// Create global element references
   		this.closeButton = null;
   		this.modal = null;
   		this.overlay = null;

   		var defaults = {
   		  className: 'fade-and-drop',
   		  closeButton: true,
   		  content: "",
   		  maxWidth: 600,
   		  minWidth: 280,
   		  overlay: true,
   		}
 		// Determine proper prefix
    	this.transitionEnd = transitionSelect();

   		// Create options by extending defaults with the passed in arugments
   		if (arguments[0] && typeof arguments[0] === "object") { 
   			// if there are arguments and there is 
   			//something in the array and if that argument is an object, 
   			//then we will update the defaults with the new settings 
   			//that the new developer is going to put in
   		  this.options = extendDefaults(defaults, arguments[0]);
   		}
   	} //End of Modal Prototype Object - we're done defining the defaults of the modal

	// Public Methods -------------------------------------------

  	popUp.prototype.open = function() {
  		    // Build out our Modal
  		    createPopUpWindow.call(this);

  		    // Initialize our event listeners
  		    initializeEvents.call(this);

  		    /*
  		     * After adding elements to the DOM, use getComputedStyle
  		     * to force the browser to recalc and recognize the elements
  		     * that we just added. This is so that CSS animation has a start point
  		     */
  		    window.getComputedStyle(this.modal).height;

  		    /*
  		     * Add our open class and check if the modal is taller than the window
  		     * If so, our anchored class is also applied
  		     */
  		    this.modal.className = this.modal.className +
  		      (this.modal.offsetHeight > window.innerHeight ?
  		        " scotch-open scotch-anchored" : " scotch-open");
  		    this.overlay.className = this.overlay.className + " scotch-open";
  		}

  		popUp.prototype.close = function() {
  		    // Store the value of this
  		    var _ = this;
  		    console.log(this.overlay);
  		    // Remove the open class name
  		    this.modal.className = this.modal.className.replace(" scotch-open", "");
  		    this.overlay.className = this.overlay.className.replace(" scotch-open",
  		      "");

  		    /*
  		     * Listen for CSS transitionend event and then
  		     * Remove the nodes from the DOM
  		     */
  		    this.modal.addEventListener(this.transitionEnd, function() {
  		      _.modal.parentNode.removeChild(_.modal);
  		    });
  		    this.overlay.addEventListener(this.transitionEnd, function() {
  		      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
  		    });

  		}


  	// Private Methods ----------------------------------------------

  	function createPopUpWindow() {

    	var content, contentHolder, docFrag;
	
    	/*
    	 * If content is an HTML string, append the HTML string.
    	 * If content is a domNode, append its content.
    	 */
	
    	if (typeof this.options.content === "string") {
    	  content = this.options.content;
    	} else {
    	  content = this.options.content.innerHTML;
    	}
	
    	// Create a DocumentFragment to build with
    	docFrag = document.createDocumentFragment();
	
    	// Create modal element
    	this.modal = document.createElement("div");
    	this.modal.className = "scotch-modal " + this.options.className;
    	this.modal.style.minWidth = this.options.minWidth + "px";
    	this.modal.style.maxWidth = this.options.maxWidth + "px";
	
    	// If closeButton option is true, add a close button
    	if (this.options.closeButton === true) {
    	  this.closeButton = document.createElement("button");
    	  this.closeButton.className = "scotch-close close-button";
    	  this.closeButton.innerHTML = "×";
    	  this.modal.appendChild(this.closeButton);
    	}
	
    	// If overlay is true, add one
    	if (this.options.overlay === true) {
    	  this.overlay = document.createElement("div");
    	  this.overlay.className = "scotch-overlay " + this.options.className;
    	  docFrag.appendChild(this.overlay);
    	}
	
    	// Create content area and append to modal
    	contentHolder = document.createElement("div");
    	contentHolder.className = "scotch-content";
    	contentHolder.innerHTML = content;
    	this.modal.appendChild(contentHolder);
	
    	// Append modal to DocumentFragment
    	docFrag.appendChild(this.modal);
	
    	// Append DocumentFragment to body
    	document.body.appendChild(docFrag);
  	}


   	// Utility method to extend defaults with user options
  	function extendDefaults(source, properties) {
    	var singleProperty;
    	for (singleProperty in properties) { 
    	//grab the singular of the plural , grab ONE property of all the properties
    		if (properties.hasOwnProperty(singleProperty)) {
    		    source[singleProperty] = properties[singleProperty];
    		}
    	}
    	return source;
  	}

  	//Create events
  	function initializeEvents() {

    	if (this.closeButton) {
    	  this.closeButton.addEventListener('click', this.close.bind(this));
    	}
	
    	if (this.overlay) {
    	  this.overlay.addEventListener('click', this.close.bind(this));
    	}
	}

	// Utility method to determine which transistionend event is supported
	function transitionSelect() {
    	var el = document.createElement("div");
    	if (el.style.WebkitTransition) return "webkitTransitionEnd";
    	if (el.style.OTransition) return "oTransitionEnd";
    	return 'transitionend';
	}
	
}());
















