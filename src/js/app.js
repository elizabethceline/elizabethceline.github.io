document.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      const content = document.getElementById("content");
      content.innerHTML = posts
        .slice(0, 10)
        .map(
          (post) => `
          <div
            class="block rounded-lg bg-white p-4 md:p-6 text-surface shadow-secondary-1">
            <h5 class="mb-2 text-xl font-semibold leading-tight text-black">${post.title}</h5>
            <p class="mb-4 text-base">
            ${post.body}
            </p>
            <hr class="border-gray-200 my-4" />
            <p class="text-base">
            Post ID:${post.id}
            </p>
          </div>`
        )
        .join("");
    })
    .catch(() => console.log("Failed to fetch posts"));
});
