<template>
	<div id="app">
		<div id="gallery" class="gallery">
			<div v-for="image in images" :key="image.id" class="card">
				<!-- <img :src="image.download_url" :alt="image.author" loading="lazy" @click="handleSingleClick(image.download_url)" @dblclick="handleDoubleClick(image.url)" /> -->
				<img :src="image.lowRes" :data-src="image.download_url" :alt="image.author" loading="lazy" class="lazy" @click="handleSingleClick(image.download_url)" @dblclick="handleDoubleClick(image.url)"  @load="replaceWithHighRes($event)" />
				<section class="download-author">
					<button class="download-btn" @click.stop="downloadImage(image.download_url, `image-${image.id}.jpg`)">Download Image</button>
					<span class="author-name">{{ image.author }}</span>
				</section>
			</div>
		</div>
		<button id="loadMoreBtn" v-if="!isLoading" @click="loadMore">Load More</button>
	</div>
</template>
<script>
	import { ref, computed, watch } from "vue";
	import { Loader } from "circle-loader";

	export default {
		name: "ImageGallery",
		setup() {
			const baseUrl = "https://picsum.photos/v2/list";
			const page = ref(1); // Current page number
			const images = ref([]); // All loaded images
			const isLoading = ref(false); // Loading state
			const imagesPerPage = 100; // Total images available per page
			const imagesToLoad = 20; // Number of images to load at a time
			let imageOffset = 0; // Tracks the current offset within the page

			const fetchImages = async (url) => {
				try {
					isLoading.value = true;
					const response = await fetch(url);
					if (!response.ok) throw new Error("Failed to fetch images");
					return await response.json();
				} catch (error) {
					alert(error.message);
				} finally {
					isLoading.value = false;
				}
			};

			const loadImages = async () => {
				if (imageOffset >= imagesPerPage) {
					// All images from the current page are loaded, move to the next page
					page.value++;
					imageOffset = 0;
				}

				const url = `${baseUrl}?page=${page.value}&limit=${imagesPerPage}`;
				const data = await fetchImages(url);

				if (data) {
					const nextImages = data.slice(imageOffset, imageOffset + imagesToLoad).map((image) => ({
						...image,
						lowRes: `${image.download_url}?w=50&h=50`, // Low-res thumbnail
					}));
					images.value.push(...nextImages);
					imageOffset += imagesToLoad; // Update the offset
				}
			};
			watch(isLoading, () => {
				if (isLoading.value) {
					Loader.start();
				} else {
					Loader.close();
				}
			});

			const replaceWithHighRes = (event) => {
				const img = event.target;
				const highResSrc = img.dataset.src;
				if (highResSrc) {
					img.src = highResSrc;
				}
			};

			const debounce = (fn, delay) => {
				let timeout;
				return (...args) => {
					clearTimeout(timeout);
					timeout = setTimeout(() => fn(...args), delay);
				};
			};

			const loadMore = debounce(async () => {
				await loadImages();
			}, 300);

			const downloadImage = async (url, filename) => {
				try {
					isLoading.value = true;
					const response = await fetch(url);
					if (!response.ok) throw new Error("Failed to download image");
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
					isLoading.value = false;
				}
			};

			const openLinkInNewTab = (url) => {
				const a = document.createElement("a");
				a.href = url;
				a.target = "_blank";
				a.rel = "noreferrer";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			};

			let clickTimeout;
			const clickDelay = 200;

			const handleSingleClick = (url) => {
				if (clickTimeout) {
					clearTimeout(clickTimeout);
					clickTimeout = null;
				} else {
					clickTimeout = setTimeout(() => {
						openLinkInNewTab(url);
						clickTimeout = null;
					}, clickDelay);
				}
			};

			const handleDoubleClick = (url) => {
				if (clickTimeout) {
					clearTimeout(clickTimeout);
					clickTimeout = null;
				}
				openLinkInNewTab(url);
			};

			// Initial load of images
			loadImages();

			return {
				images,
				isLoading,
				Loader,
				loadMore,
				replaceWithHighRes,
				downloadImage,
				handleSingleClick,
				handleDoubleClick
			};
		}
	};
</script>
