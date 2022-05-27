const sectionCards = document.querySelector('.section_cards')

let arrayProdutosSelecionados = []


//Criação dinâmica dos cards de produtos:

function renderCard(listaProdutos){
    
    const ul = document.createElement('ul')
    ul.className = "tagUl"
    
    for(let i = 0; i < listaProdutos.length; i++){
        
        const card = document.createElement('li')
        card.className = "card"        
        
        const divImg = document.createElement('div')
        divImg.className = "figure"
        
        const img = document.createElement('img')
        img.className = "img"
        img.src = listaProdutos[i].img
        
        const nome = document.createElement('div')
        nome.className = "nome"
        nome.innerText = listaProdutos[i].nome
        
        const tag = document.createElement('div')
        tag.className = "tag"
        tag.innerText = listaProdutos[i].secao
        
        const preco = document.createElement('div')
        preco.className = "preco"
        preco.innerText = listaProdutos[i].preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        
        divImg.append(img)
        card.append(divImg, nome, tag, preco)
        ul.append(card)
        
        
        //Evento adicionado ao card:
        
        function addProduto (){
            
            arrayProdutosSelecionados.push(listaProdutos[i])
            
            valorTotal()
        }
        
        card.addEventListener("click", addProduto)
    }
    
    sectionCards.append(ul)
}

renderCard(produtos)

//Função soma - total de valores produtos selecionados

const total = document.querySelector('.box_total_value')
total.innerText = "R$0,00"

function valorTotal(){
    
    let soma = 0
    
    if(arrayProdutosSelecionados.length > 0){
        
        total.innerHTML = " "

        for(let i = 0; i < arrayProdutosSelecionados.length; i++ ){
            soma += arrayProdutosSelecionados[i].preco
        }

        const valorSoma = document.createElement('div')
        valorSoma.className = "valorSoma"
        valorSoma.innerText = soma.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        total.append(valorSoma)
    }
}

//Filtro tag Todos os Produtos:

function retornarTodos(){

    sectionCards.innerHTML = ""

    const produtosFiltrados = produtos.filter((produto) => {
        return produtos
    })
    renderCard(produtosFiltrados) 

}

const tagTodosProdutos = document.querySelector("#btn_todos_produtos")
tagTodosProdutos.addEventListener("click", retornarTodos)

//Filtro produtos tag Hortifrutti:

function filtrarHortifruti(){
   
    sectionCards.innerHTML = ""

    const produtosFiltrados = produtos.filter((produto) => {
        return produto.secao === "Hortifruti"
    })
    renderCard(produtosFiltrados) 
}

const tagHortifruti = document.querySelector("#btn_hortifruti")
tagHortifruti.addEventListener("click", filtrarHortifruti)


//Filtro produtos tag Panificadora:

function filtrarPanificadora(){
    
    sectionCards.innerHTML = ""

    const produtosFiltrados = produtos.filter((produto) => {
        return produto.secao === "Panificadora"
    })
    renderCard(produtosFiltrados) 
}

const tagPanificadora = document.querySelector("#btn_panificadora")
tagPanificadora.addEventListener("click", filtrarPanificadora)


//Filtro produtos tag Laticínios:

function filtrarLaticinios(){
    
    sectionCards.innerHTML = ""

    const produtosFiltrados = produtos.filter((produto) => {
        return produto.secao === "Laticínio"
    })
    renderCard(produtosFiltrados) 
}

const tagLaticinios = document.querySelector("#btn_laticinios")
tagLaticinios.addEventListener("click", filtrarLaticinios)

//Busca campo pesquisa:

function search(){
    
    sectionCards.innerHTML = ""

    let input = document.querySelector(".search_field")
    let value = input.value;
    
    let filtro = produtos.filter((texto) => {
        return value.toLowerCase() === texto.nome.toLowerCase()
    })
    
    renderCard(filtro)
}

const searchButton = document.querySelector(".search_button")
searchButton.addEventListener("click", search)


