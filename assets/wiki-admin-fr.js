(() => {
  document.documentElement.lang = 'fr';
  document.title = 'Administration du wiki Cobblemon Realms';

  const params = new URLSearchParams(location.search);
  const currentTab = params.get('tab') || 'overview';

  const tabLabels = {
    overview: '🏠 Vue d’ensemble', pages: '📄 Pages', 'to-review': '✅ À vérifier', inspector: '🔬 Inspecteur de page',
    stats: '📊 Statistiques', feedback: '👍 Retours', audit: '🧪 Audit', taxonomy: '🧬 Santé de la taxonomie',
    readiness: '🚦 Préparation de la release', 'translation-drift': '🌍 Synchronisation EN / FR',
    'search-quality': '🎯 Qualité de la recherche', badges: '🏷️ Badges', redirects: '🔀 Redirections',
    synonyms: '🔎 Synonymes de recherche', logs: '📜 Journaux', maintenance: '⚙️ Maintenance', security: '🔐 Sécurité'
  };

  const groups = [
    ['Tableau de bord', ['overview']],
    ['Contenu', ['pages', 'to-review', 'inspector']],
    ['Analyse', ['stats', 'feedback', 'audit', 'taxonomy', 'readiness', 'translation-drift', 'search-quality']],
    ['Configuration', ['badges', 'redirects', 'synonyms']],
    ['Système', ['logs', 'maintenance', 'security']]
  ];

  const help = {
    overview: ['Vue d’ensemble', 'Résumé de l’état du wiki. Cette page regroupe la santé générale, les éléments prioritaires, les prochains contrôles et la préparation de la prochaine release. Elle ne modifie rien à elle seule.'],
    pages: ['Pages', 'Catalogue de toutes les pages indexées. Utilise les filtres pour retrouver une page par langue, statut, badge, retour utilisateur ou recherche. Les actions permettent d’ouvrir la page publique, ses métadonnées ou ses retours.'],
    'to-review': ['À vérifier', 'File de maintenance priorisée. Le score combine les retours, le statut, l’ancienneté et le trafic. Marquer une page « OK 30 / 60 / 90 jours » reporte simplement son prochain contrôle, sans modifier son contenu, ses badges ni son statut public.'],
    inspector: ['Inspecteur de page', 'Vue complète d’une page : trafic, retours, statut, badges, filtres, taxonomie, versions, audit et pages liées. Les topics servent uniquement à améliorer les relations entre pages. Modifier ces champs ne modifie pas le Markdown.'],
    stats: ['Statistiques', 'Analyse des données anonymes agrégées : pages vues, recherches, recherches sans résultat, 404, clics externes et retours négatifs. Ces données servent à savoir quoi améliorer en priorité.'],
    feedback: ['Retours utilisateurs', 'Centralise les votes et commentaires laissés sur les articles. « Lu » garde le retour visible dans le suivi, « Résolu » indique qu’il a été traité et « Archiver » le retire de la file active. La suppression définitive reste réservée au propriétaire.'],
    audit: ['Audit du wiki', 'Contrôles générés pendant le build : liens internes cassés, pages orphelines, traductions manquantes, images absentes, sources Markdown, métadonnées et qualité éditoriale légère. L’audit signale des problèmes, il ne corrige rien automatiquement.'],
    taxonomy: ['Santé de la taxonomie', 'Contrôle la cohérence des topics internes utilisés pour proposer les « Pages liées ». Les alertes concernent les pages sans topic, les topics isolés, inconnus, trop nombreux ou incohérents avec leur rubrique.'],
    readiness: ['Préparation de la release', 'Score opérationnel de 0 à 100 qui combine audit, traductions, pages à vérifier, retours actifs et intégrité des redirections. C’est un indicateur de préparation, pas une validation automatique de sortie.'],
    'translation-drift': ['Synchronisation EN / FR', 'Compare les dates Git des pages anglaises et françaises correspondantes. Un écart important indique qu’une comparaison manuelle est utile. Cela ne signifie pas automatiquement que la version la plus ancienne est incorrecte.'],
    'search-quality': ['Qualité de la recherche', 'Mesure sur 30 jours les recherches stables, les clics sur résultats et les recherches sans résultat. La liste des échecs permet d’identifier les termes à couvrir, les synonymes à ajouter ou les pages difficiles à trouver.'],
    badges: ['Badges et métadonnées', 'Gère les statuts, badges et filtres via D1 sans modifier les fichiers Markdown. Désactiver un badge est préférable à sa suppression. Vérifie toujours son nombre d’utilisations avant un changement important.'],
    redirects: ['Redirections', 'Crée des redirections HTTP 308 pour les anciennes URLs. Une ancienne URL ne doit pas être une page encore active et la destination doit pointer vers une page valide. Les paramètres d’URL sont conservés. La santé des redirections détecte aussi les destinations manquantes, chaînes et boucles.'],
    synonyms: ['Synonymes de recherche', 'Ajoute des synonymes dynamiques utilisés par la recherche publique. Cela permet de faire correspondre des termes employés par les visiteurs avec le vocabulaire du wiki sans modifier toutes les pages.'],
    logs: ['Journaux administrateur', 'Historique des actions importantes effectuées dans l’admin : métadonnées, badges, vérifications, retours et configuration. Les simples ouvertures de l’admin ne sont pas enregistrées afin de garder un journal utile.'],
    maintenance: ['Maintenance', 'Informations techniques sur le stockage D1, les audits, les métadonnées et les mécanismes de maintenance. Cette page sert surtout à vérifier le fonctionnement de l’infrastructure.'],
    security: ['Sécurité', 'Zone réservée au propriétaire. Elle rappelle les protections attendues pour les routes admin, les mutations API, les comptes autorisés et les secrets. Les wiki managers ne doivent pas accéder aux actions sensibles.']
  };

  const exact = new Map(Object.entries({
    'Dashboard':'Tableau de bord','Content':'Contenu','Insights':'Analyse','System':'Système','Release':'Release',
    'Overview':'Vue d’ensemble','To Review':'À vérifier','Stats':'Statistiques','Feedback':'Retours','Logs':'Journaux','Security':'Sécurité',
    'Page Inspector':'Inspecteur de page','Taxonomy Health':'Santé de la taxonomie','Redirects':'Redirections','Search Synonyms':'Synonymes de recherche',
    'Release Readiness':'Préparation de la release','Translation Drift':'Synchronisation EN / FR','Search Quality':'Qualité de la recherche',
    'Protected admin console.':'Console d’administration protégée.','Open wiki':'Ouvrir le wiki','Refresh':'Actualiser',
    'Wiki Health':'Santé du wiki','Needs attention':'À surveiller','Next reviews':'Prochains contrôles','Health breakdown':'Détail de la santé','Open Audit':'Ouvrir l’audit','Pages needing attention':'Pages à vérifier',
    'all suggestions':'toutes les suggestions','Critical':'Critique','High':'Élevé','OK for now':'OK pour le moment','scheduled':'planifié','Scheduled':'Planifié','Recently reviewed':'Vérifié récemment',
    'Bulk review':'Vérification groupée','Preview selected':'Prévisualiser la sélection','Select':'Sélection','Priority':'Priorité','Signals':'Signaux','Open':'Ouvrir',
    'First':'Première','Previous':'Précédente','Next':'Suivante','Last':'Dernière','All statuses':'Tous les statuts','All badges':'Tous les badges','All feedback':'Tous les retours','Negative feedback':'Retours négatifs','Open comments':'Commentaires actifs','Apply':'Appliquer','Reset':'Réinitialiser','Language':'Langue',
    'Helpful votes':'Votes utiles','Needs work':'À améliorer','Active comments':'Commentaires actifs','Archived comments':'Commentaires archivés','Article feedback':'Retours sur les articles','Active feedback comments':'Commentaires actifs','Archived cleanup':'Nettoyage des archives','Purge archived':'Purger les archives',
    'Votes':'Votes','Score':'Score','Latest active feedback':'Dernier retour actif','Actions':'Actions','Comments':'Commentaires','Reason':'Raison','Comment':'Commentaire','Status':'Statut','Handled':'Traitement','Moderation':'Modération','Read':'Lu','Resolved':'Résolu','Archive':'Archiver','Restore':'Restaurer','Delete permanently':'Supprimer définitivement',
    'Outdated':'Obsolète','Missing info':'Information manquante','Unclear':'Peu clair','Broken link':'Lien cassé','Other':'Autre','Not specified':'Non précisé',
    'Pageviews':'Pages vues','Zero-result searches':'Recherches sans résultat','404 hits':'Erreurs 404','Outbound clicks':'Clics externes','Exact zero terms':'Termes sans résultat','Tracked pages':'Pages suivies','Search telemetry':'Télémétrie recherche',
    'Most viewed pages':'Pages les plus consultées','Search conversion':'Conversion de recherche','Searches with no result':'Recherches sans résultat','Frequent 404s':'404 fréquentes','External link clicks':'Clics sur liens externes','Traffic by language':'Trafic par langue','Traffic by page status':'Trafic par statut de page',
    'Views':'Vues','Last activity':'Dernière activité','Search':'Recherche','Category':'Catégorie','Count':'Nombre','Last seen':'Dernière occurrence','Query':'Requête','Stable searches':'Recherches stables','Result clicks':'Clics sur résultat','Conversion':'Conversion','Requested path':'Chemin demandé','Hits':'Occurrences','Destination':'Destination','Source page':'Page source','Clicks':'Clics','Negative in period':'Négatifs sur la période','Lifetime quality':'Qualité globale','Open items':'Éléments actifs','Share':'Part',
    'Links':'Liens','Translations':'Traductions','Sources & Metadata':'Sources et métadonnées','Broken destinations':'Destinations cassées','Orphan pages':'Pages orphelines','Malformed external':'Liens externes invalides','Missing images':'Images manquantes','Broken internal destinations':'Destinations internes cassées','References':'Références','Referenced by':'Référencé par','Severity':'Sévérité',
    'English pages':'Pages anglaises','French pages':'Pages françaises','Coverage':'Couverture','Missing pairs':'Paires manquantes','Missing French page':'Page française manquante','Missing English page':'Page anglaise manquante','English page':'Page anglaise','French page':'Page française','Expected FR path':'Chemin FR attendu','Expected EN path':'Chemin EN attendu',
    'Content completeness warnings':'Alertes de complétude du contenu','Check':'Contrôle','Value':'Valeur','Generated pages without source':'Pages générées sans source','Expected source':'Source attendue','Markdown without generated page':'Markdown sans page générée','Metadata integrity':'Intégrité des métadonnées','Type':'Type','Rule':'Règle','Missing local images':'Images locales manquantes','Image':'Image','Warnings':'Avertissements','Info':'Information','Generated':'Généré',
    'Edit page options':'Modifier les options de page','Choose page':'Choisir une page','Load page':'Charger la page','Filters':'Filtres','Save page override':'Enregistrer les options','Create or update badge':'Créer ou modifier un badge','Edit existing badge':'Modifier un badge existant','Load badge':'Charger le badge','Badge key':'Clé du badge','Label FR':'Libellé FR','Label EN':'Libellé EN','Icon':'Icône','Color':'Couleur','Active':'Actif','Disabled':'Désactivé','Save badge definition':'Enregistrer le badge','Dynamic badges':'Badges dynamiques','Key':'Clé','Labels':'Libellés','Usage':'Utilisation','Action':'Action','Edit':'Modifier',
    'Global':'Global','Badges & Metadata':'Badges et métadonnées','Reviews':'Vérifications','No log in this category.':'Aucun journal dans cette catégorie.','Owner-only Security':'Sécurité réservée au propriétaire',
    'Deploy Health':'Santé du déploiement','Healthy':'Sain','No deploy regression alert.':'Aucune régression de déploiement détectée.',
    'Pages without topics':'Pages sans topic','Single-use topics':'Topics utilisés une seule fois','Unknown topics':'Topics inconnus','Family outliers':'Anomalies de rubrique','needs classification':'classification nécessaire','review usefulness':'utilité à vérifier','not in definitions':'absents des définitions','possible mismatch':'incohérence possible','Broad-only classification':'Classification trop générique','Over-tagged pages':'Pages avec trop de topics','Topic usage':'Utilisation des topics','Inspect':'Inspecter',
    'Topics & versions':'Topics et versions','Edit taxonomy & versions':'Modifier la taxonomie et les versions','Introduced':'Introduit','Updated':'Mis à jour','Removed':'Retiré','Save topics & versions':'Enregistrer topics et versions','Saving…':'Enregistrement…','Saved ✓':'Enregistré ✓',
    'Helpful':'Utile','Active feedback':'Retours actifs','Badges & status':'Badges et statut','Related Pages preview':'Aperçu des pages liées','Audit flags':'Signaux d’audit','Orphan':'Orpheline','Yes':'Oui','No':'Non','Content warnings':'Alertes de contenu','Broken destinations from this page':'Destinations cassées depuis cette page','Translation flags':'Alertes de traduction','Redirects pointing here':'Redirections vers cette page',
    'Redirect Manager':'Gestionnaire de redirections','Create / update redirect':'Créer ou modifier une redirection','Old path':'Ancien chemin','Save redirect':'Enregistrer la redirection','404 candidates':'Candidats issus des 404','Create redirect':'Créer une redirection','Redirect Health':'Santé des redirections','Missing targets':'Destinations manquantes','Chains':'Chaînes','Missing destinations':'Destinations manquantes','Detected loops':'Boucles détectées',
    'Create / update synonym':'Créer ou modifier un synonyme','Term':'Terme','Aliases':'Alias','Save synonym':'Enregistrer le synonyme',
    'Readiness':'Préparation','Critical audit':'Audit critique','Translation drift':'Décalage de traduction','Open feedback':'Retours actifs','Release status':'État de la release','Translation readiness':'État des traductions','Redirect readiness':'État des redirections','Search readiness':'État de la recherche','Open Translation Drift':'Ouvrir la synchronisation EN / FR','Open Redirect Manager':'Ouvrir les redirections','Open Search Quality':'Ouvrir la qualité de recherche','Open Release Readiness':'Ouvrir la préparation de release',
    'Potential drift':'Décalages potentiels','Threshold':'Seuil','EN newer':'EN plus récent','FR newer':'FR plus récent','Pages whose translations may be behind':'Pages dont la traduction peut être en retard','Newer language':'Langue la plus récente','EN update':'Mise à jour EN','FR update':'Mise à jour FR','Gap':'Écart',
    'Search success':'Réussite des recherches','Result click rate':'Taux de clic sur résultat','Zero-result rate':'Taux sans résultat','Search quality scorecard':'Tableau de qualité de recherche','Top failing searches':'Recherches les plus problématiques','Searches':'Recherches','Zero results':'Sans résultat',
    'Ready':'Prêt','Almost ready':'Presque prêt','Needs review':'À vérifier','Not release-ready':'Pas prêt pour la release','Unknown':'Inconnu','None':'Aucun','Clear':'Rien à signaler','active':'actif','disabled':'désactivé','open':'ouvert','read':'lu','resolved':'résolu','archived':'archivé',
    'Internal topics drive Related Pages. Version fields are public only when filled.':'Les topics internes alimentent les Pages liées. Les champs de version ne sont publics que lorsqu’ils sont renseignés.',
    'A live current page cannot be used as the old path. Redirects are HTTP 308 and preserve the query string.':'Une page actuellement active ne peut pas servir d’ancien chemin. Les redirections utilisent HTTP 308 et conservent les paramètres de l’URL.',
    'This operational score is intentionally conservative. It combines build-audit problems, translation drift, unresolved review statuses, active feedback and redirect integrity. It does not replace a manual release check.':'Ce score opérationnel est volontairement prudent. Il combine les problèmes d’audit, les écarts de traduction, les pages à vérifier, les retours actifs et l’intégrité des redirections. Il ne remplace pas une validation manuelle de release.',
    'This is based only on verified Git update timestamps. It does not claim that the older page is wrong. It tells you where a translation comparison is worth doing.':'Ce contrôle repose uniquement sur les dates Git vérifiées. Il ne dit pas que la page la plus ancienne est fausse, il indique simplement où une comparaison des traductions est utile.',
    'A search counts after the existing stability delay, not on every keystroke. Success means the tracked search did not end as a zero-result search. Click rate measures how often a result was actually opened.':'Une recherche est comptée après le délai de stabilité existant, et non à chaque frappe. Une recherche réussie est une recherche qui ne termine pas sans résultat. Le taux de clic mesure la fréquence à laquelle un résultat est réellement ouvert.'
  }));

  const regex = [
    [/^Signed in as (.+) \((.+)\)$/i,'Connecté en tant que $1 ($2)'],[/^Page (\d+) \/ (\d+)$/i,'Page $1 / $2'],[/^Updated (.+)$/i,'Mis à jour $1'],
    [/^(\d+) total$/i,'$1 au total'],[/^(\d+) active$/i,'$1 actifs'],[/^(\d+) archived$/i,'$1 archivés'],[/^(\d+) clicks$/i,'$1 clics'],[/^(\d+) hits$/i,'$1 occurrences'],
    [/^(\d+) views \/ 30d$/i,'$1 vues / 30 j'],[/^last 30 days$/i,'30 derniers jours'],[/^last 7 days$/i,'7 derniers jours'],[/^last 24 hours$/i,'24 dernières heures'],[/^all time$/i,'depuis le début'],
    [/^Older than (\d+) days$/i,'Plus ancien que $1 jours'],[/^OK for (\d+) days$/i,'OK pour $1 jours'],[/^OK (\d+)d$/i,'OK $1 j'],[/^(\d+)d$/i,'$1 j']
  ];

  const placeholders = new Map([['Search title, path, badge, filter','Rechercher un titre, chemin, badge ou filtre'],['e.g. 5.0','ex. 5.0'],['e.g. 6.1','ex. 6.1'],['e.g. 6.0','ex. 6.0']]);

  function translateText(value) {
    const raw = String(value || ''), trimmed = raw.trim();
    if (!trimmed) return raw;
    if (exact.has(trimmed)) return raw.replace(trimmed, exact.get(trimmed));
    for (const [pattern, replacement] of regex) if (pattern.test(trimmed)) return raw.replace(trimmed, trimmed.replace(pattern, replacement));
    return raw;
  }

  function translateNode(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement?.closest('script,style,code,pre')) return;
      const next = translateText(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
    root.querySelectorAll?.('input[placeholder],textarea[placeholder]').forEach(el => { if (placeholders.has(el.placeholder)) el.placeholder = placeholders.get(el.placeholder); });
  }

  function tabFromHref(anchor) { try { return new URL(anchor.href, location.origin).searchParams.get('tab') || ''; } catch { return ''; } }

  let navBusy = false;
  function canonicalizeNav() {
    if (navBusy) return;
    const nav = document.querySelector('.admin-nav');
    if (!nav) return;
    navBusy = true;
    try {
      const anchors = [...nav.querySelectorAll('a')], byTab = new Map();
      for (const anchor of anchors) { const tab = tabFromHref(anchor); if (tab && !byTab.has(tab)) byTab.set(tab, anchor); }
      const signature = [...byTab.keys()].sort().join('|');
      if (nav.dataset.frCanonical === signature && anchors.length === byTab.size) return;
      nav.innerHTML = '';
      for (const [label, tabs] of groups) {
        const available = tabs.filter(tab => byTab.has(tab));
        if (!available.length) continue;
        const group = document.createElement('div'); group.className = 'nav-group';
        const small = document.createElement('small'); small.textContent = label; group.appendChild(small);
        for (const tab of available) {
          const anchor = byTab.get(tab); anchor.textContent = tabLabels[tab] || anchor.textContent; anchor.classList.toggle('is-active', tab === currentTab); group.appendChild(anchor);
        }
        nav.appendChild(group);
      }
      nav.dataset.frCanonical = signature;
    } finally { navBusy = false; }
  }

  function installHelp() {
    const main = document.querySelector('.admin-main'), topbar = main?.querySelector('.admin-topbar');
    if (!main || !topbar) return;
    const [title, text] = help[currentTab] || ['Administration','Outils internes de gestion et de maintenance du wiki.'];
    let section = main.querySelector(':scope > .admin-fr-help');
    if (!section) { section = document.createElement('section'); section.className = 'admin-fr-help'; section.innerHTML = '<strong></strong><p></p>'; topbar.insertAdjacentElement('afterend', section); }
    section.querySelector('strong').textContent = `ℹ️ ${title}`; section.querySelector('p').textContent = text;
  }

  function translateStatuses() {
    const labels = {'verified-v6':'Vérifié v6.0+','needs-review':'À vérifier','legacy-5':'Ancien 5.x',draft:'Brouillon',unknown:'Inconnu',legendary:'Légendaires',server:'Serveur',commands:'Commandes'};
    document.querySelectorAll('.status,.pill,.signal,option').forEach(el => { const key = el.textContent.trim(); if (labels[key]) el.textContent = labels[key]; });
  }

  function installStyles() {
    if (document.getElementById('admin-fr-style')) return;
    const style = document.createElement('style'); style.id = 'admin-fr-style';
    style.textContent = '.admin-fr-help{margin:0 0 18px;padding:14px 16px;border:1px solid rgba(76,145,255,.3);border-radius:14px;background:rgba(76,145,255,.08);color:#dbe7f8}.admin-fr-help strong{display:block;margin-bottom:4px;font-size:14px}.admin-fr-help p{margin:0;color:#b9c7da;line-height:1.55}.admin-fr-help+*{margin-top:0}';
    document.head.appendChild(style);
  }

  let queued = false;
  function refresh() {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false; installStyles(); canonicalizeNav(); translateNode(document.body); translateStatuses(); installHelp();
      const heading = document.querySelector('.admin-topbar h1'); if (heading && tabLabels[currentTab]) heading.textContent = tabLabels[currentTab].replace(/^\S+\s/, '');
    });
  }

  refresh();
  const observer = new MutationObserver(refresh);
  observer.observe(document.body, { childList: true, subtree: true });
})();
