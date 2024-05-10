function selectAreaView(area) {
    document.querySelectorAll('.project-sections').forEach(function(section) {
        section.style.display = 'none';
    });

    document.getElementById('section-' + area).style.display = 'block';
}