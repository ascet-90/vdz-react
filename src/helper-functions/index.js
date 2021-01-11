const number_format = ( number, decimals, dec_point, thousands_sep ) => {	// Format a number with grouped thousands
	// 
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +	 bugfix by: Michael White (http://crestidg.com)

	var i, j, kw, kd, km;

	// input sanitation & defaults
	if( isNaN(decimals = Math.abs(decimals)) ){
		decimals = 2;
	}
	if( dec_point === undefined ){
		dec_point = ",";
	}
	if( thousands_sep === undefined ){
		thousands_sep = ".";
	}
	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
	if( (j = i.length) > 3 ){
		j = j % 3;
	} else{
		j = 0;
	}
	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
	return km + kw + kd;
};

const numberWithSpaces = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

const toggleElementCSS = `
	.toggle-content {
		display: none;
		height: 0;
		overflow: hidden;
		transition: height 350ms ease-in-out;
	}
`;
const toggleElementVisibleCSS = `
	.toggle-content.visible {
		display: block;
		height: auto;
	}
`;

// Show an element
const show = (elem, duration = 350) => {
	if(elem.classList.contains('hiding')) {
		return;
	}
	elem.classList.add('showing');
	// Get the natural height of the element
	var getHeight = function () {
		elem.style.display = 'block'; // Make it visible
		var height = elem.scrollHeight + 'px'; // Get it's height
		elem.style.display = ''; //  Hide it again
		return height;
	};
	var height = getHeight(); // Get the natural height
	elem.classList.add('visible'); // Make the element visible
	elem.style.height = height; // Update the max-height
	// Once the transition is complete, remove the inline max-height so the content can scale responsively
	window.setTimeout(function () {
		elem.style.height = '';
		elem.classList.remove('showing');
	}, duration);
};

// Hide an element
const hide = (elem, duration = 350) => {
	if(elem.classList.contains('showing') || elem.classList.contains('hiding')) {
		return;
	}
	elem.classList.add('hiding');
	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';
	// Set the height back to 0
	var delay = 10;
	window.setTimeout(function () {
		elem.style.height = '0';
	}, delay);
	// When the transition is complete, hide it
	window.setTimeout(function () {
		elem.classList.remove('visible');
		elem.classList.remove('hiding');
	}, delay + duration);
};

// Toggle element visibility
const toggle = (elem, duration = 350) => {
	if(duration) {
		elem.style.transitionDuration = duration + 'ms';
	}
	// If the element is visible, hide it
	if (elem.classList.contains('visible')) {
		hide(elem, duration);
		return;
	}
	// Otherwise, show it
	show(elem, duration);
};

export {
	number_format,
	numberWithSpaces,
	show,
	hide,
	toggle
};



