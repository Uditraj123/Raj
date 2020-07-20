//class book:represent a book
class BOOK {
    constructor(title,author,edition) {
        this.title=title;
        this.author=author;
        this.edition=edition;
    }
}

//class ui
class UI {
  static  displayBooks() {
       /* const storedbooks=[
            {
                title:"raj",
                author:"p.ch",
                edition:"2019"
            },
            {
                title:"udit",
                author:"pmch.kk",
                edition:"2202"
            }

        ];*/
        const books=store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
   static addBookToList(book) {
       const list=document.querySelector('#book-list');
       const row=document.createElement('tr');
       row.innerHTML="<td>" + book.title + "</td>" +
                     "<td>" + book.author + "</td>" +
                     "<td>" + book.edition + "</td>" +
                     "<td>" +  "<a href='#' class='btn btn-danger btn-sm delete'>" + "X" + "</a>" + "</td>";
   list.appendChild(row);
   }


   static clearField(){
    document.getElementById("title").value='';
    document.getElementById("author").value='';
    document.getElementById("edition").value='';
   }

   static deleteBook(el) {
       if(el.classList.contains('delete')){
           el.parentElement.parentElement.remove();
       }
   }

   static showAlert(message,classname){
       const div=document.createElement('div');
       div.classList.add("alert","alert-" + classname);
       div.appendChild(document.createTextNode(message));
       const container=document.querySelector('.container');
       const form=document.querySelector('#book-form');
       container.insertBefore(div,form);
       setTimeout(()=>document.querySelector('.alert').remove(),3000);
   }
}
//class store:handel storage
class store {
  static  getBooks(){
      let books;
      if(localStorage.getItem('books',books)===null){
          books=[];
      }
      else{
          books=JSON.parse(localStorage.getItem('books'));
      }
      return books;
  }

 static   addBooks(book){
     const books=store.getBooks();
     books.push(book);
     localStorage.setItem('books',JSON.stringify(books));
 }


  static  removeBooks(edition){
const books=store.getBooks();
books.forEach((book,index)=>
{
    if(book.edition===edition){
        books.splice(index,1);
    }
});
localStorage.setItem('books',JSON.stringify(books));
  }
}

//event:display books

document.addEventListener('DOMContentLoaded', UI.displayBooks)



//event:add a book
document.querySelector('#book-form').addEventListener('submit', (e)=>
{
    e.preventDefault();
    const title=document.getElementById("title").value;
    const author=document.getElementById("author").value;
    const edition=document.getElementById("edition").value;

//form validation
if(title==''||author==''||edition==''){
    UI.showAlert('please fill in all fields',"danger");
}
else {

    //initiate book
const book= new BOOK(title,author,edition);

UI.addBookToList(book);


//store a book at local storage
store.addBooks(book);


//show alert book added successfully
UI.showAlert('Book added successfully',"success");

UI.clearField();
}


})


//event:remove a book
document.querySelector('#book-list').addEventListener('click', (e)=>
{
    console.log(e.target);
    UI.deleteBook(e.target);

    
//show alert book removed successfully
UI.showAlert('Book removed successfully',"success");


//remove from local storage
store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
})
//