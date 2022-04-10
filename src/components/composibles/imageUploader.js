import { watch, ref } from 'vue';

export function imageUploader() {
    let imageFile = ref("");
    let imageURL = ref("");

    function handleImageSelector(event) {
        console.log(event)
        // if no image select it show error this code prevent that error
        if(event.target.files.length == 0){
            imageFile.value  = "";
            imageURL.value = ""
            return;
        }
        // imagefile array must be start from 0
        imageFile.value = event.target.files[0]
    }
        // if the imageFile have the file we represent it this way
        watch(imageFile, (imageFile) => {
            if(!(imageFile instanceof File)){
                return;
            }

            // google Filereader
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);

            // after reading image we create data to load using eventListener
            fileReader.addEventListener("load", ()=> {
            imageURL.value = fileReader.result; //it will display base 64
            console.log(imageURL.value)
            })
            
        }) 

        return {
            handleImageSelector,
            imageFile,
            imageURL,
        }
}