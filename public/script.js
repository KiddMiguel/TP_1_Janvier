document.addEventListener('DOMContentLoaded', function() {
    fetch('/technologies')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('technologies-list');
        data.forEach(tech => {
            const actionLink = document.createElement('a');
            actionLink.href = `/commentaire/${tech.id}`; 
            actionLink.textContent = tech.nom;
            list.appendChild(actionLink);
        });
    })
    .catch(err => console.error(err));
});



document.addEventListener('DOMContentLoaded', function() {
    fetch('/utilisateur')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const usersList = document.getElementById('users-list');
      usersList.innerHTML = ''; 
  
      data.forEach((user, index) => {
        const row = usersList.insertRow();
        
        const cellId = row.insertCell(0);
        const cellFirstName = row.insertCell(1);
        const cellLastName = row.insertCell(2);
        const cellHandle = row.insertCell(3);
        const actionCell = row.insertCell();

        cellId.textContent = user.id;
        cellFirstName.textContent = user.nom; 
        cellLastName.textContent = user.prenom; 
        cellHandle.textContent = user.email; 
    
        const actionLink = document.createElement('a');
        const actionLinkDelete = document.createElement('a');

        actionLink.href = `/utilisateur/${user.id}`; 
        actionLink.textContent = 'Voir';
        actionCell.appendChild(actionLink);


        
        const separateur = document.createTextNode(' | ');
        actionCell.appendChild(separateur); 

        actionLinkDelete.href = `/utilisateur/${user.id}`; 
        actionLinkDelete.textContent = 'Supprimer';
        actionCell.appendChild(actionLinkDelete);

        actionLinkDelete.onclick = function(e) {
            e.preventDefault();
            if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
                fetch(this.href, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            window.location.reload();
                        } else {
                            console.error('Erreur lors de la suppression');
                        }
                    }).catch(error => console.error('Erreur:', error));
            }
        };

    });
    })
    .catch(err => {
      console.log(err);
    });
  });
  
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        mdp: formData.get('mdp')
    };
    
    fetch('/utilisateur/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});