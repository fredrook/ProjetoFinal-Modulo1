import dataBaseProdutos from "./database.js"

let quantidade = 0

let total = 0

const cardsConteiner = document.querySelector(".cardsConteiner")

// CRIAR AS TAGS DENTRO DA FUNÇÃO NA ORDEM DO HTML 
function criarProdutosImg(fotos, nomeDosItens, categ, descricoes, valores, porNoCarrinho) {

  const cards = document.createElement("li")
  const fotoConteiner = document.createElement("div")
  const image_foto = document.createElement("img")
  const tagH2 = document.createElement("h2")
  const categorias = document.createElement("p")
  const descricaoProduto = document.createElement("p")
  const tagSpan = document.createElement("span")
  const btnAdd = document.createElement("button")

  cards.classList.add("cards")
  fotoConteiner.classList.add("fotoConteiner")
  image_foto.classList.add("image_foto")
  tagH2.classList.add("tagH2")
  categorias.classList.add("categorias")
  descricaoProduto.classList.add("descricaoProduto")
  tagSpan.classList.add("tagSpan")
  btnAdd.classList.add("btnAdd")

  // PEGANDO AS TAGS E DESTRINCHANDO
  image_foto.src = fotos
  tagH2.innerText = nomeDosItens
  categorias.innerText = categ
  descricaoProduto.innerText = descricoes
  tagSpan.innerText = `R$ ${valores}`
  btnAdd.innerText = porNoCarrinho

  cardsConteiner.append(cards)
  cards.append(fotoConteiner, tagH2, categorias, descricaoProduto, tagSpan, btnAdd)
  fotoConteiner.append(image_foto)


  btnAdd.addEventListener("click", infoItensBox)
}

function infoItensBox(event) {
  const btnAdd = event.target
  const cards = btnAdd.parentElement
  const tagH2 = cards.querySelector("h2").innerText
  const image_foto = cards.querySelector(".image_foto").src
  const tagSpan = cards.querySelector(".tagSpan").innerText

  criarCarrinho(tagH2, image_foto, tagSpan)
  somarCarrinho()
  quantidadeCarrinho()
}

function criarCarrinho(tagH2, image_foto, tagSpan) {

  const carrinho = document.querySelector(".carrinho")

  const carrinhocontent = document.createElement("div")
  const funkos = document.createElement("img")
  const nomeH2Carrinho = document.createElement("h2")
  const money = document.createElement("span")
 
  const btnAddContainer = document.createElement("button")
  btnAddContainer.addEventListener("click", () => {
  btnAddContainer.parentElement.remove()
  quantidade--
  
  quantidadeCarrinho()

  // PEGAR O TOTAL E DECRESCER DO OBJETO JUNTO COM O VALOR
  const divCarinho        = document.querySelector(".carrinho")

  let valueCarrinho       = divCarinho.querySelector(".carrinhocontent")

  let decrePreco         = valueCarrinho.querySelector("span")

  let preco              = parseFloat(decrePreco.innerText.replace("R$", ""))

  total = total - preco
  const decrePreco2 = document.querySelector(".spanPreco")
  decrePreco2.innerText = `R$ ${total.toFixed(2)}`
  })

  nomeH2Carrinho.classList.add("nomeH2Carrinho")
  carrinhocontent.classList.add("carrinhocontent")
  btnAddContainer.classList.add("btnAddContainer")
  funkos.src = image_foto
  nomeH2Carrinho.innerText = tagH2
  money.innerText = tagSpan
  btnAddContainer.innerText = `x`

  carrinho.append(carrinhocontent)
  carrinhocontent.append(funkos, nomeH2Carrinho, money, btnAddContainer)

  quantidade++
}

function somarCarrinho() {

  const divCarinho        = document.querySelector(".carrinho")

  let itemCarrinho       = divCarinho.querySelector(".carrinhocontent")

  let precoItem          = itemCarrinho.querySelector("span")
  let preco              = parseFloat(precoItem.innerText.replace("R$", ""))

  total = total + preco

  document.querySelector(".spanPreco").innerText = "R$" + total.toFixed(2)
}

function quantidadeCarrinho() {

  const quantCarrinho = document.querySelector(".spanQuant")

  quantCarrinho.innerText = quantidade
}

// AQUI PONHO PARA RODAR O SITE
function renderizarSite() {
  dataBaseProdutos.forEach((item) => criarProdutosImg(item.img, item.nameItem, item.category, item.description, item.price, item.addCart))
}
renderizarSite()