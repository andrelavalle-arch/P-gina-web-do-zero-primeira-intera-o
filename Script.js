document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const posts = document.querySelectorAll('.post-card');
    const readButtons = document.querySelectorAll('.btn-read');

    // Filtro de Categorias (Importante vs Curiosidades)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const category = link.getAttribute('data-category');
            
            posts.forEach(post => {
                if (category === 'todos') {
                    post.style.display = 'block';
                } else {
                    if (post.getAttribute('data-category') === category) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                }
            });
        });
    });

    // Botão interativo de Marcar como lido
    readButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('read')) {
                button.classList.add('read');
                button.textContent = 'Lido ✓';
            } else {
                button.classList.remove('read');
                button.textContent = 'Marcar como Lido';
            }
        });
    });
});