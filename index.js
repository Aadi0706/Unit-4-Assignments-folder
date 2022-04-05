class Node{
    constructor(data){

        this.data=data;
        this.next=null;
    }
}
class LinkedList{
    constructor(){
        this.head=null;
        this.size=0;
    }

    addAtBegin(data){
        var node= new Node(data);

        this.size++;
        if(this.head==null){
            this.head=node;
            return this.head;
        }
 
        else{
            node.next=this.head;
            this.head=node
            return this.head;
        }


    }

    deleteAt(position){
        
        
        
       
        if(position==0){
            this.head=this.head.next;
            return this.head;
        }

        else{
            let cur= this.head;

            for(let i=1; i<position; i++){
                cur=cur.next;
            }
             cur.next=cur.next.next;
             return cur; 
        }

       
       
    }
}

let list= new LinkedList();
(list.addAtBegin(40));
(list.addAtBegin(59));
// console.log(list.deleteAt(0));
(list.addAtBegin(20));
(list.addAtBegin(60));
console.log(list.deleteAt(1));

