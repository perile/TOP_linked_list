class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor() {
        this.list = {}
    }

    append(value, list = this.list) {
        //If the list is empty, then it means that there is no node
        if (list.value == null) {
            //and populate the empty list with a value. Because this might be the first node of the linked list, then it only makes sence that there is no need to place a next node to this node
            list.value = value;
        } else {
            //in the case where the list is not empty...
            //create a new node instance
            let newNode = new Node(value);
            //search for the last element so that we can place the new node to the end
            this.searchForAppend(list, newNode)
        }
    }

    //search function to search deep into the linked list, with "n" depth, so unknown, therefore usign a recursive fashion is preferable to an iterable one.
    //to be used for the sake of the "append" method of the current class
    searchForAppend(list, newNode) {
        //in case that the next element is null (the reference of the current node is null), then all we need is to make it so that the reference of the next node is the new element
        if (list.nextNode == null) {
            list.nextNode = newNode
            //get out of the current call stack of this function
            return
            //if it not null
        } else {
            //check the next node
            this.searchForAppend(list.nextNode, newNode)
        }
    }

    //adds a new node containing value to the start of the list
    //same as the append method, only simpler, since we only need to place the new element to the start of the list, therefore there is no recursiveness
    prepend(value) {
        //If the list is empty...
        if (this.list.value == null) {
            //then we can just add the property "value" to the first node
            this.list.value = value;
            //if the list is not empty...
        } else {
            //we create a new node, where the next node is going to be the current list of the linked list, just because it is simpler this way
            let newNode = new Node(value, this.list)
            this.list = Object.assign({}, newNode)
        }
    }

    //returns the total number of nodes in the list
    size() {
        //use a counter so that we can keep track of the number of nodes in the linked list as we go deep into it
        //start at zero, so that whenever the list is empty, we will consider that as a list without nodes, therefore it is an empty linked list
        let count = 0
        //if the list is indeed empty (which is the same as checking whether the value of the list right at the start is empty, then we can assume that the linked list is empty) (MAYBE IT IS BETTER TO CHANGE THAT, IN CASE WE DO HAVE A NODE WITH NULL AS A VALUE, BUT STILL HAS A REFERENCE TO A NODE AFTER IT)
        if (this.list.value == null && this.list.nextNode == null) {
            return count
        }
        //if the first node has null as value, but still has a reference to another node, then we have two nodes and return that
        if (this.list.value == null) {
            console.log("baguinguiiiiiiii")
            return count += 2
        }
        //in case the list is populated, we will create a copy of the current linked list. This is for the sake of both convenience and to not change the original linked list, given the while loop that lower in the code
        let aux = Object.assign({}, this.list)
        //instead of having an outer function that will recursively go down into the depth of the linked list, we can just use a while loop to do the same, since we do not need to pass any arguments
        while (true) {
            //since we are at this point of the code, and if this is the first time the code within the while loop is being run, then it is infered that there is one element in the linked list
            //every iteration after the first one, then more will be incremented to the count
            count += 1
            //if we have reached the end of the linked list (or in this case, a copy of it)
            if (aux.nextNode == null) {
                //and return the count
                return count
                //if we have not reached the end of the list
            } else {
                //we go down deeper into the linked list
                aux = Object.assign({}, aux.nextNode)
            }
        }
    }

    //returns the first node in the list
    head() {
        //simple as that, with the next line, we will just return the beginning of the list
        return this.list
    }

    //returns the last node in the list
    tail(list = this.list) {
        //create a copy of the linked list, for the same reasons in the "size" method
        let aux = Object.assign({}, list)
        //unlike the "size" method, we do not need to use a count to know how many levels of depth there is, only to check when the last node has been reached. The way we know that is when the current node does not have a reference to another node
        while (true) {
            if (aux.nextNode == null) {
                return aux
            } else {
                //in case the current node still points to another existing node, then go down another level of depth
                aux = Object.assign({}, aux.nextNode)
            }
        }
    }

    //returns the node at the given index (the philosophy applied to the index arrays is applied here, as in the first index is index zero)
    at(index) {
        //we use a counter, that will be of the same value as the index, for convenience
        let count = index
        //check the size of the current linked list, because we do not want to risk running code to check for an index that goes beyond the bounds of the size of the linked list
        let listSize = this.size()
        //if the index to be checked is beyond the number of nodes of the current linked list...
        if (count > listSize - 1 || count < 0) {
            //return that that is simply not possible
            return `It is not possible to search for a node whoose index goes beyond the bounds of the size of the current linked list. \nCurrent linked list size: ${this.size()}, index to be searched: ${count}`
        }
        //at this point of the code, we can assume that the index to be checked is less than or equal to the size of the linked list minus 1
        let aux = Object.assign({}, this.list)

        //we loop through the depth of the linked list
        while (true) {
            //if the count is zero, or in other words, if we have reached the "index" that we wanted, then it means that we now have the current node being searched for
            if (count == 0) {
                //then return the node
                return aux
                //the count not being zero means we have not reached the goal
            } else {
                //decrement the count by one
                count -= 1
                //down one level
                aux = Object.assign({}, aux.nextNode)
            }
        }
    }

    //removes the last element from the list
    pop() {
        //caso a lista esteja vazia (o primeiro elemento é nulo no valor e no próximo)
        //if the list is empty (the first element has both as a value and next node "null")
        if (this.list.value == null) {
            //we do not remove anything given that there is nothing to be removed, since the list is empty
            return `Since the list is empty, there is nothing to be removed`
            //if the list only has one element
        } if (this.list.nextNode == null) {
            //we only make it so that the reference to the next node to the single node of this list is null, which is equivalent to removing the last node
            this.list.value = null;
            //if the linked list has more than one element...
        } else {
            //using count, we can reach the depth we seek, which is the penultimate node of the list. The reason why it is the penultimate is because it is always going to be the one before the last one and since the penultimate is the only one we need to modify to remove the last element
            let count = this.size() - 2
            //we use the searchForPop method to help to get deeper into the linked list
            this.list = Object.assign({}, this.searchForPop(this.list, count))
        }
    }

    //method that helps the pop method to go deeper into the linked list
    searchForPop(list, count) {
        //if we have found the penultimate element (check the pop method for the reason why this "penultimate term is used")
        if (count == 0) {
            //just make it so that the reference to the next node of the current node is null
            list.nextNode = null
            //return the list
            return list
            //we have not reached the given node 
        } else {
            //go deeper into the list, the count is decremented because of that
            this.searchForPop(list.nextNode, count - 1)
        }
        //in the end, return the list
        return list
    }


    //returns true if the passed in value is in the list and otherwise returns false.
    contains(value) {
        //we use "searchForContains" as a helper method to go deeper into the linked list
        return this.searchForContains(this.list, value)

    }

    //method helper for the "contains" method to go deeper into the linked list
    searchForContains(list, value) {
        //check the value of the first node
        if (list.value == value) {
            //just return true, because we have found the node
            return true
        }
        //if there is no next node, also means that we have not found the value in the nodes we searched about
        if (list.nextNode == null) {
            //just return false
            return false
            //if we have not found the value in the current node and if there is a next node...
        } else {
            //... then we go deeper into the linked list
            return this.searchForContains(list.nextNode, value)
        }
    }

    //returns the index of the node containing value, or null if not found.
    find(value) {
        //use the "searchForFind" method as a helper to go deeper into the linked list
        return this.searchForFind(this.list, value, 0)
    }

    //helper method for the "find" method. It has three paramenters:
    /*
    list => the list being searched, where it will obviously be the current linked list
    value => the value of the node we are searching
    count => because we need an index to be returned for the "find" method, we need to keep track of the depth/index
    */
    searchForFind(list, value, count) {
        //check the value
        if (list.value == value) {
            //if this is the right node, then return the count
            return count
        }
        //if this is not the value and there is no other next node...
        if (list.nextNode == null) {
            //return null, meaning that there is no node to be found
            return null
            //if this is not the right node (the value does not match) and if there is a reference to a next node by the current node...
        } else {
            //go deeper into the linked list
            return this.searchForFind(list.nextNode, value, count + 1)
        }
    }

    //represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString() {
        //if the linked list has no nodes
        if (this.size() == 0) {
            //just return null
            return "null"
        }
        //we will create an empty string which will encompass the whole text featuring the string of nodes
        let string = ""
        //we need the value of the string to be equal to the return of the helper method "listingAllToString", which will go deeper into the linked list
        string = this.listingAllToString(this.list, string)
        //in the end, return the string
        return string
    }

    //helper method for the "toString" method. it has two paramenters: the current linked list and the string that will emcopass the text that will have all the nodes written out
    listingAllToString(list, str) {
        //if there is no next node being referenced by the current node...
        if (list.nextNode == null) {
            //return the text that will have the "ending"
            return str.concat(" ( ", String(list.value), " ) -> ", "null")
            //in case there are more nodes following the current one, go deeper and add text to the string 
        } else {
            return str.concat(" ( ", String(list.value), " ) ->", this.listingAllToString(list.nextNode, str))
        }
    }

    //inserts a value in the current linked list at a given index
    insertAt(value, index) {
        //find the size of the current linked list
        let sizeOfLinkedList = this.size()
        //check whether the index is within the bounds of the size of the current linked list
        if (index > sizeOfLinkedList - 1 || index < 0) {
            return `Cannot insert the node of value ${value}, size the index given is beyond the scope of the size of the current linked list.\nIndex given: ${index}\nSize of the linked list: ${sizeOfLinkedList}`
        }

        //variable to get the value of the node before the one that needs to be replaced
        let theNodeBeforeValue;
        //if it is not the first value
        if (index > 0) {
            //store the value
            theNodeBeforeValue = this.at(index - 1).value
        } else {
            //just use the prepend
            this.prepend(value)
        }

        //create two lists, one empty, that will be filled later and a copy of the current original linked list
        let aux = new LinkedList()
        let aux2 = Object.assign({}, this.list)

        //loop through the current linked list, where the condition depends on the size of the current list. Will be decremented
        while (sizeOfLinkedList >= 1) {
            //if the value of the current node is different of the node we are looking for...
            if (aux2.value != theNodeBeforeValue) {
                //insert in the smaller array the current value
                aux.append(String(aux2.value))
                //decrement
                sizeOfLinkedList--
                //if the value of the current node is the same as the one we are looking for...
            } else if (aux2.value == theNodeBeforeValue) {
                //add that value
                aux.append(String(aux2.value))
                //also add the value that we wanted in the first place
                aux.append(String(value))
                //decrement
                sizeOfLinkedList--
            }
            //go deeper into the copied linked list
            aux2 = aux2.nextNode
        }
        //update the values
        this.list = Object.assign({}, aux.list)

    }

    //removes a node in the current linked list at a given index
    removeAt(index) {
        //find the size of the current linked list
        let sizeOfLinkedList = this.size()
        //check whether the index is within the bounds of the size of the current linked list
        if (index > sizeOfLinkedList - 1) {
            return `Cannot insert the node of value ${value}, size the index given is beyond the scope of the size of the current linked list.\nIndex given: ${index}\nSize of the linked list: ${sizeOfLinkedList}`
        }

        //variable to get the value of the node we want to remove
        let theNodeToBeRemoved;
        //if it is not the first value
        if (index > 0) {
            //store the value
            theNodeToBeRemoved = this.at(index).value
        } else {
            //store the value of the first node
            theNodeToBeRemoved = this.head().value
        }

        //create two lists, one empty, that will be filled later and a copy of the current original linked list
        let aux = new LinkedList()
        let aux2 = Object.assign({}, this.list)

        //loop through the current linked list, where the condition depends on the size of the current list. Will be decremented
        while (sizeOfLinkedList >= 1) {
            //if the value of the current node is different of the node we are looking for...
            if (aux2.value != theNodeToBeRemoved) {
                //insert in the smaller array the current value
                aux.append(String(aux2.value))
                //decrement
                sizeOfLinkedList--
                //if the value of the current node is the same as the one we are looking for...
            } else if (aux2.value == theNodeToBeRemoved) {
                //we do not add to the smaller list, and just decrement
                sizeOfLinkedList--
            }
            //go deeper into the copied linked list
            aux2 = aux2.nextNode
        }
        //update the values
        this.list = Object.assign({}, aux.list)

    }

}

