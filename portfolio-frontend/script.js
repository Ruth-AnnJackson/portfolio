
//Mobile menu toggle
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

//Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e){
        e.preventDefault();
        document
    
            .querySelector(this.getAttribute('href'))
            .scrollIntoView({behavior: 'smooth' });
            navLinks.classList.remove('show');

    });
});

//Contact form submisson
const form = document.querySelector('.contact-form');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const res = await fetch('https://portfolio-backend-dg6v.onrender.com/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        if (res.ok) {
        alert('Message sent successfully!');
        form.reset();
        } else {
        alert('Error sending message');
        }
    } catch (err) {
        alert('Server not reachable');
    }
});