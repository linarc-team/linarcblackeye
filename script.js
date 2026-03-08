// Inicialização do mapa
let map;
let attackMarkers = [];
let attackLines = [];
let currentAttacks = [];
let locationMarkers = [];
let locationLines = [];
let locationPolygons = [];
const PASSWORD = 'LNRC';
const STORAGE_KEY = 'blackeye_attacks';
const SYNC_INTERVAL = 2000; // Verificar atualizações a cada 2 segundos

// Inicializar mapa
function initMap() {
    map = L.map('map', {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: true,
        preferCanvas: true
    });

    // Usar CartoDB Dark Matter - visual muito melhor e gratuito
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Aplicar filtros CSS para estilo cyberpunk preto e branco mais claro
    setTimeout(() => {
        const style = document.createElement('style');
        style.textContent = `
            .leaflet-container {
                background: #000000 !important;
            }
            .leaflet-tile-pane {
                filter: grayscale(100%) contrast(130%) brightness(1.2) !important;
            }
        `;
        document.head.appendChild(style);
    }, 100);
}

// Criar círculo simples para marcar região (mais limpo)
function createRegionMarker(centerLat, centerLon, radius, name, type) {
    const circle = L.circle([centerLat, centerLon], {
        radius: radius * 1000, // converter para metros
        color: '#ffffff',
        weight: type === 'continente' ? 4 : type === 'país' ? 3 : type === 'estado' ? 2 : 1.5,
        opacity: type === 'continente' ? 1 : type === 'país' ? 0.9 : type === 'estado' ? 0.8 : 0.7,
        fillColor: '#ffffff',
        fillOpacity: 0.05,
        lineJoin: 'miter',
        lineCap: 'square'
    }).addTo(map);
    
    circle.bindPopup(`<strong>${name}</strong><br>${type.toUpperCase()}`);
    locationPolygons.push(circle);
    return circle;
}

// Conectar pontos próximos com linhas grossas (apenas os mais próximos)
function connectNearbyPoints(points, maxDistance, lineWeight = 2, maxConnections = 3) {
    // Para cada ponto, conectar apenas aos mais próximos
    points.forEach((p1, i) => {
        const distances = [];
        points.forEach((p2, j) => {
            if (i !== j) {
                const distance = map.distance([p1.lat, p1.lon], [p2.lat, p2.lon]);
                if (distance < maxDistance) {
                    distances.push({ point: p2, distance, index: j });
                }
            }
        });
        
        // Ordenar por distância e pegar apenas os mais próximos
        distances.sort((a, b) => a.distance - b.distance);
        distances.slice(0, maxConnections).forEach(({ point: p2 }) => {
            const line = L.polyline([
                [p1.lat, p1.lon],
                [p2.lat, p2.lon]
            ], {
                color: '#ffffff',
                weight: lineWeight,
                opacity: 0.5,
                lineJoin: 'miter',
                lineCap: 'square'
            }).addTo(map);
            
            locationLines.push(line);
        });
    });
}

// Adicionar marcadores de localização (desabilitado - mapa vazio)
function addLocationMarkers() {
    // Função vazia - não adiciona nada ao mapa
    // Mantém apenas o mapa base limpo
}

// Adicionar ataque ao mapa
function addAttack(attackType, from, to) {
    const fromLoc = findLocation(from);
    const toLoc = findLocation(to);

    if (!fromLoc || !toLoc) {
        alert('Localização não encontrada. Verifique os nomes.');
        return;
    }

    const attack = {
        type: attackType,
        from: fromLoc.name,
        to: toLoc.name,
        fromCoords: [fromLoc.lat, fromLoc.lon],
        toCoords: [toLoc.lat, toLoc.lon],
        timestamp: new Date()
    };

    currentAttacks.push(attack);

    // Criar linha de ataque
    const line = L.polyline([attack.fromCoords, attack.toCoords], {
        color: '#ffffff',
        weight: 3,
        opacity: 0.9,
        dashArray: '10, 5'
    }).addTo(map);

    // Animação da linha
    let dashOffset = 0;
    const animateLine = setInterval(() => {
        dashOffset -= 1;
        line.setStyle({
            dashOffset: dashOffset
        });
    }, 50);

    attackLines.push({ line, animateLine });

    // Adicionar ao log
    addToLog(attack);

    // Salvar no localStorage (sistema global)
    saveAttacksToStorage();

    // Ajustar view para mostrar ambos os pontos
    const bounds = L.latLngBounds([attack.fromCoords, attack.toCoords]);
    map.fitBounds(bounds, { padding: [50, 50] });
}

// Adicionar entrada ao log
function addToLog(attack) {
    const logContent = document.getElementById('logContent');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const time = attack.timestamp.toLocaleTimeString('pt-BR');
    logEntry.innerHTML = `
        [${time}] <span class="attack-type">${attack.type}</span> 
        from <span class="from">${attack.from}</span> 
        to <span class="to">${attack.to}</span>
    `;
    
    logContent.insertBefore(logEntry, logContent.firstChild);
    
    // Limitar a 50 entradas
    while (logContent.children.length > 50) {
        logContent.removeChild(logContent.lastChild);
    }
}

