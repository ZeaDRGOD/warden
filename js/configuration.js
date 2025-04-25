document.getElementById('productcart').addEventListener('input', updateCartSummary);

// Coupon array: [code, discountPercentage]
const coupons = [
    ["WARDEN-SAVE15", 15],
    ["WARDEN-4583", 35]
];

let totalPrice = 0;
let appliedCoupon = null;

function updateCartSummary() {
    const nodeType = document.getElementById('nodetype').value;
    const serverType = document.getElementById('plan').value;
    const dedicatedIpChecked = document.getElementById('dedicatedip').checked;
    const proxySetup = document.getElementById('proxy').checked;
    const geyserSetup = document.getElementById('geyser').checked;
    const optimizeSetup = document.getElementById('optimize').checked;
    const customplSetup = document.getElementById('custom-plugin').checked;
    const acSetup = document.getElementById('anti-cheat').checked;
    const dcsrcSetup = document.getElementById('discord-integration').checked;

    let planPrice = 0;

    if (serverType) {
        const priceText = serverType.split('$')[1]?.split(' ')[0];
        planPrice = parseFloat(priceText) || 0;
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

    const optimizeSetupPrice = optimizeSetup ? "Optimize Setup (Addons) $10.00 USD" : "";
    if (optimizeSetup) {
        totalPrice += 10.00;
    }

    const customplSetupPrice = customplSetup ? "Custom Plugin Setup (Addons) $15.00 USD" : "";
    if (customplSetup) {
        totalPrice += 15.00;
    }

    const acSetupPrice = acSetup ? "Anti-Cheat Setup (Addons) $12.00 USD" : "";
    if (acSetup) {
        totalPrice += 12.00;
    }

    const dcsrcSetupPrice = dcsrcSetup ? "Discord Integration Setup (Addons) $5.00 USD" : "";
    if (dcsrcSetup) {
        totalPrice += 5.00;
    }

    // Apply coupon discount if a valid coupon is applied
    let discount = 0;
    if (appliedCoupon) {
        const coupon = coupons.find(c => c[0] === appliedCoupon);
        if (coupon) {
            discount = totalPrice * (coupon[1] / 100);
        }
    }
    const finalPrice = totalPrice - discount;

    document.getElementById('summary-nodetype').innerText = "Node: " + (nodeType || "None");
    document.getElementById('summary-servertype').innerText = "Plan: " + (serverType || "None");
    document.getElementById('summary-dedicatedip').innerText = dedicatedIp;
    document.getElementById('summary-proxysetup').innerText = proxySetupPrice;
    document.getElementById('summary-geysersetup').innerText = geyserSetupPrice;
    document.getElementById('summary-optimizesetup').innerText = optimizeSetupPrice;
    document.getElementById('summary-customplsetup').innerText = customplSetupPrice;
    document.getElementById('summary-acsetup').innerText = acSetupPrice;
    document.getElementById('summary-dcsrcsetup').innerText = dcsrcSetupPrice;
    document.getElementById('summary-coupon').innerText = appliedCoupon ? `Coupon (${appliedCoupon}): -$${discount.toFixed(2)} USD` : "";
    document.getElementById('summary-total').innerText = `$ ${finalPrice.toFixed(2)} USD`;
    document.getElementById('total-price').innerText = `$ ${finalPrice.toFixed(2)} USD`;
}

// Coupon application function
function applyCoupon() {
    const couponCode = document.getElementById('coupon-input').value.trim().toUpperCase();
    const coupon = coupons.find(c => c[0] === couponCode);

    if (coupon) {
        appliedCoupon = couponCode;
        Swal.fire({
            title: 'Success',
            text: `Coupon ${couponCode} applied! ${coupon[1]}% off.`,
            icon: 'success'
        });
    } else {
        appliedCoupon = null;
        Swal.fire({
            title: 'Error',
            text: 'Invalid coupon code.',
            icon: 'error'
        });
    }
    updateCartSummary();
}

// Node type change handler
document.getElementById('nodetype').addEventListener('change', function() {
    const nodeType = this.value;
    const planSelect = document.getElementById('plan');
    const selectNode = document.getElementById('NodeNone');

    planSelect.innerHTML = '';
    planSelect.disabled = false;

    let options = [];

    if (nodeType === 'Budget') {
        for (let gb = 1; gb <= 32; gb++) {
            const price = (gb * 1.25).toFixed(2);
            options.push({
                value: `${gb}GB $${price} USD`,
                text: `[Budget] ${gb}GB $${price} USD`
            });
        }
        selectNode.disabled = true;
    } else if (nodeType === 'Premium') {
        for (let gb = 8; gb <= 32; gb++) {
            const price = (gb * 2.49).toFixed(2);
            options.push({
                value: `${gb}GB $${price} USD`,
                text: `[Premium] ${gb}GB $${price} USD`
            });
        }
        selectNode.disabled = true;
    } else {
        options = [];
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

// Game type change handler
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

document.getElementById('plan').addEventListener('change', updateCartSummary);
document.getElementById('dedicatedip').addEventListener('change', updateCartSummary);
document.getElementById('proxy').addEventListener('change', updateCartSummary);
document.getElementById('geyser').addEventListener('change', updateCartSummary);
document.getElementById('optimize').addEventListener('change', updateCartSummary);
document.getElementById('custom-plugin').addEventListener('change', updateCartSummary);
document.getElementById('anti-cheat').addEventListener('change', updateCartSummary);
document.getElementById('discord-integration').addEventListener('change', updateCartSummary);

function payments() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const servername = document.getElementById('servername').value;
    const nodetype = document.getElementById('nodetype').value;
    const plan = document.getElementById('plan').value;
    const location = document.getElementById('location').value;
    const gametype = document.getElementById('gametype').value;
    const software = document.getElementById('software').value;

    if (!email || !password) {
        Swal.fire({
            title: 'Error',
            text: 'Please enter your email and password.',
            icon: 'error'
        });
        return;
    }

    if (!servername) {
        Swal.fire({
            title: 'Error',
            text: 'Please enter your server name.',
            icon: 'error'
        });
        return;
    }

    if (!nodetype) {
        Swal.fire({
            title: 'Error',
            text: 'Please select your node type.',
            icon: 'error'
        });
        return;
    }

    if (!plan) {
        Swal.fire({
            title: 'Error',
            text: 'Please select your plan.',
            icon: 'error'
        });
        return;
    }

    if (!location) {
        Swal.fire({
            title: 'Error',
            text: 'Please select your location.',
            icon: 'error'
        });
        return;
    }

    if (!gametype) {
        Swal.fire({
            title: 'Error',
            text: 'Please select your game type.',
            icon: 'error'
        });
        return;
    }

    if (!software) {
        Swal.fire({
            title: 'Error',
            text: 'Please select your software.',
            icon: 'error'
        });
        return;
    }
    
    document.getElementById("myModal").style.display = "block";
    document.getElementById("download").href = "./minecraft/img/PaymentsQR.jpg";
}

document.getElementById('productcart').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageCheck = document.getElementById('image').files[0];
    if (!imageCheck) {
        Swal.fire({
            title: 'Error',
            text: 'Please upload receipt before submitting.',
            icon: 'error'
        });
        return;
    }

    function checkSubmissionLimit() {
        const currentDate = new Date().toLocaleDateString();
        const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');

        if (!lastSubmissionDate || lastSubmissionDate !== currentDate) {
            localStorage.setItem('submissionCount', '0');
            localStorage.setItem('lastSubmissionDate', currentDate);
        }

        let submissionCount = parseInt(localStorage.getItem('submissionCount')) || 0;

        if (submissionCount < 10) {
            localStorage.setItem('submissionCount', (submissionCount + 1).toString());
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            submitButton.value = 'Loading...';
            return true;
        } else {
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            Swal.fire({
                title: 'Error',
                text: 'You can only submit 10 times in a day.',
                icon: 'error'
            });
            submitButton.value = 'Try again later!';
            return false;
        }
    }

    if (!checkSubmissionLimit()) {
        return;
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
    formData.append('file', document.getElementById('image').files[0]); // Use 'file' for Discord attachment
    if (appliedCoupon) {
        formData.append('coupon', appliedCoupon);
    }

    const dedicatedIpStatus = document.getElementById('dedicatedip').checked ? '✅' : '❌';

    localStorage.setItem('NodeType', document.getElementById('nodetype').value);
    localStorage.setItem('Plan', document.getElementById('plan').value);
    localStorage.setItem('TotalPrice', totalPrice.toString());
    if (appliedCoupon) {
        localStorage.setItem('Coupon', appliedCoupon);
    }

    // Build addons section only for checked items
    let addonsSection = '';
    if (document.getElementById('proxy').checked) {
        addonsSection += '- ⭐ Proxy Setup ✅\n';
    }
    if (document.getElementById('geyser').checked) {
        addonsSection += '- ⭐ Geyser Setup ✅\n';
    }
    if (document.getElementById('optimize').checked) {
        addonsSection += '- ⭐ Optimize Setup ✅\n';
    }
    if (document.getElementById('custom-plugin').checked) {
        addonsSection += '- ⭐ Custom Plugin Setup ✅\n';
    }
    if (document.getElementById('anti-cheat').checked) {
        addonsSection += '- ⭐ Anti-Cheat Setup ✅\n';
    }
    if (document.getElementById('discord-integration').checked) {
        addonsSection += '- ⭐ Discord Integration Setup ✅\n';
    }

    const webhookURL = 'https://discord.com/api/webhooks/1362866859250290940/nJPvKOpDbH0OhFYLFa3GDQk_xvLTgHF8PHzMpmqP0yPwhRbFpAwtoYeTlRknkHqMUZw7';

    // Prepare the content for the webhook
    const content = `## <a:ONLINE:1269224793106944102> New Order Submit <@1243544313418485760>\n` +
                    `- *check merl bank bro eng merl lui jol nv nigga!*\n` +
                    `- **ber jol hz dak server oy ke tv** *__Information below__* <:pepeStare:1152428361717665886>\n\n` +
                    `# SUBMITE SERVER 🌾\n` +
                    `- 💌 Email: **${formData.get('email') || 'N/A'}**\n` +
                    `- 💟 Password: **${formData.get('password') || 'N/A'}**\n` +
                    `- 💙 Discord: **${formData.get('dcname') || 'none'}**\n\n` +
                    `> - 📗 Server Name: **${formData.get('servername') || 'N/A'}**\n` +
                    `> - 👑 Plan: **${formData.get('plan') || 'N/A'}**\n` +
                    `> - 🌐 Location: **${formData.get('location') || 'N/A'}**\n` +
                    `> - 🟢 Game Select: **${formData.get('gametype') || 'N/A'}**\n` +
                    `> - 🚀 Software: **${formData.get('software') || 'N/A'}**\n` +
                    `> - 🌌 Dedicated IP: **${dedicatedIpStatus}**\n\n` +
                    (addonsSection || '') +
                    (appliedCoupon ? `- 🎟️ Coupon: **${appliedCoupon}**\n\n` : '\n') +
                    `- 🧩 Price: **$${totalPrice - (coupons.find(c => c[0] === appliedCoupon)?.[1] || 0) * (totalPrice / 100).toFixed(2)} USD**\n` +
                    `-# Buy Data: ${BuyDate}`;

    // Send the webhook with both content and image in one request
    formData.append('payload_json', JSON.stringify({ content }));

    fetch(webhookURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Submitted Successfully',
                text: 'Please wait for the results; we will contact you via Telegram or Discord!',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                location.reload();
            });
        } else {
            throw new Error('Failed to send webhook');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Something went wrong!',
            icon: 'error'
        });
        document.getElementById('submit').disabled = false;
        document.getElementById('submit').value = 'Submit';
    });
});