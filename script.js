/* ===================================
   GLOBAL VARIABLES AND STATE MANAGEMENT
   =================================== */

// Current active section tracker
let currentSection = 'map';

// Notice board data arrays
let notices = [];
let upcomingEvents = [];
let pinnedNotices = new Set();

// Map state variables
let currentZoom = 1;
let currentImageSrc = '';

/* ===================================
   BUILDING DATA CONFIGURATION
   =================================== */

// Building information database
const buildingData = {
    'boys-hostel': {
        name: "Boy's Hostel",
        icon: '🏠',
        description: 'Residential facility for male students with 24/7 security and Wi‑Fi.',
        hours: '24/7 Access',
        capacity: '200+ students',
        category: 'hostel'
    },
    'girls-hostel': {
        name: "Girl's Hostel",
        icon: '🏡',
        description: 'Residential facility for female students with secure access and amenities.',
        hours: '24/7 Access',
        capacity: '250+ Students',
        category: 'hostel'
    },
    'lecturers-quarters': {
        name: "Lecturers' Quarters",
        icon: '🏘️',
        description: 'Housing for college lecturers and staff.',
        hours: '24/7 Access',
        capacity: 'Multiple units',
        category: 'residence'
    },
    'hod-quarters': {
        name: "HOD Quarters",
        icon: '🏘️',
        description: 'Residential quarters for department heads.',
        hours: '—',
        capacity: 'Multiple units',
        category: 'residence'
    },
    'principals-residence': {
        name: "Principal's Residence",
        icon: '🏠',
        description: 'Official residence for the Principal.',
        hours: '—',
        capacity: 'Private residence',
        category: 'residence'
    },
    'parking-area': {
        name: 'Parking Area',
        icon: '🚗',
        description: 'Parking for students, faculty, and visitors.',
        hours: '24/7 Access',
        capacity: '50+ vehicles',
        category: 'facility'
    },
    'security-room': {
        name: 'Security Room',
        icon: '🛡️',
        description: 'Security control room with CCTV monitoring.',
        hours: '24/7 Access',
        capacity: 'On-duty personnel',
        category: 'facility'
    },
    'arwal-building': {
        name: 'Arwal Building',
        icon: '🏢',
        description: 'Academic block with classrooms and administrative offices.',
        hours: '10:00 AM - 4:00 PM',
        capacity: 'Varies',
        category: 'classroom'
    },
    'workshop': {
        name: 'Workshop',
        icon: '⚙️',
        description: 'Mechanical/electrical workshop for practical sessions.',
        hours: '10:00 AM - 4:00 PM',
        capacity: '100 students',
        category: 'lab'
    },
    'coe-lab': {
        name: 'Coe - Lab',
        icon: '💻',
        description: 'Coe Lab and IOT lab .',
        hours: '10:00 AM - 4:00 PM',
        capacity: '100+ spectators',
        category: 'lab'
    },
    'playground': {
        name: 'Playground',
        icon: '🎯',
        description: 'Open playground and recreation area.',
        hours: '24/7 Access',
        capacity: '—',
        category: 'sports'
    },
    'college-building': {
        name: 'Academic Building',
        icon: '🏫',
        description: 'Main academic building with classrooms and labs.',
        hours: '10:00 AM - 5:00 PM',
        capacity: 'Varies',
        category: 'classroom'
    },
    'dairy': {
        name: 'Sudha Dairy',
        icon: '🐮',
        description: 'Milk and dairy Products ',
        hours: '9:00 AM - 6:00 PM',
        capacity: '—',
        category: 'facility'
    }
};

/* ===================================
   SAMPLE DATA FOR NOTICES AND EVENTS
   =================================== */

