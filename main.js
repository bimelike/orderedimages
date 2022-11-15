const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    })
}

let image_container = document.getElementById('images-container');
let row = document.createElement('div');
row.classList.add('row', 'w-50');

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

async function loadImages() {

    let img = await createImage(`./img/img-1.jpg`)

    addImage(img);
    await wait(2);
    img.classList.add('hidden');

    img = await createImage(`./img/img-2.jpg`);
    addImage(img);
    await wait(2);
    img.classList.add('hidden');

    img = await createImage(`./img/img-3.jpg`);
    addImage(img);

}

function addImage(img) {
    row.appendChild(img);
    image_container.appendChild(row);
}

loadImages();