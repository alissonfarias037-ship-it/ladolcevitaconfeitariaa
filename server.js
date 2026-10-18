const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5050;
const DB_FILE = path.join(__dirname, 'store_data.json');

const SYNC_DIRS = [
    __dirname,
    'E:\\SITE DA MINHA FML CMD',
    'C:\\Users\\aliss\\Desktop\\SITE DA MINHA FML CMD',
    'C:\\Users\\aliss\\Downloads\\SITE DA MINHA FML CMD',
    'C:\\Users\\aliss\\Downloads\\Sitebots'
];

const defaultData = {
    updatedAt: Date.now(),
    settings: {
        storeName: "La Dolce Vita",
        storeSubtitle: "Confeitaria Artesanal",
        bannerTitle: "A doçura que encanta os seus melhores momentos",
        bannerDesc: "Doces finos, cupcakes artesanais, bolos decorados e tortas feitas com ingredientes selecionados e muito amor.",
        bannerImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80",
        whatsapp: "5581989936203",
        instagram: "@ladolcevita.confeitaria",
        address: "Rua alto da bela vista, 70",
        openingHours: "Terça a Domingo: 10h às 20h",
        deliveryFee: 8.50,
        freeDeliveryAbove: 100.00,
        isOpen: true,
        accentColor: "#d96b70"
    },
    admins: [
        {
            email: "admin@ladolcevita.com",
            password: "123",
            name: "Administrador Principal"
        }
    ],
    categories: ["Todos", "Cupcakes", "Bolos & Tortas", "Doces Finos", "Macarons & Cookies", "Bebidas"],
    products: [
        {
            id: 1,
            name: "Cupcake Amor Perfeito (Morango & Chantilly)",
            category: "Cupcakes",
            price: 14.90,
            promoPrice: 12.50,
            description: "Massa fofinha de baunilha com fava real, recheio cremoso de geleia artesanal de morango e cobertura de buttercream rosê com coração.",
            image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=700&q=80",
            badge: "Mais Vendido",
            available: true,
            featured: true,
            stock: 25,
            weight: "110g"
        },
        {
            id: 2,
            name: "Cupcake Red Velvet Imperial",
            category: "Cupcakes",
            price: 15.90,
            promoPrice: null,
            description: "O clássico veludo vermelho com leve toque de cacau, recheado e coberto com autêntico frosting de cream cheese philadelphia.",
            image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=700&q=80",
            badge: "Especial",
            available: true,
            featured: true,
            stock: 18,
            weight: "115g"
        },
        {
            id: 3,
            name: "Fatia de Bolo Chocolatudo Belga",
            category: "Bolos & Tortas",
            price: 24.00,
            promoPrice: 19.90,
            description: "Três camadas de massa úmida de cacau 70% intercaladas com brigadeiro gourmet de chocolate belga Callebaut e ganache meio amargo.",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
            badge: "Promoção",
            available: true,
            featured: true,
            stock: 12,
            weight: "220g"
        },
        {
            id: 4,
            name: "Caixa 6 Macarons Parisienses",
            category: "Macarons & Cookies",
            price: 42.00,
            promoPrice: null,
            description: "Seleção de macarons crocantes por fora e macios por dentro: Pistache, Framboesa, Baunilha, Caramelo Salgado, Limão Siciliano e Chocolate.",
            image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=700&q=80",
            badge: "Importado",
            available: true,
            featured: false,
            stock: 10,
            weight: "150g"
        },
        {
            id: 5,
            name: "Torta de Frutas Vermelhas & Creme Pâtissier",
            category: "Bolos & Tortas",
            price: 26.50,
            promoPrice: null,
            description: "Base crocante de pâte sucrée amanteigada, recheada com creme confeiteiro de baunilha e coroada com morangos, mirtilos e amoras frescas.",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80",
            badge: "Fresco Hoje",
            available: true,
            featured: true,
            stock: 8,
            weight: "180g"
        },
        {
            id: 6,
            name: "Kit 12 Brigadeiros Gourmet Sortidos",
            category: "Doces Finos",
            price: 38.90,
            promoPrice: 34.90,
            description: "Brigadeiros feitos com leite condensado selecionado e chocolate nobre: Ao Leite, Ninho com Nutella, Pistache, Churros e Brûlée.",
            image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=700&q=80",
            badge: "Presenteável",
            available: true,
            featured: false,
            stock: 30,
            weight: "240g"
        },
        {
            id: 7,
            name: "Cheesecake New York com Calda de Amora",
            category: "Bolos & Tortas",
            price: 25.00,
            promoPrice: null,
            description: "Cheesecake assado super cremoso sobre base de biscoito amanteigado, finalizado com compota rústica de amoras silvestres.",
            image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
            badge: "",
            available: true,
            featured: false,
            stock: 15,
            weight: "190g"
        },
        {
            id: 8,
            name: "Cookie New York Duplo Chocolate & Nozes",
            category: "Macarons & Cookies",
            price: 16.00,
            promoPrice: 13.50,
            description: "Cookie gigante de 130g estilo nova-iorquino, casquinha dourada e interior super macio derretendo gotas de chocolate meio amargo.",
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80",
            badge: "Quentinho",
            available: true,
            featured: false,
            stock: 20,
            weight: "130g"
        }
    ]
};

