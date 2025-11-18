

// Local storage for instructor profiles
(function () {
    const KEY = "instructorProfiles";
    const load = () => JSON.parse(localStorage.getItem(KEY)) || [];
    const save = (profiles) => localStorage.setItem(KEY, JSON.stringify(profiles));
    window.InstructorProfiles = { load, save };
})();


(function () {
    const api = window.InstructorProfiles;
    if (!api) return;

    const idxOf = (list, ident) =>
        list.findIndex(p => (p.ident || "").toLowerCase() === String(ident).toLowerCase());

    api.get = function (ident) {
        let list = [];
        try { list = api.load() || []; } catch { list = []; }
        const i = idxOf(list, ident);
        return i >= 0 ? list[i] : null;
    };

    api.set = function (ident, data) {
        let list = [];
        try { list = api.load() || []; } catch { list = []; }
        const i = idxOf(list, ident);
        const profile = { ident, ...data, updatedAt: new Date().toISOString() };
        if (i >= 0) list[i] = profile; else list.push(profile);
        api.save(list);
        return profile;
    };
})();
