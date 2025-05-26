document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.event-carousel', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const invites = JSON.parse(localStorage.getItem('myInvites') || '[]');
    const list = document.getElementById('invitePreviewList');
    if (!list) return;
    if (invites.length === 0) {
        list.innerHTML = '<div class="empty" style="text-align:center;color:#aaa;">No invites yet. <a href="index.html">Create one!</a></div>';
    } else {
        // Show only the latest 3 invites
        invites.slice(-3).reverse().forEach(invite => {
            const div = document.createElement('div');
            div.className = 'invite-card';
            div.style.margin = "0 auto 1.2rem auto";
            div.style.maxWidth = "500px";
            div.innerHTML = `
                <div class="invite-title" style="font-size:1.1rem;font-family:'Playfair Display',serif;font-weight:600;">${invite.title || '(Untitled Event)'}</div>
                <div class="invite-meta" style="color:#888;font-size:0.97rem;">${invite.type ? invite.type + ' • ' : ''}${invite.date ? invite.date : ''}</div>
                <a class="invite-link" href="${invite.url}" target="_blank" style="background:#c59d5f;color:#fff;padding:0.4rem 1rem;border-radius:50px;text-decoration:none;font-weight:500;transition:background 0.2s;display:inline-block;margin-top:0.3rem;">View Invite</a>
            `;
            list.appendChild(div);
        });
    }
});