let x = new LinkedList()

console.log(x)

x.append("kunami")
console.log(x)

x.append("fenini")
console.log(x)

x.append("matuqui")
console.log(x)

x.append("maracaté")
console.log(x)

x.prepend("farfala")
console.log(x)

console.log("the size of the linked list: " + x.size())

console.log("the first node of the x list: ")
console.log(x.head())

console.log("the last node of the x list: ")
console.log(x.tail())

console.log("The index 3 of the current list should be the matuqui (next node => maracaté)")
console.log(x.at(4))

console.log("maracaté is to be poped out");
x.pop()
console.log(x)

console.log("there is fenini, so the result should be true\n\n\n")
console.log(x.contains("fenini"))

console.log("the index of the matuqui is 3, so that should be the result")
console.log(x.find("matuqui"))

console.log("Now for the listing\nThe list should look like this: \n ( farfala ) -> ( kunami ) -> ( fenini ) -> ( matuqui ) -> null")

console.log(x.toString())

console.log("insert Baguingui at index 2")
x.insertAt("BAGUINGUI", 2)
console.log("value of x")
console.log(x.toString())

console.log("insert batatuni at index 3")
x.insertAt("batatuni", 3)
console.log("value of x")
console.log(x.toString())

console.log("insert huhuhu at the index 0")
x.insertAt("huhuhu", 0)
console.log("value of x")
console.log(x.toString())

console.log("remove BAGUINGUI at index 2")
x.removeAt(2)
console.log("value of x")
console.log(x.toString())

//now for error checking
console.log("ERROR CHECKING!!!!!!!!!!!!!!!!!!!!!!!!")
console.log("hihihihihi")
console.log(x.at(-30))

let y = new LinkedList()
y.pop()
console.log(y)

console.log(y.contains("huhuhu"))

console.log(x.find("gagagaga"))

console.log(y.toString())

/*
let y = new LinkedList()

console.log("heyo")
y.append("banana")
console.log(y.toString())

let z = new LinkedList()
z.append(null)
z.append("hihii")
console.log(z.size())*/