# Cyrille Mani - Portfolio & Administration

Un site web moderne combinant un portfolio professionnel et une interface d'administration, construit avec les dernières technologies web.

## 🚀 Technologies Utilisées

### Frontend

- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TailwindCSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Lucide Icons** - Icônes vectorielles
- **next-themes** - Gestion du thème clair/sombre
- **react-scroll** - Navigation fluide
- **react-datepicker** - Sélection de dates
- **@react-pdf/renderer** - Génération de PDF

### État & Gestion des Données

- **TanStack Query** - Gestion de l'état et du cache
- **LocalStorage** - Persistance des données côté client
- **UUID** - Génération d'identifiants uniques

### Outils de Développement

- **ESLint** - Linting du code
- **Prettier** - Formatage du code
- **PostCSS** - Traitement CSS
- **date-fns** - Manipulation des dates

## 🎨 Design System

### Thème & Couleurs

- Système de couleurs HSL personnalisé
- Thème principal :
  - Primary: `#4A6670` (Bleu ardoise subtil)
  - Secondary: `#306073` (Bleu ardoise profond)
- Support du mode sombre/clair
- Transitions fluides entre les thèmes

### Typographie

- Police principale : Montserrat
- Hiérarchie typographique cohérente
- Support multi-langue (français)

### Composants UI

- Design système cohérent
- Composants réactifs et accessibles
- Animations subtiles et performantes

## 📱 Fonctionnalités

### Section Portfolio

1. **Page d'Accueil**

   - Hero section animée
   - Grille de fond dynamique
   - Navigation fluide
   - Appels à l'action

2. **Projets**

   - Galerie de projets
   - Filtrage par catégorie
   - Liens vers les démos et GitHub
   - Animations au défilement

3. **Services**

   - Présentation des services
   - Icônes thématiques
   - Design cards interactif

4. **Contact**
   - Formulaire de contact
   - Validation des champs
   - Sélection de services
   - Informations de contact

### Interface d'Administration

1. **Authentification**

   - Système de connexion sécurisé
   - Gestion des sessions
   - Protection des routes

2. **Gestion des Clients**

   - CRUD complet
   - Recherche et filtrage
   - Tri des données
   - Export PDF
   - Actions rapides (dupliquer, archiver)

3. **Gestion des Projets**

   - CRUD complet
   - Association avec les clients
   - Statuts personnalisables
   - Dates de début/fin
   - Génération de rapports PDF

4. **Interface Responsive**
   - Adaptation mobile/desktop
   - Sidebar rétractable
   - Navigation tactile
   - Tableaux adaptifs

### Fonctionnalités Globales

1. **Thème**

   - Basculement clair/sombre
   - Persistance des préférences
   - Transitions fluides

2. **Gestion des Cookies**

   - Bannière de consentement moderne
   - Stockage des préférences
   - Animations fluides

3. **Performance**

   - Optimisation des images
   - Chargement différé
   - Animations optimisées

4. **Accessibilité**
   - Support clavier
   - Labels ARIA
   - Contraste suffisant
   - Structure sémantique

## 🛠 Installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Construire pour la production
npm run build

# Lancer en production
npm start
```

## 📁 Structure du Projet

```
├── app/
│   ├── admin/
│   │   ├── clients/
│   │   └── projects/
│   ├── layout.js
│   └── page.js
├── components/
│   ├── admin/
│   │   └── shared/
│   ├── sections/
│   └── ui/
├── lib/
│   └── utils/
└── public/
```

## 🔧 Configuration

### Variables d'Environnement

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_API_URL=
```

### Personnalisation

- Modification des couleurs : `app/globals.css`
- Configuration Tailwind : `tailwind.config.js`
- Métadonnées : `app/layout.js`

## 📈 Performance

- Score Lighthouse : 90+ sur toutes les métriques
- Temps de chargement initial < 2s
- First Contentful Paint < 1s
- Time to Interactive < 3s

## 🔒 Sécurité

- Protection XSS
- En-têtes de sécurité
- Validation des données
- Sanitization des entrées

## 📱 Compatibilité

- Navigateurs modernes (2 dernières versions)
- iOS 12+
- Android 8+
- Responsive de 320px à 4K

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

MIT License - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails

## 👤 Contact

Cyrille Mani - [contact@cyrillemani.fr](mailto:contact@cyrillemani.fr)

---

Fait avec ❤️ par Cyrille Mani

# cyrille_website_v1
# cyrille-website-v1
