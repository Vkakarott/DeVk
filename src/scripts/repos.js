const containerApi = document.querySelector(".projects");

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

let state = { count: 0, data: [] };
let languages = {};

function setState(newState, stateKey) {
    state = {
      ...state,
      [stateKey]: newState
    };
}

function render() {
    console.log(state.data);
    containerApi.innerHTML = `
        <ul class="repos">
            ${state.data.map(repo => `
                <li>
                    <div class="repo">
                        <img 
                            src="../../assets/images/${repo.name}.png" 
                            alt="img-${repo.name}" 
                            onerror="this.onerror=null;this.src='../../assets/images/fallback.png';"
                        >
                        <h3>${repo.name}</h3>
                        <div class="links">
                            <a href="http://github.com/Vkakarott/${repo.name}" target="_blank" rel="github ${repo.name}">Github >>></a>
                            ${repo.has_pages ? `<a href="http://vkakarott.github.io/${repo.name}/" target="_blank" rel="pages-${repo.name}"><i class="bi bi-box-arrow-up-right"></i></a>` : ''}
                        </div>
                        <ul class="languages">
                            ${Object.keys(languages[repo.name] || {}).map(lang => `
                                <li><span class="circle ${lang.toLowerCase()}"></span> ${lang}</li>
                            `).join('')}
                        </ul>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;
}

async function fetchData() {
    try {
        const response = await fetch('https://api.github.com/users/vkakarott/repos', {
            headers: {
                'Authorization': `token ${TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching repos: ${response.statusText}`);
        }
        const data = await response.json();
        setState(data, 'data');
        await Promise.all(data.map(repo => fetchLanguages(repo.name)));
        render();
    } catch (error) {
        console.error('Error fetching repos:', error);
    }
}

async function fetchLanguages(repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/Vkakarott/${repo}/languages`, {
            headers: {
                'Authorization': `token ${TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching languages for ${repo}: ${response.statusText}`);
        }
        let len = await response.json();
        languages[repo] = len;
    } catch (error) {
        console.error(`Error fetching languages for ${repo}:`, error);
    }
}

function init() {
    fetchData();
    console.log(languages)
}

init();