document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const posts = document.querySelectorAll('.post-card');
    const readButtons = document.querySelectorAll('.btn-read');
    const likeButtons = document.querySelectorAll('.btn-like'); // Seleciona os novos botões

    // --- Funcionalidade Existente: Filtro de Categorias ---
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

    // --- Funcionalidade Existente: Botão Marcar como lido ---
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

    // =========================================================================
    // --- NOVA Funcionalidade: Botão de Likes (apenas curiosidades) ---
    // =========================================================================

    // Objeto para armazenar os likes localmente (apenas para esta sessão do navegador)
    // Em um site real, isso viria de um banco de dados.
    const likesData = {
        'curiosidade-thanos': 15, // Exemplo de curtidas iniciais
        'curiosidade-som-homem-ferro': 8
    };

    // Conjunto para rastrear quais posts o usuário já curtiu nesta sessão
    const userLikedPosts = new Set();

    // Função para atualizar o texto e contador de curtidas no DOM
    function updateLikeDisplay(button, postId) {
        const countSpan = button.querySelector('.like-count');
        const iconSpan = button.querySelector('.like-icon');
        
        countSpan.textContent = likesData[postId];
        
        if (userLikedPosts.has(postId)) {
            button.classList.add('liked');
            iconSpan.textContent = '❤️'; // Coração preenchido se curtiu
        } else {
            button.classList.remove('liked');
            iconSpan.textContent = '🤍'; // Coração vazio se não curtiu
        }
    }

    // Inicializa a exibição dos likes ao carregar a página
    likeButtons.forEach(button => {
        const postId = button.getAttribute('data-post-id');
        // Garante que o ID existe no objeto likesData
        if (!(postId in likesData)) {
            likesData[postId] = 0;
        }
        updateLikeDisplay(button, postId);

        // Adiciona o evento de clique para o botão de like
        button.addEventListener('click', () => {
            if (!userLikedPosts.has(postId)) {
                // Incrementa o like se o usuário ainda não curtiu
                likesData[postId]++;
                userLikedPosts.add(postId);
            } else {
                // Remove o like se o usuário clicar novamente (comportamento de 'descurtir')
                likesData[postId]--;
                userLikedPosts.delete(postId);
            }
            // Atualiza a exibição após a mudança
            updateLikeDisplay(button, postId);
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
