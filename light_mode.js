const fs = require('fs');
const path = require('path');

const files = ['index.html', 'process.html', 'services.html', 'reviews.html'];

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Text colors
    content = content.replace(/color:\s*white;/g, 'color: var(--text-primary);');
    content = content.replace(/color:\s*gold;/g, 'color: #f59e0b;');
    
    // Borders
    content = content.replace(/rgba\(255,255,255,0\.05\)/g, 'rgba(0,0,0,0.08)');
    content = content.replace(/rgba\(255,255,255,0\.1\)/g, 'rgba(0,0,0,0.1)');
    
    // Card Backgrounds
    content = content.replace(/rgba\(255,255,255,0\.02\)/g, '#ffffff');
    content = content.replace(/rgba\(255,255,255,0\.01\)/g, 'rgba(0,0,0,0.02)');
    content = content.replace(/background:\s*var\(--glass-bg\)/g, 'background: #ffffff');
    content = content.replace(/box-shadow:\s*0 4px 30px rgba\(0, 0, 0, 0\.1\)/g, 'box-shadow: 0 10px 40px rgba(0,0,0,0.05)');
    
    // Trust section
    content = content.replace(/rgba\(0,0,0,0\.3\)/g, 'rgba(0,0,0,0.03)');
    
    // Video overlays
    content = content.replace(/rgba\(5,5,10,0\.8\)/g, 'rgba(255,255,255,0.85)');
    content = content.replace(/rgba\(5,5,10,1\)/g, 'rgba(248,250,252,1)');
    content = content.replace(/rgba\(5,5,10,0\.7\)/g, 'rgba(255,255,255,0.85)');

    fs.writeFileSync(filePath, content);
});

console.log("Light mode conversion script completed successfully.");
