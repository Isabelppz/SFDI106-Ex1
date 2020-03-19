function init() {
    // Clear forms here
    document.getElementById("user").value = "";
}
window.onload = init;

class FormContent{
        constructor(formElement, inputSelectors, submitButton, outputSection){
        this.disabledElements = ["button", "reset", "submit"];
        var inputElements = formElement.querySelectorAll(inputSelectors);
        this.getInputElements = function(){ return inputElements; };
        this.getSubmitButton = function(){ return submitButton; };
        this.getOutputSection = function(){ return outputSection; };
        this.emptyValueMessage = "Unknown";
        this.errorMessage = "<h4 style='color:#FF0000;'>Please fill all the required inputs!</h4>";
        var thisInstance = this;

        if(submitButton && outputSection){
            submitButton.onclick = function(){
                thisInstance.onSubmitButtonClick();
            };
        }
    }
    onSubmitButtonClick(){
        var outputMessage = (this.areRequiredInputsFilled()) ? this.getFormattedFormContent() : this.errorMessage;

        this.printToOutput(outputMessage);
    }
    areRequiredInputsFilled(){
        for(var node of this.getInputElements()){
            if(node.required && !node.value){
                return false;
            }
        }
        return true; 
    }
    printToOutput(content){
        this.getOutputSection().innerHTML = content;
        console.log(content);
    }
    getFormattedFormContent(){
        var formContent = "";
        var formData = this.getFormData();

        for(var input in formData){
            formContent += "<b>" + input + "</b>: " + formData[input] + "<br />";
        }
        return formContent;
    }
    getFormData(){
        var formData = {};

        var noNameCounter = 0;

        var formInputs = this.getFormInputs();

        for(var input of formInputs){
            let inputName = input.name || "no_name_element_" + noNameCounter;
            let inputValue = input.data || input.value || this.emptyValueMessage;

            if(!input.name){
                noNameCounter++;
            }

            formData[inputName] = inputValue;
        }

        return formData;
    }
    getFormInputs(){
        var formInputs = [];

        for(var input of this.getInputElements()){
            if(!this.disabledElements.includes(input.tagName.toLowerCase()) && !this.disabledElements.includes(input.type) && !this.disabledElements.includes(input)){
                if(input.type === "radio"){
                    if(input.checked){
                        formInputs.push(input);
                    }
                }else if(input.type === "checkbox"){
                    input.value = (input.checked) ? true : false;
                    formInputs.push(input);
                }else if(input.multiple){
                    formInputs.push(this.getMultipleInput(input));
                }else if(input.value || input.innerHTML){
                    formInputs.push(input);
                }else{
                    formInputs.push(input);
                }
            }
        }

        return formInputs;
    }
    getMultipleInput(multipleInput){
        var inputInstance = document.createElement("input");
        inputInstance.name = multipleInput.name;

        var values = [];

        if(multipleInput.type !== "file"){
            for(var option of multipleInput){
                if(option.selected){
                    values.push(option.value);
                }
            }
        }else{
            for(var file of multipleInput.files){
                values.push(file.name);
            }
        }

        inputInstance.data = values.toString();

        return inputInstance;
    }
}

var forms = document.getElementsByTagName("form");

for(var form of forms){
    let inputSelectors = "input, select, textaera";
    let submitButton = form.querySelector("#submit-button");
    let outputSection = form.querySelector("#output");

    new FormContent(form, inputSelectors, submitButton, outputSection);
}

function register(){
    console.log(outputSection);
    alert("You registered a new Activity.");
  
}