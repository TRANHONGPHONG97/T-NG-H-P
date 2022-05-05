const toggles = document.querySelectorAll('.toggle')
const good = document.querySelector('.good')
const cheap = document.querySelector('.cheap')
const fast = document.querySelector('.fast')
const message = document.querySelector('.message')
toggles.forEach(toggle => toggle.addEventListener('change', (e) => doTheTrick(e.target)))

function doTheTrick(theClickedOne){
    if (good.checked && cheap.checked && fast.checked){

       
        if (good === theClickedOne){
            fast.checked = false
    
            message.innerHTML = `Uh uh you can only have <span class="yes">Good</span> &  <span class="yes">Cheap</span><br> It will not be <span class="no">Fast</span> !`

        }
        if (cheap === theClickedOne){
            good.checked = false
            
            message.innerHTML = `Uh uh you can only have <span class="yes">Cheap</span> & <span class="yes">Fast</span><br> It will not be <span class="no">Good</span> !`

        }
        if (fast === theClickedOne){
            cheap.checked = false
           
            message.innerHTML = `Uh uh you can only have <span class="yes">Fast</span> & <span class="yes">Good</span><br> It will not be <span class="no">Cheap</span> !`

        }
    }
}

