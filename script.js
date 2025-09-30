class Node {
    constructor(value = null, next = null){
        this.value = value;
        this.next = next;
    }
}

class LinkedList{
    //o construtor estará com um valor default, de forma a que seja sempre criada uma lista vazia sempre que se criar uma instância desta classe
    constructor(list){
        this.list = new Node();
    };



    //este método permite que seja possivel adicionar nodes à linked list, dando um valor
    //depreende-se sempre que se adicionar um valor à lista, que este node será colocado no final da lista. Tal como qualquer outra linked list, a referência para o próximo valor terá de ser obrigatóriamente um valor vazio, ou seja, nulo. Daí que apenas precisamos que seja dado um valor, já que a referência ao próximo elemento não existe (nulo)
    append(value){
        //criamos um node novo, como uma instância da classe "Node"
        let newNode = new Node(value);
        //criamos uma cópia da lista (trata-se de um objecto)
        //let nodeSearch = this.list;
        let nodeSearch = Object.assign({}, this.list);
        //enquanto o node a ser procurado não tiver um valor pró
        /*while(!nodeSearch.hasOwnProperty("next") || nodeSearch.next != null){

        };*/
        while(true){
            //isto para o caso de depararmos com uma lista que não tem nodes nenhuns, isto fará com que a lista tenha o seu primeiro valor
            if(nodeSearch.value == null){
                nodeSearch.value = value;
                break;
            }
            //se o valor não é nulo e se o próximo node é vazio
            if(nodeSearch.next == null){
                //coloca-se o newNode dentro da lista de cópia
                nodeSearch.next = newNode;
                break;
            }

            //se o node actual tem um valor não nulo e se ele tem uma referência a um node que também não é nulo:
            //então o nodeSearch tem de ser igual ao próximo node
            nodeSearch = this.list.next

            
        }
        //depois de tudo tratado, a lista original tem de ser igual à lista de cópia (CONVÉM QUE ISTO ACONTEÇA APENAS DEPOIS DE FINALIZAR O CICLO WHILE)
        this.list = Object.assign({}, nodeSearch);
    }
}