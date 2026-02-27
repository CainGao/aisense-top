// AI Sense - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // 移动端菜单
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        font-size: 24px;
        cursor: pointer;
        color: #00f7ff;
    `;
    
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
        navbar.insertBefore(menuToggle, navbar.firstChild.nextSibling);
        
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }
    
    // 响应式处理
    function handleResize() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 768) {
            if (menuToggle) menuToggle.style.display = 'block';
            if (navMenu) navMenu.style.display = 'none';
        } else {
            if (menuToggle) menuToggle.style.display = 'none';
            if (navMenu) navMenu.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});

// 代码高亮（可选）
if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
}
