/* ── STICKY NAVBAR ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 50);
});

/* ── SCROLL REVEAL ANIMATIONS ── */
const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('vis'), i * 70);
            revObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.sr, .sr-r').forEach(el => revObs.observe(el));

/* ── STATS COUNTER ── */
function animCount(el, target) {
    let n = 0, dur = 1600, step = 14, inc = target / (dur / step);
    const t = setInterval(() => {
        n = Math.min(n + inc, target);
        el.textContent = Math.floor(n) + '+';
        if (n >= target) clearInterval(t);
    }, step);
}
const cntObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const v = parseInt(e.target.dataset.count);
            if (!isNaN(v)) animCount(e.target, v);
            cntObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

/* ── PROPERTY TABS ── */
window.switchTab = function(id, btn) {
    document.querySelectorAll('.tc').forEach(t => t.classList.remove('on'));
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
    document.getElementById('tc-' + id).classList.add('on');
    btn.classList.add('on');
}

/* ── CONTACT FORM TO WHATSAPP ── */
window.submitForm = function() {
    const name = document.getElementById('fn').value.trim();
    const phone = document.getElementById('fp').value.trim();
    
    if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
    }
    
    // Sends the form to the Sales Manager's number
    const msg = `Jay Jagannath! 🙏%0A%0AI visited SKpropertyodisha.com and want to book a site visit.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0A%0APlease call me back.`;
    window.open(`https://wa.me/916370534077?text=${msg}`, '_blank');
}