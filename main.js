const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    })
}

let image_container = document.getElementById('images-container');
let row = document.createElement('div');
row.classList.add('row', 'w-50');

let btnLoadNPause = document.getElementById('btnLoadNPause');
let btnLoadAll = document.getElementById('btnLoadAll');

const createImage = function (imgPath) {

    return new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.addEventListener('load', function (e) {
            resolve(img);
        });
        img.addEventListener('error', function (e) {
            reject(e.message);
        });

        img.src = imgPath;
    });
}

async function loadNPause() {

    let img = await createImage(`./img/img-1.jpg`)

    addImage(img);
    await wait(2);
    img.style.display = 'none';

    img = await createImage(`./img/img-2.jpg`);
    addImage(img);
    await wait(2);
    img.style.display = 'none';

    img = await createImage(`./img/img-3.jpg`);
    addImage(img);

}

function addImage(img) {
    row.appendChild(img);
    image_container.appendChild(row);
}

async function loadAll(imgArr) {
    let imgs = imgArr.map(imgPath => createImage(imgPath))

    console.log(imgs);

    Promise.all(imgs).then((elements) => {
        elements.forEach(item => {
            addImage(item);
        })
    })
}

btnLoadAll.addEventListener('click', function () {
    loadAll([
        './img/img-1.jpg',
        './img/img-2.jpg',
        './img/img-3.jpg'
    ]);
});

btnLoadNPause.addEventListener('click', function () {
    loadNPause();
});

//loadNPause();
// loadAll([
//     './img/img-1.jpg',
//     './img/img-2.jpg',
//     './img/img-3.jpg'
// ]);