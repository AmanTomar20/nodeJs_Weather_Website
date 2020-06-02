
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

const res=document.querySelector('.search-result')
const err=document.getElementById('err')

const fetchRes=(search)=>{
    fetch('/weather?address='+search).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                res.innerHTML=''
                err.textContent=data.error+'Try another Search'
                return
            }
            res.innerHTML=data.location+'<br><br>'+data.data
        })
    })
}

const clrRes=()=>{
    err.textContent=''
    res.innerHTML='Loading...'
}

const formQuery=document.querySelector('form')
const inputSearch=document.querySelector('input')

formQuery.addEventListener('submit',(e)=>{
    e.preventDefault()
    clrRes()
    fetchRes(inputSearch.value)
})