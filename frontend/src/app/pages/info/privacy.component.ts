import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto px-6 py-16 animate-fade-in-up">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#5f7656] mb-4">Legal</p>
      <h1 class="text-4xl font-extrabold tracking-tight mb-4 text-[#17211a]">Privacy Policy</h1>
      <p class="text-[#5f7656] mb-10">Last updated: April 2026</p>

      <div class="surface-panel rounded-lg p-6 md:p-8 space-y-8">
        <section>
          <h2 class="text-xl font-extrabold text-[#17211a] mb-3">Information Collection</h2>
          <p class="text-[#3f4f3d] leading-relaxed">
            We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, phone number, shipping address, and payment information.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-extrabold text-[#17211a] mb-3">Use of Information</h2>
          <p class="text-[#3f4f3d] leading-relaxed">
            We use the information we collect to process your transactions, maintain your account, respond to your comments and questions, and provide customer service.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-extrabold text-[#17211a] mb-3">Data Security</h2>
          <p class="text-[#3f4f3d] leading-relaxed">
            We implement appropriate technical and organizational security measures designed to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-extrabold text-[#17211a] mb-3">Cookies</h2>
          <p class="text-[#3f4f3d] leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our service and hold certain information.
          </p>
        </section>
      </div>
    </div>
  `
})
export class PrivacyComponent {}
