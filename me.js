class PhoneBook{
    constructor(){
        this.displayMatches=this.displayMatches.bind(this);
        this.contacts=[];
        this.me=document.querySelector("#phonebook tbody");
        this.search=document.querySelector(".search-form .search");
        this.tmpl=document.querySelector("#tmplPhoneBook").content.querySelector("tr");
        this.sortName=this.me.querySelector("#sortName");
        this.sortNumber=this.me.querySelector("#sortNumber");
        this.sortAddress=this.me.querySelector("#sortAddress");
        this.sorting=0;
        this.activeContacts=[];
        this.start();
    }
    start(){
        const endpoint='https://us-central1-johnbalvin.cloudfunctions.net/accescontrol?u=http://www.mocky.io/v2/581335f71000004204abaf83';
        fetch(endpoint,{method:"GET",mode:'cors'})
        .then(blob => {return blob.json();})
        .then(data => {
            this.contacts=data;
        	this.contacts=this.contacts.contacts;
        	let contactsInfo=this.sortBefore(this.contacts);
        	this.displayData(contactsInfo);
        });
        const items =document.querySelectorAll(".item");
        for(let i=0,tam=items.length;i<tam;i++){
            const item=items[i];
            item.addEventListener("click",()=>{
                const img=item.querySelector(".nameOrder");
                if(this.me.dataset.sort==item.dataset.sortme){
                    if(item.dataset.sort=="0"){
                        item.dataset.sort="1";
                        img.style.transform="rotate(-180deg)";
                    }else{
                        item.dataset.sort="0";
                        img.style.transform="rotate(0deg)";
                    }
                }else{
                    img.style.display="flex";
                }
                for(let j=0,tam=items.length;j<tam;j++){
                    const item2=items[j];
                    if(i!=j){
                        item2.querySelector(".nameOrder").style.display="none";
                    }
                }
                this.me.dataset.sort=item.dataset.sortme;
                this.sortAfter();
            });
        }
        const searchInput = document.querySelector('.search');
        searchInput.addEventListener('change', this.displayMatches);
        searchInput.addEventListener('keyup', this.displayMatches);
    }
    findMatches(wordToMatch, contacts) {
        return contacts.filter(contact => {
          const regex = new RegExp(wordToMatch, 'gi');
          return contact.name.match(regex) || contact.phone_number.match(regex) || contact.address.match(regex)
        });
    }
    displayMatches() {
        let matchArray = this.findMatches(this.search.value, this.contacts);
        this.displayData(matchArray);
    }
    sortAfter(){
        let contactsInfo=this.sortBefore(this.contacts);
        this.displayData(contactsInfo);
    }
    sortBefore(contactsInfo){
        switch (this.me.dataset.sort){
            case "0":
                if(this.sortName.dataset.sort=="0"){
                  return contactsInfo.sort((a,b)=> a.name.toLowerCase() > b.name.toLowerCase() ? 1:-1);
                }
                return contactsInfo.sort((a,b)=> a.name < b.name ? 1:-1);
            case "1":
                if(this.sortNumber.dataset.sort=="0"){
                   return contactsInfo.sort((a,b)=> a.phone_number > b.phone_number ? 1:-1);
                }
                return contactsInfo.sort((a,b)=> a.phone_number < b.phone_number ? 1:-1);
            case "2":
                if(this.sortAddress.dataset.sort=="0"){
                    return contactsInfo.sort((a,b)=> a.address.toLowerCase() > b.address.toLowerCase() ? 1:-1);
                }
                return contactsInfo.sort((a,b)=> a.address.toLowerCase() < b.address.toLowerCase() ? 1:-1);        
        }
    }
    displayData(contactsInfo){
        const contacts=this.me.querySelectorAll("tr");
        for(let i=1,tam=contacts.length;i<tam;i++){
            contacts[i].remove();
        }
        for(let i=0,tam=contactsInfo.length;i<tam;i++){
            const info=contactsInfo[i];
            let nuevo=this.tmpl.cloneNode(true);
            nuevo.querySelector(".name").textContent=info.name;
            nuevo.querySelector(".number").textContent=info.phone_number;
            nuevo.querySelector(".addres").textContent=info.address;
            this.me.appendChild(nuevo);
        }
    }
}
new PhoneBook();