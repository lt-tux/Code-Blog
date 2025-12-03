// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
    
    // Form submission for contribution page
    const contributeForm = document.getElementById('contributeForm');
    if (contributeForm) {
        contributeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.title || !data.description) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your contribution! I\'ll review it and add it to the site soon.');
            this.reset();
            
            // You could also log the submission for debugging
            console.log('Contribution submitted:', data);
        });
    }
    
    // Blog filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show all blogs if filter is 'all'
                if (filter === 'all') {
                    blogCards.forEach(card => {
                        card.style.display = 'block';
                    });
                } else {
                    // Show only blogs with matching tag
                    blogCards.forEach(card => {
                        const tags = card.getAttribute('data-tags').split(' ');
                        if (tags.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Code example copy functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.parentElement.nextElementSibling;
            const code = codeBlock.querySelector('code').innerText;
            
            navigator.clipboard.writeText(code).then(() => {
                // Show feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // GitHub stats (mock data - you can replace with real API calls)
    function updateGitHubStats() {
        // In a real implementation, you would fetch this from GitHub API
        const stats = {
            repositories: 24,
            followers: 12,
            contributions: 387,
            projects: 8
        };
        
        // Animate counting up
        Object.keys(stats).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                animateCount(element, stats[key]);
            }
        });
    }
    
    function animateCount(element, target) {
        let current = 0;
        const increment = target / 50; // Adjust speed
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    }
    
    // Initialize stats when page loads
    updateGitHubStats();
    
    // Highlight.js for code syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});