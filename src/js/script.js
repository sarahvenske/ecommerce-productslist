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

        const nutrientes = document.createElement('div')
        nutrientes.className = "nutrientes"
        nutrientes.innerText = listaProdutos[i].componentes
        
        const span = document.createElement('span')
        span.className = "span_card"

        const preco = document.createElement('div')
        preco.className = "preco"
        preco.innerText = listaProdutos[i].preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        const botaoComprar = document.createElement('button')
        botaoComprar.className = "botao_comprar"
        botaoComprar.innerText = "Comprar"

        divImg.append(img)
        span.append(preco, botaoComprar)
        card.append(divImg, nome, tag, nutrientes, span)
        ul.append(card)

          //Evento adicionado ao card e modelagem dos dados no carrinho:
        
        function addProduto (){
            arrayProdutosSelecionados.push(listaProdutos[i])
            valorTotal()
            renderizarCart()
        }
        card.addEventListener("click", addProduto)
    } 
    sectionCards.append(ul)
}

renderCard(produtos)


//Filtro tag Todos os Produtos:

function retornarTodos(){
    
    sectionCards.innerHTML = ""
    
    const produtosFiltrados = produtos.filter((produto) => {
        return produtos
    })
    renderCard(produtosFiltrados) 
}

const tagTodosProdutos = document.querySelector('#btn_todos_produtos')
tagTodosProdutos.addEventListener("click", retornarTodos)



//Filtro produtos tag Hortifrutti:

function filtrarHortifruti(){
    
    sectionCards.innerHTML = ""
    
    const produtosFiltrados = produtos.filter((produto) => {
        return produto.secao === "Hortifruti"
    })
    renderCard(produtosFiltrados) 
    
}

const tagHortifruti = document.querySelector('#btn_hortifruti')
tagHortifruti.addEventListener("click", filtrarHortifruti)



//Filtro produtos tag Panificadora:

function filtrarPanificadora(){
    
    sectionCards.innerHTML = ""
    
    const produtosFiltrados = produtos.filter((produto) => {
        return produto.secao === "Panificadora"
    })
    renderCard(produtosFiltrados) 
}

const tagPanificadora = document.querySelector('#btn_panificadora')
tagPanificadora.addEventListener("click", filtrarPanificadora)



//Filtro produtos tag Laticínios:

function filtrarLaticinios(){
    
    sectionCards.innerHTML = ""
    
    const produtosFiltrados = produtos.filter((produto) => {
        return produto.secao === "Laticínio"
    })
    renderCard(produtosFiltrados) 
}

const tagLaticinios = document.querySelector('#btn_laticinios')
tagLaticinios.addEventListener("click", filtrarLaticinios)



//Busca campo pesquisa (nome, categoria, seção):

const searchButton = document.querySelector(".search_button")

function search(){
    
    sectionCards.innerHTML = ""
    
    let input = document.querySelector('.search_field')
    let value = input.value;
    
    let filtroName = produtos.filter((texto) => {
        return value.toLowerCase() === texto.nome.toLowerCase()
    })
    
    let filtroCategory = produtos.filter((texto) => {
        return value.toLowerCase() === texto.categoria.toLowerCase()
    })
    
    let filtroSection = produtos.filter((texto) => {
        return value.toLowerCase() === texto.secao.toLowerCase()
    })
    
    renderCard(filtroName)
    renderCard(filtroCategory)
    renderCard(filtroSection)
}

searchButton.addEventListener("click", search)



//Listar itens no Carrinho:

const ulCart = document.querySelector('.cart_render_list')

function renderizarCart(){
    
    ulCart.innerHTML = ""
    
    if(arrayProdutosSelecionados.length == 0){
        ulCart.innerText = "Por enquanto não há produtos no carrinho."
    }else{
        
        for(let i = 0; i < arrayProdutosSelecionados.length; i++){
            
            const cardCarrinho = document.createElement('li')
            cardCarrinho.className = "card_carrinho"
            
            const divEsquerda = document.createElement('div')
            divEsquerda.className = "div_esquerda"
            
            const imgCarrinho = document.createElement('img')
            imgCarrinho.className = "img_carrinho"
            imgCarrinho.src = arrayProdutosSelecionados[i].img
            
            const divDireita = document.createElement('div')
            divDireita.className = "div_direita"
            
            const div1 = document.createElement('div')
            div1.className = "div1"
            
            const nomeCarrinho = document.createElement('div')
            nomeCarrinho.className = "nome_carrinho"
            nomeCarrinho.innerText = arrayProdutosSelecionados[i].nome
            
            const botaoExcluir = document.createElement('button')
            botaoExcluir.className = "btn_excluir"
            botaoExcluir.innerText = "X"
            
            const secaoCarrinho = document.createElement('div')
            secaoCarrinho.className = "secao_carrinho"
            secaoCarrinho.innerText = arrayProdutosSelecionados[i].secao
            
            const precoCarrinho = document.createElement('div')
            precoCarrinho.className = "preco_carrinho"
            precoCarrinho.innerText = arrayProdutosSelecionados[i].preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            
            div1.append(nomeCarrinho, botaoExcluir)
            divEsquerda.append(imgCarrinho)
            divDireita.append(div1, secaoCarrinho, precoCarrinho)
            cardCarrinho.append(divEsquerda, divDireita)
            ulCart.append(cardCarrinho)
            

            //Remover Produto Carrinho:
            
            function removerProduto(event){
                const button = event.target    
                arrayProdutosSelecionados.splice(button.id,1)
                
                renderizarCart()
                valorTotal()  
            }
            botaoExcluir.addEventListener("click", removerProduto)
        }
    }
}
renderizarCart()
    
//Função Totais (quantidade e valor dos produtos selecionados)

const boxQuantidade = document.querySelector('.cart_box_quantity')
const boxSoma = document.querySelector('.cart_box_value')


function valorTotal(){
    
    let soma = 0
  
    boxQuantidade.innerHTML = ""
    boxSoma.innerHTML = ""
    
    if(arrayProdutosSelecionados.length > 0){
        
        for(let i = 0; i < arrayProdutosSelecionados.length; i++){
        soma += arrayProdutosSelecionados[i].preco
        }
    
    const textoQde = document.createElement('div')
    textoQde.innerText = "Quantidade:"
    
    const qdeTotal = document.createElement('div')
    qdeTotal.className = "qde_total"
    qdeTotal.innerText = arrayProdutosSelecionados.length

    const textoTotal = document.createElement('div')
    textoTotal.innerText = "Total:"

    const vlrTotal = document.createElement('div')
    vlrTotal.className = "vlr_total"
    vlrTotal.innerText = soma.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    
    boxQuantidade.append(textoQde, qdeTotal)
    boxSoma.append(textoTotal, vlrTotal)

    }
}

valorTotal()
    
    