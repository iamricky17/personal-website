document.addEventListener('DOMContentLoaded', function() {
    fetch('php/fetch_contacts.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debugging log
            if (data.error) {
                document.getElementById('contacts_container').innerHTML = `<p>${data.error}</p>`;
            } else {
                document.getElementById('contacts_container').innerHTML = `
                    <p>First Name: ${data.first_name}</p>
                    <p>Middle Name: ${data.middle_name}</p>
                    <p>Surname: ${data.surname}</p>
                    <p>Email: ${data.email}</p>
                    <p>Mobile: ${data.mobile}</p>
                    <p>Facebook: ${data.facebook}</p>
                    <p>Twitter: ${data.twitter}</p>
                    <p>Instagram: ${data.instagram}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching contact information:', error);
            document.getElementById('contacts_container').innerHTML = `<p>Error fetching contact information: ${error.message}</p>`;
        });
});