// Limpar todos os ataques
function clearAllAttacks() {
    // Remover linhas
    attackLines.forEach(({ line, animateLine }) => {
        clearInterval(animateLine);
        map.removeLayer(line);
    });
    attackLines = [];

    // Remover marcadores
    attackMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    attackMarkers = [];

    // Limpar array
    currentAttacks = [];

    // Limpar log
    document.getElementById('logContent').innerHTML = '';

    // Limpar storage
    localStorage.removeItem(STORAGE_KEY);
}

// Salvar ataques no localStorage
function saveAttacksToStorage() {
    const attacksData = currentAttacks.map(attack => ({
        type: attack.type,
        from: attack.from,
        to: attack.to,
        fromCoords: attack.fromCoords,
        toCoords: attack.toCoords,
        timestamp: attack.timestamp.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attacksData));
}

// Carregar ataques do localStorage
function loadAttacksFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const attacksData = JSON.parse(stored);
            attacksData.forEach(attackData => {
                const attack = {
                    type: attackData.type,
                    from: attackData.from,
                    to: attackData.to,
                    fromCoords: attackData.fromCoords,
                    toCoords: attackData.toCoords,
                    timestamp: new Date(attackData.timestamp)
                };
                renderAttack(attack);
            });
        } catch (e) {
            console.error('Erro ao carregar ataques:', e);
        }
    }
}

// Renderizar ataque no mapa (sem adicionar ao array novamente)
function renderAttack(attack) {
    currentAttacks.push(attack);

    // Criar linha de ataque
    const line = L.polyline([attack.fromCoords, attack.toCoords], {
        color: '#ffffff',
        weight: 3,
        opacity: 0.9,
        dashArray: '10, 5'
    }).addTo(map);

    // Animação da linha
    let dashOffset = 0;
    const animateLine = setInterval(() => {
        dashOffset -= 1;
        line.setStyle({
            dashOffset: dashOffset
        });
    }, 50);

    attackLines.push({ line, animateLine });

    // Adicionar ao log
    addToLog(attack);
}

// Verificar atualizações no storage (sincronização global)
function checkForUpdates() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const attacksData = JSON.parse(stored);
            const currentCount = currentAttacks.length;
            
            // Se houver novos ataques, recarregar tudo
            if (attacksData.length !== currentCount) {
                // Limpar visualização atual
                attackLines.forEach(({ line, animateLine }) => {
                    clearInterval(animateLine);
                    map.removeLayer(line);
                });
                attackLines = [];
                attackMarkers.forEach(marker => {
                    map.removeLayer(marker);
                });
                attackMarkers = [];
                currentAttacks = [];
                document.getElementById('logContent').innerHTML = '';

                // Recarregar todos
                loadAttacksFromStorage();
            }
        } catch (e) {
            console.error('Erro ao verificar atualizações:', e);
        }
    }
}

// Sistema de senha
let isAuthenticated = false;

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const passwordSection = document.querySelector('.password-section');
    const controlForm = document.getElementById('controlForm');
    
    if (passwordInput.value === PASSWORD) {
        isAuthenticated = true;
        passwordSection.classList.add('hidden');
        controlForm.classList.remove('hidden');
        passwordInput.value = '';
        passwordError.textContent = '';
    } else {
        passwordError.textContent = 'SENHA INCORRETA';
        passwordInput.value = '';
        setTimeout(() => {
            passwordError.textContent = '';
        }, 2000);
    }
}

function togglePanel() {
    const panelContent = document.getElementById('panelContent');
    const toggleBtn = document.getElementById('togglePanelBtn');
    
    if (panelContent.classList.contains('hidden')) {
        panelContent.classList.remove('hidden');
        toggleBtn.textContent = '▲';
    } else {
        panelContent.classList.add('hidden');
        toggleBtn.textContent = '▼';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar mapa
    initMap();

    // Carregar ataques salvos
    setTimeout(() => {
        addLocationMarkers();
        loadAttacksFromStorage();
    }, 500);

    // Verificar atualizações periodicamente (sincronização global)
    setInterval(checkForUpdates, SYNC_INTERVAL);

    // Toggle do painel
    document.getElementById('togglePanelBtn').addEventListener('click', togglePanel);

    // Sistema de senha
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isAuthenticated) {
            checkPassword();
        }
    });

    // Botão adicionar ataque
    document.getElementById('addAttackBtn').addEventListener('click', () => {
        if (!isAuthenticated) {
            alert('Acesso restrito. Digite a senha.');
            return;
        }

        const attackType = document.getElementById('attackType').value;
        const from = document.getElementById('attackFrom').value;
        const to = document.getElementById('attackTo').value;

        if (!from || !to) {
            alert('Preencha origem e destino.');
            return;
        }

        addAttack(attackType, from, to);

        // Limpar campos
        document.getElementById('attackFrom').value = '';
        document.getElementById('attackTo').value = '';
    });

    // Enter para adicionar
    document.getElementById('attackFrom').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('attackTo').focus();
        }
    });

    document.getElementById('attackTo').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('addAttackBtn').click();
        }
    });

    // Botão limpar
    document.getElementById('clearAttacksBtn').addEventListener('click', () => {
        if (!isAuthenticated) {
            alert('Acesso restrito. Digite a senha.');
            return;
        }

        if (confirm('Limpar todos os ataques?')) {
            clearAllAttacks();
        }
    });
});

