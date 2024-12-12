// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Header scroll effect
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Blog posts data (simulated API response)
const blogPosts = [
    {
        title: "Understanding Ethereum 2.0 and Its Impact",
        excerpt: "Explore the key features of Ethereum 2.0 and how it will revolutionize the blockchain ecosystem.",
        date: "2023-06-15",
        slug: "understanding-ethereum-2-0"
    },
    {
        title: "The Rise of DeFi: Opportunities and Challenges",
        excerpt: "Dive into the world of Decentralized Finance (DeFi) and its potential to disrupt traditional financial systems.",
        date: "2023-06-10",
        slug: "rise-of-defi"
    },
    {
        title: "Building Your First Smart Contract: A Beginner's Guide",
        excerpt: "Learn how to create and deploy your first smart contract on the Ethereum blockchain.",
        date: "2023-06-05",
        slug: "first-smart-contract-guide"
    }
];

// Function to populate blog posts
function populateBlogPosts() {
    const blogList = document.getElementById('blog-list');
    if (blogList) {
        blogList.innerHTML = blogPosts.map(post => `
            <article class="dapp-card p-6 rounded-lg animate-fade-in">
                <h3 class="text-xl font-semibold mb-2">${post.title}</h3>
                <p class="text-gray-400 mb-4">${post.excerpt}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">${post.date}</span>
                    <a href="/blog/${post.slug}" class="text-blue-400 hover:text-blue-300 transition-colors duration-300">Read more</a>
                </div>
            </article>
        `).join('');
    }
}

// Featured project data (simulated API response)
const featuredProject = {
    title: "DecentralizedX: Next-Gen DEX",
    description: "A cutting-edge decentralized exchange platform built on Ethereum, offering lightning-fast trades, low fees, and advanced trading features.",
    technologies: ["Solidity", "React", "Web3.js", "The Graph"],
    url: "https://github.com/likhonsh3ikh/decentralizedx"
};

// Function to populate featured project
function populateFeaturedProject() {
    const projectShowcase = document.getElementById('project-showcase');
    if (projectShowcase) {
        projectShowcase.innerHTML = `
            <h3 class="text-2xl font-semibold mb-4">${featuredProject.title}</h3>
            <p class="text-gray-400 mb-4">${featuredProject.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${featuredProject.technologies.map(tech => `<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded">${tech}</span>`).join('')}
            </div>
            <a href="${featuredProject.url}" target="_blank" rel="noopener noreferrer" class="dapp-button text-white font-bold py-2 px-4 rounded inline-block">View Project</a>
        `;
    }
}

// Function to handle newsletter form submission
function handleNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            // Here you would typically send the email to a server
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            form.reset();
        });
    }
}

// Function to load and render blog post content
async function loadBlogPost(slug) {
    try {
        const response = await fetch(`/blog/${slug}.md`);
        const markdown = await response.text();
        const content = marked.parse(markdown);
        document.getElementById('blog-content').innerHTML = content;
    } catch (error) {
        console.error('Error loading blog post:', error);
        document.getElementById('blog-content').innerHTML = '<p>Error loading blog post. Please try again later.</p>';
    }
}

// Initialize functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateBlogPosts();
    populateFeaturedProject();
    handleNewsletterForm();

    // Check if we're on a blog post page
    const blogContent = document.getElementById('blog-content');
    if (blogContent) {
        const slug = window.location.pathname.split('/').pop();
        loadBlogPost(slug);
    }
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

