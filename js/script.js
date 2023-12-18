//fetch and populate json data in the html
document.addEventListener('DOMContentLoaded', function() {
    fetch('../json/jobs.json')
    .then(response => response.json())
    .then(data => {
        displayJobs(data);
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
});

function displayJobs(jobs) {
    const jobsContainer = document.getElementById('jobs-container');
    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job');
        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p>${job.description}</p>
            <!-- Update: Link to the application form page -->
            <a href="../html/apply.html" class="apply-btn">Apply Now</a>
        `;
        jobsContainer.appendChild(jobElement);
    });
}

//search bar function
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function() {
        const keywords = document.getElementById('search-keywords').value.toLowerCase();
        const location = document.getElementById('search-location').value.toLowerCase();
        filterJobs(keywords, location);
    });

    // Optional: Add event listeners for Enter key in both input fields
    document.getElementById('search-keywords').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('search-button').click();
        }
    });
    document.getElementById('search-location').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('search-button').click();
        }
    });
});

function filterJobs(keywords, location) {
    const jobsContainer = document.getElementById('jobs-container');
    const jobs = jobsContainer.getElementsByClassName('job');

    for (let job of jobs) {
        let title = job.getElementsByTagName('h3')[0].textContent.toLowerCase();
        let desc = job.getElementsByTagName('p')[0].textContent.toLowerCase();
        let jobLocation = job.getElementsByTagName('p')[1].textContent.toLowerCase();
        let isKeywordMatch = title.includes(keywords) || desc.includes(keywords);
        let isLocationMatch = jobLocation.includes(location);

        if ((isKeywordMatch || keywords === '') && (isLocationMatch || location === '')) {
            job.style.display = "";
        } else {
            job.style.display = "none";
        }
    }
}