// Mantém os dados em memória + disco para NUNCA perder alterações nem sumir produto
let memoryStore = null;

function cleanStringBOM(str) {
    return str.replace(/^\uFEFF/, '').trim();
}

function loadData() {
    if (memoryStore) return memoryStore;

    if (!fs.existsSync(DB_FILE)) {
        memoryStore = JSON.parse(JSON.stringify(defaultData));
        saveData(memoryStore);
        return memoryStore;
    }
    try {
        const raw = cleanStringBOM(fs.readFileSync(DB_FILE, 'utf8'));
        const parsed = JSON.parse(raw);
        if (!parsed.admins || parsed.admins.length === 0) {
            parsed.admins = defaultData.admins;
        }
        if (!parsed.updatedAt) {
            parsed.updatedAt = Date.now();
        }
        memoryStore = parsed;
        return memoryStore;
    } catch (e) {
        console.error("Recuperando store_data.json corrompido:", e.message);
        memoryStore = JSON.parse(JSON.stringify(defaultData));
        saveData(memoryStore);
        return memoryStore;
    }
}

let dataVersion = Date.now();
const sseClients = new Set();

function broadcastUpdate(updatedData) {
    dataVersion = updatedData.updatedAt || Date.now();
    const payload = `data: ${JSON.stringify({ version: dataVersion })}\n\n`;
    for (const client of sseClients) {
        try {
            client.write(payload);
        } catch (e) {
            sseClients.delete(client);
        }
    }
}

function saveData(data) {
    if (!data || !Array.isArray(data.products)) return;
    data.updatedAt = Date.now();
    memoryStore = data;
    const jsonStr = JSON.stringify(data, null, 2);

    for (const dir of SYNC_DIRS) {
        try {
            if (fs.existsSync(dir)) {
                fs.writeFileSync(path.join(dir, 'store_data.json'), jsonStr, { encoding: 'utf8' });
            }
        } catch (e) {}
    }

    broadcastUpdate(data);
}

// Carrega logo ao iniciar
loadData();

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url.startsWith('/api/events') && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive'
        });
        res.write(`data: ${JSON.stringify({ version: dataVersion })}\n\n`);
        sseClients.add(res);
        req.on('close', () => sseClients.delete(res));
        return;
    }

    if (req.url.startsWith('/api/data') && req.method === 'GET') {
        const current = loadData();
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        res.end(JSON.stringify(current));
        return;
    }

    if (req.url.startsWith('/api/data') && req.method === 'POST') {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            try {
                const rawBody = cleanStringBOM(Buffer.concat(chunks).toString('utf8'));
                const parsed = JSON.parse(rawBody);
                saveData(parsed);
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, version: dataVersion, updatedAt: parsed.updatedAt }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    if (req.url.startsWith('/api/reset') && req.method === 'POST') {
        const current = loadData();
        const resetObj = { ...defaultData, admins: current.admins || defaultData.admins, updatedAt: Date.now() };
        saveData(resetObj);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, data: resetObj, version: dataVersion }));
        return;
    }

    if (req.url.startsWith('/logo.jpg')) {
        const logoPath = path.join(__dirname, 'logo.jpg');
        if (fs.existsSync(logoPath)) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            fs.createReadStream(logoPath).pipe(res);
            return;
        }
    }

    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store, no-cache, must-revalidate'
        });
        fs.createReadStream(indexPath).pipe(res);
    } else {
        res.writeHead(404);
        res.end('index.html not found');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`La Dolce Vita Confeitaria rodando em http://localhost:${PORT}`);
});
