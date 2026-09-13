const projects = [
    {
        number: '01',
        visual: 'compression',
        title: 'RLE Fullstack Compression Tool',
        category: 'ALGORITHMS · FULLSTACK',
        description: 'A tool for compressing and decompressing data using the RLE algorithm in a fullstack environment.',
        image: 'assets/images/project1.png',
        link: 'https://github.com/owaseraph/RLE_Fullstack_Tool'
    },
    {
        number: '02',
        visual: 'cyber',
        title: 'PhishGuard',
        category: 'CYBERSECURITY · PYTHON',
        description: 'Real-time phishing protection for Gmail with AI-powered detection and community intelligence. Built for PoliHack 2026 — Detecting and Preventing Phishing Attacks in Real Time.',
        image: 'assets/images/project2.png',
        link: 'https://github.com/owaseraph/PoliHack_CommitmentIssues_2026'
    },
    {
        number: '03',
        visual: 'wireless',
        title: 'Hardware-Encrypted Wireless System',
        category: 'FPGA · TELECOMMUNICATIONS',
        description: 'A hardware-encrypted wireless communication system using FPGA-based encryption and ESP32.',
        image: 'assets/images/project3.png',
        link: 'https://github.com/owaseraph/Hardware-Encrypted-Wireless-Communication-System'
    },
    {
        number: '04',
        visual: 'logic',
        title: 'Digital Logic Simulator',
        category: 'C++ · DIGITAL LOGIC',
        description: 'A high-performance logic circuit simulator built in C++ from scratch. This tool allows users to place logic gates, wire them together, and simulate digital circuits in real-time.',
        image: 'assets/images/project4.png',
        link: 'https://github.com/owaseraph/Digital-Logic-Simulator'
    }
];

export function renderProjects() {
    const track = document.getElementById('track');
    if (!track) return;

    track.innerHTML = projects.map(project => `
    <a class="panel panel-${project.visual}" href="${project.link}" target="_blank" rel="noopener">
      <img src="${project.image}" alt="${project.title} preview" loading="lazy">
      <span class="p-num">${project.number}</span>
    <span class="p-meta">${project.category}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    <span class="p-action">View project <span aria-hidden="true">↗</span></span>
    </a>
  `).join('');
}