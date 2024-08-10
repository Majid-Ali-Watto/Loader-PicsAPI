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
			let data = await fetch(this.#url);
			return data.json();
		} catch (e) {
			alert(e.message);
		}
	}
}
let page = 1;

const api = new APIs(`https://picsum.photos/v2/list?page=${page}&limit=120`);

const loading = document.getElementById("loading");
const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMoreBtn");

function createImageCard(image) {
	const card = document.createElement("div");
	loadMoreBtn.style.display = "block";
	const img = document.createElement("img");
	img.src = image.download_url;
	img.alt = image.author;
	img.loading = "lazy"; // Apply lazy loading
	const downloadBtn = document.createElement("button");
	const span = document.createElement("span");
	const section = document.createElement("section");
	section.className = "download-author";
	span.className = "author-name";
	span.innerText = image.author;
	downloadBtn.className = "download-btn";
	downloadBtn.innerText = "Download Image";
	downloadBtn.addEventListener("click", () => {
		downloadImage(image.download_url, `image-${image.id}.jpg`);
	});

	card.appendChild(img);
	section.appendChild(downloadBtn);
	section.appendChild(span);
	card.appendChild(section);

	return card;
}

async function downloadImage(url, filename) {
	try {
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
		console.error("Error downloading the image", error);
	}
}

function loadImages() {
	loading.style.display = "block";
	api
		.get()
		.then((data) => {
			data?.forEach((image) => {
				const card = createImageCard(image);
				gallery.appendChild(card);
			});
			loading.style.display = "none";
		})
		.catch((error) => {
			loading.style.display = "none";
			console.log(error);
		});
}

loadMoreBtn.addEventListener("click", () => {
	page++;
	api.url = `https://picsum.photos/v2/list?page=${page}&limit=100`;
	loadImages();
});

// Initial load
loadImages();
