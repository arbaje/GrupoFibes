const app = {
    // Cargar usuarios de la memoria local
    users: JSON.parse(localStorage.getItem('game_users')) || {},

    // Registro de nuevos jugadores
    register: function() {
        const u = document.getElementById('userInput').value.trim();
        const p = document.getElementById('passInput').value;

        if (!u || !p) return alert("Rellena todos los campos");
        if (this.users[u]) return alert("El usuario ya existe");
        
        // Seguridad: 8 caracteres, 1 mayúscula, 1 número
        if (p.length < 8 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) {
            return alert("Contraseña: 8 caracteres, 1 Mayúscula y 1 Número");
        }

        this.users[u] = p;
        localStorage.setItem('game_users', JSON.stringify(this.users));
        alert("✅ Usuario registrado. ¡Ya puedes entrar!");
    },

    // Inicio de sesión
    login: function() {
        const u = document.getElementById('userInput').value.trim();
        const p = document.getElementById('passInput').value;

        if (this.users[u] && this.users[u] === p) {
            localStorage.setItem('currentUser', u);
            this.showMenu(u);
        } else {
            alert("❌ Usuario o contraseña incorrectos");
        }
    },

    // Mostrar el menú de juegos
    showMenu: function(user) {
        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('menuScreen').style.display = 'block';
        document.getElementById('welcomeText').innerText = "¡Hola, " + user + "!";
    },

    // Navegar a los juegos
    loadGame: function(game) {
        const rutas = {
            'Serpiente': 'serpiente.html',
            'Palabra': 'palabra.html',
            'Sopa': 'sopa.html',
            'Sudoku': 'sudoku.html',
            'Buscamina': 'buscamina.html'
        };
        
        if (rutas[game]) {
            window.location.href = rutas[game];
        } else {
            alert("Juego en desarrollo...");
        }
    },

    // Salir
    logout: function() {
        localStorage.removeItem('currentUser');
        location.reload();
    }
};

// Configuración inicial al cargar la página
window.onload = () => {
    // Si ya estaba logueado, ir directo al menú
    const session = localStorage.getItem('currentUser');
    if (session) app.showMenu(session);

    // Lógica del ojo para la contraseña
    const ojo = document.getElementById('togglePassword');
    const inputP = document.getElementById('passInput');
    if (ojo && inputP) {
        ojo.addEventListener('click', () => {
            const esPass = inputP.type === 'password';
            inputP.type = esPass ? 'text' : 'password';
            ojo.classList.toggle('fa-eye');
            ojo.classList.toggle('fa-eye-slash');
        });
    }
};