$.valHooks.textarea = {
  get: function( elem ) {
	  return elem.value.replace( /\r?\n/g, "\r\n" );
  } };

// Add a loop to watch the contents of setInterval
var lastValue = '';
setInterval(function() {
    if ($("#prehoot").val() != lastValue) {
        lastValue = $("#prehoot").val();
		triggerGenerateHoot();
    }
}, 100);

function triggerGenerateIpsum(value) {
	$('#prehoot').val(generateIpsum(value));
	$('#posthoot').val(generateHoot(generateIpsum(value)));
}

function triggerGenerateHoot() {
	var message = $('#prehoot').val();
	$('#posthoot').val(generateHoot(message));
}

function generateIpsum (amount) {
	// We only have 5 paragraphs to deal with, so don't get
	// any sassy ideas here buddy
	if (amount >= 1 && amount <= 5) {
		return ipsum.slice(0, amount).join("\n");
	}
}

function generateHoot (message) {
	if (message) {
		var replaceWord = function (length, val) {
			// Hash the words for consistency
			//console.log(length + " getModHash: " + getModHash(val));
			
			// Dictionary has a 6 token limit, arrays are 0-5, you can figure it out
			if (length > 6) {
				length = 6;
			}
			var replacement = dictionary[length - 1][getModHash(val)];
			
			// Replace each character one by one
			var chr, tmp = '';
			if (val.length > length) {
				val = val.slice(0, length);
			}
			//console.log(val + " " + length + " " + replacement);
			
			// Retain capitalization
			for (var i = 0; i <= length; i++) {
				chr = val.charAt(i);
				if (chr.match(/[A-Z]/)) {
					tmp += replacement.charAt(i).toUpperCase();
				} else {
					tmp += replacement.charAt(i);
				}
			}
			
			return tmp;
		};
		
		// Start by iterating over the message, word by word
		// Find every word that isn't pure punctuation and 
		// push it through the replaceWord function
		var newMessage = [], formattedMessage = [];
		$.each(message.split(/\b/), function(index, val) {
			var length = val.length;
			if (val.match(/[a-zA-Z]+/)) {
				newMessage.push(replaceWord(length, val));
			} else {
				if (val !== " ") {
					newMessage.push(val);
				}
			}
		});
		
		// Our pushing and pulling naively ignores punctuation. Here we correct it.
		// Start by iterating over the new modified array, then do a look behind/look ahead
		// If there's punctuation and it belongs on a side, delete that cell and push it back.
		$.each(newMessage, function(index, val) {
			if (val.match(/[^\w]/)) {
				console.log('found punctation');
				if (index > 0) {
					formattedMessage[index - 1] = formattedMessage[index - 1] + val;
					formattedMessage[index] = '';
				} else {
					formattedMessage[index] = val;
				}
			} else {
				formattedMessage[index] = val;
			}
		});
		// Remove the empty array components
		formattedMessage = formattedMessage.filter(function(n){ return n !== "" }); 
		return formattedMessage.join(" ");
	}
}

String.prototype.hashCode = function() {
	// Taken from StackOverflow
	var hash = 0;
	if (this.length == 0) {
		return hash;
	}
	var chr, len;
	for (var i = 0, len = this.length; i < len; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash;
}

function getModHash(word) {
	// Don't forget: negative hashes are legit
	var hash = Math.abs(word.hashCode());
	return hash % 6;
}

$(document).ready(function() {

});


var dictionary =[[ "h", "w", "l", "o", "t", "h" ],
				 [ "ho", "wo", "ol", "oh", "ot", "oo"],
				 [ "hoh", "woh", "hol", "oow", "koo", "ool" ],
				 [ "hoot", "hool", "holl", "ooow", "kooo", "oool" ],
				 [ "howol", "wohol", "hohol", "oooow", "kokoo", "ooool"],
				 [ "hoooot", "wohwol", "holhol", "oowoow", "oolool", "oohhoo"]];

var ipsum = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi dolor, interdum id fermentum nec, condimentum in ex. Phasellus libero diam, molestie quis neque ac, cursus dictum justo. Suspendisse malesuada ullamcorper blandit. Pellentesque congue ante et orci sodales aliquam. Maecenas porta turpis sem. In a est semper, ullamcorper purus ac, rhoncus felis. Praesent bibendum, neque aliquet tincidunt consequat, sem nisl tincidunt dolor, ac eleifend dolor nulla vel ante. Nunc sed est a nulla tristique aliquam. Morbi molestie interdum sapien. Nunc commodo malesuada justo, id placerat dolor condimentum et. Aenean neque arcu, rutrum ut orci ut, aliquam sollicitudin nisl. Suspendisse tincidunt, leo in finibus ullamcorper, metus dolor imperdiet libero, a cursus tortor neque at nisi. Mauris efficitur aliquam neque, ac volutpat enim pharetra eu.\n',
'Etiam nec lacus id mauris malesuada condimentum. Proin malesuada velit at turpis aliquet, id feugiat magna consequat. Phasellus facilisis erat mauris, a efficitur eros congue sed. Vivamus sed turpis lorem. In at tortor sodales, ultrices augue sit amet, condimentum metus. Nam sit amet nibh sit amet nulla aliquam sagittis vel et dui. Etiam finibus tortor ullamcorper elementum blandit. Maecenas facilisis elit a massa maximus condimentum. Ut scelerisque nunc vitae interdum tempus.\n',
'Integer nec ligula euismod ante ultrices congue imperdiet ac nunc. Nunc sed molestie arcu. Curabitur in mauris quis metus pretium consequat. Quisque semper risus ante, nec dapibus nibh interdum at. Pellentesque commodo, nisl vitae ornare sollicitudin, lacus risus rutrum ante, vitae scelerisque odio mauris eu leo. Nam aliquam massa lobortis bibendum feugiat. Praesent commodo tempor scelerisque. Vivamus venenatis molestie justo vel vehicula. Duis ullamcorper scelerisque varius. Ut mauris nunc, pellentesque vitae mauris sit amet, semper fermentum diam. In et ultrices ligula. Cras lobortis nunc odio, et volutpat arcu venenatis quis. Praesent rhoncus quam ac massa laoreet, eget tristique nulla gravida. In at nisl vel lorem tristique ultricies.\n',
'Cras sapien mi, tincidunt vel nisi ut, blandit rhoncus elit. Maecenas fermentum nisi nec lorem hendrerit cursus. Fusce posuere velit risus, eu luctus sem semper in. Aenean lobortis facilisis erat a eleifend. Duis ex tortor, scelerisque ac efficitur sed, tempus et nunc. Sed euismod lorem vel dictum interdum. Curabitur posuere lacus id mollis gravida. Nunc a fermentum tortor. Nunc quis finibus ex, sed porta sem. Nunc vitae ex volutpat, maximus dui in, tincidunt dui. Proin ornare pellentesque metus. In pellentesque nisi diam, at fermentum metus mollis quis. Sed in euismod mauris, vitae cursus elit. Nunc semper mi vitae neque tincidunt sagittis.\n',
'Proin lobortis ornare risus a sollicitudin. Duis purus mi, aliquet sit amet lacinia eget, vehicula in orci. Nulla ut mauris eget nibh volutpat eleifend. Integer efficitur dictum augue quis elementum. Sed a tempor tortor. Suspendisse a nisl tempor, maximus dolor a, malesuada velit. Nam sollicitudin purus at tortor posuere iaculis. Pellentesque lacinia laoreet convallis. Sed tellus elit, varius sed odio eu, aliquet congue sapien. Sed vitae augue maximus, ultrices urna molestie, cursus libero.\n']