// Sample notices data
const sampleNotices = [
    {
        id: 1,
        title: 'Final Exam Schedule Released',
        description: 'The final examination schedule for all departments has been published. Please check the notice board for your specific timetable.',
        category: 'exam',
        date: '2025-12-02',
        time: '10:00 AM',
        important: true
    },
    {
        id: 2,
        title: '4th Class Test',
        description: '4th Class Test Of all students of 3rd & 5th Sem.',
        category: 'exam',
        date: '2025-11-12',
        time: '2:00 PM',
        important: false
    },
    {
        id: 3,
        title: 'Inter-College Basketball Tournament',
        description: 'Trials for the college basketball team will be held next week. Interested students should register at the sports office.',
        category: 'sports',
        date: '2025-11-18',
        time: '4:00 PM',
        important: false
    },
    {
        id: 4,
        title: 'Library Renovation Notice',
        description: 'The central library will be partially closed for renovation from next Monday. Alternative study spaces are available.',
        category: 'general',
        date: '2025-11-22',
        time: '9:00 AM',
        important: true
    },
    {
        id: 5,
        title: 'Scholarship Applications Open',
        description: 'Merit-based scholarships are now available for eligible students. Application deadline is February 15th.',
        category: 'general',
        date: '2025-11-02',
        time: '11:00 AM',
        important: true
    },
    {
        id: 6,
        title: 'Science Exhibition 2024',
        description: 'Annual science exhibition showcasing innovative projects by students. Visitors welcome!',
        category: 'event',
        date: '2025-11-25',
        time: '10:00 AM',
        important: false
    },
    {
        id: 7,
        title: 'Mid-term Exam Results',
        description: 'Mid-term examination results are now available on the student portal. Contact your department for queries.',
        category: 'exam',
        date: '2025-11-01',
        time: '3:00 PM',
        important: true
    },
    {
        id: 8,
        title: 'Football Team Selection',
        description: 'College football team selection trials will be conducted this Friday at the main ground.',
        category: 'sports',
        date: '2025-11-19',
        time: '5:00 PM',
        important: false
    }
];

// Sample upcoming events data
const sampleUpcomingEvents = [
    {
        id: 1,
        title: 'GPAN Techfest',
        subtitle: 'Innovation & Technology Conference',
        description: 'Join us for a comprehensive technology conference featuring industry experts, workshops, and networking opportunities. Explore the latest trends in AI, blockchain, and software development.',
        category: 'academic',
        date: '2025-12-10',
        endDate: '2025-12-19',
        time: '9:00 AM - 6:00 PM',
        venue: 'Main Auditorium & Computer Lab',
        organizer: 'College Faculty',
        currentParticipants: 245,
        maxParticipants: 300,
        registrationStatus: 'open',
        tags: ['Technology', 'AI', 'Workshops', 'Networking'],
        featured: true
    },
    {
        id: 2,
        title: 'Freshers Party 2025',
        subtitle: 'Welcoming New Students.',
        description: 'A vibrant celebration of arts, music, dance, and literature. Students will showcase their talents through various performances, exhibitions, and competitions.',
        category: 'cultural',
        date: '2025-11-20',
        endDate: '2025-11-21',
        time: '04:00 PM - 09:00 PM',
        venue: 'Campus Grounds & Auditorium',
        organizer: 'Cultural Committee',
        currentParticipants: 180,
        maxParticipants: 500,
        registrationStatus: 'open',
        tags: ['Music', 'Dance', 'Art', 'Competition'],
        featured: true
    },
    {
        id: 3,
        title: 'Winter Sports ',
        subtitle: 'Athletic Excellence Competition',
        description: 'Annual sports championship featuring multiple disciplines including volleyball ,Chess, Badminton, Table tennis. Teams from colleges will compete for the championship trophy.',
        category: 'sports',
        date: '2025-12-20',
        endDate: '2024-03-30',
        time: '8:00 AM - 6:00 PM',
        venue: 'Sports Complex & Main Ground',
        organizer: 'Sports Department',
        currentParticipants: 120,
        maxParticipants: 200,
        registrationStatus: 'MAX',
        tags: ['Basketball', 'Football', 'Cricket', 'Athletics'],
        featured: true
    },
    {
        id: 4,
        title: 'Training And Placement 2025',
        subtitle: 'Connect with Top Companies.',
        description: 'Meet with representatives from leading companies and organizations. Explore internship and job opportunities, attend career workshops, and network with industry professionals.',
        category: 'academic',
        date: '2026-01-05',
        endDate: '2026-01-10',
        time: '10:00 AM - 4:00 PM',
        venue: 'Seminar Hall and Smart Class',
        organizer: 'Placement Cell',
        currentParticipants: '200+',
        maxParticipants: '5 Branches' ,
        registrationStatus: 'open',
        tags: ['Jobs', 'Internships', 'Networking', 'Workshops'],
        featured: true
    },
    {
        id: 5,
        title: 'Science Exhibition & Innovation Fair',
        subtitle: 'Showcasing Student Innovations',
        description: 'Students present their innovative projects and research work. Categories include robotics, environmental science, biotechnology, and sustainable development solutions.',
        category: 'academic',
        date: '2024-03-20',
        endDate: '2024-03-21',
        time: '9:00 AM - 5:00 PM',
        venue: 'Science Laboratory & Exhibition Hall',
        organizer: 'Science Department',
        currentParticipants: 67,
        maxParticipants: 150,
        registrationStatus: 'open',
        tags: ['Innovation', 'Research', 'Robotics', 'Environment'],
        featured: true
    },
    {
        id: 6,
        title: 'Semester Exam',
        subtitle: '1st , 3rd & 5th Semester Final Examination',
        description: '',
        category: 'Examination',
        date: '2025-12-02',
        endDate: '2025-12-13',
        time: '9:00 PM - 5:00 PM',
        venue: 'At Examination Center ',
        organizer: 'SBTE',
        currentParticipants: "All students",
        maxParticipants: '--',
        registrationStatus: 'For All',
        tags: ['Final Examinations'],
        featured: true
    }
];

