import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    
    // Show loading spinner
    const showLoading = () => loading.style.display = 'flex';
    // Hide loading spinner
    const hideLoading = () => loading.style.display = 'none';

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Handle reservation form submission
    const reservationForm = document.getElementById('reservationForm');
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();

        const reservation = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            phone: document.getElementById('phone').value,
            guests: Number(document.getElementById('guests').value),
            notes: document.getElementById('notes').value
        };

        try {
            const result = await backend.makeReservation(reservation);
            if ('ok' in result) {
                alert('Reservation confirmed! We look forward to serving you.');
                reservationForm.reset();
            } else {
                alert('Error making reservation. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error making reservation. Please try again.');
        } finally {
            hideLoading();
        }
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('message').value;

        try {
            const result = await backend.submitContact(name, email, message);
            if ('ok' in result) {
                alert('Message sent successfully! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Error sending message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        } finally {
            hideLoading();
        }
    });
});
