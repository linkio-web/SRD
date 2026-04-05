# PROJECT_UPDATES

## 2026-04-05 — SEO implementation

### Résumé
Implémentation SEO complète : config centralisée, sitemap dynamique, robots.txt, Twitter cards, canonical + hreflang sur chaque page, JSON-LD enrichi.

### Fichiers créés
| Fichier | Description |
|---------|-------------|
| `src/lib/seo.ts` | Config SEO centralisée : `SITE_URL`, `buildAlternates()`, `socialMeta()`, `jsonLd()`, `allPages()` |
| `src/app/sitemap.ts` | Sitemap dynamique (27 URLs : 9 routes × 3 locales) avec priorités |
| `src/app/robots.ts` | robots.txt avec lien vers sitemap |

### Fichiers modifiés (9 pages)
| Fichier | Changement |
|---------|-----------|
| `src/app/[locale]/layout.tsx` | Import `seo.ts`. Metadata enrichie : `buildAlternates()`, `socialMeta()` (OG + Twitter), `jsonLd()` centralisé avec horaires, zone desservie. |
| `src/app/[locale]/page.tsx` | Ajout `alternates` + `socialMeta` (OG + Twitter cards) |
| `src/app/[locale]/services/page.tsx` | Idem |
| `src/app/[locale]/contact/page.tsx` | Idem |
| `src/app/[locale]/qui-sommes-nous/page.tsx` | Idem |
| `src/app/[locale]/politique-de-confidentialite/page.tsx` | Idem (+ OG ajouté, manquant avant) |
| `src/app/[locale]/services/comptabilite-fiscalite/page.tsx` | Idem |
| `src/app/[locale]/services/ressources-humaines/page.tsx` | Idem |
| `src/app/[locale]/services/gestion-administrative/page.tsx` | Idem |
| `src/app/[locale]/services/gestion-immobiliere/page.tsx` | Idem |

### Détails techniques
- **Canonical URLs** : chaque page a son canonical absolu (`https://www.srdpartners.ch/fr/services/...`)
- **Hreflang** : fr, en, pt + x-default → fr sur chaque page
- **Twitter cards** : `summary` card avec title + description sur chaque page
- **OpenGraph** : type, locale, siteName, title, description, url sur chaque page
- **JSON-LD** : enrichi avec `areaServed` (GeoCircle 100km), `openingHoursSpecification` (lun-ven 8h-18h), `priceRange`
- **Sitemap** : priorité 1.0 homepage, 0.9 services index, 0.7 autres ; changeFrequency weekly/monthly

### Vérifications
- `npx tsc --noEmit` → 0 erreur
- `npx next build` → succès, `/sitemap.xml` et `/robots.txt` générés statiquement

---

## 2026-04-05 — Production readiness cleanup

### Résumé
Nettoyage complet du codebase pour le déploiement en production : suppression des composants/assets inutilisés, validation i18n, optimisation SEO, vérification build.

### Fichiers supprimés (9 composants + 1 asset)
| Fichier | Raison |
|---------|--------|
| `src/components/ActivityDomainsSection.tsx` | Jamais importé |
| `src/components/ActivityCard.tsx` | Jamais importé |
| `src/components/Breadcrumb.tsx` | Jamais importé |
| `src/components/ExpertiseParallaxSection.tsx` | Jamais importé |
| `src/components/FeatureCard.tsx` | Jamais importé |
| `src/components/HomeParallax.tsx` | Jamais importé |
| `src/components/InfoCard.tsx` | Jamais importé |
| `src/components/ServiceCard.tsx` | Jamais importé |
| `src/components/TestimonialCard.tsx` | Jamais importé |
| `public/images/check-list.png` | Jamais référencé dans le code |

### Fichiers modifiés
| Fichier | Changement |
|---------|-----------|
| `src/lib/siteData.ts` | Suppression de `activityDomains` (inutilisé) et `socials` (placeholder `#`). |
| `src/messages/fr.json` | Suppression des sections `activity` et `imageBreak` (inutilisées). |
| `src/messages/en.json` | Idem. |
| `src/messages/pt.json` | Idem. |
| `src/components/Footer.tsx` | Suppression du bloc social icons et import `socials`. |
| `src/app/[locale]/qui-sommes-nous/page.tsx` | Stats réduites à 2 (retrait "4 experts" / "2 bureaux" incohérents). |
| `src/app/[locale]/layout.tsx` | Ajout `icons: { icon: '/NewLogoDR.svg' }` dans les metadata (favicon). |

### Vérifications effectuées
- **TypeScript** : `npx tsc --noEmit` → 0 erreur
- **Build** : `npx next build` → succès, toutes les pages générées statiquement
- **i18n** : FR/EN/PT structure identique, aucune clé manquante, aucune valeur vide
- **Contenu** : aucune mention de Genève/Lausanne, aucun lien `#`, aucun placeholder
- **Sécurité** : clés API dans `process.env`, pas de secrets exposés, `dangerouslySetInnerHTML` limité au JSON-LD et dataset attribute
- **SEO** : `generateMetadata` sur chaque page, favicon ajouté, OG tags, hreflang, JSON-LD
- **Accessibilité** : focus-visible, aria labels, alt text, heading hierarchy

---

## 2026-04-05 — Suppression du contenu placeholder et template

