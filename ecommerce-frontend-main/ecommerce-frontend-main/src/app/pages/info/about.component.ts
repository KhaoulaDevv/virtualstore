import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="max-w-6xl mx-auto px-6 py-16 animate-fade-in-up">
      <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center mb-16">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#5f7656] mb-4">About Star</p>
          <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#17211a]">A calmer way to shop essentials.</h1>
          <p class="text-lg text-[#5f7656] leading-relaxed">
            Star is built around focused choice: a compact catalog, clear product details, and a shopping flow that feels polished without getting noisy.
          </p>
        </div>

        <div class="surface-panel rounded-lg p-6 md:p-8">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#5f7656] mb-4">Our story</p>
          <div class="space-y-5">
            <div class="border-l-4 border-[#c8f269] pl-5">
              <h2 class="text-xl font-extrabold text-[#17211a] mb-1">Made for everyday shopping</h2>
              <p class="text-sm text-[#5f7656]">Star keeps the store simple so customers can browse, compare, and order without confusion.</p>
            </div>

            <div class="border-l-4 border-[#f2d7c3] pl-5">
              <h2 class="text-xl font-extrabold text-[#17211a] mb-1">Clear product choices</h2>
              <p class="text-sm text-[#5f7656]">Each product has the details that matter: price, category, stock, image, and description.</p>
            </div>

            <div class="border-l-4 border-[#dceacb] pl-5">
              <h2 class="text-xl font-extrabold text-[#17211a] mb-1">Built as a full project</h2>
              <p class="text-sm text-[#5f7656]">The shop connects a real Angular frontend with a Spring Boot backend for catalog, cart, and orders.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4 mb-16">
        <div class="surface-panel rounded-lg p-6">
          <h2 class="text-xl font-extrabold text-[#17211a] mb-2">Customer first</h2>
          <p class="text-[#5f7656]">The interface is designed to make shopping feel easy and direct.</p>
        </div>
        <div class="surface-panel rounded-lg p-6">
          <h2 class="text-xl font-extrabold text-[#17211a] mb-2">Organized catalog</h2>
          <p class="text-[#5f7656]">Products are grouped and presented cleanly so the store is easy to manage.</p>
        </div>
        <div class="surface-panel rounded-lg p-6">
          <h2 class="text-xl font-extrabold text-[#17211a] mb-2">Modern stack</h2>
          <p class="text-[#5f7656]">The project uses Angular for the shop experience and Spring Boot for the API.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div class="soft-panel rounded-lg p-6">
          <h3 class="text-3xl font-extrabold text-[#17211a] mb-1">50K+</h3>
          <p class="text-xs text-[#5f7656] uppercase tracking-wider font-bold">Customers</p>
        </div>
        <div class="soft-panel rounded-lg p-6">
          <h3 class="text-3xl font-extrabold text-[#17211a] mb-1">99%</h3>
          <p class="text-xs text-[#5f7656] uppercase tracking-wider font-bold">Satisfaction</p>
        </div>
        <div class="soft-panel rounded-lg p-6">
          <h3 class="text-3xl font-extrabold text-[#17211a] mb-1">24/7</h3>
          <p class="text-xs text-[#5f7656] uppercase tracking-wider font-bold">Support</p>
        </div>
        <div class="soft-panel rounded-lg p-6">
          <h3 class="text-3xl font-extrabold text-[#17211a] mb-1">100+</h3>
          <p class="text-xs text-[#5f7656] uppercase tracking-wider font-bold">Brands</p>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}
