const currencySelect = document.getElementById('currencySelect');
const webhookUrl = 'https://discord.com/api/webhooks/1290638491889438804/8ctrgsn-7ClybPIn6FRJbXvEyqDIJfmaPyjhjUG5GSNNTeKfMmETVjcoAAsJVrV2vTbK';

let isBoosterAvailable = true;

function showAlert(message, isError = true) {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    alertBox.style.color = isError ? '#FF073A' : '#39FF14';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

function updateBoosterStatus() {
    const boosterStatus = document.getElementById('boosterStatus');
    if (isBoosterAvailable) {
        boosterStatus.textContent = "Booster: idk (Disponible)";
        boosterStatus.style.color = "#39FF14";
    } else {
        boosterStatus.textContent = "Booster: idk (Indisponible)";
        boosterStatus.style.color = "#FF073A";
    }
}

async function sendToDiscord(data) {
    const embedData = {
        embeds: [
            {
                title: "Demande de boost",
 description: `Nom Discord: ${data.discordName}\n\nNom Fortnite: ${data.fortniteName}\n\nRank: ${data.rank}\n\nPrice: ${data.currency === 'eur' ? 'EUR' : 'CAD'}`,
                color: 0x00FF00
            }
        ]
    };

    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(embedData),
    });

    if (!response.ok) {
        showAlert("Erreur lors de l'envoi du formulaire.", true);
    }
}

function validateForm(event) {
    event.preventDefault();

    const discordName = document.getElementById('discordName').value;
    const fortniteName = document.getElementById('fortniteName').value;
    const rank = document.getElementById('rank').value;

    if (!discordName || !fortniteName || !rank) {
        showAlert("Veuillez remplir tous les champs requis.", true);
        return;
    }

    const currency = currencySelect.value;
    sendToDiscord({ discordName, fortniteName, rank, currency });
    showAlert("Votre demande a été envoyée avec succès !", false);
    document.getElementById('requestForm').reset();
}

document.getElementById('requestForm').addEventListener('submit', validateForm);
updateBoosterStatus();