### Résumé
Nettoyage complet du contenu fictif : texte "À propos" remplacé par la version validée, localisation FAQ corrigée (Genève/Lausanne → Corcelles), liens sociaux placeholder supprimés, statistiques incohérentes retirées.

### Modifications

| Fichier | Changement |
|---------|-----------|
| `src/messages/fr.json` | `about.subtitle` + `missionTitle` + `missionP1` remplacés par le contenu validé. FAQ "rendez-vous" : Genève/Lausanne → Corcelles (NE). Clés `missionP2`/`missionP3` supprimées (non utilisées). |
| `src/messages/en.json` | Idem — traductions anglaises professionnelles. |
| `src/messages/pt.json` | Idem — traductions portugaises professionnelles. |
| `src/lib/siteData.ts` | `socials` vidé (toutes les entrées étaient `href: '#'`). |
| `src/components/Footer.tsx` | Bloc de rendu des icônes sociales supprimé. Import `socials` retiré. |
| `src/app/[locale]/qui-sommes-nous/page.tsx` | Stats réduites à 2 (15+ années, 200+ clients). Retrait des stats "4 experts" et "2 bureaux" qui contredisaient le contenu réel (1 contact, 1 adresse). |

### Vérifications
- `npx tsc --noEmit` → 0 erreur
- Aucune mention de Genève/Lausanne dans le code
- Aucun lien `#` restant
- i18n FR/EN/PT cohérent

## 2026-02-19 — Refactor Hero Overlay (premium multi-couche)

### Résumé
Remplacement de l'overlay hero plat (`.hero-building-fade` + `.hero-glow`) par un système unifié propre, reposant sur des tokens CSS.

### Fichiers modifiés
| Fichier | Changement |
|---------|-----------|
| `src/app/globals.css` | Ajout de `--primary-950-rgb` et `--primary-900-rgb` dans `:root`. Suppression de `.hero-building-fade` et `.hero-glow`. Remplacement par `.hero-overlay` (gradient multi-stop + radiale focale) et `.hero-bottom-fade` mis à jour avec `var()`. |
| `src/app/[locale]/page.tsx` | L3 renommée `.hero-overlay`, div L4 `.hero-glow` supprimée. |

### Architecture `.hero-overlay`
```css
/* Desktop : horizontal */
background:
  radial-gradient(ellipse 52% 75% at 16% 55%, primary-900@26%, transparent),
  linear-gradient(90deg, primary-950@95% → @90% → @75% → @40% → @10% → 0%);

/* Mobile : vertical */
background: linear-gradient(180deg, primary-950@72% → @58% → @72%);
```

---

## 2026-02-19 — Mise à jour des coordonnées officielles SRD Partners

### Résumé
Centralisation et mise à jour de toutes les coordonnées de contact selon les infos officielles confirmées.

### Infos appliquées
- **Contact principal :** Cremilde Hirschi — Administration · Finance · RH
- **Email :** cremilde.hirschi@srdpartners.ch
- **Téléphone :** +41 32 857 24 19
- **Adresse :** Les Vernets 2, 2035 Corcelles NE, Suisse
- **Site :** https://www.srdpartners.ch

### Fichiers modifiés

| Fichier | Changement |
|---------|-----------|
| `src/lib/siteData.ts` | Mise à jour de `contactInfo` : nouvel email, téléphone, site web, adresse unique (Corcelles NE). Ajout de `contact` (nom) et `role`. Suppression du bureau Lausanne. |
| `src/app/[locale]/layout.tsx` | Import de `contactInfo`. `metadataBase` pointe sur `contactInfo.website`. Ajout d'un bloc JSON-LD `AccountingService` (schema.org) avec adresse + téléphone + email + url. |
| `src/messages/fr.json` | Suppression de `contact.lausanneOfficeLabel`. Mise à jour de `footer.tagline`, `meta.homeTitle`, `meta.homeDescription`, `meta.contactDescription`. |
| `src/messages/en.json` | Idem + `brand.legal` aligné sur "SRD Partners Sàrl" + `meta.contactTitle` corrigé. |
| `src/messages/pt.json` | Idem. |
| `src/components/Footer.tsx` | `addressLabels` réduit à `[t.contact.mainOfficeLabel]` (1 seul bureau). |
| `src/app/[locale]/contact/page.tsx` | `addressLabels` réduit à `[t.contact.mainOfficeLabel]`. |

### Variables exportées (`siteData.ts`)

```ts
contactInfo.contact   // 'Cremilde Hirschi'
contactInfo.role      // 'Administration · Finance · RH'
contactInfo.email     // 'cremilde.hirschi@srdpartners.ch'
contactInfo.phone     // '+41 32 857 24 19'  (display)
contactInfo.website   // 'https://www.srdpartners.ch'
contactInfo.addresses[0].street  // 'Les Vernets 2'
contactInfo.addresses[0].city    // '2035 Corcelles NE'
```

> `href tel:` → utiliser `contactInfo.phone.replace(/\s/g, '')` → `+41328572419`

### Notes
- `contact.lausanneOfficeLabel` supprimé des 3 fichiers JSON et du code (clé inutilisée).
- Le JSON-LD est injecté une seule fois dans `[locale]/layout.tsx` (toutes les pages le reçoivent).
- TypeScript strict : `npx tsc --noEmit` → 0 erreur.