/* ===================================
   APPLICATION INITIALIZATION
   =================================== */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing EduHub Application...');
    
    // Initialize all components
    initializeNavigation();
    initializeMap();
    initializeNotices();
    initializeGallery();
    initializeImagePreview();
    
    // Show default section
    showSection('map');
    
    // Load sample data
    notices = [...sampleNotices];
    upcomingEvents = [...sampleUpcomingEvents];
    
    // Render initial content
    renderNotices();
    renderUpcomingEvents();
    
    console.log('✅ EduHub Application initialized successfully!');
});

/* ===================================
   NAVIGATION FUNCTIONALITY
   =================================== */

// Initialize navigation system
function initializeNavigation() {
    console.log('📱 Initializing navigation...');
    
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Add click event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active navigation button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize smooth scroll for upcoming events button
    initializeSmoothScroll();
}

// Initialize smooth scrolling functionality
function initializeSmoothScroll() {
    const scrollButtons = document.querySelectorAll('.scroll-to-events');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // First, make sure we're on the notices section
            showSection('notices');
            
            // Update navigation
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-section="notices"]').classList.add('active');
            
            // Wait for section to load, then scroll to upcoming events
            setTimeout(() => {
                const targetElement = document.getElementById('upcoming-events');
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });
}

// Show specific section and hide others
function showSection(sectionName) {
    console.log(`🔄 Switching to section: ${sectionName}`);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
    }
}

/* ===================================
   MAP FUNCTIONALITY
   =================================== */

// Initialize interactive map system
function initializeMap() {
    console.log('🗺️ Initializing interactive map...');
    
    // Initialize map interactions
    initializeMapInteractions();
    
    // Initialize building popup
    initializeBuildingPopup();
}

// Initialize SVG map interactions
function initializeMapInteractions() {
    const buildings = document.querySelectorAll('.building-group');
    const mapSearch = document.getElementById('map-search');
    const filterButtons = document.querySelectorAll('#map-section .filter-btn');
    
    // Building click events for SVG elements
    buildings.forEach(building => {
        building.addEventListener('click', function() {
            const buildingId = this.getAttribute('data-building');
            showBuildingInfo(buildingId);
        });
        
        // Add hover effects
        building.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
        });
        
        building.addEventListener('mouseleave', function() {
            if (!this.classList.contains('highlighted')) {
                this.style.transform = 'scale(1)';
                this.style.filter = 'none';
            }
        });
    });
    
    // Map search functionality
    if (mapSearch) {
        mapSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterBuildings(searchTerm);
        });
    }
    
    // Filter button events
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterBuildingsByCategory(category);
        });
    });
}

