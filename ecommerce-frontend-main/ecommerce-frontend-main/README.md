# Rapport de Projet : Ecommerce-Frontend

## Vue d'ensemble du Projet

**Nom du Projet :** Ecommerce-Frontend  
**Version :** 0.0.0  
**Date :** 13 mai 2026  
**Auteur :** [Votre Nom]  
**Description :**  
Ce projet est une application front-end e-commerce développée avec Angular. Il s'agit d'une plateforme de commerce électronique permettant aux utilisateurs de naviguer, sélectionner des produits, gérer leur panier, passer des commandes et accéder à un tableau de bord d'administration. L'application est conçue pour être responsive, sécurisée et optimisée pour les performances.

## Objectifs du Projet

- Fournir une interface utilisateur intuitive pour l'achat en ligne.
- Implémenter des fonctionnalités d'authentification et d'autorisation.
- Gérer les paniers d'achat et les commandes.
- Offrir un tableau de bord d'administration pour la gestion des produits et des utilisateurs.
- Assurer une expérience utilisateur fluide avec des notifications (toast) et une navigation responsive.

## Fonctionnalités Principales

### Pour les Utilisateurs
- **Page d'accueil :** Affichage des produits en vedette.
- **Authentification :** Connexion et inscription des utilisateurs.
- **Gestion du Panier :** Ajout, suppression et modification des articles dans le panier.
- **Passage de Commande :** Processus de checkout sécurisé.
- **Historique des Commandes :** Consultation des commandes passées.
- **Détails des Produits :** Pages individuelles pour chaque produit avec descriptions et images.

### Pour les Administrateurs
- **Tableau de Bord :** Gestion des produits, utilisateurs et commandes.
- **Gardes d'Accès :** Protection des routes administratives avec des gardes Angular.

### Fonctionnalités Techniques
- **Intercepteurs :** Gestion automatique des tokens d'authentification.
- **Services :** Couches de services pour l'authentification, les produits, les paniers, les commandes et les notifications.
- **Modèles :** Structures de données TypeScript pour les utilisateurs, produits, paniers et commandes.
- **Composants Réutilisables :** Navbar et composants de toast pour une cohérence UI.

## Technologies Utilisées

- **Framework :** Angular 21.1.0
- **Langage :** TypeScript 5.9.2
- **Styling :** TailwindCSS 4.2.4
- **SSR (Server-Side Rendering) :** @angular/ssr 21.1.0 pour l'optimisation SEO et les performances.
- **Tests :** Vitest 4.0.8 pour les tests unitaires.
- **Build :** Angular CLI 21.1.0
- **Dépendances Clés :**
  - RxJS pour la programmation réactive.
  - Express pour le serveur SSR.
  - PostCSS et TailwindCSS pour le styling.

## Installation et Configuration

### Prérequis
- Node.js (version recommandée : 20.x ou supérieure)
- npm (version 11.6.2 ou supérieure)
- Angular CLI installé globalement : `npm install -g @angular/cli`

### Étapes d'Installation
1. Cloner le dépôt :
   ```bash
   git clone [URL du dépôt]
   cd ecommerce-frontend
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Configurer les environnements :
   - Modifier `src/environments/environment.ts` pour l'environnement de développement.
   - Modifier `src/environments/environment.prod.ts` pour la production.

## Utilisation

### Démarrage du Serveur de Développement
```bash
npm start
```
L'application sera accessible à `http://localhost:4200`. Elle se rechargera automatiquement lors des modifications.

### Construction pour la Production
```bash
npm run build
```
Les artefacts de build seront stockés dans le dossier `dist/`.

### Serveur SSR
```bash
npm run serve:ssr:ecommerce-frontend
```

## Structure du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          # Barre de navigation
│   │   └── toast/           # Notifications toast
│   ├── guards/
│   │   ├── admin.guard.ts   # Garde pour les routes admin
│   │   └── auth.guard.ts    # Garde pour l'authentification
│   ├── interceptors/
│   │   └── auth.interceptor.ts  # Intercepteur pour les tokens
│   ├── models/
│   │   ├── cart.model.ts    # Modèle du panier
│   │   ├── order.model.ts   # Modèle des commandes
│   │   ├── product.model.ts # Modèle des produits
│   │   └── user.model.ts    # Modèle des utilisateurs
│   ├── pages/
│   │   ├── admin/           # Pages d'administration
│   │   ├── cart/            # Page du panier
│   │   ├── checkout/        # Page de checkout
│   │   ├── home/            # Page d'accueil
│   │   ├── login/           # Page de connexion
│   │   ├── orders/          # Historique des commandes
│   │   ├── product-detail/  # Détails des produits
│   │   └── register/        # Page d'inscription
│   ├── services/
│   │   ├── auth.service.ts      # Service d'authentification
│   │   ├── cart.service.ts      # Service du panier
│   │   ├── order.service.ts     # Service des commandes
│   │   ├── product.service.ts   # Service des produits
│   │   └── toast.service.ts     # Service des notifications
│   ├── app.config.ts        # Configuration de l'application
│   ├── app.routes.ts        # Routes de l'application
│   └── app.ts               # Composant racine
├── environments/            # Configurations d'environnement
├── styles.css et styles.scss # Styles globaux
└── main.ts                  # Point d'entrée
```

## Tests

### Tests Unitaires
```bash
npm test
```
Utilise Vitest pour exécuter les tests unitaires.

### Tests End-to-End (E2E)
Actuellement non configuré. Pour ajouter des tests E2E, installer un framework comme Cypress ou Playwright.

## Déploiement

- **Développement :** Utiliser `ng serve` pour le développement local.
- **Production :** Construire avec `ng build --configuration production` et déployer les fichiers dans `dist/` sur un serveur web ou une plateforme cloud comme Azure, AWS ou Vercel.
- **SSR :** Pour le rendu côté serveur, utiliser `npm run serve:ssr:ecommerce-frontend` ou déployer sur des plateformes supportant Node.js.

## Sécurité

- Authentification basée sur des tokens JWT (via intercepteur).
- Gardes de route pour protéger les accès sensibles.
- Validation des formulaires côté client.

## Performance

- Utilisation d'Angular SSR pour améliorer le SEO et les temps de chargement initiaux.
- Lazy loading des modules pour optimiser les bundles.
- Optimisations TailwindCSS pour des styles légers.

## Améliorations Futures

- Ajout de tests E2E.
- Intégration avec un backend API (par exemple, Laravel comme dans le projet associé).
- Implémentation de paiements en ligne (Stripe, PayPal).
- Ajout de fonctionnalités comme les avis produits et les notifications push.

## Contributeurs

- [Votre Nom] - Développeur principal

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

*Rapport généré automatiquement le 13 mai 2026.*
