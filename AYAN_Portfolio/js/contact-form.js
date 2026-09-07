/**
 * AYAN HASAN : PERSONAL ENGINEERING PORTFOLIO
 * Contact Form & Email Composition Action Handlers
 */

(function () {
  'use strict';

  function showToast(message) {
    let toast = document.getElementById('toast-floating-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-floating-notice';
      toast.className = 'toast-floating-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  function initEmailActions() {
    const emailLinks = document.querySelectorAll('.js-email-action');
    const targetEmail = 'ayanhasan.nn@gmail.com';

    emailLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        showToast(`Opening email compose for ${targetEmail}...`);
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById('compact-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim() || 'Colleague / Enquirer';
      const email = document.getElementById('form-email')?.value.trim() || '';
      const category = document.getElementById('form-category')?.value || 'Engineering Enquiry';
      const message = document.getElementById('form-message')?.value.trim() || '';

      if (!message) {
        showToast('Please enter your enquiry message details.');
        return;
      }

      const subject = encodeURIComponent(`[${category}] Engineering Portfolio Enquiry : ${name}`);
      const body = encodeURIComponent(
        `Dear Ayan Hasan,\n\n` +
        `Name: ${name}\n` +
        `Sender Email: ${email}\n` +
        `Category: ${category}\n\n` +
        `Enquiry Details:\n${message}\n\n` +
        `Sent via Ayan Hasan Personal Engineering Portfolio`
      );

      showToast('Opening default email application...');
      window.location.href = `mailto:ayanhasan.nn@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initEmailActions();
    initContactForm();
  });
})();
