// Criar checkboxes ao carregar a página
window.onload = function() {
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const container = document.getElementById('letterCheckboxes');
    
    alfabeto.split('').forEach(letra => {
        const div = document.createElement('div');
        div.className = 'letter-checkbox';
        
        div.innerHTML = `
            <input type="checkbox" id="check_${letra}" value="${letra}">
            <label for="check_${letra}">${letra}</label>
        `;
        
        container.appendChild(div);
    });
}

function sortearLetra() {
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const checkboxesSelecionados = document.querySelectorAll('input[type="checkbox"]:checked');
    const letrasExcluidas = Array.from(checkboxesSelecionados).map(cb => cb.value);
    
    const letrasDisponiveis = alfabeto.split('').filter(letra => 
        !letrasExcluidas.includes(letra)
    );
    
    if (letrasDisponiveis.length === 0) {
        document.getElementById('resultado').textContent = 'Não há letras disponíveis para sorteio!';
        return;
    }

    const resultado = document.getElementById('resultado');
    resultado.classList.remove('final');
    let counter = 0;
    const duration = 30;
    const interval = 80;
    
    const roulette = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * letrasDisponiveis.length);
        resultado.textContent = letrasDisponiveis[randomIndex];
        counter++;
        
        if (counter === duration) {
            clearInterval(roulette);
            const finalIndex = Math.floor(Math.random() * letrasDisponiveis.length);
            resultado.textContent = `Letra sorteada: ${letrasDisponiveis[finalIndex]}`;
            resultado.classList.add('final');
        }
    }, interval);
}
