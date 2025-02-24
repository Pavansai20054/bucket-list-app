function addItem() {
    let input = document.getElementById('new-item');
    let list = document.getElementById('bucket-list');
    if (input.value.trim() !== "") {
        let li = document.createElement('li');
        li.innerHTML = '⭐ ' + input.value;
        li.onclick = function() { toggleComplete(this); };
        list.appendChild(li);
        input.value = "";
    }
}

function toggleComplete(item) {
    item.classList.toggle('completed');
}

// Make list items draggable
function makeDraggable() {
    let items = document.querySelectorAll('.bucket-list li');
    items.forEach(item => {
        item.draggable = true;
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', drop);
    });
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.innerHTML);
    event.target.classList.add('dragging');
}

function dragOver(event) {
    event.preventDefault();
    let dragging = document.querySelector('.dragging');
    if (dragging) {
        event.target.closest('li').style.border = '2px dashed #4CAF50';
    }
}

function drop(event) {
    event.preventDefault();
    let dragging = document.querySelector('.dragging');
    if (dragging) {
        let list = document.getElementById('bucket-list');
        let target = event.target.closest('li');
        if (target && target !== dragging) {
            list.insertBefore(dragging, target);
        }
        dragging.classList.remove('dragging');
        target.style.border = 'none';
    }
}

// Initialize draggable functionality
document.addEventListener('DOMContentLoaded', () => {
    makeDraggable();
    document.getElementById('bucket-list').addEventListener('DOMNodeInserted', makeDraggable);
});
