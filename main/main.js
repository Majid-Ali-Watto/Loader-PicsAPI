class APIs {
	#url;
	constructor(url) {
		this.#url = url;
	}
	get url() {
		return this.#url;
	}
	set url(url) {
		this.#url = url;
	}
	async get() {
		try {
			const response = await fetch(this.#url);
			return await response.json();
		} catch (e) {
			alert(e.message);
		}
	}
}

let page = 1;
const baseUrl = "https://picsum.photos/v2/list";
const api = new APIs(`${baseUrl}?page=${page}&limit=100`);

const loading = document.getElementById("loading");
const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMoreBtn");

function createImageCard(image) {
	const card = document.createElement("div");
	const img = document.createElement("img");
	const downloadBtn = document.createElement("button");
	const span = document.createElement("span");
	const section = document.createElement("section");

	img.src = image.download_url;
	img.alt = image.author;
	img.loading = "lazy"; // Apply lazy loading

	section.className = "download-author";
	span.className = "author-name";
	span.innerText = image.author;

	downloadBtn.className = "download-btn";
	downloadBtn.innerText = "Download Image";
	downloadBtn.addEventListener("click", (event) => {
		event.stopPropagation(); // Prevent event bubbling
		downloadImage(image.download_url, `image-${image.id}.jpg`);
	});

	let clickTimeout;
	let clickDelay = 200; // Delay to distinguish between single and double-click

	img.addEventListener("click", (event) => {
		event.stopPropagation(); // Prevent event bubbling
		if (clickTimeout) {
			clearTimeout(clickTimeout);
			clickTimeout = null;
		} else {
			clickTimeout = setTimeout(() => {
				openLinkInNewTab(image.download_url);
				clickTimeout = null;
			}, clickDelay);
		}
	});

	img.addEventListener("dblclick", (event) => {
		event.stopPropagation(); // Prevent event bubbling
		if (clickTimeout) {
			clearTimeout(clickTimeout);
			clickTimeout = null;
		}
		openLinkInNewTab(image.url);
	});

	section.appendChild(downloadBtn);
	section.appendChild(span);
	card.appendChild(img);
	card.appendChild(section);

	return card;
}

function openLinkInNewTab(url) {
	const a = document.createElement("a");
	a.href = url;
	a.download = url;
	a.target = "_blank";
	a.rel = "noreferrer";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(a.href); // Clean up
}

async function downloadImage(url, filename) {
	try {
		loading.style.display = "block";
		const response = await fetch(url);
		const blob = await response.blob();
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(a.href); // Clean up
	} catch (error) {
		alert("Error downloading the image");
	} finally {
		loading.style.display = "none";
	}
}

async function loadImages() {
	loading.style.display = "block";
	try {
		const data = await api.get();
		const fragment = document.createDocumentFragment();
		data?.forEach((image) => {
			const card = createImageCard(image);
			fragment.appendChild(card);
		});
		gallery.appendChild(fragment);
		loadMoreBtn.style.display = "block";
	} catch (error) {
		alert(error);
	} finally {
		loading.style.display = "none";
	}
}

loadMoreBtn.addEventListener("click", () => {
	page++;
	api.url = `${baseUrl}?page=${page}&limit=100`;
	loadImages();
});

// Initial load
loadImages();
