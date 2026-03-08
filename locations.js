// Base de dados de localizações
const locations = {
    // Continentes
    continentes: {
        'América do Norte': { lat: 45.0, lon: -100.0, type: 'continente' },
        'América do Sul': { lat: -15.0, lon: -60.0, type: 'continente' },
        'Europa': { lat: 54.0, lon: 15.0, type: 'continente' },
        'Ásia': { lat: 35.0, lon: 100.0, type: 'continente' },
        'África': { lat: 0.0, lon: 20.0, type: 'continente' },
        'Oceania': { lat: -25.0, lon: 135.0, type: 'continente' }
    },
    
    // Países principais
    paises: {
        'Brasil': { lat: -14.2350, lon: -51.9253, type: 'país', continente: 'América do Sul' },
        'Estados Unidos': { lat: 37.0902, lon: -95.7129, type: 'país', continente: 'América do Norte' },
        'Canadá': { lat: 56.1304, lon: -106.3468, type: 'país', continente: 'América do Norte' },
        'México': { lat: 23.6345, lon: -102.5528, type: 'país', continente: 'América do Norte' },
        'Argentina': { lat: -38.4161, lon: -63.6167, type: 'país', continente: 'América do Sul' },
        'Chile': { lat: -35.6751, lon: -71.5430, type: 'país', continente: 'América do Sul' },
        'Reino Unido': { lat: 55.3781, lon: -3.4360, type: 'país', continente: 'Europa' },
        'França': { lat: 46.2276, lon: 2.2137, type: 'país', continente: 'Europa' },
        'Alemanha': { lat: 51.1657, lon: 10.4515, type: 'país', continente: 'Europa' },
        'Rússia': { lat: 61.5240, lon: 105.3188, type: 'país', continente: 'Ásia' },
        'China': { lat: 35.8617, lon: 104.1954, type: 'país', continente: 'Ásia' },
        'Japão': { lat: 36.2048, lon: 138.2529, type: 'país', continente: 'Ásia' },
        'Índia': { lat: 20.5937, lon: 78.9629, type: 'país', continente: 'Ásia' },
        'Israel': { lat: 31.0461, lon: 34.8516, type: 'país', continente: 'Ásia' },
        'África do Sul': { lat: -30.5595, lon: 22.9375, type: 'país', continente: 'África' },
        'Egito': { lat: 26.0975, lon: 30.0444, type: 'país', continente: 'África' },
        'Austrália': { lat: -25.2744, lon: 133.7751, type: 'país', continente: 'Oceania' }
    },
    
    // Estados brasileiros principais
    estados: {
        'São Paulo': { lat: -23.5505, lon: -46.6333, type: 'estado', país: 'Brasil' },
        'Rio de Janeiro': { lat: -22.9068, lon: -43.1729, type: 'estado', país: 'Brasil' },
        'Minas Gerais': { lat: -19.9167, lon: -43.9345, type: 'estado', país: 'Brasil' },
        'Bahia': { lat: -12.9714, lon: -38.5014, type: 'estado', país: 'Brasil' },
        'Paraná': { lat: -25.4284, lon: -49.2733, type: 'estado', país: 'Brasil' },
        'Rio Grande do Sul': { lat: -30.0346, lon: -51.2177, type: 'estado', país: 'Brasil' },
        'Pernambuco': { lat: -8.0476, lon: -34.8770, type: 'estado', país: 'Brasil' },
        'Ceará': { lat: -3.7172, lon: -38.5433, type: 'estado', país: 'Brasil' },
        'Pará': { lat: -1.4558, lon: -48.5044, type: 'estado', país: 'Brasil' },
        'Santa Catarina': { lat: -27.2423, lon: -50.2189, type: 'estado', país: 'Brasil' },
        'Goiás': { lat: -16.6864, lon: -49.2643, type: 'estado', país: 'Brasil' },
        'Maranhão': { lat: -2.5387, lon: -44.2825, type: 'estado', país: 'Brasil' },
        'Amazonas': { lat: -3.1190, lon: -60.0217, type: 'estado', país: 'Brasil' },
        'Espírito Santo': { lat: -19.1834, lon: -40.3089, type: 'estado', país: 'Brasil' },
        'Paraíba': { lat: -7.2400, lon: -36.7820, type: 'estado', país: 'Brasil' },
        'Rio Grande do Norte': { lat: -5.7945, lon: -35.2110, type: 'estado', país: 'Brasil' },
        'Alagoas': { lat: -9.5713, lon: -36.7820, type: 'estado', país: 'Brasil' },
        'Piauí': { lat: -5.0892, lon: -42.8039, type: 'estado', país: 'Brasil' },
        'Distrito Federal': { lat: -15.7942, lon: -47.8822, type: 'estado', país: 'Brasil' },
        'Mato Grosso': { lat: -15.6014, lon: -56.0979, type: 'estado', país: 'Brasil' },
        'Mato Grosso do Sul': { lat: -20.7722, lon: -54.7852, type: 'estado', país: 'Brasil' },
        'Tocantins': { lat: -10.1753, lon: -48.2982, type: 'estado', país: 'Brasil' },
        'Sergipe': { lat: -10.5741, lon: -37.3857, type: 'estado', país: 'Brasil' },
        'Rondônia': { lat: -8.7612, lon: -63.9019, type: 'estado', país: 'Brasil' },
        'Roraima': { lat: 2.8195, lon: -60.6719, type: 'estado', país: 'Brasil' },
        'Acre': { lat: -9.0238, lon: -70.8120, type: 'estado', país: 'Brasil' },
        'Amapá': { lat: 1.4144, lon: -51.7860, type: 'estado', país: 'Brasil' }
    },
    
    // Cidades principais
    cidades: {
        // Brasil
        'São Paulo': { lat: -23.5505, lon: -46.6333, type: 'cidade', estado: 'São Paulo', país: 'Brasil' },
        'Rio de Janeiro': { lat: -22.9068, lon: -43.1729, type: 'cidade', estado: 'Rio de Janeiro', país: 'Brasil' },
        'Brasília': { lat: -15.7942, lon: -47.8822, type: 'cidade', estado: 'Distrito Federal', país: 'Brasil' },
        'Salvador': { lat: -12.9714, lon: -38.5014, type: 'cidade', estado: 'Bahia', país: 'Brasil' },
        'Belo Horizonte': { lat: -19.9167, lon: -43.9345, type: 'cidade', estado: 'Minas Gerais', país: 'Brasil' },
        'Curitiba': { lat: -25.4284, lon: -49.2733, type: 'cidade', estado: 'Paraná', país: 'Brasil' },
        'Recife': { lat: -8.0476, lon: -34.8770, type: 'cidade', estado: 'Pernambuco', país: 'Brasil' },
        'Porto Alegre': { lat: -30.0346, lon: -51.2177, type: 'cidade', estado: 'Rio Grande do Sul', país: 'Brasil' },
        'Fortaleza': { lat: -3.7172, lon: -38.5433, type: 'cidade', estado: 'Ceará', país: 'Brasil' },
        'Manaus': { lat: -3.1190, lon: -60.0217, type: 'cidade', estado: 'Amazonas', país: 'Brasil' },
        'Belém': { lat: -1.4558, lon: -48.5044, type: 'cidade', estado: 'Pará', país: 'Brasil' },
        'Goiânia': { lat: -16.6864, lon: -49.2643, type: 'cidade', estado: 'Goiás', país: 'Brasil' },
        'Vitória': { lat: -20.3155, lon: -40.3128, type: 'cidade', estado: 'Espírito Santo', país: 'Brasil' },
        'Florianópolis': { lat: -27.5954, lon: -48.5480, type: 'cidade', estado: 'Santa Catarina', país: 'Brasil' },
        'Natal': { lat: -5.7945, lon: -35.2110, type: 'cidade', estado: 'Rio Grande do Norte', país: 'Brasil' },
        'João Pessoa': { lat: -7.2400, lon: -36.7820, type: 'cidade', estado: 'Paraíba', país: 'Brasil' },
        'Maceió': { lat: -9.5713, lon: -36.7820, type: 'cidade', estado: 'Alagoas', país: 'Brasil' },
        'Aracaju': { lat: -10.5741, lon: -37.3857, type: 'cidade', estado: 'Sergipe', país: 'Brasil' },
        'Teresina': { lat: -5.0892, lon: -42.8039, type: 'cidade', estado: 'Piauí', país: 'Brasil' },
        'São Luís': { lat: -2.5387, lon: -44.2825, type: 'cidade', estado: 'Maranhão', país: 'Brasil' },
        'Macapá': { lat: 0.0349, lon: -51.0694, type: 'cidade', estado: 'Amapá', país: 'Brasil' },
        'Boa Vista': { lat: 2.8195, lon: -60.6719, type: 'cidade', estado: 'Roraima', país: 'Brasil' },
        'Rio Branco': { lat: -9.0238, lon: -70.8120, type: 'cidade', estado: 'Acre', país: 'Brasil' },
        'Porto Velho': { lat: -8.7612, lon: -63.9019, type: 'cidade', estado: 'Rondônia', país: 'Brasil' },
        'Palmas': { lat: -10.1753, lon: -48.2982, type: 'cidade', estado: 'Tocantins', país: 'Brasil' },
        'Cuiabá': { lat: -15.6014, lon: -56.0979, type: 'cidade', estado: 'Mato Grosso', país: 'Brasil' },
        'Campo Grande': { lat: -20.7722, lon: -54.7852, type: 'cidade', estado: 'Mato Grosso do Sul', país: 'Brasil' },
        
        // Internacional
        'Nova York': { lat: 40.7128, lon: -74.0060, type: 'cidade', estado: 'Nova York', país: 'Estados Unidos' },
        'Los Angeles': { lat: 34.0522, lon: -118.2437, type: 'cidade', estado: 'Califórnia', país: 'Estados Unidos' },
        'Chicago': { lat: 41.8781, lon: -87.6298, type: 'cidade', estado: 'Illinois', país: 'Estados Unidos' },
        'Londres': { lat: 51.5074, lon: -0.1278, type: 'cidade', estado: 'Inglaterra', país: 'Reino Unido' },
        'Paris': { lat: 48.8566, lon: 2.3522, type: 'cidade', estado: 'Île-de-France', país: 'França' },
        'Berlim': { lat: 52.5200, lon: 13.4050, type: 'cidade', estado: 'Berlim', país: 'Alemanha' },
        'Moscou': { lat: 55.7558, lon: 37.6173, type: 'cidade', estado: 'Moscou', país: 'Rússia' },
        'Pequim': { lat: 39.9042, lon: 116.4074, type: 'cidade', estado: 'Pequim', país: 'China' },
        'Tóquio': { lat: 35.6762, lon: 139.6503, type: 'cidade', estado: 'Tóquio', país: 'Japão' },
        'Nova Delhi': { lat: 28.6139, lon: 77.2090, type: 'cidade', estado: 'Delhi', país: 'Índia' },
        'Tel Aviv': { lat: 32.0853, lon: 34.7818, type: 'cidade', estado: 'Tel Aviv', país: 'Israel' },
        'Jerusalém': { lat: 31.7683, lon: 35.2137, type: 'cidade', estado: 'Jerusalém', país: 'Israel' },
        'Sydney': { lat: -33.8688, lon: 151.2093, type: 'cidade', estado: 'Nova Gales do Sul', país: 'Austrália' },
        'Melbourne': { lat: -37.8136, lon: 144.9631, type: 'cidade', estado: 'Victoria', país: 'Austrália' },
        'Cidade do México': { lat: 19.4326, lon: -99.1332, type: 'cidade', estado: 'Cidade do México', país: 'México' },
        'Buenos Aires': { lat: -34.6037, lon: -58.3816, type: 'cidade', estado: 'Buenos Aires', país: 'Argentina' },
        'Santiago': { lat: -33.4489, lon: -70.6693, type: 'cidade', estado: 'Santiago', país: 'Chile' },
        'Toronto': { lat: 43.6532, lon: -79.3832, type: 'cidade', estado: 'Ontário', país: 'Canadá' },
        'Cidade do Cabo': { lat: -33.9249, lon: 18.4241, type: 'cidade', estado: 'Cabo Ocidental', país: 'África do Sul' },
        'Cairo': { lat: 30.0444, lon: 31.2357, type: 'cidade', estado: 'Cairo', país: 'Egito' }
    }
};

// Função para buscar localização por nome (case-insensitive)
function findLocation(name) {
    if (!name) return null;
    
    const searchName = name.trim();
    
    // Busca exata primeiro
    if (locations.cidades[searchName]) {
        return { ...locations.cidades[searchName], name: searchName };
    }
    if (locations.estados[searchName]) {
        return { ...locations.estados[searchName], name: searchName };
    }
    if (locations.paises[searchName]) {
        return { ...locations.paises[searchName], name: searchName };
    }
    if (locations.continentes[searchName]) {
        return { ...locations.continentes[searchName], name: searchName };
    }
    
    // Busca parcial (case-insensitive)
    const allLocations = {
        ...locations.cidades,
        ...locations.estados,
        ...locations.paises,
        ...locations.continentes
    };
    
    for (const [key, value] of Object.entries(allLocations)) {
        if (key.toLowerCase().includes(searchName.toLowerCase()) || 
            searchName.toLowerCase().includes(key.toLowerCase())) {
            return { ...value, name: key };
        }
    }
    
    return null;
}

