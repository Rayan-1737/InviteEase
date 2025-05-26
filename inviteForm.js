const categoryMap = {
    social: ['Birthday Party', 'Wedding Invitation', 'Engagement Ceremony'],
    corporate: ['Conference', 'Business Meeting', 'Webinar'],
    educational: ['Seminar', 'Hackathon', 'Science Fair'],
    cultural: ['Concert', 'Theatre Play', 'Art Exhibition']
  };
  const cat = document.getElementById('category');
  const typeGroup = document.getElementById('eventTypeGroup');
  const typeSel = document.getElementById('eventType');
  cat.addEventListener('change', () => {
    typeSel.innerHTML = '<option value="">-- Select Event Type --</option>';
    categoryMap[cat.value]?.forEach(t => typeSel.add(new Option(t, t)));
    typeGroup.classList.toggle('hidden', !cat.value);
  });
  document.getElementById('eventForm').addEventListener('submit', e => {
    e.preventDefault();
    const params = new URLSearchParams();
    ['category', 'eventType', 'eventTitle', 'eventSubtitle', 'eventDate', 'eventTime', 'eventVenue', 'eventAddress', 'dressCode'].forEach(id => params.set(id, document.getElementById(id).value));
    const url = 'eventInvite.html?' + params;
  
    // Save to localStorage
    const invites = JSON.parse(localStorage.getItem('myInvites') || '[]');
    invites.push({
      title: document.getElementById('eventTitle').value,
      subtitle: document.getElementById('eventSubtitle').value,
      date: document.getElementById('eventDate').value,
      type: document.getElementById('eventType').value,
      url: url,
      created: new Date().toISOString()
    });
    localStorage.setItem('myInvites', JSON.stringify(invites));
  
    document.getElementById('inviteLink').href = url;
    document.getElementById('linkContainer').classList.remove('hidden');
  });
  
  // Set min date to today for eventDate input
  document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('eventDate').min = `${yyyy}-${mm}-${dd}`;
  });