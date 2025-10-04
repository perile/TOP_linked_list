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
        if (list.value == null) {
            list.value = value;
        } else {
            let newNode = new Node(value);
            this.searchForAppend(list, newNode)
        }
    }

    searchForAppend(list, newNode) {
        if (list.nextNode == null) {
            list.nextNode = newNode
            return
        } else {
            this.searchForAppend(list.nextNode, newNode)
        }
    }

    prepend(value) {
        if (this.list.value == null) {
            this.list.value = value;
        } else {
            let newNode = new Node(value, this.list)
            this.list = Object.assign({}, newNode)
        }
    }

    size() {
        let count = 0
        if (this.list.value == null && this.list.nextNode == null) {
            return count
        }
        if (this.list.value == null) {
            console.log("baguinguiiiiiiii")
            return count += 2
        }
        let aux = Object.assign({}, this.list)
        while (true) {
            count += 1
            if (aux.nextNode == null) {
                return count
            } else {
                aux = Object.assign({}, aux.nextNode)
            }
        }
    }

    head() {
        return this.list
    }

    tail(list = this.list) {
        let aux = Object.assign({}, list)
        while (true) {
            if (aux.nextNode == null) {
                return aux
            } else {
                aux = Object.assign({}, aux.nextNode)
            }
        }
    }

    at(index) {
        let count = index
        let listSize = this.size()
        if (count > listSize - 1 || count < 0) {
            return `It is not possible to search for a node whoose index goes beyond the bounds of the size of the current linked list. \nCurrent linked list size: ${this.size()}, index to be searched: ${count}`
        }
        let aux = Object.assign({}, this.list)

        while (true) {
            if (count == 0) {
                return aux
            } else {
                count -= 1
                aux = Object.assign({}, aux.nextNode)
            }
        }
    }

    pop() {
        if (this.list.value == null) {
            return `Since the list is empty, there is nothing to be removed`
        } if (this.list.nextNode == null) {
            this.list.value = null;
        } else {
            let count = this.size() - 2
            this.list = Object.assign({}, this.searchForPop(this.list, count))
        }
    }

    searchForPop(list, count) {
        if (count == 0) {
            list.nextNode = null
            return list
        } else {
            this.searchForPop(list.nextNode, count - 1)
        }
        return list
    }


    contains(value) {
        return this.searchForContains(this.list, value)

    }

    searchForContains(list, value) {
        if (list.value == value) {
            return true
        }
        if (list.nextNode == null) {
            return false
        } else {
            return this.searchForContains(list.nextNode, value)
        }
    }

    find(value) {
        return this.searchForFind(this.list, value, 0)
    }

    searchForFind(list, value, count) {
        if (list.value == value) {
            return count
        }
        if (list.nextNode == null) {
            return null
        } else {
            return this.searchForFind(list.nextNode, value, count + 1)
        }
    }

    toString() {
        if (this.size() == 0) {
            return "null"
        }
        let string = ""
        string = this.listingAllToString(this.list, string)
        return string
    }

    listingAllToString(list, str) {
        if (list.nextNode == null) {
            return str.concat(" ( ", String(list.value), " ) -> ", "null")
        } else {
            return str.concat(" ( ", String(list.value), " ) ->", this.listingAllToString(list.nextNode, str))
        }
    }

    insertAt(value, index) {
        let sizeOfLinkedList = this.size()
        if (index > sizeOfLinkedList - 1) {
            return `Cannot insert the node of value ${value}, size the index given is beyond the scope of the size of the current linked list.\nIndex given: ${index}\nSize of the linked list: ${sizeOfLinkedList}`
        }

        let theNodeBeforeValue;
        if (index > 0) {
            theNodeBeforeValue = this.at(index - 1).value
        } else {
            theNodeBeforeValue = this.head().value
        }

        let aux = new LinkedList()
        let aux2 = Object.assign({}, this.list)

        while (sizeOfLinkedList >= 1) {
            if (aux2.value != theNodeBeforeValue) {
                aux.append(String(aux2.value))
                sizeOfLinkedList--
            } else if (aux2.value == theNodeBeforeValue) {
                aux.append(String(aux2.value))
                aux.append(String(value))
                sizeOfLinkedList--
            }
            aux2 = aux2.nextNode
        }

        this.list = Object.assign({}, aux.list)

    }

    removeAt(index) {
        let sizeOfLinkedList = this.size()
        if (index > sizeOfLinkedList - 1) {
            return `Cannot insert the node of value ${value}, size the index given is beyond the scope of the size of the current linked list.\nIndex given: ${index}\nSize of the linked list: ${sizeOfLinkedList}`
        }

        let theNodeToBeRemoved;
        if (index > 0) {
            theNodeToBeRemoved = this.at(index).value
        } else {
            theNodeToBeRemoved = this.head().value
        }

        let aux = new LinkedList()
        let aux2 = Object.assign({}, this.list)

        while (sizeOfLinkedList >= 1) {
            if (aux2.value != theNodeToBeRemoved) {
                aux.append(String(aux2.value))
                sizeOfLinkedList--
            } else if (aux2.value == theNodeToBeRemoved) {
                sizeOfLinkedList--
            }
            aux2 = aux2.nextNode
        }
        this.list = Object.assign({}, aux.list)

    }


}

let x = new LinkedList()

console.log(x)

x.append("dog")
console.log(x)

x.append("cat")
console.log(x)

x.append("parrot")
console.log(x)

x.append("hamster")
console.log(x)

x.prepend("snake")
console.log(x)

console.log("the size of the linked list: " + x.size())

console.log("the first node of the x list: ")
console.log(x.head())

console.log("the last node of the x list: ")
console.log(x.tail())

console.log("The index 3 of the current list should be the parrot (next node => hamster)")
console.log(x.at(4))

console.log("hamster is to be poped out");
x.pop()
console.log(x)

console.log("there is cat, so the result should be true\n\n\n")
console.log(x.contains("cat"))

console.log("the index of the parrot is 3, so that should be the result")
console.log(x.find("parrot"))

console.log("Now for the listing\nThe list should look like this: \n ( snake ) -> ( dog ) -> ( cat ) -> ( parrot ) -> null")

console.log(x.toString())

console.log("insert turtle at index 2")
x.insertAt("turtle", 2)
console.log("value of x")
console.log(x.toString())

console.log("insert worm at index 3")
x.insertAt("worm", 3)
console.log("value of x")
console.log(x.toString())

console.log("remove turtle at index 2")
x.removeAt(2)
console.log("value of x")
console.log(x.toString())

console.log(x.at(-30))

let y = new LinkedList()
y.pop()
console.log(y)

console.log(y.contains("dog"))

console.log(x.find("cat"))

console.log(y.toString())