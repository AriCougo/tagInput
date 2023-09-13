 const tagInput = document.getElementById('tag-input');
 const tagCounter = document.getElementById('tag-counter');
 const deleteAllBtn = document.getElementById('delete-all-btn'); 

let tags;

const savedTags = JSON.parse(localStorage.getItem('tags'));

if(Array.isArray(savedTags)){
    tags = savedTags;
}else{
    tags = [{
        newTag: '',
        id: '',
    }];
}

render();

function addTag(newTag){

     const id = '' + new Date().getTime();

    tags.push({
        newTag: newTag,
        id: id
       
    })

    saveTags();
     
   tagCounter.innerText = tags.length;

    render();
}

tagInput.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        createTag();
    }
})

function createTag(){
    const tagInput = document.getElementById('tag-input');
    const newTag = tagInput.value.trim();
    if(newTag !== ''){
        addTag(newTag);
        
    }

    render();
} 

function saveTags(){
    localStorage.setItem('tags',JSON.stringify(tags));
}

function deleteTag(xLi){
    tags = tags.filter(function(tag){
        if(tag.id === xLi){
            return false
        }else{
            return true
        }
    })

    tagCounter.innerText = tags.length;
    render(); 

    saveTags();
   
}

deleteAllBtn.addEventListener('click', deleteAll);

function deleteAll(){  
    tags = []; 
    tagCounter.innerText = 0; 
    render();
    saveTags();
}

function render(){

    document.getElementById('tag-section').innerHTML = '';

    tags.forEach(function(tag){ 
        const divTag = document.createElement('div');
        divTag.innerText = tag.newTag;
        divTag.classList.add('style')
    

        const btn = document.createElement('button');
        const span = document.createElement('span');
        span.innerHTML =  '<i class="fa-solid fa-xmark"></i>';
        span.id = tag.id;
        btn.classList.add('tag');
        span.onclick = function(){
            const tagId = this.id;
            deleteTag(tagId);
        }
        btn.appendChild(span);
        

        divTag.appendChild(btn);

        const tagSection = document.getElementById('tag-section');
        tagSection.appendChild(divTag); 

    }); 

    if(tags.length === 5){
        tagInput.disabled = true;
    }else{
        tagInput.disabled = false;
    }

}