// Filter buildings by search term
function filterBuildings(searchTerm) {
    const buildings = document.querySelectorAll('.building-group');
    let foundBuilding = null;
    
    buildings.forEach(building => {
        const buildingId = building.getAttribute('data-building');
        const buildingName = buildingData[buildingId]?.name.toLowerCase() || '';
        
        // Reset styles
        building.classList.remove('highlighted');
        building.style.display = 'block';
        building.style.transform = 'scale(1)';
        building.style.filter = 'none';
        
        if (searchTerm && buildingName.includes(searchTerm)) {
            building.classList.add('highlighted');
            foundBuilding = building;
        } else if (searchTerm && !buildingName.includes(searchTerm)) {
            building.style.display = 'none';
        }
    });
    
    // Scroll to found building if search is specific enough
    if (foundBuilding && searchTerm.length > 2) {
        foundBuilding.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Filter buildings by category
function filterBuildingsByCategory(category) {
    const buildings = document.querySelectorAll('.building-group');
    
    buildings.forEach(building => {
        const buildingId = building.getAttribute('data-building');
        const buildingInfo = buildingData[buildingId];
        
        if (!buildingInfo) {
            building.style.display = 'none';
            return;
        }
        
        const buildingCategory = buildingInfo.category;
        
        // Reset styles
        building.classList.remove('highlighted');
        building.style.transform = 'scale(1)';
        building.style.filter = 'none';
        
        if (category === 'all') {
            building.style.display = 'block';
        } else if (category === 'lab' && (buildingCategory === 'lab' || buildingId === 'computer-lab' || buildingId === 'coe-lab')) {
            building.style.display = 'block';
        } else if (category === 'classroom' && (buildingCategory === 'classroom' || buildingId === 'computer-lab')) {
            building.style.display = 'block';
        } else if (buildingCategory === category) {
            building.style.display = buildingCategory === category ? 'block' : 'none';
        } else {
            building.style.display = 'none';
        }
    });
    
    // Clear search
    const mapSearch = document.getElementById('map-search');
    if (mapSearch) {
        mapSearch.value = '';
    }
}

// Show building information popup
function showBuildingInfo(buildingId) {
    console.log(`🏢 Showing info for building: ${buildingId}`);
    
    const building = buildingData[buildingId];
    if (!building) return;
    
    const popup = document.getElementById('building-popup');
    const popupIcon = popup.querySelector('.popup-icon');
    const popupTitle = popup.querySelector('.popup-title');
    const popupDescription = popup.querySelector('.popup-description');
    const infoItems = popup.querySelectorAll('.info-item .info-text');
    
    // Update popup content
    popupIcon.textContent = building.icon;
    popupTitle.textContent = building.name;
    popupDescription.textContent = building.description;
    infoItems[0].textContent = building.hours;
    
    if (building.capacity) {
        infoItems[1].textContent = building.capacity;
        popup.querySelector('.capacity-info').style.display = 'flex';
    } else {
        popup.querySelector('.capacity-info').style.display = 'none';
    }
    
    // Show popup
    popup.classList.add('show');
}

// Initialize building popup functionality
function initializeBuildingPopup() {
    const popup = document.getElementById('building-popup');
    const closeButton = popup.querySelector('.popup-close');
    
    // Close button event
    closeButton.addEventListener('click', function() {
        popup.classList.remove('show');
    });
    
    // Click outside to close
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('show');
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            popup.classList.remove('show');
        }
    });
}

/* ===================================
   NOTICE BOARD FUNCTIONALITY
   =================================== */

// Initialize notice board system
function initializeNotices() {
    console.log('📢 Initializing notice board...');
    
    const noticesSearch = document.getElementById('notices-search');
    const filterButtons = document.querySelectorAll('#notices-section .filter-btn:not(.scroll-to-events)');
    
    // Search functionality
    if (noticesSearch) {
        noticesSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterNotices(searchTerm);
        });
    }
    
    // Filter button events
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active filter button (excluding scroll button)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterNoticesByCategory(category);
        });
    });
}

