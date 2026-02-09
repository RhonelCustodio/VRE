import { submitContactMessage } from '../lib/database';
import type { ContactMessage } from '../lib/types';

export function initContactForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const message: ContactMessage = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const success = await submitContactMessage(message);

    if (success) {
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    } else {
      alert('Sorry, there was an error sending your message. Please try again.');
    }

    submitButton.disabled = false;
    submitButton.textContent = originalText || 'Send Message';
  });
}
