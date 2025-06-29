const personInfo = [
    { id: 1, name: "Abu Sayem Chowdhury", image: "./images/abu_sayem.jpg" },
    { id: 2, name: "Khaleda Islam", image: "./images/khaleda_islam.jpg" },
    { id: 3, name: "Forhan Uddin", image: "./images/forhan_u.jpg" },
    { id: 4, name: "Shisir Ahmed", image: "./images/shishir_ahmed.jpg" },
    { id: 5, name: "Nirob", image: "./images/nirob.jpg" },
    { id: 6, name: "Fahim", image: "./images/fahim.jpg" },
    { id: 7, name: "Sazib Khan", image: "./images/sazib_khan.jpg" },
    { id: 8, name: "Omar Faruq", image: "./images/omar.jpg" },
    { id: 9, name: "Sayem Bin", image: "./images/bin.jpg" },
    { id: 10, name: "Tarif", image: "./images/jalis.jpg" },
    { id: 11, name: "Riazul", image: "./images/riazul.jpg" },
    { id: 12, name: "Shahadat", image: "./images/shahadat.jpg" },
    { id: 13, name: "Abir", image: "./images/abir.jpg" },
    { id: 14, name: "Saki", image: "./images/saki.JPG" },
    { id: 15, name: "Rony", image: "./images/rony.JPG" },
    { id: 16, name: "Azmi", image: "./images/azmi.jpg" },
    { id: 17, name: "Sazzad", image: "./images/sazu.jpg" },
    { id: 18, name: "Shakil", image: "./images/shakil.jpg" },
    { id: 19, name: "Zubaer", image: "./images/zubaer.jpg" },
    { id: 20, name: "Rokib", image: "./images/rokib.jpeg" },
];

const links = [
    [1, 2], [1, 4], [1, 3],
    [2, 3], [2, 9], [2, 10],
    [3, 10], [3, 5], [3, 11], [3, 8], [3, 14], [3, 15], [3, 19],
    [4, 5], [4, 7], [4, 8], [4, 6],
    [5, 8], [5, 10], [5, 17], [5, 18],
    [8, 11], [8, 12], [8, 15], [8, 16],[8,20],
    [10, 15], [10, 13], [10, 19], [10, 17], [10, 18],
    [14, 5], [14, 8], [14, 6]
];

const nodes = [
    { id: 1, x: 7, y: 20, color: 'bg-cyan-400' },
    { id: 2, x: 28, y: 12, color: 'bg-purple-400' },
    { id: 3, x: 40, y: 24, color: 'bg-blue-400' },
    { id: 4, x: 65, y: 10, color: 'bg-rose-400' },
    { id: 5, x: 85, y: 20, color: 'bg-emerald-700' },
    { id: 6, x: 70, y: 30, color: 'bg-orange-400' },
    { id: 7, x: 50, y: 50, color: 'bg-fuchsia-400' },
    { id: 8, x: 30, y: 60, color: 'bg-lime-400' },
    { id: 9, x: 15, y: 40, color: 'bg-pink-400' },
    { id: 10, x: 75, y: 50, color: 'bg-amber-400' },
    { id: 11, x: 90, y: 35, color: 'bg-green-500' },
    { id: 12, x: 20, y: 70, color: 'bg-indigo-400' },
    { id: 13, x: 40, y: 80, color: 'bg-teal-400' },
    { id: 14, x: 60, y: 70, color: 'bg-violet-400' },
    { id: 15, x: 80, y: 90, color: 'bg-sky-400' },
    { id: 16, x: 50, y: 90, color: 'bg-yellow-400' },
    { id: 17, x: 30, y: 80, color: 'bg-red-400' },
    { id: 18, x: 10, y: 60, color: 'bg-rose-500' },
    { id: 19, x: 70, y: 80, color: 'bg-teal-800' },
    { id: 20, x: 70, y: 80, color: 'bg-amber-800' },
];

// Rest of your code remains the same...



const wrapper = document.getElementById('wrapper');
const nodesContainer = document.getElementById('nodes');
const svg = document.getElementById('connections');

// Setup SVG defs (gradient + arrow)
const defs = document.createElementNS(svg.namespaceURI, 'defs');

// Gradient
const gradient = document.createElementNS(svg.namespaceURI, 'linearGradient');
gradient.setAttribute('id', 'gradient');
gradient.setAttribute('x1', '0%');
gradient.setAttribute('y1', '0%');
gradient.setAttribute('x2', '100%');
gradient.setAttribute('y2', '100%');
['#06b6d4', '#9333ea', '#f43f5e', '#22c55e', '#f97316'].forEach((color, i) => {
    const stop = document.createElementNS(svg.namespaceURI, 'stop');
    stop.setAttribute('offset', `${(i / 4) * 100}%`);
    stop.setAttribute('stop-color', color);
    gradient.appendChild(stop);
});
defs.appendChild(gradient);

