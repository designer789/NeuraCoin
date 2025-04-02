class ParticleNetwork {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particleCount = 15;
        this.particles = [];
        this.maxDistance = 120;
        this.colors = ['#ff8700', '#ff6b00', '#ff5100'];
        
        this.init();
    }
    
    init() {
        // Setup canvas
        this.canvas.className = 'particle-canvas';
        this.container.appendChild(this.canvas);
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25,
                size: Math.random() * 2 + 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }
        
        // Start animation
        this.animate();
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 135, 0, ${1 - distance / this.maxDistance})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(this.animate.bind(this));
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    destroy() {
        this.container.removeChild(this.canvas);
    }
}

// Initialize particles on feature cards
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    const networks = [];
    
    featureCards.forEach(card => {
        let network = null;
        
        card.addEventListener('mouseenter', () => {
            network = new ParticleNetwork(card);
            networks.push(network);
        });
        
        card.addEventListener('mouseleave', () => {
            if (network) {
                network.destroy();
                const index = networks.indexOf(network);
                if (index > -1) networks.splice(index, 1);
                network = null;
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        networks.forEach(network => network.resize());
    });
}); 