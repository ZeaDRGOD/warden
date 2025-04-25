const consoleOutput = document.getElementById('console-output');
const input = document.getElementById('input');
let isMinecraftMode = false;

function getTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function parseMinecraftColors(text) {
    const colorMap = {
        '&f': 'color-white',
        '&a': 'color-green'
    };
    let result = text;
    for (const [code, className] of Object.entries(colorMap)) {
        result = result.split(code).join(`</span><span class="${className}">`);
    }
    return `<span>${result}</span>`;
}

function log(message, level = 'INFO', useMinecraftColors = false) {
    const timestamp = getTimestamp();
    let formattedMessage = message;
    if (useMinecraftColors) {
        formattedMessage = parseMinecraftColors(message);
    }
    const logEntry = `<span class="log-timestamp">[${timestamp} ${level}]:</span> ${formattedMessage}\n`;
    consoleOutput.innerHTML += logEntry;
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function onStartup() {
    log('Warden Hosting Startup on Ubuntu');
    log('Starting Ubuntu 22.04 LTS');
    log('Initializing system services...');
    log('Mounting filesystems... OK');
    log('Starting network interfaces... OK');
    log('Loading Warden Hosting server version 1.0.0');
    log('Configuring hosting environment...');
    log('Time elapsed: 1.245s');
    log('Starting Warden Hosting services... OK');
    log('Done (3.124s)! For help, type "help"', 'DONE');
}

function handleCommand(command) {
    if (isMinecraftMode) {
        handleMinecraftCommand(command);
        return;
    }

    log(`> ${command}`);
    command = command.toLowerCase().trim();

    switch (command) {
        case 'help':
            log('Existing commands: help, performance, game, minecraft', 'INFO');
            break;
        case 'performance':
            log('Server Performance:');
            log('CPU: AMD Ryzen 9 7900X3D');
            log('OS: Ubuntu');
            log('RAM: 73/512GB');
            log('Performance in Ubuntu: Stable, optimized for high load');
            break;
        case 'game':
            log('Supported games in our hosting: MINECRAFT, FIVEM, SA-MP, OTHER GAME');
            break;
        case 'minecraft':
            log('Entering Minecraft console mode...');
            isMinecraftMode = true;
            document.querySelector('.prompt').textContent = 'minecraft> ';
            break;
        default:
            log('Unknown command. Type "help" for a list of commands.', 'INFO');
    }
}

function handleMinecraftCommand(command) {
    log(`> ${command}`);
    command = command.toLowerCase().trim();

    switch (command) {
        case 'plugins':
        case 'pl':
            log('&fPlugins: &aWardenHosting&f, &aWardenProtection&f, &aWardenAC', 'INFO', true);
            break;
        case 'help':
            log('Minecraft commands: help, buy, plugins');
            break;
        case 'buy':
            log('Redirecting to page configuration...');
            window.location.href = '../configuration'; // Replace with actual URL
            break;
        case 'exit':
            log('Exiting Minecraft console mode...');
            isMinecraftMode = false;
            document.querySelector('.prompt').textContent = '> ';
            break;
        default:
            log('Unknown Minecraft command. Type "help" for a list of commands.', 'INFO');
    }
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value;
        if (command) {
            handleCommand(command);
            input.value = '';
        }
    }
});

window.onload = onStartup;