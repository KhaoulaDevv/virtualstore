import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="max-w-6xl mx-auto px-6 py-16 animate-fade-in-up">
      <div class="grid lg:grid-cols-2 gap-10">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#5f7656] mb-4">Contact</p>
          <h1 class="text-4xl font-extrabold tracking-tight mb-4 text-[#17211a]">Get in touch</h1>
          <p class="text-[#5f7656] mb-10 text-lg">Questions about products, orders, or the project? Send a message and we will get back to you.</p>

          <div class="space-y-5">
            <div class="surface-panel rounded-lg p-5 flex gap-4">
              <div class="w-11 h-11 bg-[#edf7df] rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#17211a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h3 class="font-extrabold text-[#17211a]">Chat with us</h3>
                <p class="text-[#5f7656] mt-1">hello&#64;star.store</p>
              </div>
            </div>

            <div class="surface-panel rounded-lg p-5 flex gap-4">
              <div class="w-11 h-11 bg-[#edf7df] rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#17211a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <h3 class="font-extrabold text-[#17211a]">Visit us</h3>
                <p class="text-[#5f7656] mt-1">Fes, Morocco</p>
              </div>
            </div>
          </div>
        </div>

        <div class="surface-panel rounded-lg p-8">
          @if (isSubmitted()) {
            <div class="text-center py-12 animate-fade-in-up">
              <div class="w-16 h-16 bg-[#17211a] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-[#c8f269]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 class="text-2xl font-extrabold text-[#17211a] mb-2">Message sent</h3>
              <p class="text-[#5f7656] mb-8">Thanks for reaching out. We will get back to you shortly.</p>
              <button (click)="isSubmitted.set(false)" class="text-sm font-bold text-[#17211a] hover:underline">
                Send another message
              </button>
            </div>
          } @else {
            <form (submit)="onSubmit($event)" class="space-y-5">
              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-bold text-[#3f4f3d] mb-2">First name</label>
                  <input type="text" required class="field-control w-full px-4 py-3 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-sm font-bold text-[#3f4f3d] mb-2">Last name</label>
                  <input type="text" required class="field-control w-full px-4 py-3 rounded-lg text-sm">
                </div>
              </div>
              <div>
                <label class="block text-sm font-bold text-[#3f4f3d] mb-2">Email</label>
                <input type="email" required class="field-control w-full px-4 py-3 rounded-lg text-sm">
              </div>
              <div>
                <label class="block text-sm font-bold text-[#3f4f3d] mb-2">Message</label>
                <textarea rows="4" required class="field-control w-full px-4 py-3 rounded-lg text-sm resize-none"></textarea>
              </div>
              <button type="submit" class="w-full py-3.5 btn-primary text-sm font-bold uppercase tracking-wider rounded-lg">
                Send message
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  readonly isSubmitted = signal(false);

  onSubmit(e: Event): void {
    e.preventDefault();
    this.isSubmitted.set(true);
  }
}
