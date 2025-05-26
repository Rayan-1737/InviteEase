function renderInvites() {
    const invites = JSON.parse(localStorage.getItem('myInvites') || '[]');
    const list = document.getElementById('inviteList');
    list.innerHTML = '';
    if (invites.length === 0) {
      list.innerHTML = '<div class="empty">No invites yet. <a href="index.html">Create one!</a></div>';
      return;
    }
    invites.slice().reverse().forEach((invite, idx) => {
      const realIdx = invites.length - 1 - idx; // for reverse order
      const div = document.createElement('div');
      div.className = 'invite-card';
      div.innerHTML = `
        <button class="delete-invite" title="Delete Invite" data-index="${realIdx}">×</button>
        <div class="invite-title">${invite.title || '(Untitled Event)'}</div>
        <div class="invite-meta">${invite.type ? invite.type + ' • ' : ''}${invite.date ? invite.date : ''}</div>
        <a class="invite-link" href="${invite.url}" target="_blank">View Invite</a>
      `;
      list.appendChild(div);
    });
    // Add delete event listeners
    document.querySelectorAll('.delete-invite').forEach(btn => {
      btn.onclick = function() {
        const idx = Number(this.getAttribute('data-index'));
        const invites = JSON.parse(localStorage.getItem('myInvites') || '[]');
        invites.splice(idx, 1);
        localStorage.setItem('myInvites', JSON.stringify(invites));
        renderInvites();
        // Update preview if on index page
        if (typeof renderPreviewInvites === 'function' && document.getElementById('invitePreviewList')) {
          renderPreviewInvites();
        }
      };
    });
  }
  
  function renderPreviewInvites() {
    const invites = JSON.parse(localStorage.getItem('myInvites') || '[]');
    const list = document.getElementById('invitePreviewList');
    if (!list) return; // Skip if not on index page
    list.innerHTML = '';
    if (invites.length === 0) {
      list.innerHTML = '<div class="empty" style="text-align:center;color:#aaa;">No invites yet. <a href="index.html">Create one!</a></div>';
      return;
    }
    invites.slice(-3).reverse().forEach((invite, idx) => {
      const realIdx = invites.length - 1 - idx;
      const div = document.createElement('div');
      div.className = 'invite-card';
      div.style.margin = "0 auto 1.2rem auto";
      div.style.maxWidth = "500px";
      div.innerHTML = `
        <button class="delete-invite" title="Delete Invite" data-index="${realIdx}">×</button>
        <div class="invite-title" style="font-size:1.1rem;font-family:'Playfair Display',serif;font-weight:600;">${invite.title || '(Untitled Event)'}</div>
        <div class="invite-meta" style="color:#888;font-size:0.97rem;">${invite.type ? invite.type + ' • ' : ''}${invite.date ? invite.date : ''}</div>
        <a class="invite-link" href="${invite.url}" target="_blank" style="background:#c59d5f;color:#fff;padding:0.4rem 1rem;border-radius:50px;text-decoration:none;font-weight:500;transition:background 0.2s;display:inline-block;margin-top:0.3rem;">View Invite</a>
      `;
      list.appendChild(div);
    });
    document.querySelectorAll('.delete-invite').forEach(btn => {
      btn.onclick = function() {
        const idx = Number(this.getAttribute('data-index'));
        const invites = JSON.parse(localStorage.getItem('myInvites') || '[]');
        invites.splice(idx, 1);
        localStorage.setItem('myInvites', JSON.stringify(invites));
        renderPreviewInvites();
        if (typeof renderInvites === 'function' && document.getElementById('inviteList')) {
          renderInvites(); // update myInvites page if open
        }
      };
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('inviteList')) {
      renderInvites();
    }
    if (document.getElementById('invitePreviewList')) {
      renderPreviewInvites();
    }
  });