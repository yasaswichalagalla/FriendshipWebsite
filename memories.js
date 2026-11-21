const memoryDialog = document.querySelector(".memory-dialog");
const dialogImage = document.querySelector(".dialog-image");
const dialogCaption = document.querySelector(".dialog-caption");

document.querySelectorAll(".memory-photo").forEach((photo) => {
  photo.addEventListener("click", () => {
    const image = photo.querySelector("img");
    dialogImage.src = photo.dataset.full;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = photo.dataset.caption;
    memoryDialog.showModal();
  });
});

memoryDialog.addEventListener("click", (event) => {
  if (event.target === memoryDialog) memoryDialog.close();
});
