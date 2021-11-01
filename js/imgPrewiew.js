export const handleFileSelect = (event) => {
    const file = event.target.files;
    const f = file[0];
    
    if (!f.type.match('image.*')) {
        alert("Image only please....");
    }

    const reader = new FileReader();

    reader.onload = (function(theFile) {
        return function(e) {
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
            document.getElementById('form__img-output').insertBefore(span, null);
        };
    })(f);
    
    reader.readAsDataURL(f);
}