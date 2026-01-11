const categoryFilter = document.getElementById('categoryFilter');
const dateStart = document.getElementById('dateStart');
const dateEnd = document.getElementById('dateEnd');
const clips = document.querySelectorAll('.clip-card');

clips.forEach(clip => {
    const rawDate = clip.dataset.date;
    const formatted = new Date(rawDate).toLocaleDateString('pt-PT');

    const dateElement = document.createElement('p');
    dateElement.className = "publish-date";
    dateElement.textContent = "Publicado em: " + formatted;

    clip.appendChild(dateElement);
});
function limitYearDigits(input) {
    input.addEventListener("input", () => {
        const value = input.value;

        if (value.length < 5) return;

        let [year, month, day] = value.split("-");

        if (year.length > 4) {
            year = year.slice(0, 4);
            input.value = `${year}-${month ?? ""}-${day ?? ""}`;
        }
    });
}

limitYearDigits(dateStart);
limitYearDigits(dateEnd);

function filterClips() {
    const selectedCategory = categoryFilter.value;
    const start = dateStart.value ? new Date(dateStart.value) : null;
    const end = dateEnd.value ? new Date(dateEnd.value) : null;

    clips.forEach(clip => {
        const clipDate = new Date(clip.dataset.date);
        const matchesCategory =
            selectedCategory === 'all' ||
            clip.dataset.category === selectedCategory;

        let matchesDate = true;
        if (start && clipDate < start) matchesDate = false;
        if (end && clipDate > end) matchesDate = false;

        clip.style.display = (matchesCategory && matchesDate) ? 'flex' : 'none';
    });
}

categoryFilter.addEventListener('change', filterClips);
dateStart.addEventListener('change', filterClips);
dateEnd.addEventListener('change', filterClips);