// Render notices to the DOM
function renderNotices() {
    console.log('📝 Rendering notices...');
    
    const container = document.getElementById('notices-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Sort notices: pinned first, then by date (newest first)
    const sortedNotices = [...notices].sort((a, b) => {
        if (pinnedNotices.has(a.id) && !pinnedNotices.has(b.id)) return -1;
        if (!pinnedNotices.has(a.id) && pinnedNotices.has(b.id)) return 1;
        return new Date(b.date) - new Date(a.date);
    });
    
    // Create notice cards
    sortedNotices.forEach(notice => {
        const noticeCard = createNoticeCard(notice);
        container.appendChild(noticeCard);
    });
}

// Create individual notice card element
function createNoticeCard(notice) {
    const card = document.createElement('div');
    card.className = `notice-card ${notice.category}`;
    
    if (pinnedNotices.has(notice.id)) {
        card.classList.add('pinned');
    }
    
    const formattedDate = new Date(notice.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="notice-header">
            <span class="notice-category ${notice.category}">${notice.category}</span>
            <button class="notice-pin ${pinnedNotices.has(notice.id) ? 'pinned' : ''}" 
                    onclick="togglePin(${notice.id})">
                ${pinnedNotices.has(notice.id) ? '📌' : '📍'}
            </button>
        </div>
        <div class="notice-body">
            <h3 class="notice-title">${notice.title}</h3>
            <p class="notice-description">${notice.description}</p>
            <div class="notice-footer">
                <span>${formattedDate}</span>
                <span>${notice.time}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Toggle pin status for notices
function togglePin(noticeId) {
    console.log(`📌 Toggling pin for notice: ${noticeId}`);
    
    if (pinnedNotices.has(noticeId)) {
        pinnedNotices.delete(noticeId);
    } else {
        pinnedNotices.add(noticeId);
    }
    renderNotices();
}

// Filter notices by search term
function filterNotices(searchTerm) {
    const noticeCards = document.querySelectorAll('.notice-card');
    
    noticeCards.forEach(card => {
        const title = card.querySelector('.notice-title').textContent.toLowerCase();
        const description = card.querySelector('.notice-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter notices by category
function filterNoticesByCategory(category) {
    const noticeCards = document.querySelectorAll('.notice-card');
    
    noticeCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            const cardCategory = card.classList.contains(category);
            card.style.display = cardCategory ? 'block' : 'none';
        }
    });
    
    // Clear search
    const noticesSearch = document.getElementById('notices-search');
    if (noticesSearch) {
        noticesSearch.value = '';
    }
}

/* ===================================
   UPCOMING EVENTS FUNCTIONALITY
   =================================== */

// Render upcoming events to the DOM
function renderUpcomingEvents() {
    console.log('🎉 Rendering upcoming events...');
    
    const container = document.getElementById('events-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Sort events: featured first, then by date (nearest first)
    const sortedEvents = [...upcomingEvents].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(a.date) - new Date(b.date);
    });
    
    // Create event cards
    sortedEvents.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}

// Create individual event card element
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = `event-card ${event.category}`;
    
    if (event.featured) {
        card.classList.add('featured');
    }
    
    const eventDate = new Date(event.date);
    const endDate = new Date(event.endDate);
    const now = new Date();
    const daysUntil = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    const formattedEndDate = endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    
    const dateRange = event.endDate !== event.date ? 
        `${formattedDate} - ${formattedEndDate}` : formattedDate;
    
    card.innerHTML = `
        ${daysUntil > 0 && daysUntil <= 30 ? `<div class="countdown-timer">${daysUntil} days left</div>` : ''}
        
        <div class="event-header">
            <div class="event-date">
                <span class="event-date-badge">${dateRange}</span>
                <span>📅 ${event.time}</span>
            </div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-subtitle">${event.subtitle}</p>
        </div>
        
        <div class="event-body">
            <p class="event-description">${event.description}</p>
            
            <div class="event-details">
                <div class="event-detail">
                    <span class="event-detail-icon">📍</span>
                    <span class="event-detail-text">${event.venue}</span>
                </div>
                <div class="event-detail">
                    <span class="event-detail-icon">👥</span>
                    <span class="event-detail-text">${event.currentParticipants}/${event.maxParticipants}</span>
                </div>
                <div class="event-detail">
                    <span class="event-detail-icon">🏢</span>
                    <span class="event-detail-text">${event.organizer}</span>
                </div>
            </div>
            
            <div class="event-tags">
                ${event.tags.map(tag => `<span class="event-tag ${event.category}">${tag}</span>`).join('')}
            </div>
            
            <div class="event-footer">
                <span class="event-organizer">Organized by ${event.organizer}</span>
                <span class="event-status ${event.registrationStatus}">
                    ${event.registrationStatus === 'open' ? 'Registration Open' : 
                      event.registrationStatus === 'limited' ? 'Limited Seats' : 'Registration Closed'}
                </span>
            </div>
        </div>
    `;
    
    return card;
}

/* ===================================
   GALLERY FUNCTIONALITY
   =================================== */

// Initialize gallery system
function initializeGallery() {
    console.log('📸 Initializing gallery...');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event listeners to gallery items
    galleryItems.forEach(item => {
        const previewBtn = item.querySelector('.preview-btn');
        
        if (previewBtn) {
            previewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const imageSrc = item.getAttribute('data-image');
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('p').textContent;
                
                openImagePreview(imageSrc, title, description);
            });
        }
        
        // Also allow clicking on the item itself
        item.addEventListener('click', function() {
            const imageSrc = item.getAttribute('data-image');
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            
            openImagePreview(imageSrc, title, description);
        });
    });
}

