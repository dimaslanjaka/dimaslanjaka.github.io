package com.dimaslanjaka.stackqueue;
import com.dimaslanjaka.stackqueue.Queue;
public class StaticQueueinjava {

    // Driver code
    public static void main(String[] args)
    {
        // Create a queue of capacity 4
        Queue q = new Queue(4);

        // print Queue elements
        Queue.Display();

        // inserting elements in the queue
        Queue.Enqueue(20);
        Queue.Enqueue(30);
        Queue.Enqueue(40);
        Queue.Enqueue(50);

        // print Queue elements
        Queue.Display();

        // insert element in the queue
        Queue.Enqueue(60);

        // print Queue elements
        Queue.Display();

        Queue.Dequeue();
        Queue.Dequeue();
        System.out.print("\n\nafter two node deletion\n\n");

        // print Queue elements
        Queue.Display(true);

        // print front of the queue
        Queue.queueFront();
    }
}