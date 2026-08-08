(() => {
  const NativeMutationObserver = window.MutationObserver;
  if (!NativeMutationObserver || window.__CR_ADMIN_FR_OBSERVER_GUARD__) return;
  window.__CR_ADMIN_FR_OBSERVER_GUARD__ = true;

  window.MutationObserver = class extends NativeMutationObserver {
    constructor(callback) {
      super((records, observer) => {
        const filtered = records.filter(record => {
          const target = record.target?.nodeType === 1 ? record.target : record.target?.parentElement;
          if (!target?.closest) return true;
          if (target.closest('.admin-fr-help')) return false;
          if (target.matches('.admin-topbar h1') || target.closest('.admin-topbar h1')) return false;
          return true;
        });
        if (filtered.length) callback(filtered, observer);
      });
    }
  };
})();
