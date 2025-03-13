// Add any JavaScript functionality here if needed.
// For example, displaying alerts or handling click events.

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Menu item click handler
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // On mobile, close the sidebar after clicking a menu item
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Animated counter for stats
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Animate stat counters
    const statItems = document.querySelectorAll('.stat-item h3');
    statItems.forEach(item => {
        const finalValue = parseInt(item.innerText);
        item.innerText = '0';
        
        // Add intersection observer to start animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(item, 0, finalValue, 1500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
    
    // Chart item hover effects
    const chartItems = document.querySelectorAll('.chart-item');
    chartItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            chartItems.forEach(i => {
                if (i !== this) {
                    i.style.opacity = '0.7';
                    i.style.transform = 'scale(0.95)';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            chartItems.forEach(i => {
                i.style.opacity = '1';
                i.style.transform = 'translateY(0)';
            });
        });
    });
    
    // View Report button animation
    const reportBtn = document.querySelector('.view-report');
    if (reportBtn) {
        reportBtn.addEventListener('click', function() {
            this.classList.add('clicked');
            this.innerText = 'Generating Report...';
            
            setTimeout(() => {
                this.innerText = 'Report Generated!';
                
                setTimeout(() => {
                    this.classList.remove('clicked');
                    this.innerText = 'View Report';
                }, 2000);
            }, 1500);
        });
    }
    
    // Add some visual feedback for search field
    const searchField = document.querySelector('.search');
    if (searchField) {
        searchField.addEventListener('focus', function() {
            this.closest('header').classList.add('search-active');
        });
        
        searchField.addEventListener('blur', function() {
            this.closest('header').classList.remove('search-active');
        });
    }
    
    // Add ripple effect to menu items
    function createRipple(event) {
        const button = event.currentTarget;
        
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
        circle.classList.add('ripple');
        
        // Remove existing ripples
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add ripple effect to all menu items
    const buttons = document.querySelectorAll('.menu li');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});