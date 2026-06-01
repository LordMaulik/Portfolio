/**
 * Maulik Singhal Portfolio Interactions Script
 */

// 1. Core Profile Image Handling (Filesystem Blob Loader fallback setup)
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Attempt to fetch local user picture inside workspace context
        const data = await window.fs.readFile('Blue_Modern_LinkedIn_Profile_Picture_.png');
        const blob = new Blob([data], { type: 'image/png' });
        document.getElementById('profileImg').src = URL.createObjectURL(blob);
    } catch (e) {
        // Fallback programmatic colorful initials placeholder when resource isn't locally parsed 
        const img = document.getElementById('profileImg');
        if (img) {
            img.style.display = 'none';
            const ph = document.createElement('div');
            ph.style.cssText = 'width:100%;height:100%;border-radius:50%;background:linear-gradient(135deg,#FF6B35,#9D4EDD);display:flex;align-items:center;justify-content:center;font-size:5rem;font-weight:700;color:#fff;font-family:Libre Baskerville,serif;';
            ph.textContent = 'MS';
            img.parentElement.appendChild(ph);
        }
    }
});

// 2. Navigation Smooth Scrolling Logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// 3. Portfolio Category Filter Logic
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Deactivate active states from existing button list
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const selectedCategory = this.dataset.category;
        
        // Hide or Display matching item elements smoothly
        document.querySelectorAll('.project-card').forEach(card => {
            if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 4. Custom Page Overlays Navigation Functions
function openProject(projectId) {
    // Hide parent homepage structure smoothly
    document.getElementById('mainPortfolio').style.display = 'none';
    
    // Find specific overlay element target block
    const targetPage = document.getElementById('page-' + projectId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.scrollTop = 0;
    }
    window.scrollTo(0, 0);
}

function closeProject() {
    // Remove active display filters from all matching panels
    document.querySelectorAll('.project-page').forEach(page => page.classList.remove('active'));
    
    // Restore home landing grid state
    document.getElementById('mainPortfolio').style.display = 'block';
    window.scrollTo(0, 0);
}

// 5. Accordion Dropdown Content Panel Switchers 
function toggleSection(headerElement) {
    const reportBody = headerElement.nextElementSibling;
    const arrowIndicator = headerElement.querySelector('.toggle-arrow');
    
    if (reportBody && arrowIndicator) {
        reportBody.classList.toggle('open');
        arrowIndicator.classList.toggle('open');
    }
}
