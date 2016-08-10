class TabComponent {
  constructor({
    allTabsWrapperId,
    tabOpenedAtStart,
    mode,
    tabClass,
    triggerClass,
    contentClass
  }) {
    this.startTab = tabOpenedAtStart;
    this.tabClass = tabClass;
    this.trigger = triggerClass;
    this.content = contentClass;

    this.wrapper = document.getElementById(allTabsWrapperId);
    this.tabOpenedAtStart = tabOpenedAtStart - 1;
    this.getAllTabs = document.querySelectorAll("#" + allTabsWrapperId + " > " + "." + tabClass);
    this.getAllTriggers = document.querySelectorAll("." + tabClass + " > " + "." + triggerClass);
    this.getAllContents = document.querySelectorAll("." + tabClass + " > " + "." + contentClass);
    this.mode = mode;
  }

  listen() {
    let triggers = this.getAllTriggers;
    let contents = this.getAllContents;
    let tabOpenedAtStart = this.tabOpenedAtStart;
    let self = this;
    let i = 0;
    for (let value of triggers) {

      value.setAttribute('data-tabcomponent-id', i);
      if (i != tabOpenedAtStart) {
        contents[i].classList.add('hiddenFromStart');
        contents[i].classList.add('trans');
      }else{
        contents[i].classList.add('smoothShow');
        contents[i].classList.add('trans');
      }

      i++;

      value.addEventListener('click', function(e) {
        let tabId = e.target.dataset.tabcomponentId;
        //self.hideOrShowContent(tabId);
        //self.hideOthersThanClicked(tabId);
        //self.hide(tabId);
        //self.show(tabId);
        if(self.mode == 1){
          self.hideOrShowContent(tabId);
        }else if(self.mode == 2){
          self.hideOthersThanClicked2(tabId);
        }
        
      });

    }
  }

  //Harder one!
  hideOrShowContent(tabId) {
    let content = this.getAllContents[tabId];
    if (content.classList.contains('hiddenFromStart')) {
      content.classList.remove('hiddenFromStart');
      content.classList.add('smoothHide');
    }

    if (content.classList.contains('smoothHide')) {
      content.classList.toggle('smoothShow');
      content.classList.remove('smoothHide');
    } else {
      content.classList.remove('smoothShow');
      content.classList.add('smoothHide');
    }

  }
  
  hideOthersThanClicked2 (tabId){
    let otherTabs = this.getAllContents;
    let i = 0;
    let self = this;
    for (let tab of otherTabs){
      if(i == tabId){
        self.show(tabId);
      }else{
        self.hide(i);
      }
      i++;
    }
  }


  getCss(element, whichProps) {
    let css = window.getComputedStyle(element, null);
    let returning = {};
    for (let prop of whichProps) {
      returning[prop] = css.getPropertyValue(prop);
    }
    return returning;
  }

  hideOthersThanClicked(tabId) {

    let i = 0;
    for (let content of this.getAllContents) {
      if (content.classList.contains('hiddenFromStart')) {
        content.classList.remove('hiddenFromStart');
        content.classList.add('smoothHide');
      }
      //clicked
      if (i == tabId) {
        content.classList.toggle('smoothHide');
        content.classList.add('smoothShow');
      }else{
        //content.classList.toggle('smoothHide')
      }
      i++;
    }
  }
  
  hide(id){
    let content = this.getAllContents[id];
    let trigger = this.getAllTriggers[id];
    
    if (content.classList.contains('hiddenFromStart') || content.classList.contains('smoothHide')) {
      //content.classList.remove('hiddenFromStart');
      //content.classList.add('smoothHide');
    }else{
        content.classList.remove('smoothShow');
        content.classList.add('smoothHide');
        content.classList.remove('hiddenFromStart');
    }



  }
  show(id){
    let content = this.getAllContents[id];
    
    if (content.classList.contains('hiddenFromStart')) {
      content.classList.remove('hiddenFromStart');
      content.classList.add('smoothShow');
    }else{
      if(!content.classList.contains('smoothShow')){
          content.classList.add('smoothShow');
          content.classList.remove('smoothHide');
      }

    }
    
  }
}

new TabComponent({
  allTabsWrapperId: 'hello',
  tabOpenedAtStart: 2,
  mode: 2,//'allCanBeOpen',//'onlyOneAtTheTime'
  tabClass: 'tabs',
  triggerClass: 'trigger',
  contentClass: 'content'
}).listen();