/* ===================================
   IMAGE PREVIEW FUNCTIONALITY
   =================================== */

// Initialize image preview modal system
function initializeImagePreview() {
    console.log('🖼️ Initializing image preview...');
    
    const modal = document.getElementById('image-preview-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetZoomBtn = document.getElementById('reset-zoom');
    const fullscreenBtn = document.getElementById('fullscreen-toggle');
    const downloadBtn = document.getElementById('download-image');
    
    // Close modal events
    closeBtn.addEventListener('click', closeImagePreview);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImagePreview();
        }
    });
    
    // Keyboard events
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('show')) {
            switch(e.key) {
                case 'Escape':
                    closeImagePreview();
                    break;
                case '+':
                case '=':
                    zoomIn();
                    break;
                case '-':
                    zoomOut();
                    break;
                case '0':
                    resetZoom();
                    break;
            }
        }
    });
    
    // Control button events
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetZoomBtn.addEventListener('click', resetZoom);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    downloadBtn.addEventListener('click', downloadImage);
}

// Open image preview modal
function openImagePreview(imageSrc, title, description) {
    console.log(`🖼️ Opening image preview: ${title}`);
    
    const modal = document.getElementById('image-preview-modal');
    const modalTitle = document.getElementById('modal-title');
    const previewImage = document.getElementById('preview-image');
    const imageDescription = document.getElementById('image-description');
    
    // Set content
    modalTitle.textContent = title;
    previewImage.src = imageSrc;
    previewImage.alt = title;
    imageDescription.textContent = description;
    
    // Reset zoom
    currentZoom = 1;
    currentImageSrc = imageSrc;
    previewImage.style.transform = 'scale(1)';
    
    // Show modal
    modal.classList.add('show');
}

// Close image preview modal
function closeImagePreview() {
    const modal = document.getElementById('image-preview-modal');
    modal.classList.remove('show');
    
    // Reset zoom
    currentZoom = 1;
    currentImageSrc = '';
}

// Zoom in functionality
function zoomIn() {
    const previewImage = document.getElementById('preview-image');
    currentZoom = Math.min(currentZoom * 1.2, 3); // Max zoom 3x
    previewImage.style.transform = `scale(${currentZoom})`;
}

// Zoom out functionality
function zoomOut() {
    const previewImage = document.getElementById('preview-image');
    currentZoom = Math.max(currentZoom / 1.2, 0.5); // Min zoom 0.5x
    previewImage.style.transform = `scale(${currentZoom})`;
}

// Reset zoom to original size
function resetZoom() {
    const previewImage = document.getElementById('preview-image');
    currentZoom = 1;
    previewImage.style.transform = 'scale(1)';
}

// Toggle fullscreen mode
function toggleFullscreen() {
    const modal = document.getElementById('image-preview-modal');
    
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Download image functionality
function downloadImage() {
    if (!currentImageSrc) return;
    
    const link = document.createElement('a');
    link.href = currentImageSrc;
    link.download = 'college-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

// Format date utility function
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Debounce utility function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ===================================
   SMOOTH SCROLLING AND ANIMATIONS
   =================================== */

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('🎨 Page loaded with animations');
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.notice-card, .gallery-item, .about-card, .event-card');
    animatedElements.forEach(el => observer.observe(el));
});

/* ===================================
   ERROR HANDLING AND LOGGING
   =================================== */

// Global error handler
window.addEventListener('error', function(e) {
    console.error('❌ Global error:', e.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Unhandled promise rejection:', e.reason);
});

console.log('📚 EduHub script loaded successfully!');