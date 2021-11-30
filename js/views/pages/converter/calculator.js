import {
  getCurrency
} from '../../../helpers/currencies/NBRB';

import SidebarInputSelect from './input-select';

class Calculator {

  setActions() {

    const inputsArr = [...document.getElementsByTagName('input')],
      selectArr = [...document.getElementsByTagName('select')],
      buttonAdd = document.getElementsByClassName('input-select_btn-add')[0],
      eventInput = ['input', 'keyup', 'keydown', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'];

    selectArr.forEach(select => select.addEventListener('change', this.render));
    buttonAdd.addEventListener('click', this.addCurr);

    inputsArr.forEach(input => eventInput.forEach(event => {
      input.addEventListener(event, this.setInputFilter);
      input.addEventListener(event, () => this.calculate(inputsArr));
    }));
  }

  setInputFilter() {
    const inputFilter = /^\d*[.,]?\d*$/.test(this.value);

    if (inputFilter) {
      this.oldValue = this.value;
      this.oldSelectionStart = this.selectionStart;
      this.oldSelectionEnd = this.selectionEnd;
    } else if (this.hasOwnProperty('oldValue')) {
      this.value = this.oldValue;
      this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
    } else {
      this.value = '';
    }
  }

  addCurr() {
    let currList = document.getElementsByClassName('curr-list')[0];
    let inputSelect = new SidebarInputSelect();
    inputSelect.render().then(html => {
      currList.insertAdjacentHTML('beforeend', html);
      Calculator.prototype.setActions();
    });
  }

  calculate(inputs) {
    const target = event.target,
      selectInput = Calculator.prototype.getElement('s' + target.id).value,
      baseCur = target.value;

    if (target.tagName == 'INPUT' && selectInput == 'BYN') {

      inputs.filter(el => el.id != target.id).forEach(el => {
        if (Calculator.prototype.getElement('s' + el.id).value == 'BYN') {
          el.value = target.value;
        } else {
          let convertCur = getCurrency(Calculator.prototype.getElement('s' + el.id).value).Cur_OfficialRate;
          el.value = +(baseCur / convertCur).toFixed(4);
        }
      });



    } else if (target.tagName == 'INPUT' && selectInput != 'BYN') {

      inputs.filter(el => el.id != target.id).forEach(el => {

        if (Calculator.prototype.getElement('s' + el.id).value == 'BYN') {
          let convertCur = getCurrency(Calculator.prototype.getElement('s' + target.id).value).Cur_OfficialRate;
          el.value = +(baseCur * convertCur).toFixed(4);
        }

      });

      inputs.filter(el => el.id == target.id).forEach(el => {
        el.value = target.value;

      });
    }
  }

  getElement(str) {
    return document.getElementById(str) || document.getElementsByClassName(str)[0];
  }

  render() {
    const target = event.target,
      value = target.value,
      id = target.id,
      inputId = target.id.slice(1);
    if (id.startsWith('si') && value != 'BYN') {
      document.getElementById(inputId).value = getCurrency(value).Cur_OfficialRate;
    }
  }
}

export default Calculator;