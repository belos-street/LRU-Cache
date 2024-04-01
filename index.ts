import { DoublyLinkedList } from "./src/DoublyLinkedList";

const list = new DoublyLinkedList<number, number>();

list.insertAtTail(1, 1);
list.insertAtTail(2, 2);
list.insertAtTail(3, 2);
list.insertAtTail(4, 2);
list.insertAtTail(5, 3);

list.deleteNode(list.findToKey(3)!);
console.log(list);
