const showInputError = ({ formElement, inputElement, errorMessage, inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.popup__input_type_${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = ({ formElement, inputElement, inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.popup__input_type_${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ''
}; 

const isValid = ({ formElement, inputElement, inputErrorClass, errorClass }) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError({ formElement, inputElement, errorMessage: inputElement.validationMessage, inputErrorClass, errorClass });
  } else {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}; 

const setEventListeners = ({ 
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid({ formElement, inputElement, inputErrorClass, errorClass });
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners({ formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass });
  });
};

export const clearValidation = (formElement, validationConfig) => {
  const { inputErrorClass, errorClass, inactiveButtonClass, submitButtonSelector } = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
  });
}; 
