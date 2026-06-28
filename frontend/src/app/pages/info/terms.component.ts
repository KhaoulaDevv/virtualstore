import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto px-6 py-16 animate-fade-in-up">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#5f7656] mb-4">Legal</p>
      <h1 class="text-4xl font-extrabold tracking-tight mb-4 text-[#17211a]">Terms of Service</h1>
      <p class="text-[#5f7656] mb-10">Last updated: April 2026</p>

      <div class="surface-panel rounded-lg p-6 md:p-8 space-y-8">
        <section>
          <h2 class="text-xl font-extrabold text-[#17211a] mb-3">1. Agreement to Terms</h2>
          <p class="text-[#3f4f3d] leading-relaxed">
            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-extrabold text-[#17211a] mb-3">2. Intellectual Property</h2>
          <p class="text-[#3f4f3d] leading-relaxed">
            The service and its original content, features, and functionality remain the exclusive property of Star and its licensors.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-extrabold text-[#17211a] mb-3">3. User Accounts</h2>
          <p class="text-[#3f4f3d] leading-relaxed">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-extrabold text-[#17211a] mb-3">4. Limitation of Liability</h2>
          <p class="text-[#3f4f3d] leading-relaxed">
            Star is not liable for indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the service.
          </p>
        </section>
      </div>
    </div>
  `
})
export class TermsComponent {}