// Arrow marker
const marker = document.createElementNS(svg.namespaceURI, 'marker');
marker.setAttribute('id', 'arrow');
marker.setAttribute('markerWidth', '10');
marker.setAttribute('markerHeight', '10');
marker.setAttribute('refX', '5');
marker.setAttribute('refY', '5');
marker.setAttribute('orient', 'auto');
marker.setAttribute('markerUnits', 'strokeWidth');

const arrowPath = document.createElementNS(svg.namespaceURI, 'path');
arrowPath.setAttribute('d', 'M0,0 L10,5 L0,10 Z');
arrowPath.setAttribute('fill', '#06b6d4');
marker.appendChild(arrowPath);
defs.appendChild(marker);

svg.appendChild(defs);

// Main Render Function
function render() {
    nodesContainer.innerHTML = '';
    svg.querySelectorAll('.path-line').forEach(line => line.remove());

    const { width, height } = wrapper.getBoundingClientRect();

    // Draw Paths
    links.forEach(([a, b], idx) => {
        const start = nodes.find(n => n.id === a);
        const end = nodes.find(n => n.id === b);

        const sx = (start.x / 100) * width;
        const sy = (start.y / 100) * height;
        const ex = (end.x / 100) * width;
        const ey = (end.y / 100) * height;

        const dx = Math.abs(ex - sx) * 0.4;

        const path = document.createElementNS(svg.namespaceURI, 'path');
        path.setAttribute('d', `M${sx},${sy} C${sx + dx},${sy} ${ex - dx},${ey} ${ex},${ey}`);
        path.setAttribute('stroke', 'url(#gradient)');
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('marker-end', 'url(#arrow)');
        path.classList.add('path-line');
        path.setAttribute('line-idx', idx);
        svg.appendChild(path);
    });

    // Draw Nodes
    nodes.forEach((node, idx) => {
        const div = document.createElement('div');
        div.id = `person${node.id}`;
        div.className = `absolute ${node.color} rounded-full border-4 border-white node glow`;
        div.style.width = div.style.height = '48px';
        div.style.left = `calc(${node.x}% - 24px)`;
        div.style.top = `calc(${node.y}% - 24px)`;

        div.addEventListener('click', () => showPerson(node.id));

        const inner = document.createElement('div');
        inner.className = 'bg-white rounded-full';
        Object.assign(inner.style, {
            width: '14px',
            height: '14px',
            margin: 'auto',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)'
        });

        div.appendChild(inner);
        nodesContainer.appendChild(div);
    });
}

// Show Person and Connections
function showPerson(id) {
    const nodeDiv = document.getElementById(`person${id}`);
    if (!nodeDiv) return;

    const isExpanded = nodeDiv.classList.contains('expanded');

    nodesContainer.querySelectorAll('.node').forEach(n => {
        n.classList.remove('expanded');
        n.innerHTML = '';
        const nodeId = parseInt(n.id.replace('person', ''));
        const inner = document.createElement('div');
        inner.className = 'bg-white rounded-full';
        Object.assign(inner.style, {
            width: '14px',
            height: '14px',
            margin: 'auto',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)'
        });
        n.appendChild(inner);
    });

    svg.querySelectorAll('.path-line').forEach(line => {
        line.style.display = 'block';
    });

    if (isExpanded) {
        nodeDiv.classList.remove('expanded');
        return;
    }

    const connectedIds = links.filter(([a, b]) => a === id).map(([a, b]) => b);
    const allToExpand = [id, ...connectedIds];

    allToExpand.forEach(nodeId => {
        const info = personInfo.find(p => p.id === nodeId);
        const nodeDiv = document.getElementById(`person${nodeId}`);
        if (!nodeDiv) return;

        nodeDiv.classList.add('expanded');
        nodeDiv.innerHTML = '';

        const img = document.createElement('img');
        img.src = info?.image || '';
        img.alt = info?.name || '';
        Object.assign(img.style, {
            width: '100%',
            height: '100%',
            borderRadius: '50%'
        });
        nodeDiv.appendChild(img);

        const label = document.createElement('div');
        label.textContent = info?.name || 'Unknown';
        Object.assign(label.style, {
            position: 'absolute',
            top: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px'
        });
        nodeDiv.appendChild(label);
    });

    // Hide all lines
    svg.querySelectorAll('.path-line').forEach(line => {
        line.style.display = 'none';
    });

    // Show only outgoing lines
    links.forEach(([a, b], idx) => {
        if (a === id) {
            const line = svg.querySelector(`.path-line[line-idx="${idx}"]`);
            if (line) {
                line.style.display = 'block';
            }
        }
    });
}

// Run Initial Render
render();
window.addEventListener('resize', render);
