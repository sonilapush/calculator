const buttonValues=[
    '0','1','2','3','4','5',
    '6','7','8','9','.' ,'+',
    '-','*','/','=','C'
]; 

const rightSymbols=['+','-','*','/', '='];
const topSymbols=['C', '±', '%']; 

// Loop through every item in our list of buttons one by one 
for(let i=0; i<buttonValues.length; i++) {
    
    let value = buttonValues[i];
    let button = document.createElement('button');
    button.innerText = value;
    
    // Check if symbol belongs on the right side
    if(rightSymbols.includes(value)){
        button.style.backgroundColor = 'orange';
        button.style.color = 'white';
    }
    // Check if symbol belongs on the top row
    else if(topSymbols.includes(value)){
        button.style.backgroundColor = 'lightgray';
        button.style.color = 'black';
    }
    
    // Find the container and drop the button inside
    document.getElementById('buttons').appendChild(button);
}
q