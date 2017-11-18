function main(){
    const b = document.querySelector('#showform');
    console.log(b);
    const f = document.querySelector('#edittags');
    console.log(f);
    b.addEventListener('click', function(event) {
        event.preventDefault();
        f.classList.remove('hidden');
        const arr = Array.from(f.children);
        arr.forEach((child) => {
            child.classList.remove('hidden');
        });
        b.style.display = 'none';
        console.log('hi');
    });
}
console.log("HELLO");
document.addEventListener('DOMContentLoaded', main);
