function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you, ' + document.getElementById('name').value + '! Your RSVP has been received.');
    e.target.reset();
    setTimeout(function() {
      window.location.href = 'myInvite.html';
    }, 1200); // 1.2s delay after alert
    return false;
}

(function() {
    if (document.body.innerHTML.includes('{{event_title}}')) {
        const params = new URLSearchParams(window.location.search);

        const map = {
            '{{event_title}}': params.get('eventTitle') || 'Event Title',
            '{{event_subtitle}}': params.get('eventSubtitle') || '',
            '{{event_date}}': params.get('eventDate') || '',
            '{{event_time}}': params.get('eventTime') || '',
            '{{event_venue}}': params.get('eventVenue') || '',
            '{{event_address}}': params.get('eventAddress') || '',
            '{{dress_code}}': params.get('dressCode') || '',
            '{{year}}': new Date().getFullYear(),
            '{{event_footer_text}}': params.get('eventTitle') || 'Event'
        };

        let bodyHtml = document.body.innerHTML;
        Object.entries(map).forEach(([key, val]) => {
            bodyHtml = bodyHtml.split(key).join(val);
        });
        document.body.innerHTML = bodyHtml;

        // Set header background based on eventType
        const eventType = params.get('eventType');
        const eventImageMap = {
            'Birthday Party': 'https://static.vecteezy.com/system/resources/thumbnails/055/689/637/small_2x/festive-scene-with-pink-and-gold-balloons-photo.jpeg',
            'Wedding Invitation': 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSH_2rK1hYfL5HC-drXs02gzmT3WboY7snXiu7GCiddBwl-q0D',
            'Engagement Ceremony': 'https://img.freepik.com/premium-photo/two-golden-wedding-rings-with-white-roses-gold-background-stock-images-engagement-rings-with-bouquet-white-flowers-image-ai-generated-illustration_1019806-6465.jpg',
            'Conference': 'https://www.jaypeehotels.com/blog/wp-content/uploads/2025/05/Blog-2-scaled.jpg',
            'Business Meeting': 'https://website2021-live-e3e78fbbd3cc41f2847799-7c49c59.divio-media.com/filer_public/e3/31/e331c8bf-23c3-4284-8c85-0ec68bcfa667/meeting_kosten.jpg',
            'Webinar': 'https://www.eventtia.com/wp-content/uploads/2023/05/Whats-the-Difference-Between-Virtual-Events-and-Webinar.webp',
            'Seminar': 'https://media.istockphoto.com/id/1002018094/photo/rear-view-of-business-people-attending-a-seminar-in-board-room.jpg?s=612x612&w=0&k=20&c=oTPHt7HWmTvEcrPy-evfd9_yYFXQzRSw6J7qh0TKp0Q=',
            'Hackathon': 'https://futureagency.fr/wp-content/uploads/2023/05/Junction_2015.jpg',
            'Science Fair': 'https://lammas-gst.org/wp-content/uploads/sites/2/2024/06/bigbangfair-1.jpg',
            'Concert': 'https://img.freepik.com/free-photo/black-silhouettes-music-concert-poster-concept_1194-617147.jpg?semt=ais_hybrid&w=740',
            'Theatre Play': 'https://images.unsplash.com/photo-1503095396549-807759245b35?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlYXRyZXxlbnwwfHwwfHx8MA%3D%3D',
            'Art Exhibition': 'https://thehaatofart.com/wp-content/uploads/2024/10/Upcoming-Exhibition-in-NESCO12_1600x1067-1024x683.jpg'
        };
        const bgUrl = eventImageMap[eventType] || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80';
        document.querySelector('header').style.backgroundImage = `url('${bgUrl}')`;

        // Countdown Timer Logic
        function startCountdown(dateStr, timeStr) {
            if (!dateStr) return;
            // If time is missing, use midnight
            let eventDateTime;
            if (timeStr && /^\d{2}:\d{2}$/.test(timeStr)) {
                eventDateTime = new Date(`${dateStr}T${timeStr}:00`);
            } else {
                eventDateTime = new Date(`${dateStr}T00:00:00`);
            }
            if (isNaN(eventDateTime.getTime())) {
                // Invalid date, set all to 0
                document.getElementById('days').textContent = 0;
                document.getElementById('hours').textContent = 0;
                document.getElementById('minutes').textContent = 0;
                document.getElementById('seconds').textContent = 0;
                return;
            }
            function updateCountdown() {
                const now = new Date();
                const diff = eventDateTime - now;
                if (diff <= 0) {
                    document.getElementById('days').textContent = 0;
                    document.getElementById('hours').textContent = 0;
                    document.getElementById('minutes').textContent = 0;
                    document.getElementById('seconds').textContent = 0;
                    return;
                }
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                document.getElementById('days').textContent = days;
                document.getElementById('hours').textContent = hours;
                document.getElementById('minutes').textContent = minutes;
                document.getElementById('seconds').textContent = seconds;
            }
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
        startCountdown(params.get('eventDate'), params.get('eventTime'));
    }
})();