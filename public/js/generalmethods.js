var minPrice = document.getElementsByName('price');

minPrice.minValue = 0.01
    
function validateForm() {
    var name = $('input[name = name]');
    var price = $('input[name = price]');
    var image = $('input[name = image]');
    var description = $('input[name = description]');

    if (name.val().length===0||image.val().length===0||price.val()<=0||description.val().length===0) {
        alert('heyyoooo');
        submit.disabled = true;
        return false;
    }else{
        
        return true;
    }

    
}