var Accordion = function (selector) {
	var that, animateList, OneAccord, init, headings, accords, animating;

	that = this;
	headings = document.getElementById(selector).getElementsByTagName("h2");
	accords = {};
	animating = false;

	animateList = function () {
		accords.current.close();
		accords.next.open();

		accords.current = accords.next;
	};

	OneAccord = function (heading, index) {
		var that, clicked, expand, collapse, updateHeight, loadContent, init, date, h1, opened, content, oHeight;

		that = this;
		date = new Date();
		h1 = heading;
		opened = false;

		clicked = function (e) {
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}

			if (!opened && !animating) {
				accords.next = that;
				animateList();
			}
		};

		expand = function () {
			var currHeight;

			currHeight = content.offsetHeight;

			if (currHeight < (oHeight - 15)) {
				animating = true;
				content.style.height = (content.offsetHeight + 15) + "px";
				setTimeout(expand, 10);
			} else {
				animating = false;
				content.style.height = oHeight + "px";
			}
		};

		collapse = function () {
			var currHeight;

			currHeight = content.offsetHeight;

			if (currHeight > 15) {
				animating = true;
				content.style.height = (content.offsetHeight - 15) + "px";
				setTimeout(collapse, 10);
			} else {
				animating = false;
				content.style.height = "0px";
			}
		};

		updateHeight = function () {
			oHeight = content.offsetHeight;
			content.style.height = "0";
			content.style.overflow = "hidden";
			if (opened) {
				content.style.height = oHeight + "px";
			}
		};

		loadContent = function () {
			var request;

			if (window.XMLHttpRequest) {
				request = new XMLHttpRequest();
			} else {
				request = new ActiveXObject('Microsoft.XMLHTTP');
			}

			date = new Date();

			request.open("GET", "php/content.php?id=" + encodeURI(index) + "&time=" + date.getTime(), true);

			request.onreadystatechange = function () {
				if (4 === request.readyState) {
					content.innerHTML = request.responseText;
					updateHeight();
				}
			};

			request.send();
		};

		that.open = function () {
			expand();
			opened = true;
		};

		that.close = function () {
			collapse();
			opened = false;
		};

		that.firstOpen = function () {
			if (undefined !== oHeight) {
				content.style.height = oHeight + "px";
			}
			opened = true;
		};

		init = function () {
			content = h1.nextSibling;
			while (content && 1 !== content.nodeType) {
				content = content.nextSibling;
			}

			if (h1.addEventListener) {
				h1.addEventListener("click", clicked, false);
			} else if (h1.attachEvent) {
				h1.attachEvent("onclick", clicked);
			}

			loadContent();
		}

		init();

		return that;
	};

	init = function () {
		var i;

		i = 0;

		for (i; i < headings.length; i += 1) {
			accords[i] = new OneAccord(headings[i], i);
		}

		accords.current = accords[0];
		accords.current.firstOpen();
	};

	init();
};