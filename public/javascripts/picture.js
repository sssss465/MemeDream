function main(){
    const b = document.querySelector('#showform');
    console.log(b);
    const f = document.querySelector('#edittags');
    console.log(f);
    b.addEventListener('click', function(event) {
        event.preventDefault();
        f.style.display = 'block';
        b.style.display = 'none';
        console.log('hi');
    });
}
console.log("HELLO");
document.addEventListener('DOMContentLoaded', main);
