function render(title, description, imgUrl, linkDemo, linkGithub) {
  const $contProyects = document.querySelector(".cont-proyects");
  const $proyect = document.createElement("div");
  $proyect.innerHTML = `
  <div class="proyect">
    <h3 class="proyect__title">${title}</h3>
    <p class="proyect__description">${description}</p>
    <img class="proyect__img" src="${imgUrl}" alt="" />
    <a class="proyect__link-demo" href="${linkDemo}" target="_blank">Demo</a>
    <a class="proyect__link-github" href="${linkGithub}" target="_blank">Code</a>
</div>
`;

  $contProyects.appendChild($proyect);
}

function getImgUrl(id) {
  return fetch(
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/assets/" +
      id +
      "?access_token=kwBydJXt14OPeWJ6zjEjj29SeTmhmplg2lhfEr0laxo"
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const urlImg = res.fields.file.url;
      return urlImg;
    });
}

function fetchContentful() {
  fetch(
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/entries?access_token=kwBydJXt14OPeWJ6zjEjj29SeTmhmplg2lhfEr0laxo"
  )
    .then((res) => res.json())
    .then((res) => {
      let data = [];
      res.items.forEach((i) => {
        if (i.fields.description && i.fields.title && i.fields.linkDemo) {
          const title = i.fields.title.content[0].content[0].value;
          const imgId = i.fields.img.sys.id;
          const description = i.fields.description;
          const linkDemo = i.fields.linkDemo.content[0].content[0].value;
          const linkGithub = i.fields.linkGithub.content[0].content[0].value;
          const dataProyect = {
            title,
            imgId,
            description,
            linkDemo,
            linkGithub,
          };
          data.push(dataProyect);
        }
      });
      return data;
    })
    .then((res) => {
      const proyects = res;
      proyects.forEach((proyect) => {
        getImgUrl(proyect.imgId).then((url) => {
          proyect.imgUrl = url;
          render(
            proyect.title,
            proyect.description,
            proyect.imgUrl,
            proyect.linkDemo,
            proyect.linkGithub
          );
        });
      });
    });
}

(function main() {
  fetchContentful();
})();
