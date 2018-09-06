module.exports = {
  firstValue: null,
  sort(list){
    let sorted = list.sort();
    this.firstValue = sorted[0];
    
  }
}